export interface Report {
  isPass: boolean;
  diffImagePath: string;
  routePath: string;
  differences: number;
  dimension: number;
}

export interface ConfObj {
  baselineSnapshotId: number;
  snapshotIds: number[];
}

export interface Screenshot {
  routePath: string;
  imageName: string;
}

export interface Snapshot {
  id: number;
  screenshots: Screenshot[];
}
