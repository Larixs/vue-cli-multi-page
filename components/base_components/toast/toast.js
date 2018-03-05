import Vue from 'vue';
import toast from './toast.vue'

const ToastConstructor = Vue.extend(toast);

let getAnInstance = () => {
  return new ToastConstructor({
    el: document.createElement('div')
  });
};

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function () {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
};

let Toast = (options = {}) => {
  let duration = options.duration || 1500;

  let instance = getAnInstance();
  clearTimeout(instance.timer);
  instance.message = typeof options === 'string' ? options : options.message;
  document.body.appendChild(instance.$el);
  Vue.nextTick(function () {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    ~duration && (instance.timer = setTimeout(function () {
      if (instance.closed) return;
      instance.close();
    }, duration));
  });
  return instance;
};


export default Toast;