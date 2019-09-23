import crypto from 'crypto';
import puppeteer from 'puppeteer';

const genImageName = async (routePath: string) => {
  const md5Path = crypto
    .createHash('md5')
    .update(routePath)
    .digest('hex');

  return `${md5Path}.png`;
};

const takeScreenshot = async (pagePath: string, imagePath: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pagePath);
  await page.screenshot({ path: imagePath });
  await browser.close();
};

export { genImageName, takeScreenshot };
