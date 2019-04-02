/**
* Created by lai on 2017/12/14.
*/
<template>
  <div class="test-date-picker">
    <button
      @click="openDatePicker"
    >
      打开日期选择器
    </button>
    <DatePicker
      v-model="date"
      :show="show"
      @cancel="close"
      :endTime="endTime"
      :startTime="startTime"
      @confirm="getDate"
    ></DatePicker>
    <p>日期选择器的值：{{date}}</p>
  </div>
</template>
<script>
  import { DatePicker } from "base_components"

  export default {
    name: "",
    props: {},
    components: {
      DatePicker
    },
    data(){
      return {
        show: false,
        date: '',
      };
    },
    created(){
    },
    mounted(){
      this.$nextTick(function (){
      });
    },
    filters: {},
    watch: {},
    computed: {
      endTime(){

      },
      startTime(){
        const now = new Date(2017,10,22)
        return now
      }
    },
    methods: {
      openDatePicker(){
        this.show = true
      },
      close(){
        this.show = false
      },
      getDate(val){
        console.log("confirm", val)
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
  .test-date-picker{
    padding: 20px 12px;
    button{
      padding: 4px 12px;
      border: 1px solid transparent;
    }
  }
  p{
    margin: 10px 0;
  }
</style>