import React from 'react';
import { Button } from 'antd';
import { Snapshot } from '../../data';
import styles from './index.module.less';

interface IProps {
  snapshots: Snapshot[];
  takeSnapshot: () => void;
}

const SideBar: React.FC<IProps> = props => {
  const { snapshots = [], takeSnapshot } = props;
  return (
    <div className={styles.sidebar}>
      <div className={styles.toolbar}>
        <Button type="primary" size="small" onClick={takeSnapshot}>
          拍快照
        </Button>
      </div>
      <div className={styles.profiles}>
        <p className={styles.profilesTitle}>快照列表</p>
        {snapshots.map(snapshot => (
          <p>{snapshot.name}</p>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
