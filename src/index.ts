import puppeteer from 'puppeteer';
import 'regenerator-runtime/runtime'; // temp
import crypto from 'crypto';
import fs from 'fs';
import config from './config';
import { Snapshot } from 'data';

let urtDir = ``;
let devServerUrl = 'http://localhost:8000';
const routes = [{ path: '/' }, { path: '/users/' }];
let snapshots = [];

export default function(api, options) {
  urtDir = `${api.paths.cwd}/${config.distDir}`;

  const getLocalSnapshots = (): Snapshot[] => {
    let snapshots = [];
    try {
      if (fs.lstatSync(urtDir).isDirectory()) {
        fs.readdirSync(urtDir).map(file => {
          if (fs.lstatSync(`${urtDir}/${file}`).isDirectory()) {
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

  const takeSnapshot = async (): Promise<Snapshot> => {
    const count = snapshots.length;
    const snapshot = { id: `${count}` };

    const snapshotDir = `${urtDir}/${snapshot.id}`;
    await fs.mkdir(snapshotDir, { recursive: true }, err => {
      if (err) throw err;
    });

    await Promise.all(
      routes.map(async route => await takeScreenshot(route, snapshotDir))
    );

    return snapshot;
  };

  // api.afterDevServer(({ serve, devServerPort }) => {
  //   devServerUrl = `${config.devServerHost}:${devServerPort}`;
  // });

  api.addUIPlugin(require.resolve('../dist/index.umd'));

  api.onUISocket(async ({ action, failure, success }) => {
    if (action.type === 'org.umi.plugin.umi-regression-test.takeSnapshot') {
      try {
        const snapshot = await takeSnapshot();
        snapshots.push(snapshot);
        success({ snapshot });
      } catch (e) {
        failure();
      }
    }

    if (action.type === 'org.umi.plugin.umi-regression-test.getSnapshots') {
      success({ snapshots });
    }
  });
}
