(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global['umi-regression-test'] = factory(global.React));
}(this, function (React) { 'use strict';

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
    return React.createElement("div", {
      className: styles.sidebar
    }, React.createElement("div", {
      className: styles.toolbar
    }), React.createElement("div", {
      className: styles.profiles
    }, React.createElement("p", {
      className: styles.profilesTitle
    }, "\u5FEB\u7167\u5217\u8868")));
  };

  var css$1 = ".index-module_container__1VfGi {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.index-module_container__1VfGi .index-module_content__1zQKD {\n  height: 100%;\n}\n";
  var styles$1 = {"container":"index-module_container__1VfGi","content":"index-module_content__1zQKD"};
  styleInject(css$1);

  var useState = React.useState;

  var Welcome = function Welcome(_ref) {
    var api = _ref.api;
    var callRemote = api.callRemote,
        intl = api.intl;
    return React.createElement("div", {
      className: styles$1.container
    }, React.createElement(SideBar, null), React.createElement("div", {
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
