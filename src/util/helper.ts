import rimraf from 'rimraf';
import fs from 'fs';

const isBigfishProject = !!process.env.BIGFISH_COMPAT;

const clearDir = (dir: string) => {
  return new Promise((resolve, reject) => {
    rimraf(dir, {}, () => {
      resolve();
    });
  });
};

const readJSONFile = (filePath: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

export { isBigfishProject, clearDir, readJSONFile };
