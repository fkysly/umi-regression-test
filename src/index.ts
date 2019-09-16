import puppeteer from 'puppeteer';
import 'regenerator-runtime/runtime'; // temp
import crypto from 'crypto';
import fs from 'fs';
import config from './config';

let count = 1;

const screenshot = async (route, devServerUrl) => {
  const { pagePath, imagePath } = await genPath(route, devServerUrl);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pagePath);
  await page.screenshot({ path: imagePath });

  await browser.close();
};

const genPath = async (route, devServerUrl) => {
  const { path } = route;
  const pagePath = `${devServerUrl}${path}`;
  const md5Path = crypto
    .createHash('md5')
    .update(path)
    .digest('hex');
  const folderDir = `${config.distDir}/${count}`;
  await fs.mkdir(folderDir, { recursive: true }, err => {
    if (err) throw err;
  });
  const imagePath = `${folderDir}/${md5Path}.png`;
  return {
    pagePath,
    imagePath
  };
};

let devServerUrl = 'http://localhost:8000';

export default function(api, options) {
  // api.afterDevServer(({ serve, devServerPort }) => {
  //   devServerUrl = `${config.devServerHost}:${devServerPort}`;
  // });

  api.addUIPlugin(require.resolve('../dist/index.umd'));

  api.onUISocket(async ({ action, failure, success }) => {
    if (action.type === 'org.umi.plugin.umi-regression-test.takeSnapshot') {
      // api.debug('123');
      await screenshot({ path: '/' }, devServerUrl);
      success({
        data: 'success'
      });
    }
  });
}
