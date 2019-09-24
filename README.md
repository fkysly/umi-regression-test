# umi-plugin-umi-regression-test

[![NPM version](https://img.shields.io/npm/v/umi-plugin-umi-regression-test.svg?style=flat)](https://npmjs.org/package/umi-plugin-umi-regression-test)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-umi-regression-test.svg?style=flat)](https://npmjs.org/package/umi-plugin-umi-regression-test)

umi regression test

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [['umi-plugin-umi-regression-test', options]]
};
```

## Options

TODO

## Dev

```bash
yarn build --watch
cd example
umi uitest
```

## TODO

- [ ] 默认需要增加参数，才能覆盖基准快照
- [ ] 支持路由缺失
- [ ] 支持参数路由
- [x] 第一次测试，默认所有路由失败

## LICENSE

MIT
