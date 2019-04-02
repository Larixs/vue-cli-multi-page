/**
* Created by lai on 2018/4/24.
*/
<template>
  <div class="test-product-detail">
    <div class="test-item-box">
      <h3>ProductDetail(未加code)</h3>
      <ProductDetail :value="value"/>
    </div>
    <div class="test-item-box">
      <h3>ProductDetailName</h3>
      <ProductDetailName :value="value.name"/>
      <h3>ProductDetailData</h3>
      <ProductDetailData :value="value.detail"/>
      <h3>ProductDetailComment</h3>
      <ProductDetailComment :value="value.comment"/>
    </div>
  </div>
</template>
<script>
  import { ProductDetailComment, ProductDetailData, ProductDetailName } from "base_components"
  import { ProductDetail } from "view_components"

  export default {
    name: '',
    props: {},
    components: { ProductDetail, ProductDetailComment, ProductDetailData, ProductDetailName },
    mixins: [],
    data(){
      return {
        value: {
          name: '产品名称',
          comment: "产品评价",
          detail: [{
            name: 'name1',
            data: 'data2'
          }, {
            name: 'name2',
            data: 'data2'
          }],
        }
      }
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
  .test-item-box{
    background-color: #fff;
  }
  h3{
    background-color: #f3f3f3;
    padding: 12px;
  }
</style>
