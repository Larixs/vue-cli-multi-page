<template>
  <div class="product-detail-name" :style="styleObj">
    <img v-if="isHot" class="hot-tag-img" src="~static/img/base/hot_tag.png" alt="">
    {{value || "加载中..."}}
  </div>
</template>
<script>

  export default {
    name: "ProductDetailName",
    props: {
      value: String,
      styleObj: Object,
      isHot: {
        type: Boolean,
        default: false
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
  @import "~static/css/variables_m";

  .product-detail-name {
    position: relative;
    @include font-medium();
    overflow: hidden;
    padding: 18px 0;
    color: #505050;
    font-size: $font-1;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .hot-tag-img {
    position: relative;
    display: inline-block;
    top: 3px;
    left: 0;
    width: 15px;
  }

</style>