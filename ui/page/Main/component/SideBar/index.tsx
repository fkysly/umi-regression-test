import React from 'react';
import styles from './index.module.less';

interface IProps {}

const SideBar: React.FC<IProps> = props => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.toolbar}></div>
      <div className={styles.profiles}>
        <p className={styles.profilesTitle}>快照列表</p>
      </div>
    </div>
  );
};

export default SideBar;
