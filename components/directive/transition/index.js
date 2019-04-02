/* 
  example:<div v-transition:transitionObj:transitionKey="transitionClass"></div>

    transitionObj为一个存在data里的obj,可选项
    transitionKey为动态存入transitionObj中的key，与transitionObj至少选一项
    transitionClass为需要添加的class名称,必填

  使用方法: 
    在需要过渡的时候将[transitionObj]中相对应的[transitionKey]设置为true

  transitionKey省略时,取transitionClass为transitionKey,

*/

import Vue from "vue"

(function () {
  const argHandler = ({ value, arg }) => {
    const _arg = (arg || '').split(':')
    let _obj, _key, _transitionClass
    if (_arg.length === 0) {
      _obj = _key = _transitionClass = value
    } else if (_arg.length === 1) {
      _obj = _arg[0]
      _key = _transitionClass = value
    } else if (_arg.length === 2) {
      _obj = _arg[0]
      _key = _arg[1]
      _transitionClass = value
    }
    return {
      _obj, _key, _transitionClass
    }
  }

  Vue.directive("transition", {
    bind: function (el, binding, vnode) {
      const { value, arg } = binding
      const { context } = vnode
      const { _obj, _key, _transitionClass } = argHandler({ value, arg })

      context.$set(context[_obj], _key, false)
    },
    update: async function (el, binding, vnode) {
      const { value, arg } = binding
      const { context } = vnode
      const { _obj, _key, _transitionClass } = argHandler({ value, arg })

      if (context[_obj][_key]) {

        let isStartAnimationflag = false        

        const removeListenerHandler = () => {
          el.removeEventListener('animationstart', animationStartHandler)
          el.removeEventListener('transitionstart', animationStartHandler)
          el.removeEventListener('animationend', animationEndHandler)
          el.removeEventListener('transitionend', animationEndHandler)
        }

        const animationStartHandler = () => {
          isStartAnimationflag = true
        }

        const animationEndHandler = () => {
          el.classList.remove(_transitionClass)
          context.$set(context[_obj], _key, false)
          removeListenerHandler()
        }


        el.addEventListener('animationstart', animationStartHandler, false)
        el.addEventListener('transitionstart', animationStartHandler, false)

        el.addEventListener('animationend', animationEndHandler, false)
        el.addEventListener('transitionend', animationEndHandler, false)

        el.classList.add(_transitionClass)

        setTimeout(() => {
          if (!isStartAnimationflag) {
            el.classList.remove(_transitionClass)
            context.$set(context[_obj], _key, false)
            removeListenerHandler()
          }
        }, 100);

      }
    },
  })
})()