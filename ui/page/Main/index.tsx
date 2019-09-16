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
  const { callRemote, intl } = api;

  const takeSnapshot = async () => {
    const result = await callRemote({
      type: 'org.umi.plugin.umi-regression-test.takeSnapshot'
      // payload: {},
      // onProgress: async data => {
      //   // useState(data);
      // }
    });
    alert(JSON.stringify(result));
  };

  return (
    <div className={styles.container}>
      <SideBar snapshots={snapshots} takeSnapshot={takeSnapshot} />

      <div className={styles.content}></div>
    </div>
  );
};

export default Welcome;
