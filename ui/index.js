import { Button } from 'antd';

export default api => {
  const { callRemote } = api;

  function PluginPanel() {
    return (
      <div style={{ padding: 20 }}>
        <Button
          type="primary"
          onClick={async () => {
            const { data } = await callRemote({
              type: 'org.Tianyi Ma.umi-regression-test.test'
            });
            alert(data);
          }}
        >
          Testaaaa333
        </Button>
      </div>
    );
  }

  api.addPanel({
    title: 'umi-regression-test',
    path: '/umi-regression-test',
    icon: 'home',
    component: PluginPanel
  });
};
