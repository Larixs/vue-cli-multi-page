/** triangle

triangle为品字形布局，每一行被所有元素均分宽度。

布局分为Math.floor(value.length / rowMaxLen)行，第一行(value.length % rowMaxLen)个元素，之后的行均为rowMaxLen个元素。

举例说明
当value数组长度为7、rowMaxLen为4时，布局分为2行，第一行3(7%4)个元素，第二行4个元素。
当value数组长度为7、rowMaxLen为2时，布局分为4行，第一行1(7%2)个元素，第二行至第四行均为2个元素。

props:
————————————————————————————————————————————————————————————————————————
属性名     类型        默认值             作用
————————————————————————————————————————————————————————————————————————
rowMaxLen  Number      2                  一行最多元素个数。
value      Array       []                 用于渲染item的数据，每一个元素渲染一条item。
styleObj   Object      无，可选           样式。作用于该组件最外层div。
————————————————————————————————————————————————————————————————————————

note：

由于华为对flex布局存在兼容性问题，因此使用float:left布局。每个元素的宽度动态计算。如果以后华为解决兼容问题（或者不考虑华为了），可以改成flex布局，节省js计算每一个元素的宽度。


具名slot:
————————————————————————————————————————————————————————————————————————
插槽名称   插槽类型           插槽说明
————————————————————————————————————————————————————————————————————————
"item"     作用域插槽         会循环生成多个插槽。传入的参数data是每一个item的所有数据。
————————————————————————————————————————————————————————————————————————


*/
<template>
  <div class="triangle" v-if="value.length!==0" :style="styleObj">
    <div class="triangle-row clearfix" v-for="(row,rowIndex) in renderData" :key="rowIndex">
      <div class="triangle-item" v-for="(item,index) in row" :key="index" :style="{width: 100/row.length+'%'}">
        <slot name="item" :data="item" :totalRowItem="row.length"></slot>
      </div>
    </div>

  </div>
</template>
<script>
  import * as utils from "components/utils"

  export default{
    name: "triangle",
    props: {
      rowMaxLen: { type: Number, default: 2, },
      value: { type: Array, default: ()=>[] },
      styleObj: Object
    },
    data: function (){
      return {}
    },
    methods: {},
    watch: {},
    computed: {
      renderData: function (){
        const result = []
        const { value, rowMaxLen } = this
        const totalItem = value.length
        const firstRowItem = totalItem % rowMaxLen
        if ( firstRowItem ) {
          result.push(value.slice(0, firstRowItem))
        }
        let currentIndex = firstRowItem
        while ( currentIndex < totalItem ) {
          result.push(value.slice(currentIndex, currentIndex += rowMaxLen))
        }
        return result
      }
    },
    created: function (){

    }
  }
</script>
<style lang="scss" scoped>
  .triangle {
    text-align: center;
    background-color: #fff;
  }

  .triangle-row {
    width: 100%;
  }

  .triangle-item {
    float: left;
    box-sizing: border-box;
    background-color: #fff;
  }
</style>