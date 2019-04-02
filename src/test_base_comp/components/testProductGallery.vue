/**
* Created by lai on 2018/4/24.
*/
<template>
  <div style="background: #fff;">
    <ProductGallery :value="value"/>
  </div>
</template>
<script>
  import { ProductGallery } from "base_components"

  export default {
    name: '',
    props: {},
    components: {
      ProductGallery,
    },
    mixins: [],
    data(){
      return {
        value: {
          title: "zelda",
          publish_date: '2018-04-24',
          next_url: 'https://www.zelda.com/',
          pic: this.$imgPath + "test_base_comp/zelda.jpg"
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

</style>
