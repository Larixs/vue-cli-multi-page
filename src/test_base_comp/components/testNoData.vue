/**
* Created by lai on 2018/4/25.
*/
<template>
  <div class="test-no-data">
    <NoData text="可随意填字符串"/>
  </div>
</template>
<script>
  import { NoData } from "base_components"

  export default {
    name: '',
    props: {},
    components: { NoData },
    mixins: [],
    data(){
      return {}
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {}
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  .test-no-data{
    background-color: lightblue;
  }
</style>
