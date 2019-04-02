<template>
  <div class="product-detail-hot-label">
    <span>{{value}}</span>
  </div>
</template>
<script>
  export default{
    name: "ProductDetailLabelHot",
    data: function (){
      return {}
    },
    props: {
      value: {
        type: String,
        default: "热门"
      }
    },
    created: function (){

    },
    watch: {},
    computed: {},
    methods: {},

  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  $TrapezoidHeight: 18px;
  $TrapezoidTopWidth: 30px;
  .product-detail-hot-label {
    display: block;
    position: absolute;
    top: ($TrapezoidHeight/2-2);
    left: -($TrapezoidHeight/2-2);
    width: 50px;
    text-align: center;
    transform: rotateZ(-45deg);
    span {
      position: relative;
      z-index: 2;
      top: -2px;
      font-size: 12px;
      color: #fff;
      letter-spacing: 2px;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -20px;
      left: -12px;
      z-index: 1;
      height: 0;
      width: 32px;
      border: $TrapezoidHeight solid transparent;
      border-bottom: $TrapezoidHeight solid #d0a369;
    }
  }
</style>