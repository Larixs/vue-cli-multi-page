/**
DataListItem
用于展示数据列表中的单个产品的若干组（通常为2-3组）数据。

* props *
* name              type            default        detail
* value:            Object,                        该产品的所有数据
* dataConfig:       Array,                         配置，给定字段以处理公司数据。数组里的每一项包含对应项数据的名称(label)和数值(data)的配置。
* title:            String,                        产品名称。
* stress:           Array,                         数据使用金色。在stress中为true的条目，value中相对应的条目在显示时用金色字体。
* starKeyName:      String,                        不传或者value中没有此键名时，不显示收藏功能。value中有此键名时，根据该键名对应的键值来决定是否处于收藏状态。
* code:             String, Number,                登录和认证状态code，用于未登录或者未认证时的展示不同的文字。
* authStatusIndex： Number，                       与code搭配使用，该props表示第几个数据展示“登陆可见”或者“认证可见”的文字。
* clickHandler：    Function，                     click的回调函数。
* detailUrl：       String，                       点击之后的默认跳转链接。
* isHaveClickFeedback Boolean                      是否需要点击反馈
* isHaveRecommendTag Boolean        true           是否有热销或者精品标签
* isHaveSoldOutTag  Boolean         false          是否有热销或者精品标签

*dataConfig示例：
*[{ //第一组数据
*   data:{ //数字
*         type:               String,           表示从所有产品数据中取得展示的值的方式。默认为"key"。可取值见表1
*         value:              String,Function   取值需要的键名或者方式。可取值见表1
*         filters:            Array             可取值见表2
*         key:                String,           语法糖，表示type为"key"时的情况，其值与value相同。即直接从props的value中以该键名取值。
*         style:              Object,Function   当类型为Object时，直接将该对象作为style应用到展示该数据的DOM上。
*                                               当类型为Function时，将函数运行返回的结果应用到DOM上，其接收到的参数为经过type,value,filters处理后的数据。
*         },
*   label:{ //标签
*         type,
*         value,
*         filters,
*         key,
*         style
*   },
* },
* { //第二组数据
*    data: "0.01", //当值为字符串时，直接展示该字符串。
*    label: "test",
* }
* ]

表1 dataConfig参数详情：

type取值         含义                                   对应config的value取值
————————————————————————————————————
"key"        该数据从props的value中获取   String,       为props的value中的键名。用lodash.get取值（即用法形同lodash.get)。
"string"     该项为固定字符串             String，      直接展示config的value的字符串
"function"   该项为函数的返回值           Function,     参数为props的value，需要有返回值


表2

filters的元素取值    含义                 示例
————————————————————————————————————————
String               filter的名称        "isNull"
Array                filter的名称及参数  ["currency",2] 即调用currency并传入2作为参数


filters触发顺序为元素顺序。所有数据默认最后都会经过isNull处理


* slot *
* name              usage
* title             替换title
* 默认              放在最后

*/

<template>
  <div
    v-clickFeedback="isHaveClickFeedback"
    :class="{'data-list-item-company': titleType === 'company'}"
    class="data-list-item"
    @click.stop.prevent="clickHandler(value)"
  >
    <slot name="title">
      <h3 class="data-list-item-title">
        <p
          :style="{width: isHaveProductTag?`calc(100% - ${$$utils.px2rem(44)} - 12px)`:''}"
        >
          <span
            v-for="recommendTagItem in recommendTagImg"
            v-if="isHaveRecommendTag && !!recommendTagItem"
            :style="{backgroundImage: `url(${recommendTagItem})`}"
            class="data-list-item-title-hot-tag"
          ></span>{{title}}
        </p>
        <img
          v-show="isHaveProductTag"
          :src="productTagUrl(value.index_name)"
          class="data-list-item-product-tag"
        >
      </h3>
    </slot>
    <div class="data-list-item-detail clearfix">
      <div
        v-for="(item,index) in renderData"
        :key="index"
        :style="{width: dataListItemWidth}"
        class="data-list-item-data"
      >
        <p
          :class="{'golden': stress[index]}"
          :style="item.dataStyle"
        >
          {{dataHandler(item.data, index)}}
        </p>
        <p
          :style="item.labelStyle"
        >
          {{item.label}}
        </p>
      </div>
    </div>
    <FavoriteStar
      v-if="starKeyName in value"
      :isStar="isStared"
      :value="value"
      :styleObj="starStyleObj"
      @toggleStar="toggleStar"
    />

    <slot></slot>
    <i v-if="isHaveSoldOutTag && isSoldOut" class="sold-out"></i>
  </div>
</template>
<script>
import { FavoriteStar, authProxy } from "base_components";
import "plugins/injectLodash";
import "directive/clickFeedback";
import codeStatus from "components/codeStatus";

export default {
  props: {
    value: {
      type: Object,
      default: () => Object
    },
    dataConfig: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    stress: {
      type: Array,
      default: () => []
    },
    starKeyName: {
      type: String
    },
    titleType: {
      type: String
    },
    clickHandler: {
      type: Function,
      default: function(value) {
        if (this.detailUrl) {
          if (!!(window.history && history.pushState)) {
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
          this.$$utils.jump(this.detailUrl);
        }
      }
    },
    detailUrl: {
      type: String
    },
    code: {
      type: [String, Number],
      default: 0
    },
    authStatusIndex: {
      type: Number,
      default: 1
    },
    isHaveProductTag: {
      type: Boolean,
      default: false
    },
    isHaveRecommendTag: {
      type: Boolean,
      default: true
    },
    isHaveClickFeedback: {
      type: Boolean,
      default: true
    },
    isHaveSoldOutTag: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FavoriteStar,
    authProxy
  },
  data: function() {
    return {
      isStared: !!this.value[this.starKeyName],
      starStyleObj: {
        position: "absolute",
        top: "6px",
        right: "0px",
        padding: "10px"
      },
      statusObj: {
        notLogin: "登录可见",
        notCertified: "认证可见",
        success: ""
      },
      loginStatus: codeStatus.loginStatus
    };
  },
  computed: {
    renderData: function() {
      const result = [];
      this.dataConfig.forEach(configItem => {
        const data = this.getValueWithConfig(configItem.data, this.value)
        const label = this.getValueWithConfig(configItem.label, this.value)
        const dataStyle = this.$$utils.analyseStyleRules(this.$lodash.get(configItem, "data.style"), {}, data)
        const labelStyle = this.$$utils.analyseStyleRules(this.$lodash.get(configItem, "label.style"), {}, label)
        result.push({
          data,
          label,
          dataStyle,
          labelStyle,
        });
      });
      return result;
    },
    dataListItemWidth: function() {
      return this.renderData.length ? 100 / this.renderData.length + "%" : 0;
    },
    recommendTagImg: function() {
      let publicUrl = `${this.$imgPath}base_components/data-list-item/`
      const result = []
      if (this.value.is_hotsell_tag) {
        result.push(`${publicUrl}hot_tag.png`);
      }
      if (this.value.is_chosen_tag) {
        result.push(`${publicUrl}featured_tag.png`);
      }
      return result
    },
    isSoldOut: function (){
      if(!("is_appointment" in this.value)){
        //如果不存在is_appointment字段，则不显示是否已售罄
        return false
      }
      return !this.$lodash.get(this.value, "is_appointment")
    }
  },
  watch: {
    value: function() {
      this.isStared = !!this.value[this.starKeyName];
    },
    starKeyName: function() {
      this.isStared = !!this.value[this.starKeyName];
    }
  },
  methods: {
    getValueWithConfig: function(configItem, originValue) {
      let result = originValue;
      result = this.dealDataWithConfigType(configItem, result);
      result = this.dealDataWithConfigFilter(configItem, result);
      return result;
    },

    dealDataWithConfigType: function(configItem, originValue) {
      //configItem为String时，认为type是"string"
      //configItem为Object时，type的默认值为"key"
      const solutions = {
        key: originValue => this.$lodash.get(originValue,configItem.key || configItem.value),
        function: originValue => configItem.value(originValue),
        string: () => configItem.value,
        configIsString: () => configItem,
        default: () => ""
      };
      let type = "default";
      if (typeof configItem === "string") {
        type = "configIsString";
      } else if (typeof configItem === "object" && !configItem.type) {
        type = "key";
      } else if (typeof configItem === "object" && configItem.type) {
        type = configItem.type;
      }
      return solutions[type](originValue);
    },

    dealDataWithConfigFilter: function(configItem, value) {
      let result = value;
      if (typeof configItem === "object" && Array.isArray(configItem.filters)) {
        result = this.useFilter(configItem.filters, result);
      }
      //默认所有数据最终都会经过filter:isNull
      result = this.useFilter(["isNull"], result);
      return result;
    },

    useFilter: function(filters, value) {
      let result = value;
      if (Array.isArray(filters)) {
        filters.forEach(filter => {
          if (
            typeof filter === "string" &&
            typeof this[filter] === "function"
          ) {
            result = this[filter](result);
          } else if (
            Array.isArray(filter) &&
            typeof this[filter.slice(0, 1)] === "function"
          ) {
            result = this[filter.slice(0, 1)].apply(
              this,
              [result].concat(filter.slice(1))
            );
          }
        });
        return result;
      } else {
        console.log("need array in useFilter");
        return;
      }
    },
    dataHandler: function(data, index) {
      if (this.authStatusIndex !== index) return data;
      return this.statusObj[this.loginStatus[this.code]] || data;
    },
    toggleStar: function() {
      this.isStared = !this.isStared;
    },
    productTagUrl: function(index_name) {
      let publicUrl = `${this
        .$imgPath}base_components/data-list-item/product_tag/`;
      return {
        simu: `${publicUrl}simu.png`,
        pe: `${publicUrl}pe.png`,
        quasi_fixed: `${publicUrl}quasi_fixed.png`
      }[index_name];
    },
    /**
       * filter start
       * */
    isNull: function(value) {
      if (!value || value === "undefined" || value === "-" || value === "NaN") {
        return "--";
      } else {
        return value;
      }
    },

    currency: function(value, i) {
      value = parseFloat(value).toFixed(i);
      return value;
    },
    percentage: function(value) {
      if (value === "--") {
        return value;
      } else {
        return value + "%";
      }
    },
    addCommas: function(nStr) {
      nStr = nStr == 0 ? "000" : Math.round(nStr * 100).toString();
      let inte = nStr.slice(0, -2);
      let deci = nStr.slice(-2);
      let reg = /(\d+)(\d{3})/;
      while (reg.test(inte)) {
        inte = inte.replace(reg, "$1" + "," + "$2");
      }
      return inte + "." + deci;
    }
  }
  /**
     * filter end
     * */
};
</script>
<style lang="scss" scoped>
@import "~static/css/variables_m";

.data-list-item {
  position: relative;
  padding: 18px 12px 16px;
  background-color: $gray-1;
  .data-list-item-title {
    position: relative;
    font-size: $font-3;
    text-align: left;
    color: $gray-9;
    height: px2rem(20);
    line-height: px2rem(20);
    > p {
      line-height: px2rem(20);
      @include one-text-ellipsis();
      .data-list-item-title-hot-tag {
        float: left;
        display: block;
        margin-right: 6px;
        width: px2rem(15);
        height: px2rem(18);
        margin-top: px2rem(1);
        background-image: url("~static/img/base_components/data-list-item/hot_tag.png");
        background-repeat: no-repeat;
        background-size: px2rem(15) px2rem(18);
      }
    }
    .data-list-item-product-tag {
      position: absolute;
      width: px2rem(44);
      top: px2rem(2);
      right: 0px;
    }
  }
  .data-list-item-data {
    float: left;
    margin-top: 16px;
    text-align: center;
    p {
      line-height: 1.2;
    }
    p:first-child {
      margin-bottom: 8px;
      font-size: px2rem(20);
      color: #505050;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(2) {
      font-size: $font-5;
      color: #838383;
      white-space: nowrap;
    }
    .golden {
      color: #a97335 !important;
    }
  }
  .data-list-item-company {
    padding-top: 0px;
    border-top: px2rem(16) solid $gray-3;
    .data-list-item-title {
      position: absolute;
      background-color: $color-1;
      display: block;
      left: px2rem(12);
      top: px2rem(-10);
      color: $gray-1;
      padding: 0 px2rem(8);
      height: px2rem(20);
      font-size: $font-7;
      max-width: calc(100% - 24px - 16px);
      p {
        line-height: px2rem(20);
      }
      &:after {
        content: "";
        display: block;
        background: url("~static/img/base_components/data-list-item/tag.png")
          no-repeat;
        width: px2rem(8);
        height: px2rem(14);
        position: absolute;
        right: px2rem(-8);
        top: px2rem(3);
        background-size: cover;
      }
    }
    &:after {
      content: "";
      display: block;
      background: url("~static/img/base_components/data-list-item/tag.png")
        no-repeat;
      width: px2rem(8);
      height: px2rem(14);
      position: absolute;
      right: px2rem(-8);
      top: px2rem(3);
      background-size: cover;
    }
  }
  .data-list-item-data {
    margin-top: px2rem(18);
  }
  i.sold-out{
    position: absolute;
    display: block;
    top: 0px;
    right: 0px;
    height: 68px;
    width: 68px;
    background: url("~static/img/base_components/data-list-item/icon_sold_out.png")
    no-repeat;
    background-size: 100% 100%;
    background-position: 10px -10px;
  }
}
</style>