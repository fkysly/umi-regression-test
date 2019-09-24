import fs from 'fs';
import path from 'path';
import BlinkDiff from 'blink-diff';
import { IRoute } from 'umi-types';
import { Snapshot, ConfObj, Report } from './data';
import { takeScreenshot, genImageName } from './screenshot';
import {
  readJSONFile,
  clearDir,
  mkDirRecursive,
  writeJSONFile
} from './util/helper';

const BLANK_IMAGE_PATH = path.join(__dirname, './assets/blank.png');

export default class SnapshotManager {
  private _devServerUrl: string;
  private _urtDir: string;
  private _baselineSnapshot: Snapshot;
  private _snapshots: Snapshot[];
  private _routes: IRoute[];
  private _conf: ConfObj;

  constructor(devServerUrl: string, urtDir: string, routes: IRoute[]) {
    this._devServerUrl = devServerUrl;
    this._urtDir = urtDir;
    this._snapshots = [];
    this._routes = routes;
    this._baselineSnapshot = {
      id: -1,
      screenshots: []
    };
    this._conf = {
      baselineSnapshotId: -1,
      snapshotIds: []
    };
  }

  setRoutes(routes: IRoute[]) {
    this._routes = routes;
  }

  getUrtDir(): string {
    return this._urtDir;
  }

  getBaselineSnapshot(): Snapshot | undefined {
    return this._baselineSnapshot;
  }

  async setBaselineSnapshot(snapshot: Snapshot) {
    this._baselineSnapshot = snapshot;
    await this.writeBaselineSnapshotId();
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

    await this.writeSnapshotInfo(snapshotDir, snapshot);

    await this.addSnapshot(snapshot);

    return snapshot;
  }

  async addSnapshot(snapshot: Snapshot) {
    this._snapshots.push(snapshot);

    this._conf.snapshotIds = this._snapshots.map(snapshot => snapshot.id);
    const str = JSON.stringify(this._conf);

    const filePath = `${this._urtDir}/conf.json`;
    await writeJSONFile(filePath, str);
  }

  async readConf(): Promise<ConfObj> {
    const filePath = `${this._urtDir}/conf.json`;
    const json = <ConfObj>await readJSONFile(filePath);
    return json;
  }

  async writeBaselineSnapshotId() {
    this._conf.baselineSnapshotId = this._baselineSnapshot.id;
    const str = JSON.stringify(this._conf);
    const filePath = `${this._urtDir}/conf.json`;
    await writeJSONFile(filePath, str);
  }

  async readLocalSnapshots() {
    try {
      if (fs.lstatSync(this._urtDir).isDirectory()) {
        const { baselineSnapshotId, snapshotIds } = await this.readConf();

        await Promise.all(
          fs.readdirSync(this._urtDir).map(async file => {
            const snapshotDir = `${this._urtDir}/${file}`;
            const result = snapshotIds.filter(id => `${id}` === file);
            if (result && result.length > 0) {
              const snapshot = await this.readSnapshot(snapshotDir);
              this._snapshots.push(snapshot);
            }
          })
        );

        const bases = this._snapshots.filter(
          snapshot => snapshot.id === baselineSnapshotId
        );
        if (bases && bases.length > 0) {
          this._baselineSnapshot = bases[0];
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

  async writeSnapshotInfo(snapshotDir: string, snapshot: Snapshot) {
    const str = JSON.stringify(snapshot);
    const filePath = `${snapshotDir}/snapshotInfo.json`;
    await writeJSONFile(filePath, str);
  }

  async createSnapshotDir(snapshot: Snapshot): Promise<string> {
    const snapshotDir = `${this._urtDir}/${snapshot.id}`;
    await mkDirRecursive(snapshotDir);
    return snapshotDir;
  }

  async createDiffOutputDir(): Promise<string> {
    const diffOutputDir = `${this._urtDir}/diff`;
    await mkDirRecursive(diffOutputDir);
    return diffOutputDir;
  }

  async clearSnapshotDir(snapshot: Snapshot) {
    const snapshotDir = `${this._urtDir}/${snapshot.id}`;
    await clearDir(snapshotDir);
  }

  async clearDiffOutputDir() {
    const diffOutputDir = `${this._urtDir}/diff`;
    await clearDir(diffOutputDir);
  }

  async diffSnapshot(
    sourceSnapshot: Snapshot,
    targetSnapshot: Snapshot,
    updateBaselineSnapshot: boolean = false
  ): Promise<Report[]> {
    await this.clearDiffOutputDir();
    const diffOutputDir = await this.createDiffOutputDir();
    const screenshots = [
      ...new Set(
        sourceSnapshot.screenshots
          .map(screenshot => JSON.stringify(screenshot))
          .concat(
            targetSnapshot.screenshots.map(screenshot =>
              JSON.stringify(screenshot)
            )
          )
      )
    ].map(str => JSON.parse(str));

    const isExistInSnapshot = (routePath, snapshot) => {
      const result = snapshot.screenshots.filter(
        screenshot => screenshot.routePath === routePath
      );
      return result && result.length > 0;
    };

    const tasks = screenshots.map(screenshot => {
      const { imageName, routePath } = screenshot;

      const existInSource = isExistInSnapshot(routePath, sourceSnapshot);
      const sourceImagePath = existInSource
        ? `${this._urtDir}/${sourceSnapshot.id}/${imageName}`
        : BLANK_IMAGE_PATH;

      const existInTarget = isExistInSnapshot(routePath, targetSnapshot);
      const targetImagePath = existInTarget
        ? `${this._urtDir}/${targetSnapshot.id}/${imageName}`
        : BLANK_IMAGE_PATH;
      const diffImagePath = `${diffOutputDir}/${imageName}`;

      const diff = new BlinkDiff({
        imageAPath: sourceImagePath,
        imageBPath: targetImagePath,
        thresholdType: BlinkDiff.THRESHOLD_PIXEL,
        threshold: 0,
        imageOutputPath: diffImagePath
      });
      return {
        diff,
        diffImagePath,
        routePath
      };
    });

    const reports = <Report[]>await Promise.all(
      tasks.map(
        task =>
          new Promise((resolve, reject) => {
            const { diff, diffImagePath, routePath } = task;
            diff.run((err, result) => {
              if (err) {
                reject(err);
              }
              const isPass = diff.hasPassed(result.code);
              const { differences, dimension } = result;
              resolve({
                isPass,
                diffImagePath,
                routePath,
                differences,
                dimension
              });
            });
          })
      )
    );

    if (updateBaselineSnapshot) {
      await this.setBaselineSnapshot(targetSnapshot);
    }

    return reports;
  }

  async diffSnapshotWithBaseline(
    targetSnapshot: Snapshot,
    update: boolean
  ): Promise<Report[]> {
    const reports = await this.diffSnapshot(
      this._baselineSnapshot,
      targetSnapshot,
      update
    );

    return reports;
  }
}
