/**
 * Created by lai on 2017/11/15
 */
import Vue from "vue"
import allPlugins from "./plugins/index"

//伪按需引入
//真正的按需引入 import().then() 会导致code splitting. 因为目前还没有办法控制生成的chunk.js的位置，所以整个项目目前不可以用按需引入这种方式。
export default function (){
  let plugins = []
  if ( arguments.length === 1 && Array.isArray(arguments[0]) ) {
    plugins = arguments[0]
  } else if ( arguments.length >= 1 ) {
    plugins = Array.from(arguments)
  }
  plugins.forEach((name)=>{
      Vue.use(allPlugins[name])
  })
}
