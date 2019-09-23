import path from 'path';
import fs from 'fs';
import Service from 'umi-build-dev/lib/Service';
import SnapshotManager from '../src/SnapshotManager';
import { runDevServer, killDevServer } from '../src/util/devServer';
import { clearDir } from '../src/util/helper';

describe('test SnapshotManager', () => {
  let snapshotManager;
  let devServerUrl;
  let urtDir;
  let routes;
  let service;

  beforeAll(async () => {
    jest.setTimeout(30000);
    const cwd = path.join(__dirname, '../example');
    devServerUrl = await runDevServer({
      cwd
    });
    urtDir = path.join(__dirname, '.urtImages');
    service = new Service({ cwd });
    service.init();
    routes = service.getRoutes();
    console.log(routes);
  });

  beforeEach(() => {
    snapshotManager = new SnapshotManager(devServerUrl, urtDir, routes);
  });

  test('takeSnapshot', async () => {
    const snapshot = await snapshotManager.takeSnapshot();
    expect(snapshot.id).toBe(0);
    const snapshots = snapshotManager.getSnapshots();
    const latestSnapshot = snapshots[snapshots.length - 1];
    expect(snapshot).toEqual(latestSnapshot);
  });

  test('createSnapshotDir', async () => {
    const snapshot = {
      id: 123123
    };
    await snapshotManager.createSnapshotDir(snapshot);
    const snapshotDir = `${urtDir}/${snapshot.id}`;
    let isDir = false;
    try {
      isDir = fs.lstatSync(snapshotDir).isDirectory();
    } catch (e) {}

    expect(isDir).toBeTruthy();
  });

  test('diffSnapshot', async () => {
    const snapshot = await snapshotManager.takeSnapshot();
    const snapshot2 = await snapshotManager.takeSnapshot();
    const report = await snapshotManager.diffSnapshot(snapshot, snapshot2);
    expect(report).toBe('report');
  });

  test('diffSnapshotWithBase', async () => {
    const snapshot = await snapshotManager.takeSnapshot();
    snapshotManager.setBaseSnapshot(snapshot);
    const snapshot2 = await snapshotManager.takeSnapshot();
    const report = await snapshotManager.diffSnapshotWithBase(snapshot2);
    expect(report).toBe('report');
  });

  afterEach(async () => {
    await clearDir(snapshotManager.getUrtDir());
  });
});
