/**
 * Created by lai on 2017/11/14.
 */
import request from "components/request"

export default {
  install: function (Vue){
    Object.defineProperty(Vue.prototype, '$$request', { value: request })
  }
}