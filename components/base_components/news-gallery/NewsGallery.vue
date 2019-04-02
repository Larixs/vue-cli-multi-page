/**

* props *
* name         type          default                  detail
* value        Object        {}                       文字、图片等信息。形如 { pic, title, label, time, next_url}
* imgShape     String        "square"                 左侧图片的形状。可选项： square、circle、none
* lazy         Boolean       false                    图片是否开启懒加载
* clickHandler Function      默认跳转next_url         点击事件的回调函数
* imgRight     Boolean       false                    图片是否在右侧
* labelType    String        "default"                左下角标签的样式，可选项： "default", "golden"

* props详述
*   value:{
*     pic: "", //图片路径
*     title: "",  //新闻标题
*     label: "", //新闻作者，位于左下角
*     time: "",   //时间，位于右下角
*     next_url: "" //点击之后的跳转链接
*   },
*
*  clickHandler： 点击的回调函数，默认跳转next_url
*
*  imgRight： 是否为图片在右边的布局。（图片默认在左侧）
*
*  labelType： 所有取值:"default","golden". default的样式，默认为灰色不带边框。如果是golden，则为金色字并且带圆角边框的样式。
*

* slots *
* 在imgRight为false时的布局：
* name         usage
* left         左半部
* title        右半部上测
* label        右半部左下侧
* time         右半部右下侧

*/

<template>
  <div class="news-gallery" v-clickFeedback @click.stop.prevent="clickHandler(value)">
    <div class="left"
         :style="{float: imgRight? 'right': '',marginRight:imgRight? '0px': '12px',marginLeft:imgRight? '12px': '0px'}">
      <slot name="leftPart">

      </slot>
      <slot name="left">
        <img
          v-if="lazy" class="defaultImg m-lazyload"
          :data-src="value.pic || `${$imgPath}base_components/news-gallery/no_img.png`"
          :style="imgStyleObj[imgShape]" src="~static/img/base/preload_small.png">
        <img
          v-if="!lazy" class="defaultImg m-lazyload"
          :src="value.pic || `${$imgPath}base_components/news-gallery/no_img.png`"
          :style="imgStyleObj[imgShape]">
      </slot>
    </div>
    <div class="right">
      <slot name="title">
        <div
          :style="styleObj.title"
          class="title"
        >
          {{value.title}}
        </div>
      </slot>
      <div class="news-label">
        <slot name="label">
          <div>
            <CategoryLabel
              v-if="labelType==='golden'"
              :value="value.label"
            />
            <span v-else class="label-span">{{value.label}}</span>
          </div>
        </slot>
      </div>
      <div class="time">
        <slot name="time">
          <span>{{value.time}}</span>
        </slot>
      </div>
      <div class="cb"></div>
    </div>
  </div>
</template>
<script>
  import "directive/clickFeedback";
  import * as utils from "components/utils"
  import { CategoryLabel } from "base_components"

  export default {
    name: "NewsGallery",
    data: function (){
      return {
        imgStyleObj: {
          square: {
            width: utils.px2rem(90),
            height: utils.px2rem(60),
          },
          circle: {
            width: utils.px2rem(64),
            height: utils.px2rem(64),
            borderRadius: utils.px2rem(32),
          },
          none: {
            display: "none"
          }
        }
      };
    },
    props: {
      value: {
        type: Object,
        default: () =>{
          return {};
        }
      },
      imgShape: {
        type: String,
        default: "square" //square、circle、none
      },
      clickHandler: {
        type: Function,
        default: function (value){
          if ( value.next_url ) {
            this.$$utils.jump(value.next_url);
          }
        }
      },
      lazy: {
        type: Boolean,
        default: false
      },
      imgRight: {
        type: Boolean,
        default: false
      },
      labelType: {
        type: String,
        default: "default",
      },
      styleRules:{
        type: Object,
      }
    },
    components:{
      CategoryLabel
    },
    computed:{
      styleObj(){
        return utils.analyseStyleRules(this.styleRules)
      }
    },
    methods: {
    },
  }
  ;
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .news-gallery {
    padding: 16px 12px 9px 12px;
    background-color: $gray-1;
    .left {
      position: relative;
      float: left;
      margin-right: 12px;
      & > .defaultImg {
        display: block;
      }
    }
    .right {
      /*overflow: hidden;*/
      .title {
        min-height: px2rem(38);
        color: $gray-8;
        font-size: $font-7;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: px2rem(18);
        margin-bottom: px2rem(8);
        @include font-medium();
      }
      .news-label {
        float: left;
        font-size: px2rem(10);
        .label-span{
          display: block;
          max-width: px2rem(140);
          line-height: 1.4;
          @include one-text-ellipsis();
        }
        color: $gray-6;
      }
      .time {
        float: right;
        position: relative;
        font-size: $font-7;
        line-height: 1.5;
        color: $gray-6;
      }
    }
    .golden-label {
      position: relative;
      display: inline-block;
      font-size: 0.5rem;
      line-height: 1;
      color: $color-4;
      padding: 2px 4px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: -1px;
        left: 0;
        border: 1px solid $color-3;
        width: 200%;
        height: 200%;
        -webkit-border-radius: 18px;
        border-radius: 18px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: left top;
        transform-origin: left top;
      }
    }
  }

  .news-gallery:after {
    content: "";
    display: block;
    clear: both;
  }
</style>