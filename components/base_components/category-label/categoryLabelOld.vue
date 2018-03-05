/**
* Created by lai on 2017/12/19
*
*
* styleRules:{
*    size: "px"|| "rem",
*    themeColor: "gold" || "gray-6" || "gray-12"
*    margin: ""
*    text-align: "left" || "center" || "right"
* }
*/

<template>
  <div
    class="category-label-box"
    :class="[`category-label-box-${size}`, `category-label-${themeColor}`]"
  >
    <div class="category-scale-box">
      <div
        v-for="(string, i) in renderValue"
        class="category-label "
        :key="i"
        :class="[`category-label-${size}`, `category-label-${themeColor}`]"
      >
        {{string}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    props: {
      value: {
        type: [String, Array],
      },
      styleRules: {
        type: [Object, String, Array, Function]
      }
    },
    components: {},
    data: function (){
      let size = this.$lodash.get(this.styleRules,'size') || "rem"
      let themeColor = this.$lodash.get(this.styleRules,'themeColor')|| "gold"
      return {
        size: size,
        themeColor: themeColor,
      };
    },
    created: function (){
    },
    mounted: function (){
      this.$nextTick(function (){
      });
    },
    filters: {},
    watch: {
      styleRules(val){
        this.analyseStyleRules(val)
      }
    },
    computed: {
      renderValue(){
        if ( !this.value ) {
          return []
        }
        if ( typeof this.value === "string" ) {
          return [this.value]
        } else if ( Array.isArray(this.value) ) {
          return this.value
        }
      },
    },
    methods: {
      analyseStyleRules(val){
        this.size = val.size || this.size
        this.themeColor = val.themeColor || this.themeColor
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  $scale-ratio: 0.5;

  .category-label-box {
    position: relative;
    &.category-label-box-px {
      display: block;
      min-height: 14px;
      min-width: 44px;
    }
    &.category-label-box-rem {
      /*padding: 2px 12px;*/
      min-height: px2rem(16);
      min-width: px2rem(46);
    }
  }

  .category-scale-box{
    position: absolute;
    transform: scale($scale-ratio + 0.02) translate3d(-46%, -50%, 0); //0.02是为了解决在app里字体虚化的问题
    -webkit-transform: scale($scale-ratio + 0.02)translate3d(-46%, -50%, 0);
    white-space: nowrap; //不换行，用于撑起宽度
  }
  .category-label {
    display: inline-block;
    position: relative;
    line-height: normal;
    border-radius: 60px;
    &:not(:last-child){
      margin-right: 4px/$scale-ratio;
    }
    &.category-label-px {
      padding: 0px/$scale-ratio 6px/$scale-ratio;
      font-size: 10px/$scale-ratio;
    }
    &.category-label-rem {
      padding: px2rem(0/$scale-ratio) px2rem(6/$scale-ratio);
      font-size: px2rem(10/$scale-ratio);
    }
    &.category-label-gold {
      color: $color-3;
      border: 1px solid $color-3;
    }
    &.category-label-gray-6 {
      color: $gray-6;
      border: 1px solid $gray-6;
    }
    &.category-label-gray-12 {
      color: #636363;
      border: 1px solid #6b6b6b;
    }
  }


</style>