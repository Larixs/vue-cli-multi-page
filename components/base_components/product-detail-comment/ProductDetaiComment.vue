<template>
  <div class="product-detail-comment" :style="styleObj">{{value}}</div>
</template>
<script>
  export default{
    props: {
      value: String,
      styleObj: Object
    },
    name: "ProductDetailComment"
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .product-detail-comment {
    overflow: hidden;
    line-height: calc(0.6rem + 1px); //$font-7: 0.6rem
    padding-bottom: px2rem(18);
    text-align: center;
    color: #505050;
    font-size: $font-7;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>