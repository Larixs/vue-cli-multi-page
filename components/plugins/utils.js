/**
 * Created by lai on 2017/11/14.
 */
import * as utils from "components/utils"

export default {
  install: function (Vue){
    Object.defineProperty(Vue.prototype, '$$utils', { value: utils })
  }
}