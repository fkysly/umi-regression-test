import React from 'react';
import { Button } from 'antd';
import { Snapshot } from 'data';
import classnames from 'classnames';
import styles from './index.module.less';

interface IProps {
  snapshots: Snapshot[];
  takeSnapshot: () => void;
  takingSnapshot: boolean;
  activeSnapshotIndex: number;
  setActiveSnapshotIndex: (index: number) => void;
  baseSnapshotId: string;
  diffSnapshot: (snapshotId) => void;
  isDiffing: boolean;
}

const SideBar: React.FC<IProps> = props => {
  const {
    snapshots = [],
    takeSnapshot,
    takingSnapshot,
    activeSnapshotIndex,
    setActiveSnapshotIndex,
    baseSnapshotId,
    diffSnapshot,
    isDiffing
  } = props;
  const activeSnapshot = snapshots[activeSnapshotIndex];
  return (
    <div className={styles.sidebar}>
      <div className={styles.toolbar}>
        <Button
          type="primary"
          size="small"
          onClick={takeSnapshot}
          loading={takingSnapshot}
        >
          拍照
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          type="default"
          size="small"
          onClick={() => diffSnapshot(snapshots[activeSnapshotIndex].id)}
          loading={isDiffing}
        >
          对比
        </Button>
      </div>
      <div className={styles.profiles}>
        <p className={styles.profilesTitle}>快照列表</p>

        {snapshots.map((snapshot, index) => {
          const isActive = activeSnapshot && snapshot.id === activeSnapshot.id;
          const obj = {};
          obj[styles.profilesActiveItem] = isActive;
          return (
            <div
              className={classnames([styles.profilesItem, obj])}
              key={snapshot.id}
              onClick={() => setActiveSnapshotIndex(index)}
            >
              <p>
                快照 {snapshot.id}
                {baseSnapshotId === snapshot.id ? ' *' : null}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
