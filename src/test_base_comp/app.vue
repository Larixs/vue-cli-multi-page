/**
* Created by lai on 2017/11/1.
*/
<template>
  <div id="app">
      <!--<testDatePicker></testDatePicker>-->
      <!--<testProductChart></testProductChart>-->
      <!--<testCategoryLabel></testCategoryLabel>-->
      <testRegionPicker/>
  </div>
</template>
<script>
  import { testDatePicker, testProductChart, testCategoryLabel, testRegionPicker } from "./components"
  export default {
    name: "",
    props: {},
    components: {
      testDatePicker,
      testCategoryLabel,
      testProductChart,
      testRegionPicker,
    },
    data: function (){
      return {};
    },
    created: async function (){
    },
    mounted: function (){
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {}
  };
</script>


<style lang="scss" scoped>
  @import "~static/css/variables_m";

</style>
<style>
  body{
    background-color: #f3f3f3;
    font-size: 14px;
  }
</style>