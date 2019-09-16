import puppeteer from 'puppeteer';
import rimraf from 'rimraf';
import BlinkDiff from 'blink-diff';
import 'regenerator-runtime/runtime'; // temp
import crypto from 'crypto';
import fs from 'fs';
import util from 'util';
import path from 'path';
import config from './config';

const readdir = util.promisify(fs.readdir);

let urtImagesDir = ``;
let diffOutputDir = ``;
let devServerUrl = `${config.devServerHost}:8000`;
const routes = [{ path: '/' }, { path: '/users/' }];
let snapshots = [];
let baseSnapshotId = '0';
const EXTENSION = '.png';

const clearDiffOutputDir = (diffOutputDir, api) =>
  new Promise((resolve, reject) =>
    rimraf(diffOutputDir, {}, () => {
      api.debug('remove diff output dir');
      resolve();
    })
  );

export default function(api, options) {
  urtImagesDir = `${api.paths.cwd}/${config.urtDirName}`;
  diffOutputDir = `${api.paths.cwd}/${config.diffDirName}`;

  clearDiffOutputDir(diffOutputDir, api);

  const getLocalSnapshots = () => {
    let snapshots = [];
    try {
      if (fs.lstatSync(urtImagesDir).isDirectory()) {
        fs.readdirSync(urtImagesDir).map(file => {
          if (fs.lstatSync(`${urtImagesDir}/${file}`).isDirectory()) {
            snapshots.push({ id: file });
          }
        });
      }
    } catch (e) {
      api.debug(JSON.stringify(e));
    }
    return snapshots;
  };

  snapshots = getLocalSnapshots();

  const genImagePath = async (route, snapshotDir) => {
    const { path } = route;

    const md5Path = crypto
      .createHash('md5')
      .update(path)
      .digest('hex');

    const imagePath = `${snapshotDir}/${md5Path}.png`;
    return imagePath;
  };

  const takeScreenshot = async (route, snapshotDir) => {
    const pagePath = `${devServerUrl}${route.path}`;
    const imagePath = await genImagePath(route, snapshotDir);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pagePath);
    await page.screenshot({ path: imagePath });
    await browser.close();
  };

  const takeSnapshot = async () => {
    const count = snapshots.length;
    const snapshot = { id: `${count}` };

    const snapshotDir = `${urtImagesDir}/${snapshot.id}`;
    await fs.mkdir(snapshotDir, { recursive: true }, err => {
      if (err) throw err;
    });

    await Promise.all(
      routes.map(async route => await takeScreenshot(route, snapshotDir))
    );

    return snapshot;
  };

  const getImagePaths = async () => {
    const baseSnapshotDir = `${urtImagesDir}/${baseSnapshotId}`;
    let imagePaths = [];
    try {
      const files = await readdir(baseSnapshotDir);
      imagePaths = files.filter(
        file => path.extname(file).toLowerCase() === EXTENSION
      );
    } catch (e) {
      api.debug(e);
    }

    return imagePaths;
  };

  const diffSnapshot = async snapshotId => {
    await clearDiffOutputDir(diffOutputDir, api);
    const imagePaths = await getImagePaths();

    await fs.mkdir(diffOutputDir, { recursive: true }, err => {
      if (err) throw err;
    });

    const tasks = imagePaths.map(imagePath => {
      return new BlinkDiff({
        imageAPath: `${urtImagesDir}/${baseSnapshotId}/${imagePath}`,
        imageBPath: `${urtImagesDir}/${snapshotId}/${imagePath}`,
        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.01, // 1% threshold
        imageOutputPath: `${diffOutputDir}/${imagePath}`
      });
    });

    await Promise.all(
      tasks.map(
        async task =>
          await new Promise((resolve, reject) =>
            task.run((err, result) => {
              if (err) {
                api.debug(err);
                reject();
              }
              resolve(result);
            })
          )
      )
    );
  };

  // api.afterDevServer(({ serve, devServerPort }) => {
  //   devServerUrl = `${config.devServerHost}:${devServerPort}`;
  // });

  api.addUIPlugin(require.resolve('../dist/index.umd'));

  api.onUISocket(async ({ action: { type, payload }, failure, success }) => {
    switch (type) {
      case 'org.umi.plugin.umi-regression-test.takeSnapshot':
        try {
          const snapshot = await takeSnapshot();
          snapshots.push(snapshot);
          success({ snapshot });
        } catch (e) {
          failure({});
        }
        break;
      case 'org.umi.plugin.umi-regression-test.getSnapshots':
        success({ snapshots });
        break;
      case 'org.umi.plugin.umi-regression-test.getBaseSnapshotId':
        success({ baseSnapshotId });
        break;
      case 'org.umi.plugin.umi-regression-test.diffSnapshot':
        try {
          await diffSnapshot(payload.snapshotId);
          success({});
        } catch (e) {
          failure({});
        }
        break;
      default:
        console.log('');
    }
  });
}
