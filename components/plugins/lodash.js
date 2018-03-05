/**
 * Created by lai on 2017/10/25.
 */
import lodash from "lodash"

export default {
  install: function (Vue){
    Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
  }
}