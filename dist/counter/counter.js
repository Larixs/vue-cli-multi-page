!function(e){function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/static/",t(t.s=6)}([function(e,t,n){e.exports=n(2)(10)},function(e,t,n){e.exports=n(2)(11)},function(e,t){e.exports=common_library},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),o=r(c),u=n(1),i=r(u);o.default.use(i.default);var s={count:0},f={increment:function(e){e.count++},decrement:function(e){e.count--}},d={increment:function(e){return(0,e.commit)("increment")},decrement:function(e){return(0,e.commit)("decrement")},incrementIfOdd:function(e){var t=e.commit;(e.state.count+1)%2==0&&t("increment")},incrementAsync:function(e){var t=e.commit;return new Promise(function(e,n){setTimeout(function(){t("increment"),e()},1e3)})}},a={evenOrOdd:function(e){return e.count%2==0?"even":"odd"}};t.default=new i.default.Store({state:s,getters:a,actions:d,mutations:f})},function(e,t,n){var r=n(7)(n(5),n(8),null,null);e.exports=r.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);t.default={computed:(0,r.mapGetters)(["evenOrOdd"]),methods:(0,r.mapActions)(["increment","decrement","incrementIfOdd","incrementAsync"])}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var c=n(0),o=r(c),u=n(4),i=r(u),s=n(3),f=r(s);new o.default({el:"#app",store:f.default,render:function(e){return e(i.default)}})},function(e,t){e.exports=function(e,t,n,r){var c,o=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(c=e,o=e.default);var i="function"==typeof o?o.options:o;if(t&&(i.render=t.render,i.staticRenderFns=t.staticRenderFns),n&&(i._scopeId=n),r){var s=Object.create(i.computed||null);Object.keys(r).forEach(function(e){var t=r[e];s[e]=function(){return t}}),i.computed=s}return{esModule:c,exports:o,options:i}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._v("\n    Clicked: "+e._s(e.$store.state.count)+" times, count is "+e._s(e.evenOrOdd)+".\n    "),n("button",{on:{click:e.increment}},[e._v("+")]),e._v(" "),n("button",{on:{click:e.decrement}},[e._v("-")]),e._v(" "),n("button",{on:{click:e.incrementIfOdd}},[e._v("Increment if odd")]),e._v(" "),n("button",{on:{click:e.incrementAsync}},[e._v("Increment async")])])},staticRenderFns:[]}}]);