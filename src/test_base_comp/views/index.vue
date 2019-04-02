/**
* Created by lai on 2018/4/19.
*/
<template>
  <div>
      <div
        class="search-for-component"
      >
        <label>
          <input
            v-model="filterWord"
            type="text"
            :class="[isCircleInput ? 'circle' : 'square']"
            @focus="inputFocus"
            @blur="inputBlur"
          >
          <transition name="fadeAndShrink">
            <span
              v-if="isCircleInput"
              class="icon icon_bar"
            ></span>
          </transition>
          <transition name="fadeAndShrink">
            <span
              v-if="!isCircleInput"
              class="icon icon_close"
              @click="clearInput"></span>
          </transition>
        </label>
      </div>
      <div v-if="componentsNames.length">
        <router-link
          v-for="(component, index) in componentsNames"
          class="name"
          :to="`/page/${component}`"
          :key="index"
        >
          <div
            v-clickFeedback
            class="router-link-box"
            v-html="changeStyle(component)"
          ></div>
        </router-link>
      </div>
      <div
        v-else
        class="search-no-result"
      >无搜索结果</div>
  </div>
</template>
<script>
  import * as testComponents from "../components"

  export default {
    name: '',
    props: {},
    components: {
      ...testComponents
    },
    data: function (){
      return {
        testTotalComponentsNames: Object.keys(testComponents).sort(),
        componentsNames: Object.keys(testComponents).sort(),
        filterWord: '',
        isCircleInput: true
      };
    },
    created(){
    },
    mounted(){
    },
    filters: {

    },
    watch: {
      filterWord(val){
        if(val){
          this.componentsNames = this.testTotalComponentsNames.filter((i)=>(new RegExp(val, 'i')).test(i.replace('test','')))
        }else{
          this.componentsNames = this.testTotalComponentsNames
        }
      }
    },
    computed: {},
    methods: {
      inputFocus(){
        this.isCircleInput = false
      },
      inputBlur(){
        if(this.filterWord){
          this.isCircleInput = false
        }else{
          this.isCircleInput = true
        }
      },
      clearInput(){
        this.filterWord = ''
      },
      changeStyle(str){
        let result = this.removeTest(str)
        result = this.addStress(result)
        return result
      },
      removeTest(val){
        return val.replace('test', '')
      },
      addStress(str){
        if(this.filterWord){
          return `<p class="search-result">${str.replace(new RegExp(`(${this.filterWord})`, 'ig'), '<b>$1</b>')}</p>`
        }else{
          return str
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  $search-theme-color: #000;
  .search-for-component{
    padding: 20px 12px;
    label{
      position: relative;
      margin: 0 auto;
      display: block;
    }
    input{
      box-sizing: border-box;
      margin: 0 auto;
      display: block;
      height: 30px;
      border-radius: 30px;
      border: 2px solid $search-theme-color;
      font-size: $font-5;
      padding: 0 12px;
      transition: width 0.3s;
      &.circle{
        width: 30px;
        border-radius: 30px;
      }
      &.square{
        width: 200px;
        border-radius: 5px;
      }
    }
    .icon{
      position: absolute;
      background: $search-theme-color;
      height: 0px;
    }
    .icon_bar{
      bottom: 6px;
      display: block;
      height: 14px;
      width: 3px;
      left: calc(50% + 15px);
      transform: translate3d(-50%, 100%, 0) rotateY(30deg)  rotateZ(-45deg);
    }
    .icon_close{
      top: 50%;
      left: calc(50% + 80px);
      transform: rotateZ(45deg) translate3d(-50%, -50%, 0);
      height: 14px;
      width: 2px;
      &:after{
        content: '';
        position: absolute;
        z-index: 2;
        display: block;
        height: 14px;
        width: 2px;
        top: 0;
        left: 0;
        background: $search-theme-color;
        transform: rotateZ(90deg);
      }
    }
    .fadeAndShrink-enter-active {
      animation: fadeAndShrink 0.3s;
      -webkit-animation: fadeAndShrink 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes fadeAndShrink {
      0%{
        height: 0px;
        opacity: 0;
      }
      50%{
        height: 7px;
        opacity: 0;
      }
      100%{
        height: 14px;
        opacity: 1;
      }
    }
  }
  .search-no-result{
    padding: 0px 12px;
  }

  .router-link-box {
    position: relative;
    background-color: #fff;
    font-size: $font-5;
    padding: px2rem(8) 12px;
    color: $gray-9;
    @include border-bottom-1px(1px, 12px, 12px);
  }
  .name {
    display: block;
  }
</style>
<style lang="scss">
  @import "~static/css/variables_m";
  .search-result{
    color: $gray-8;
    b{
      color: black;
    }
  }

</style>