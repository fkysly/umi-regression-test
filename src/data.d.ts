export interface ConfObj {
  baselineSnapshotId: number;
  snapshotIds: number[];
}

export interface Screenshot {
  pagePath: string;
  imageName: string;
}

export interface Snapshot {
  id: number;
  screenshots: Screenshot[];
}
