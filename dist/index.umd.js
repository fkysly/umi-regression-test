(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('antd')) :
  typeof define === 'function' && define.amd ? define(['react', 'antd'], factory) :
  (global = global || self, global['umi-regression-test'] = factory(global.React, global.antd));
}(this, function (React, antd) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var zh = {
  	"urt.title": "回归测试",
  	"urt.welcome.title": "请点击生成按钮，进行初始化",
  	"urt.welcome.button.init": "初始化",
  	"urt.welcome.button.genarate": "生成"
  };

  var en = {
  	"urt.title": "regression test",
  	"urt.welcome.title": "welcome to Umi Regression Test",
  	"urt.welcome.button.init": "init",
  	"urt.welcome.button.genarate": "genarate"
  };

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".index-module_sidebar__1WQXU {\n  width: 240px;\n  border-right: 1px solid #ffffff;\n  height: 100%;\n}\n.index-module_sidebar__1WQXU .index-module_toolbar__1r2Mj {\n  width: 100%;\n  height: 32px;\n  border-bottom: 1px solid #ffffff;\n}\n";
  var styles = {"sidebar":"index-module_sidebar__1WQXU","toolbar":"index-module_toolbar__1r2Mj"};
  styleInject(css);

  var SideBar = function SideBar(props) {
    var _props$snapshots = props.snapshots,
        snapshots = _props$snapshots === void 0 ? [] : _props$snapshots,
        takeSnapshot = props.takeSnapshot;
    return React.createElement("div", {
      className: styles.sidebar
    }, React.createElement("div", {
      className: styles.toolbar
    }, React.createElement(antd.Button, {
      type: "primary",
      size: "small",
      onClick: takeSnapshot
    }, "\u62CD\u5FEB\u7167")), React.createElement("div", {
      className: styles.profiles
    }, React.createElement("p", {
      className: styles.profilesTitle
    }, "\u5FEB\u7167\u5217\u8868"), snapshots.map(function (snapshot) {
      return React.createElement("p", null, snapshot.name);
    })));
  };

  var css$1 = ".index-module_container__1VfGi {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.index-module_container__1VfGi .index-module_content__1zQKD {\n  height: 100%;\n}\n";
  var styles$1 = {"container":"index-module_container__1VfGi","content":"index-module_content__1zQKD"};
  styleInject(css$1);

  var useState = React.useState;

  var Welcome = function Welcome(_ref) {
    var api = _ref.api;

    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        snapshots = _useState2[0],
        setSnapshots = _useState2[1];

    var callRemote = api.callRemote,
        intl = api.intl;

    var takeSnapshot =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.takeSnapshot' // payload: {},
                  // onProgress: async data => {
                  //   // useState(data);
                  // }

                });

              case 2:
                result = _context.sent;
                alert(JSON.stringify(result));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function takeSnapshot() {
        return _ref2.apply(this, arguments);
      };
    }();

    return React.createElement("div", {
      className: styles$1.container
    }, React.createElement(SideBar, {
      snapshots: snapshots,
      takeSnapshot: takeSnapshot
    }), React.createElement("div", {
      className: styles$1.content
    }));
  };

  var index = (function (api) {
    var addPanel = api.addPanel,
        addLocales = api.addLocales;
    addLocales({
      'zh-CN': zh,
      'en-US': en
    });
    addPanel({
      title: '回归测试',
      path: '/umi-regression-test',
      icon: 'rest',
      component: function component() {
        return React.createElement(Welcome, {
          api: api
        });
      }
    });
  });

  return index;

}));
