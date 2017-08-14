<template>
  <button class="rounded-btn" :disabled="disabled" @click="click">
    <img v-show="loading" class="loading" src="~static/img/base/button_loading_white.svg">
    <div v-show="!loading">
      <slot></slot>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    disabled: null,
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click: function () {
      if (!this.loading) {
        this.$emit('click')
      }
    }
  }
}
</script>
<style lang="less" scoped>

.rounded-btn {
  border-style: none;
  background-color: @color-9;
  font-size: 18px;
  color: white;
  width: calc(~'100% - 48px');
  height: 44px;
  margin: 6px auto;
  border-radius: 22px;
  display: block;
  line-height: 44px;
  .loading {
    margin-top: calc(~'9px');
    width: 26px;
    height: 26px;
    opacity: 0.9;
  }
  &[disabled] {
    background-color: @gray-5;
  }
}
</style>


