import React from 'react';
import ReactDOM from 'react-dom';
import { IUiApi } from 'umi-types';
import { Button, Steps } from 'antd';
import SideBar from './component/SideBar';
import styles from './index.module.less';

interface IProps {
  api: IUiApi;
}
const { useState } = React;

const Welcome: React.FC<IProps> = ({ api }) => {
  const [snapshots, setSnapshots] = useState([]);
  const { callRemote, notify, intl } = api;

  const takeSnapshot = async () => {
    try {
      await callRemote({
        type: 'org.umi.plugin.umi-regression-test.takeSnapshot'
      });
      notify({
        title: '拍照成功',
        message: '',
        type: 'success'
      });
    } catch (e) {
      notify({
        title: '拍照失败',
        message: '请确保已启动开发服务器',
        type: 'error'
      });
    }
  };

  return (
    <div className={styles.container}>
      <SideBar snapshots={snapshots} takeSnapshot={takeSnapshot} />

      <div className={styles.content}></div>
    </div>
  );
};

export default Welcome;
