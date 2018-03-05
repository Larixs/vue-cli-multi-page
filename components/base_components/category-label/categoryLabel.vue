/**
* Created by lai on 2017/12/21.
*
* styleRules:{
*    size: "px" || "rem",
*    themeColor: "gold" || "gray-6" || "gray-12",
*    margin: "",
*    align: "left" || "center" || "right",
* }
*/

<template>
  <div
    class="category-label-box"
    v-if="renderValue.length"
    :class="[`category-label-box-${style.size}`, `category-label-${style.themeColor}`, `category-label-${style.align}`]"
  >
    <div
      v-for="(string, i) in renderValue"
      class="category-label"
      :key="i"
      :class="[`category-label-${style.size}`, `category-label-${style.themeColor}`]"
      :style="{
        margin: style.margin
      }"
    >
      <span
        :class="[`category-label-${system}`]"
      >{{string}}</span>
    </div>
  </div>
</template>
<script>
  import * as utils from "components/utils"

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
      const system = utils.isIos() ? "ios" : "android"
      return {
        style: {},
        system: system,
      };
    },
    created: function (){
    },
    mounted: function (){
      this.$nextTick(function (){
        this.analyseStyleRules(this.styleRules)
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
      analyseStyleRules(styleRules){
        this.style = utils.analyseStyleRules(styleRules,{
          size: "rem",
          themeColor: "gold",
          margin: "0 4px 0 0",
          align: "left"
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .category-label-box {
    position: relative;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    &.category-label-box-rem {

    }
    &.category-label-left {

    }
    &.category-label-right {
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
    }
    &.category-label-center {
      justify-content: center;
      -webkit-justify-content: center;
    }

  }

  .category-label {
    position: relative;
    span {
      display: table-cell;
      /*height: calc( 0.5rem + 2px);*/
      line-height: normal;
      vertical-align: middle;
    }
    &.category-label-px {
      span {
        padding: 1px 6px 0 6px;
      }
      font-size: 10px;
    }
    &.category-label-rem {
      span.category-label-android {
        padding: 1px px2rem(6);
      }
      span.category-label-ios {
        padding: 0 px2rem(6);
      }
      font-size: px2rem(10);
    }
    &.category-label-gold {
      color: $color-3;
      @include border-radius-1px-color(1px, 40px, $color-3);
    }
    &.category-label-gray-6 {
      color: $gray-6;
      @include border-radius-1px-color(1px, 40px, $gray-6);
    }
    &.category-label-gray-12 {
      color: #636363;
      @include border-radius-1px-color(1px, 40px, #6b6b6b);
    }
  }


</style>