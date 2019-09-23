import { IApi } from 'umi-types';
import { runDevServer, killDevServer } from './util/devServer';
import config from './config';
import SnapshotManager from './SnapshotManager';
import { genarateFormatReport } from './report';

const entry = async (api: IApi) => {
  api.log.info('正在初始化...');
  const devServerUrl = await runDevServer(); // 不打开浏览器
  const urtDir = `${api.paths.cwd}/${config.urtDirName}`;

  api.log.info('正在获取页面路由信息...');
  const routes = api.getRoutes();

  api.log.info('正在初始化快照管理器...');
  const snapshotManager = new SnapshotManager(devServerUrl, urtDir, routes);
  try {
    await snapshotManager.readLocalSnapshots();
  } catch (e) {
    api.log.info('未能获取本地快照');
  }

  api.log.info('正在抓取当前快照...');
  const snapshot = await snapshotManager.takeSnapshot();

  api.log.info('正在生成测试结果...');
  const reports = await snapshotManager.diffSnapshotWithBaseline(snapshot);
  console.log(genarateFormatReport(reports));

  await killDevServer();
};

export default entry;
