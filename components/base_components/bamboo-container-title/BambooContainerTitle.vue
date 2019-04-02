/**
* Created by lai on 2017/12/14.
* 作为bamboo-container的默认title。也可以单独使用。
*

props:

* value      [Object, String]     数据类型为Object时，详情见props里的value的default。
*                                 数据类型为String时，转化为{ title: value }进行处理。

*/
<template>
  <h3
    class="bamboo-container-default-topic-box"
    v-if="stress || formattedValue.title || formattedValue.url || formattedValue.subTitle"
  >
    <span v-if="stress" class="bamboo-container-theme-stress"></span>
    <div
      class="bamboo-container-default-topic"
      @click="clickHandler"
      v-clickFeedback="!!formattedValue.url"
    >
      <span
        v-if="!!formattedValue.title"
        class="bamboo-container-title"
      >
      {{formattedValue.title}}
      </span>
      <div class="bamboo-container-sub-box clearfix">
          <span
            v-if="!!formattedValue.subTitle"
            class="bamboo-container-sub-title">
            {{formattedValue.subTitle}}
          </span>
        <span
          v-if="!!formattedValue.url"
          class="ui-right-arrow"
        ></span>
      </div>
    </div>
  </h3>
</template>

<script>
  import * as utils from "components/utils"

  export default {
    props: {
      value: {
        type: [Object, String],
        default: () => ({
          title: '',          //标题
          subTitle: '',       //副标题，在跳转图标前面
          url: '',            //跳转链接
          clickHandler: '',   //默认跳转函数
        })
      },
      stress: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      formattedValue(){
        if ( typeof this.value === "string" ) {
          return {
            title: this.value
          }
        } else {
          return this.value ? this.value : {}
        }
      }
    },
    methods: {
      clickHandler: function (){
        if ( this.$lodash.isFunction(this.formattedValue.clickHandler) ) {
          this.formattedValue.clickHandler(this.value)
        } else { //默认的点击函数是跳转
          this.$$utils.jump(this.formattedValue.url)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .bamboo-container-default-topic-box {
    position: relative;
    .bamboo-container-theme-stress {
      display: inline-block;
      z-index: 2;
      position: absolute;
      left: 0;
      top: 50%;
      width: px2rem(4);
      height: px2rem(8);
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      background-color: $gray-9;
    }
  }

  .bamboo-container-default-topic {
    position: relative;
    overflow: hidden;
    padding: px2rem(12);
    background-color: #fff;
    @include border-bottom-1px(1px, 0, 0, 0);

    .bamboo-container-title {
      font-size: $font-5;
      color: $gray-9;
      @include font-medium();
    }
    .bamboo-container-sub-box {
      float: right;
      overflow: hidden;
      max-width: 70%;
    }
    .bamboo-container-sub-title {
      color: #c7c7cc;
      font-size: $font-5;
      @include one-text-ellipsis()
    }

    .ui-right-arrow {
      display: inline-block;
      position: relative;
      top: 2px;
      margin-left: 6px;
      width: 7px;
      height: px2rem(12);
      background-image: url("~static/img/base_components/bamboo-container/right_arrow_gray.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>