(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('antd')) :
  typeof define === 'function' && define.amd ? define(['react', 'antd'], factory) :
  (global = global || self, global['umi-regression-test'] = factory(global.React, global.antd));
}(this, function (React, antd) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _classnames_2_2_6_classnames = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  /* global define */

  (function () {

  	var hasOwn = {}.hasOwnProperty;

  	function classNames () {
  		var classes = [];

  		for (var i = 0; i < arguments.length; i++) {
  			var arg = arguments[i];
  			if (!arg) continue;

  			var argType = typeof arg;

  			if (argType === 'string' || argType === 'number') {
  				classes.push(arg);
  			} else if (Array.isArray(arg) && arg.length) {
  				var inner = classNames.apply(null, arg);
  				if (inner) {
  					classes.push(inner);
  				}
  			} else if (argType === 'object') {
  				for (var key in arg) {
  					if (hasOwn.call(arg, key) && arg[key]) {
  						classes.push(key);
  					}
  				}
  			}
  		}

  		return classes.join(' ');
  	}

  	if (module.exports) {
  		classNames.default = classNames;
  		module.exports = classNames;
  	} else {
  		window.classNames = classNames;
  	}
  }());
  });

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

  var css = ".index-module_sidebar__1WQXU {\n  width: 240px;\n  border-right: 1px solid #ffffff;\n  height: 100%;\n}\n.index-module_sidebar__1WQXU .index-module_toolbar__1r2Mj {\n  width: 100%;\n  border-bottom: 1px solid #ffffff;\n  padding: 8px;\n}\n.index-module_sidebar__1WQXU .index-module_profilesTitle__3BATW {\n  padding: 8px;\n  font-size: 16px;\n  font-weight: bold;\n}\n.index-module_sidebar__1WQXU .index-module_profilesItem__2oS7e {\n  margin-top: 4px;\n  padding: 2px 8px;\n  cursor: pointer;\n}\n.index-module_sidebar__1WQXU .index-module_profilesItem__2oS7e:first-child {\n  margin-top: 0;\n}\n.index-module_sidebar__1WQXU .index-module_profilesActiveItem__7LQUf {\n  background-color: darkslategrey;\n}\n";
  var styles = {"sidebar":"index-module_sidebar__1WQXU","toolbar":"index-module_toolbar__1r2Mj","profilesTitle":"index-module_profilesTitle__3BATW","profilesItem":"index-module_profilesItem__2oS7e","profilesActiveItem":"index-module_profilesActiveItem__7LQUf"};
  styleInject(css);

  var SideBar = function SideBar(props) {
    var _props$snapshots = props.snapshots,
        snapshots = _props$snapshots === void 0 ? [] : _props$snapshots,
        takeSnapshot = props.takeSnapshot,
        _props$takingSnapshot = props.takingSnapshot,
        takingSnapshot = _props$takingSnapshot === void 0 ? false : _props$takingSnapshot,
        activeSnapshotIndex = props.activeSnapshotIndex,
        setActiveSnapshotIndex = props.setActiveSnapshotIndex;
    var activeSnapshot = snapshots[activeSnapshotIndex];
    return React__default.createElement("div", {
      className: styles.sidebar
    }, React__default.createElement("div", {
      className: styles.toolbar
    }, React__default.createElement(antd.Button, {
      type: "primary",
      size: "small",
      onClick: takeSnapshot,
      loading: takingSnapshot
    }, "\u62CD\u7167")), React__default.createElement("div", {
      className: styles.profiles
    }, React__default.createElement("p", {
      className: styles.profilesTitle
    }, "\u5FEB\u7167\u5217\u8868"), snapshots.map(function (snapshot, index) {
      var isActive = activeSnapshot && snapshot.id === activeSnapshot.id;
      var obj = {};
      obj[styles.profilesActiveItem] = isActive;
      return React__default.createElement("div", {
        className: _classnames_2_2_6_classnames([styles.profilesItem, obj]),
        key: snapshot.id,
        onClick: function onClick() {
          return setActiveSnapshotIndex(index);
        }
      }, React__default.createElement("p", null, "\u5FEB\u7167 ", snapshot.id));
    })));
  };

  var css$1 = ".index-module_container__1VfGi {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.index-module_container__1VfGi .index-module_content__1zQKD {\n  height: 100%;\n}\n";
  var styles$1 = {"container":"index-module_container__1VfGi","content":"index-module_content__1zQKD"};
  styleInject(css$1);

  var useState = React__default.useState;

  var Welcome = function Welcome(_ref) {
    var api = _ref.api;
    var callRemote = api.callRemote,
        notify = api.notify,
        intl = api.intl;

    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        snapshots = _useState2[0],
        setSnapshots = _useState2[1];

    var _useState3 = useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        activeSnapshotIndex = _useState4[0],
        setActiveSnapshotIndex = _useState4[1];

    var _useState5 = useState(false),
        _useState6 = _slicedToArray(_useState5, 2),
        takingSnapshot = _useState6[0],
        setTakingSnapShot = _useState6[1];

    var getSnapshots =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref3, _snapshots;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.getSnapshots'
                });

              case 3:
                _ref3 = _context.sent;
                _snapshots = _ref3.snapshots;
                setSnapshots(_snapshots);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                notify({
                  title: '获取快照列表出错',
                  message: "",
                  type: 'error'
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      return function getSnapshots() {
        return _ref2.apply(this, arguments);
      };
    }();

    React.useEffect(function () {
      getSnapshots();
    }, []);

    var addSnapshot = function addSnapshot(snapshot) {
      setSnapshots(snapshots.concat(snapshot));
    };

    var takeSnapshot =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref5, snapshot;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                setTakingSnapShot(true);
                _context2.next = 4;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.takeSnapshot'
                });

              case 4:
                _ref5 = _context2.sent;
                snapshot = _ref5.snapshot;
                addSnapshot(snapshot);
                notify({
                  title: '拍照成功',
                  message: "",
                  type: 'success'
                });
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                notify({
                  title: '拍照失败',
                  message: "\u8BF7\u786E\u4FDD\u5DF2\u542F\u52A8\u5F00\u53D1\u670D\u52A1\u5668",
                  type: 'error'
                });

              case 13:
                _context2.prev = 13;
                setTakingSnapShot(false);
                return _context2.finish(13);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10, 13, 16]]);
      }));

      return function takeSnapshot() {
        return _ref4.apply(this, arguments);
      };
    }();

    return React__default.createElement("div", {
      className: styles$1.container
    }, React__default.createElement(SideBar, {
      snapshots: snapshots,
      takeSnapshot: takeSnapshot,
      takingSnapshot: takingSnapshot,
      activeSnapshotIndex: activeSnapshotIndex,
      setActiveSnapshotIndex: setActiveSnapshotIndex
    }), React__default.createElement("div", {
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
        return React__default.createElement(Welcome, {
          api: api
        });
      }
    });
  });

  return index;

}));
