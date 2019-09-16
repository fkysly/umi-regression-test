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
        takingSnapshot = props.takingSnapshot,
        activeSnapshotIndex = props.activeSnapshotIndex,
        setActiveSnapshotIndex = props.setActiveSnapshotIndex,
        baseSnapshotId = props.baseSnapshotId,
        diffSnapshot = props.diffSnapshot,
        isDiffing = props.isDiffing;
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
    }, "\u62CD\u7167"), React__default.createElement(antd.Button, {
      style: {
        marginLeft: 8
      },
      type: "default",
      size: "small",
      onClick: function onClick() {
        return diffSnapshot(snapshots[activeSnapshotIndex].id);
      },
      loading: isDiffing
    }, "\u5BF9\u6BD4")), React__default.createElement("div", {
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
      }, React__default.createElement("p", null, "\u5FEB\u7167 ", snapshot.id, baseSnapshotId === snapshot.id ? ' *' : null));
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

    var _useState3 = useState('0'),
        _useState4 = _slicedToArray(_useState3, 2),
        baseSnapshotId = _useState4[0],
        setBaseSnapshotId = _useState4[1];

    var _useState5 = useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        activeSnapshotIndex = _useState6[0],
        setActiveSnapshotIndex = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        takingSnapshot = _useState8[0],
        setTakingSnapShot = _useState8[1];

    var _useState9 = useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        isDiffing = _useState10[0],
        setIsDiffing = _useState10[1];

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

    var getBaseSnapshotId =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref5, _baseSnapshotId;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.getBaseSnapshotId'
                });

              case 3:
                _ref5 = _context2.sent;
                _baseSnapshotId = _ref5.baseSnapshotId;
                setBaseSnapshotId(_baseSnapshotId);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                notify({
                  title: '获取基准快照',
                  message: "",
                  type: 'error'
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      return function getBaseSnapshotId() {
        return _ref4.apply(this, arguments);
      };
    }();

    React.useEffect(function () {
      getBaseSnapshotId();
      getSnapshots();
    }, []);

    var addSnapshot = function addSnapshot(snapshot) {
      setSnapshots(snapshots.concat(snapshot));
    };

    var takeSnapshot =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref7, snapshot;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                setTakingSnapShot(true);
                _context3.next = 4;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.takeSnapshot'
                });

              case 4:
                _ref7 = _context3.sent;
                snapshot = _ref7.snapshot;
                addSnapshot(snapshot);
                notify({
                  title: '拍照成功',
                  message: "\u5DF2\u751F\u6210\u5FEB\u7167".concat(snapshot.id),
                  type: 'success'
                });
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                notify({
                  title: '拍照失败',
                  message: "\u8BF7\u786E\u4FDD\u5DF2\u542F\u52A8\u5F00\u53D1\u670D\u52A1\u5668",
                  type: 'error'
                });

              case 13:
                _context3.prev = 13;
                setTakingSnapShot(false);
                return _context3.finish(13);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10, 13, 16]]);
      }));

      return function takeSnapshot() {
        return _ref6.apply(this, arguments);
      };
    }();

    var diffSnapshot =
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(snapshotId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                setIsDiffing(true);
                _context4.next = 4;
                return callRemote({
                  type: 'org.umi.plugin.umi-regression-test.diffSnapshot',
                  payload: {
                    snapshotId: snapshotId
                  }
                });

              case 4:
                notify({
                  title: '对比成功',
                  message: "\u57FA\u51C6\u5FEB\u7167".concat(baseSnapshotId, " - \u5BF9\u6BD4\u5FEB\u7167").concat(snapshotId),
                  type: 'success'
                });
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                notify({
                  title: '对比失败',
                  message: "",
                  type: 'error'
                });

              case 10:
                _context4.prev = 10;
                setIsDiffing(false);
                return _context4.finish(10);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7, 10, 13]]);
      }));

      return function diffSnapshot(_x) {
        return _ref8.apply(this, arguments);
      };
    }();

    return React__default.createElement("div", {
      className: styles$1.container
    }, React__default.createElement(SideBar, {
      snapshots: snapshots,
      takeSnapshot: takeSnapshot,
      takingSnapshot: takingSnapshot,
      activeSnapshotIndex: activeSnapshotIndex,
      setActiveSnapshotIndex: setActiveSnapshotIndex,
      baseSnapshotId: baseSnapshotId,
      diffSnapshot: diffSnapshot,
      isDiffing: isDiffing
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
      title: '视觉感知测试',
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
