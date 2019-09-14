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
  const { callRemote, intl } = api;

  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}></div>
    </div>
  );
};

export default Welcome;
