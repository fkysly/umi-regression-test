import rimraf from 'rimraf';
import fs from 'fs';

const isBigfishProject = !!process.env.BIGFISH_COMPAT;

const mkDirRecursive = (dir: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) {
        reject(err);
      }
      resolve(dir);
    });
  });
};

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

const writeJSONFile = (filePath: string, str: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, str, 'utf8', err => {
      if (err) reject(err);
      resolve();
    });
  });
};

export {
  isBigfishProject,
  clearDir,
  readJSONFile,
  mkDirRecursive,
  writeJSONFile
};
