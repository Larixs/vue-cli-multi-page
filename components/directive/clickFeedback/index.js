import Vue from "vue";
const clickFeedback = "@@clickFeedback";

/**
 * v-clickFeedback
 * @desc 当元素被按住时触发的事件，默认事件为改变背景色。在每个子项目中，只要在任意位置
 * @example
 * ```vue
 * <div v-clickFeedback>
 * ```
 *
 * ```下面为传入函数作为参数的用法。startHandler、endHandler均为当前组件的methods，其接收到的参数为(event,el),event是原生事件,el是绑定了指令的元素
 *
 * <div v-clickFeedback="{start:'startHandler',end:'endHandler'}">
 * ```
 */

Vue.directive("clickFeedback", {
  bind: function(el, binding, vnode) {
    function passEleToVnodeFunc(methodName) {
      //将el传递给vnode.context里的方法，并且返回一个闭包
      if (
        binding.value &&
        methodName &&
        vnode.context[binding.value[methodName]]
      ) {
        return function(event) {
          vnode.context[binding.value[methodName]](event, el);
        };
      } else {
        return null;
      }
    }
    const oldTransition = el.style.transition

    let startHandler, endHandler
    if(typeof binding.value === "object"){
      startHandler = passEleToVnodeFunc("start");
      endHandler = passEleToVnodeFunc("end");
    }else if(typeof binding.value === "boolean"){
      //如果binding.value为false，则不触发点击反馈
      if(!binding.value){
        return
      }
    }
    let isInIndex = window.location.href.includes("licai/index")

    const defaultStartHandler = function() {
      el.style.backgroundColor = "#E7E7E7";
      // el.style.transition = "background 0.3s"
    };
    const defaultEndHandler = function() {
      // if(isInIndex){
        console.log("touchend")
      // }
      el.style.backgroundColor = "#fff";
      // el.style.transition = oldTransition
    };
    const defaultCancelHandler = function() {
      // if(isInIndex){
        console.log("touchcancel")
      //}
      el.style.backgroundColor = "#fff";
      // el.style.transition = oldTransition
    };

    el[clickFeedback] = {
      documentStartHandler: startHandler || defaultStartHandler,
      documentEndHandler: endHandler || defaultEndHandler,
      documentCancelHandler: endHandler || defaultCancelHandler 
    };
    el.addEventListener(
      "touchstart",
      el[clickFeedback].documentStartHandler,
      false
    );
    el.addEventListener(
      "touchend",
      el[clickFeedback].documentEndHandler,
      false
    );
    el.addEventListener(
      "touchcancel",
      el[clickFeedback].documentCancelHandler,
      false
    );
  },
  unbind: function(el) {
    if(el[clickFeedback]){
      el.removeEventListener(
        "touchstart",
        el[clickFeedback].documentStartHandler
      );
      el.removeEventListener(
        "touchend",
        el[clickFeedback].documentEndHandler
      );
      el.removeEventListener(
        "touchcancel",
        el[clickFeedback].documentEndHandler
      );
    }

  }
});
