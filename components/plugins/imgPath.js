/**
 * Created by lai on 2017/10/26.
 */
export default {
  install: function (Vue){
    Object.defineProperty(Vue.prototype, '$imgPath', { value: imgPath })
  }
}