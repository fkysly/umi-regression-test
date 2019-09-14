import React from 'react';
import { Snapshot } from '../../data';
import styles from './index.module.less';

interface IProps {
  snapshots: Snapshot[];
}

const SideBar: React.FC<IProps> = props => {
  const { snapshots = [] } = props;
  return (
    <div className={styles.sidebar}>
      <div className={styles.toolbar}></div>
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
