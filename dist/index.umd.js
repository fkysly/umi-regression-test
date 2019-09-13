(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['umi-regression-test'] = factory());
}(this, function () { 'use strict';

  var route = {
    title: '回归测试',
    path: '/umi-regression-test',
    icon: 'rest',
    component: PluginPanel
  };

  var index = (function (api) {
    var callRemote = api.callRemote,
        addPanel = api.addPanel;
    addPanel(route);
  });

  return index;

}));
