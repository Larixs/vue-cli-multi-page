/**
 * Created by lai on 2017/10/26.
 */
import Vue from "vue"
import plugins from "./plugins"
Object.keys(plugins).forEach(key=>{
  "use strict";
  const plugin = plugins[key]
  Vue.use(plugin)
})