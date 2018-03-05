/**
* Created by lai on 2017/11/29.
*/
<template>
  <div
    :style="styleObj"
    class="no-data"
  >
    <img class="no-data-img" src="~static/img/base_components/search-new/no-data.png"/>
    <p>{{text}}</p>
  </div>

</template>
<script>
  export default {
    name: "noData",
    props: {
      styleObj: {
        type: Object
      },
      text: {
        type: String,
        default: "暂无数据"
      }
    },
    components: {},
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
    computed: {},
    methods: {}
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .no-data {
    text-align: center;
    color: $gray-6;
    padding: px2rem(40) 0;
    .no-data-img {
      width: 4.8rem;
    }
  }
</style>