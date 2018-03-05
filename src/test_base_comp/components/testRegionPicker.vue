/**
* Created by lai on 2017/12/27.
*/
<template>
  <div>
    <button
      @click="openDatePicker"
    >
      basePickerBase
    </button>
    <RegionPicker
      v-model="region"
      :show="show"
      @cancel="close"
      @confirm="getRegion"
    ></RegionPicker>
    <p>值：{{region}}</p>
  </div>
</template>
<script>
  import { RegionPicker } from "base_components"

  export default {
    name: "",
    props: {},
    components: {
      RegionPicker
    },
    data(){
      return {
        show: false,
        region: {
          province: "广东",
          city: "东莞市",
          county: "",
        },
      };
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {
      openDatePicker(){
        this.show = true
      },
      close(){
        this.show = false
      },
      getRegion(val){
        console.log("confirm", val)
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
</style>
