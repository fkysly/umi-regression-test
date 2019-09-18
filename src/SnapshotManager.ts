import { Snapshot } from './data';

export default class SnapshotManager {
  private _devServerUrl: string;
  private _urtDir: string;
  private _baseSnapshot?: Snapshot;

  constructor(devServerUrl: string, urtDir: string) {
    this._devServerUrl = devServerUrl;
    this._urtDir = urtDir;
  }

  getBaseSnapshot(): Snapshot | undefined {
    return this._baseSnapshot;
  }

  setBaseSnapshot(snapshot: Snapshot) {
    this._baseSnapshot = snapshot;
  }

  async takeSnapshot(): Promise<Snapshot> {
    return null;
  }

  async diffSnapshot(source: Snapshot, target: Snapshot): Promise<string> {
    return 'report';
  }

  async diffSnapshotWithBase(target: Snapshot): Promise<string> {
    const report = await this.diffSnapshot(this._baseSnapshot, target);
    return report;
  }
}
