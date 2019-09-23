import { exec } from 'child_process';
import { isBigfishProject } from './helper';

const command = isBigfishProject ? 'bigfish dev' : 'BROWSER=none umi dev';
let devServer = null;

const runDevServer = (opts = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const devServerPort = 799;
    const devServerUrl = `http://localhost:${devServerPort}`;
    devServer = exec(`${command} --port ${devServerPort}`, opts);
    devServer.stdout.on('data', data => {
      if (/DONE/.test(data.toString())) {
        resolve(devServerUrl);
      }
    });
    process.on('SIGINT', () => {
      devServer.kill('SIGINT');
      devServer = null;
    });
  });
};

const killDevServer = () => {
  if (devServer !== null) {
    devServer.kill('SIGINT');
    devServer = null;
  }
};

export { runDevServer, killDevServer };
