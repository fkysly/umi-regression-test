export interface BaseSnapshotIdObj {
  baseSnapshotId: string;
}

export interface Screenshot {
  pagePath: string;
  imageName: string;
}

export interface Snapshot {
  id: number;
  screenshots: Screenshot[];
}
