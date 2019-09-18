import SnapshotManager from '../src/SnapshotManager';
import { runDevServer, killDevServer } from '../src/util/devServer';
import path from 'path';

describe('test SnapshotManager', () => {
  let snapshotManager;
  let devServerUrl;

  beforeAll(async () => {
    jest.setTimeout(30000);
    devServerUrl = await runDevServer({
      cwd: path.join(__dirname, '../example')
    });
  });

  beforeEach(() => {
    const urtDir = path.join(__dirname, '.urtImages');
    snapshotManager = new SnapshotManager(devServerUrl, urtDir);
  });

  test('takeSnapshot', async () => {
    const snapshot = await snapshotManager.takeSnapshot();
    expect(snapshot).toBeNull();
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
});
