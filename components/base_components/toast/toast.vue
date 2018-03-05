<template>
  <transition name="fade">
    <div class="toast" v-show="visible" ref="toastContainer">
      <p>{{message}}</p>
    </div>
  </transition>
</template>
<script>
export default {
  data: function () {
    return {
      visible: false,
      message: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~static/css/variables_m";

.toast {
  padding: 0 24px;
  top: calc(50% - 22px);
  width: calc(100% - 48px);
  text-align: center;
  z-index: 99999;
  position: fixed;
  p {
    border-radius: 5px;
    line-height: 20px;
    font-size: $font-5;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.8);
    color: $gray-1;
    display: inline-block;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>

