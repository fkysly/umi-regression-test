export default [
  {
    cjs: 'babel'
  },
  {
    entry: 'ui/index.tsx',
    umd: {
      name: 'umi-regression-test',
      minFile: false
    },
    typescriptOpts: {
      check: false
    }
  }
];
