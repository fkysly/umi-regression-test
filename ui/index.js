import route from './route';

export default api => {
  const { addPanel } = api;

  addPanel(route(api));
};
