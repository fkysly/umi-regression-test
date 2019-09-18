import { IApi } from 'umi-types';
import { runDevServer } from './util/devServer';
import config from './config';
import SnapshotManager from './SnapshotManager';

const entry = async (api: IApi) => {
  api.log.info('正在初始化...');
  const devServerUrl = await runDevServer(); // 不打开浏览器
  const urtDir = `${api.paths.cwd}/${config.urtDirName}`;

  api.log.info('正在抓取当前快照...');
  const snapshotManager = new SnapshotManager(devServerUrl, urtDir);
  const snapshot = await snapshotManager.takeSnapshot();

  api.log.info('正在生成测试结果...');
  const report = await snapshotManager.diffSnapshotWithBase(snapshot);
  console.log(report);
};

export default entry;
