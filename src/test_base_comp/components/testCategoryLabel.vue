/**
* Created by lai on 2017/12/25.
*/
<template>
  <div>
    <div class="test">
      <CategoryLabel
        :value="['机构路演','产品解说','测试测试测试']"
        :styleRules="{size: 'px', margin: '0', align: 'center', themeColor: 'gray-6'}"
      ></CategoryLabel>
    </div>
    <div class="test">
      <CategoryLabel
        :value="['测试','我是测试哈哈哈','测试测试测试']"
        :styleRules="{
        align:'right'
      }"
      ></CategoryLabel>
    </div>
  </div>
</template>
<script>
  import { CategoryLabel } from "base_components"

  export default {
    name: "",
    props: {},
    components: {
      CategoryLabel
    },
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
  .test{
    padding: 10px;
    background-color: #fff;
  }
</style>