import PluginPanel from './component';

export default api => {
  return {
    title: '回归测试',
    path: '/umi-regression-test',
    icon: 'rest',
    component: <PluginPanel api={api} />
  };
};
