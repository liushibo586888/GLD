(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{1674:function(t,e,n){"use strict";n.r(e);var o=n("ba80"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},6357:function(t,e,n){},"718b":function(t,e,n){"use strict";var o=n("6357"),r=n.n(o);r.a},b064:function(t,e,n){"use strict";(function(t){n("8063");var e=i(n("66fd")),o=i(n("ba85")),r=i(n("67cf"));function i(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.config.productionTip=!1,o.default.mpType="app";var f=new e.default(u({store:r.default},o.default));t(f).$mount()}).call(this,n("543d")["createApp"])},ba80:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{windowWidth:0,windowHeight:0}},onLaunch:function(){var e=t.getUpdateManager();e.onCheckForUpdate((function(t){})),e.onUpdateReady((function(){t.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){}))},onShow:function(){this.getSystemInfo()},onLoad:function(){this.getSystemInfo()},onHide:function(){console.log("App Hide")},methods:{getSystemInfo:function(){var e=this;t.getSystemInfo({success:function(t){e.windowWidth=t.windowWidth,e.windowHeight=t.windowHeight}})}}};e.default=n}).call(this,n("543d")["default"])},ba85:function(t,e,n){"use strict";n.r(e);var o=n("1674");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("718b");var i,c,u,a,f=n("f0c5"),d=Object(f["a"])(o["default"],i,c,!1,null,null,null,!1,u,a);e["default"]=d.exports}},[["b064","common/runtime","common/vendor"]]]);