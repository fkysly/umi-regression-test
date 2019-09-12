
export default [
  {
    cjs: 'babel',
  },
  {
    entry: 'ui/index.js',
    umd: {
      name: 'umi-regression-test',
      minFile: false,
    },
  },

];
