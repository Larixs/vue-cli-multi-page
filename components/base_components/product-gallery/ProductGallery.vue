/**
* Created by lai on 2017/12/12.

* props *
* name         type          default                  detail
* value        Object         -                       文字、图片等信息。形如 { pic, title, publish_date, next_url}
* clickHandler Function      默认跳转next_url         点击事件的回调函数

* props详述
*   value:{
*     pic: "", //图片路径
*     title: "", //新闻标题，位于左下角
*     publish_date: "",   //时间，位于右下角
*     next_url: "" //点击之后的跳转链接
*   },
*

*/
<template>
  <div class="product-gallery-item" v-clickFeedback @click.stop.prevent="clickHandler(value)">
    <div class="product-gallery-item-pic">
      <img :src="value.pic"/>
    </div>
    <h2 class="product-gallery-item-title">{{value.title}}</h2>
    <span class="product-gallery-item-date" v-if="value.publish_date">{{value.publish_date}}</span>
    <div class="cb"></div>
  </div>
</template>
<script>
  export default {
    name: "ProductGallery",
    props: {
      value: null,
      clickHandler: {
        type: Function,
        default: function (value){
          //记录跳转位置可能会用得到，暂时先保留。
          if ( value.next_url ) {
            if ( !!(window.history && history.pushState) ) {
              const { state } = history;
              history.replaceState(
                {
                  ...state,
                  item: value
                },
                "null",
                location.href
              );
            } else {
              console.log("History is not supported ");
            }
            this.$$utils.jump(value.next_url);
          }
        }
      }
    },
    components: {},
    data: function (){
      return {};
    },
    created: function (){
    },
    mounted: function (){
      this.$nextTick(function (){
      });
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {}
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .product-gallery-item {
    padding: 16px 12px 12px 12px;
    padding-bottom: 0;
    position: relative;
    // @include border-bottom-1px(1px, 12px, 12px);
    .product-gallery-item-pic {
      > img {
        width: 100%;
        margin-bottom: -3px;
      }
    }
    .product-gallery-item-title {
      float: left;
      color: $gray-9;
      font-size: $font-3;
      padding: px2rem(18) 0 px2rem(12) 0;
      width: calc(100% - 4rem);
      line-height: $font-5;
//      @include font-medium();
      @include one-text-ellipsis();
    }
    .product-gallery-item-date {
      float: right;
      font-size: $font-7;
      line-height: $font-5;
      color: $gray-6;
      padding: px2rem(18) 0 px2rem(12) 0;
      @include font-lighter();
    }
  }
</style>