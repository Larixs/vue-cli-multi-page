/**
* Created by ${USER} on ${DATE}.

* props *
* name        type                default        detail
* value       Array               []             产品数据。形如[{data,name},{data,name}]
* styleObj    Object              {}             数据样式。形如{ dataStyle nameStyle }
* showNum     Number               -             显示的数据数。
* replaceStr  String               -             产品数据需要显示为一条字符串，值为replaceStr

*/
<template>
  <div class="product-detail-data">
    <div v-if="!replaceStr">
      <div
        class="product-detail-data-item"
        v-for="item in content"
        :style="Object.assign({width: 100/content.length+'%'},styleObj)"
      >
        <div :style="styleObj.dataStyle">
          {{item.data || '--'}}
        </div>
        <div
          v-if="item.data!=='首发募集'"
          :style="styleObj.nameStyle"
        >
          {{item.name}}
        </div>
      </div>

    </div>
    <div
      v-else
      class="replace-str"
    >
      {{replaceStr}}
    </div>
  </div>
</template>
<script>
  //此组件与后台接口高度耦合，如果后台返回数据字段变了，那么相应的要修改此组件的formatValue
  import * as utils from "components/utils"

  export default {
    name: "ProductDetailData",
    props: {
      value: {
        type: Array,
        required: true,
        default: () => []
      },
      styleObj: {
        type: Object,
        default: () => ({})
      },
      showNum: {
        type: Number,
        default: null
      },
      replaceStr:{
        type: String
      }
    },
    methods: {
      formatValue: function (value){ //从value中获取需要展示的数据
        let result = [{}, {}]
        const valueLen = value.length
        result.forEach(function (item, index){
          const valueItem = value[index]
          if ( valueItem ) {
            item.data = valueItem.data
            item.name = valueItem.name
          }
        })
        if ( valueLen === 3 ) {
          result[0].name = result[0].name + "(" + value[2].data + ")"
        }
        if ( !!this.showNum ) {
          result = result.slice(0, this.showNum)
        }
        return result
      }
    },
    computed: {
      content: function (){
        return this.formatValue(this.value)
      },
    }
  }
</script>
<style lang="scss" scoped="">
  @import "~static/css/variables_m";

  .product-detail-data {
    .product-detail-data-item {
      display: inline-block;
      & > div {
        text-align: center;
      }
      & > div:first-child {
        font-size: 24px;
        color: #a97335;
        padding-bottom: 16px;
      }
      & > div:nth-child(2) {
        color: #9c9c9c;
        font-size: $font-7;
        padding-bottom: 18px;
      }
    }
    .replace-str{
      margin-bottom: px2rem(18);
      text-align: center;
      font-size: 24px;
      color: #a97335;
      line-height: 1;
    }
  }
</style>