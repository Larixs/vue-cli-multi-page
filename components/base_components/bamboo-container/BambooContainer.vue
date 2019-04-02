/**
* Created by lai on 2017/12/13.
* bamboo-container
* 像竹子一样一节一节的组件。 可以选择是否整理数据。不传config就不整理数据。
* 会根据整理后的数据中是否有next_url添加点击反馈。
*

* props *
* name        type                               detail
* title       [Object, String]                   标题，即BambooContainerTitle的value,详见BambooContainerTitle。不传就没有标题。
* stress      Boolean                            标题前的小装饰，即BambooContainerTitle的stress,详见BambooContainerTitle。
* value       [Object, Array]                    数据。如果传入Object，则将它作为长度为1的数组的唯一元素进行处理。
* config      [Object, Function]                 整理数据的配置。详见下方。
* styleRules  [Object, Array, String, Function]  样式

config示例

config是一个对象。它的每个键名代表原数据中需要修改或者新增的键名，键值表示如何获得该键名的取值。

键值的数据类型为Function或者Object。若为Function, 返给slot的数据即为Function里return的内容。

若为Object，详解如下
*{
*   'key1':{ //'key1'为想要设置的新键名或需要修改键值的旧键名
*         type:      String,             表示取值方式。详情见表1
*         value:     [String,Function]   type所对应的具体取值方式。
*    },
* },
*

表1

type取值     含义                                   对应config的value取值
————————————————————————————————————
"key"        该数据从props的value中对应的键名获取   String,  为props的value中的键名
"string"     该项为固定字符串                       String， 值为该字符串
"function"   该项为函数的返回值                     Function,参数为props的value，需要有返回值

语法糖：

*{
*   'key1': 'oldKey1' //type为key的语法糖
*   'key2':{          //type为string的语法糖
*      string: '我是key2的值'
*    },
*   'key3: ()=> ('返回的值作为key3的值') //type为function的语法糖
* },
*
*
* 更详细的实例见/src/test_base_comp/components/testBambooContainer.vue
*

styleRules:
key            type                 default           detail
hasNoMargin    Boolean              false             没有底部边距
*/
<template>
  <div
    v-if="renderValue.length"
    class="bamboo-container"
    :style="styleObj"
  >
    <slot name="topic">
      <BambooContainerTitle
        :value="title"
        :stress="stress"
      />
    </slot>
    <slot name="top"></slot>
    <div class="bamboo">
      <div
        v-for="(sectionVal, sectionIndex) in renderValue"
        :key="sectionIndex"
        class="bamboo-section"
        v-clickFeedback="!!sectionVal.next_url"
      >
        <slot name="section" :data="sectionVal"></slot>
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
  import { BambooContainerTitle } from "base_components"
  import "directive/clickFeedback"
  import "components/injectAllPlugins"

  export default {
    name: "BambooContainer",
    props: {
      title: {
        type: [Object, String]
      },
      stress: {
        type: Boolean
      },
      value: {
        type: [Object, Array]
      },
      config: {
        type: [Object, Function]
      },
      styleRules: {
        type: [Object, Array, String, Function]
      }
    },
    components: {
      BambooContainerTitle,
    },
    data(){
      return {};
    },
    created(){
    },
    mounted(){
      this.$nextTick(function (){
      });
    },
    filters: {},
    watch: {},
    computed: {
      styleObj(){
        //目前只是粗糙地处理一下
        const style = this.$$utils.analyseStyleRules(this.styleRules, { hasNoMargin: false })
        if ( style.hasNoMargin ) {
          return {
            margin: 0
          }
        }
      },
      renderValue(){//真正用于渲染页面的数据
        if ( !this.value ) {
          return []
        }
        const value = this.$lodash.isArray(this.value) ? this.value : [this.value]
        return this.useConfig(value)
      }
    },
    methods: {
      useConfig(value){
        const _thisConfig = this.config
        if ( !_thisConfig ) {
          //没有config
          return value
        } else if ( this.$lodash.isFunction(_thisConfig) ) {
          //config为函数
          return value.map(this.config)
        } else {
          //config为Object
          return value.map(item =>{
            return this.dealItemWithConfig(item, _thisConfig)
          })
        }

      },
      dealItemWithConfig(originItem, config){
        const item = Object.assign({}, originItem)
        Object.keys(config).forEach(key =>{
          item[key] = this.valueFactory(config[key], item)
        })
        return item
      },
      valueFactory(method, item){
        let methodType = ""
        let methodValue
        let result
        if ( this.$lodash.isString(method) ) {
          //type为key的语法糖
          methodType = "key"
          methodValue = method
        } else if ( this.$lodash.isFunction(method) ) {
          //type为function的语法糖
          methodType = "function"
          methodValue = method
        } else if ( typeof method === "object" ) {
          if ( method.hasOwnProperty("string") ) {
            //type为string的语法糖
            methodType = "string"
            methodValue = method.string
          } else {
            methodType = method.type
            methodValue = method.value
          }
        }
        const solution = {
          "string": () => methodValue,
          "key": (item) => item[methodValue],
          "function": (item) => methodValue(item)
        }
        if ( this.$lodash.isFunction(solution[methodType]) ) {
          result = solution[methodType](item)
        }
        return result
      },
    },

  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .bamboo-container {
    margin-bottom: px2rem(8);
  }

  .bamboo-section {
    position: relative;
    background-color: #fff;
    &:not(:last-child) {
      @include border-bottom-1px(1px, 12px, 12px);
    }
  }
</style>