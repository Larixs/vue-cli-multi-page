/**
* Created by lai on 2018/4/25.
*/
<template>
  <div class="test-base-picker">
    <button
      @click="openBasePicker"
    >
      打开选择器
    </button>
    <BasePicker
      ref="basepicker"
      :selectedIndex="selectedIndex"
      :data="pickerData"
      @hide="close"
      @valuechange="valueChange"
      @select="select"
      @change="change"
    ></BasePicker>
    <p>选择器的值：{{selectedVal}}</p>
  </div>
</template>
<script>
  import { BasePicker } from "base_components"

  export default {
    name: '',
    props: {},
    components: {
      BasePicker
    },
    mixins: [],
    data(){
      return {
        show: false,
        selectedIndex: [0, 0],
        selectedVal: [],
        pickerData: [
          [
            { text: 1, value: 1 },
            { text: 2, value: 2 },
            { text: 3, value: 3 },
          ],
          [
            { text: 11, value: 11 },
            { text: 12, value: 12 },
            { text: 13, value: 13 },
          ]
        ]
      }
    },
    created(){
    },
    mounted(){
    },
    filters: {},
    watch: {},
    computed: {},
    methods: {
      openBasePicker(){
        this.$refs.basepicker.show()
      },
      close(){
        console.log("close")
      },
      change(index, val){
        this.selectedIndex.splice(index, 1, val)
      },
      valueChange(selectedVal){
        this.selectedVal = Array.from(selectedVal)
      },
      select(selectedVal){
        this.selectedVal = Array.from(selectedVal)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  .test-base-picker {
    padding: 20px 12px;
    button {
      padding: 4px 12px;
      border: 1px solid transparent;
    }
  }

  p {
    margin: 10px 0;
  }
</style>
