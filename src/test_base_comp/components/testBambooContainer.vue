/**
* Created by lai on 2017/12/14.
*/
<template>
  <div>
    <p>原数据 ： {{bambooValue}}</p>
    <BambooContainer
      :title="{
          title: '测试',
          subTitle: '更多',
          url: '/',
//          clickHandler: test, //没有点击事件了
        }"
      :stress="true"
      :value="bambooValue"
      :config="bambooConfig"
    >
      <div
        class="bamboo-section-test"
        slot="section"
        slot-scope="props"
        @click="test"
      >
        <p>整理后的数据 ： {{props.data}}</p>
        <br>
        <p><span>键名</span> <span>config的type </span> <span>处理后的键值</span></p>
        <p><span>label（新）</span> <span>key</span> <span>{{props.data.label}}</span></p>
        <p><span>newString（新）</span> <span>string</span> <span>{{props.data.newString}}</span></p>
        <p><span>squareData（新）</span> <span>function</span> <span>{{props.data.squareData}}</span></p>
        <p><span>name（原有）</span> <span>不处理</span> <span>{{props.data.name}}</span></p>
        <p><span>string（原有）</span> <span>string</span> <span>{{props.data.string}}</span></p>
        <p><span>data（原有）</span> <span>function</span> <span>{{props.data.data}}</span></p>
      </div>
    </BambooContainer>
  </div>
</template>
<script>
  import { BambooContainer } from "base_components"
  export default {
    name: "",
    props: {},
    components: {
      BambooContainer
    },
    data(){
      return {
        bambooSingleValue: {
          data: 1,
          name: 'hello',
          string: 'string'
        },
        bambooValue: [
          {
            data: 1,
            name: 'hello',
            string: 'string',
            next_url: "/",
          },
//          {
//            data: 2,
//            name: 'world',
//            string: 'string',
//          },
//          {
//            data: 3,
//            name: '!',
//            string: 'string',
//          }
        ],
        bambooCandyConfig:{
          label: "name",  //type为key的语法糖
          newString: {
            //type为string的语法糖
            string: "我是个新字符串",
          },
          squareData: function (val){
            //type为function的语法糖
            return val.data * val.data + 1
          },
        },

        bambooConfig: {
          label: { //新键名，key
            type: "key",
            value: "name"
          },
          newString: { //新键名，string
            type: "string",
            value: "我是个新字符串",
          },
          squareData: {//新键名，function
            type: "function",
            value: (val) =>{
              return val.data * val.data
            }
          },
          string: { //原有键名，string
            type: "string",
            value: "平方"
          },
          data: { //原有键名 function
            type: "function",
            value: (val) =>{
              return "0" + val.data
            }
          },
        },
        bambooFunConfig: (value) =>{ //config为function
          //value是单条原数据
          return {
            data: 0,
            label: "test"
          }
        }
      };
    },
    created(){
    },
    mounted(){
      this.$nextTick(function (){
      });
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {
      test(){
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  .bamboo-section-test {
    p {
      position: relative;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      -webkit-justify-content: center;
      @include border-bottom-1px(1px, 20px, 20px);
      span {
        display: inline-block;
        width: 30%;
      }
    }
  }
</style>