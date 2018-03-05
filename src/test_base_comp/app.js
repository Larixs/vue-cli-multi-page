/**
 * Created by lai on 2017/11/1.
 */

import Vue from 'vue';
import app from './app.vue';
import "components/injectAllPlugins"
import vconsole from "vconsole"

new vconsole()


new Vue({
  el: '#app',
  render: h => h(app),
});
