import { Button } from 'antd';

export default api => {
  const { callRemote } = api;
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
        生成
      </Button>
    </div>
  );
};
