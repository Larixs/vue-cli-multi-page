/**
* Created by lai on 2017/12/14.
*/
<template>
  <ProductChart
    :data="info.trend"
  />
</template>
<script>
  import { ProductChart } from "base_components"

  export default {
    name: "",
    props: {},
    components: {
      ProductChart
    },
    data(){
      return {
        info: {},

      };
    },
    async created(){
      const { result } = await this.$$request.post("/api/v1/data/simu/product/info", {
//        product_id: "P075070",
        product_id: "P015978",
//        product_id: "P075070",
//        product_id: "P079697",
//        product_id: "P079693",
      })
      this.info = result

    },
    mounted(){
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
</style>