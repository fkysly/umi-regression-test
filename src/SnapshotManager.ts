import fs from 'fs';
import rimraf from 'rimraf';
import { IRoute } from 'umi-types';
import { Snapshot, BaseSnapshotIdObj } from './data';
import { takeScreenshot, genImageName } from './screenshot';
import { readJSONFile } from './util/helper';

export default class SnapshotManager {
  private _devServerUrl: string;
  private _urtDir: string;
  private _baseSnapshot?: Snapshot;
  private _snapshots: Snapshot[];
  private _routes: IRoute[];

  constructor(devServerUrl: string, urtDir: string, routes: IRoute[]) {
    this._devServerUrl = devServerUrl;
    this._urtDir = urtDir;
    this._snapshots = [];
    this._routes = routes;
  }

  setRoutes(routes: IRoute[]) {
    this._routes = routes;
  }

  getUrtDir(): string {
    return this._urtDir;
  }

  getBaseSnapshot(): Snapshot | undefined {
    return this._baseSnapshot;
  }

  setBaseSnapshot(snapshot: Snapshot) {
    this._baseSnapshot = snapshot;
  }

  getSnapshots(): Snapshot[] {
    return this._snapshots;
  }

  getSnapshotsCount(): number {
    return this._snapshots.length;
  }

  async takeSnapshot(): Promise<Snapshot> {
    const snapshotCount = this.getSnapshotsCount();
    const snapshot = {
      id: snapshotCount,
      screenshots: []
    };

    let snapshotDir = '';
    try {
      snapshotDir = await this.createSnapshotDir(snapshot);
    } catch (e) {
      throw e;
    }

    await Promise.all(
      this._routes.map(async route => {
        const routePath = route.path;
        const pagePath = `${this._devServerUrl}${routePath}`;
        const imageName = await genImageName(routePath);
        const imagePath = `${snapshotDir}/${imageName}`;
        await takeScreenshot(pagePath, imagePath);
        snapshot.screenshots.push({
          routePath,
          imageName
        });
      })
    );

    await this.writeSnapshot(snapshotDir, snapshot);

    if (this._snapshots.length === 0) {
      this._baseSnapshot = snapshot;
      await this.writeBaseSnapshotId();
    }

    this._snapshots.push(snapshot);

    return snapshot;
  }

  async readBaseSnapshotId(): Promise<number> {
    const filePath = `${this._urtDir}/conf.json`;
    const json = <BaseSnapshotIdObj>await readJSONFile(filePath);
    return parseInt(json.baseSnapshotId, 10);
  }

  writeBaseSnapshotId() {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify({
        baseSnapshotId: this._baseSnapshot.id
      });
      fs.writeFile(`${this._urtDir}/conf.json`, str, 'utf8', err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async readLocalSnapshots() {
    try {
      if (fs.lstatSync(this._urtDir).isDirectory()) {
        await Promise.all(
          fs.readdirSync(this._urtDir).map(async file => {
            const snapshotDir = `${this._urtDir}/${file}`;
            if (fs.lstatSync(snapshotDir).isDirectory()) {
              const snapshot = await this.readSnapshot(snapshotDir);
              this._snapshots.push(snapshot);
            }
          })
        );
        const baseSnapshotId = await this.readBaseSnapshotId();
        const bases = this._snapshots.filter(
          snapshot => snapshot.id === baseSnapshotId
        );
        if (bases && bases.length > 0) {
          this._baseSnapshot = bases[0];
        }
      }
    } catch (e) {
      throw e;
    }
  }

  async readSnapshot(snapshotDir: string): Promise<Snapshot> {
    const filePath = `${snapshotDir}/snapshotInfo.json`;
    const snapshot = <Snapshot>await readJSONFile(filePath);
    return snapshot;
  }

  writeSnapshot(snapshotDir: string, snapshot: Snapshot) {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(snapshot);
      fs.writeFile(`${snapshotDir}/snapshotInfo.json`, str, 'utf8', err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  createSnapshotDir(snapshot: Snapshot): Promise<string> {
    return new Promise((resolve, reject) => {
      const snapshotDir = `${this._urtDir}/${snapshot.id}`;
      fs.mkdir(snapshotDir, { recursive: true }, err => {
        if (err) {
          reject(err);
        }

        resolve(snapshotDir);
      });
    });
  }

  clearSnapshotDir(snapshot: Snapshot) {
    return new Promise((resolve, reject) => {
      const snapshotDir = `${this._urtDir}/${snapshot.id}`;
      rimraf(snapshotDir, {}, () => {
        resolve();
      });
    });
  }

  async diffSnapshot(source: Snapshot, target: Snapshot): Promise<string> {
    return 'report';
  }

  async diffSnapshotWithBase(target: Snapshot): Promise<string> {
    const report = await this.diffSnapshot(this._baseSnapshot, target);
    return report;
  }
}
