import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IUiApi } from 'umi-types';
import SideBar from './component/SideBar';
import styles from './index.module.less';
import { Snapshot } from 'data';

interface IProps {
  api: IUiApi;
}
const { useState } = React;

const Welcome: React.FC<IProps> = ({ api }) => {
  const { callRemote, notify, intl } = api;
  const [snapshots, setSnapshots] = useState([]);
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState(0);
  const [takingSnapshot, setTakingSnapShot] = useState(false);

  const getSnapshots = async () => {
    try {
      const { snapshots } = await callRemote({
        type: 'org.umi.plugin.umi-regression-test.getSnapshots'
      });
      setSnapshots(snapshots);
    } catch (e) {
      notify({
        title: '获取快照列表出错',
        message: ``,
        type: 'error'
      });
    }
  };

  useEffect(() => {
    getSnapshots();
  }, []);

  const addSnapshot = (snapshot: Snapshot) => {
    setSnapshots(snapshots.concat(snapshot));
  };

  const takeSnapshot = async () => {
    try {
      setTakingSnapShot(true);
      const { snapshot } = await callRemote({
        type: 'org.umi.plugin.umi-regression-test.takeSnapshot'
      });
      addSnapshot(snapshot);
      notify({
        title: '拍照成功',
        message: ``,
        type: 'success'
      });
    } catch (e) {
      notify({
        title: '拍照失败',
        message: `请确保已启动开发服务器`,
        type: 'error'
      });
    } finally {
      setTakingSnapShot(false);
    }
  };

  return (
    <div className={styles.container}>
      <SideBar
        snapshots={snapshots}
        takeSnapshot={takeSnapshot}
        takingSnapshot={takingSnapshot}
        activeSnapshotIndex={activeSnapshotIndex}
        setActiveSnapshotIndex={setActiveSnapshotIndex}
      />

      <div className={styles.content}></div>
    </div>
  );
};

export default Welcome;
