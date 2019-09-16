import React from 'react';
import { IUiApi } from 'umi-types';
import zh from './locale/zh-CN.json';
import en from './locale/en-US.json';
import Main from './page/Main';

export default (api: IUiApi) => {
  const { addPanel, addLocales } = api;

  addLocales({ 'zh-CN': zh, 'en-US': en });

  addPanel({
    title: '视觉感知测试', // TODO: 国际化
    path: '/umi-regression-test',
    icon: 'rest',
    component: () => <Main api={api} />
  });
};
