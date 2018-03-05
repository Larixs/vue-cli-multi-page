/**
* Created by lai on 2017/12/5.
* 设计的不好,要是能用value驱动就好了，index太麻烦了，变来变去的。看看base_picker有没有可能用value驱动
* 还有很多异常情况没有进行处理
* 暂不支持动态设置startTime和endTime

* props *
* name                 type                  default          detail
* startTime            [String, Date],       1900-01-01       起始时间
* endTime              [String, Date],       2100-01-01       终止时间
* value                String                -                选定时间。形如"yyyy-mm-dd"
* show                 Boolean               false            控制显示隐藏

* emit *
* event             triggerTime                        return
* cancel            点击“取消”按钮、点击外面的遮罩   false。
* confirm           点击“确定”按钮                   当前选定的日期
* input:            点击“确定”按钮                   当前选定的日期（存在v-model的语法糖）

*/
<template>
  <BasePicker
    ref="basepicker"
    :data="pickerData"
    :selectedIndex="selectedIndex"
    @valuechange="valueChange"
    @change="change"
    @hide="close"
  />
</template>
<script>
  import { BasePicker } from "base_components"
  import moment from "moment"

  export default {
    name: "DatePicker",
    props: {
      value: {
        type: String,
      },
      startTime: {
        type: [String, Date],
        default: "1900-01-01",
      },
      endTime: {
        type: [String, Date],
        default: "2100-01-01",
      },
      show: {
        type: Boolean,
        default: false
      },
    },
    components: {
      BasePicker
    },
    data(){
      let startTime = moment(this.startTime)
      let endTime = moment(this.endTime)
      console.log(endTime)
      return {
        pickerData: [],
        selectedIndex: [0, 0, 0],
        selectedVal: [],
        startTimeObj: {
          year: startTime.year(),
          month: startTime.month(),
          day: startTime.date(),
        },
        endTimeObj: {
          year: endTime.year(),
          month: endTime.month(),
          day: endTime.date(),
        },
      };
    },
    created(){
    },
    mounted(){
      this.$nextTick(function (){
        this.init()
      });
    },
    filters: {},
    watch: {
      show(val){
        //在打开日期选择器的时候再进行初始化
        if ( val ) {
          this.$refs.basepicker.show()
          if ( !this.pickerData.length ) {
            this.init()
          }
        } else {
          this.$refs.basepicker.hide()
        }
      },
      value(val){
        this.changeSelectedIndexWithProp(val)
      }
    },
    computed: {},
    methods: {
      change(index, val){
        //滚轮选择的值改变，其余列表也做出相应变化
        const oldYear = this.pickerData[0][this.selectedIndex[0]].value
        const oldMonth = this.pickerData[1][this.selectedIndex[1]].value
        const newVal = this.pickerData[index][val].value
        if ( index === 0 ) { //年份改变
          if (
            this.isLeapYear(val) === !this.isLeapYear(oldYear)
            || oldYear === this.startTimeObj.year
            || oldYear === this.endTimeObj.year
            || newVal === this.startTimeObj.year
            || newVal === this.endTimeObj.year //如果年份的改变会影响月份或天数，则调用changeMonth
          ) {
            this.changeMonth(newVal, oldMonth)
          }
        } else if ( index === 1 ) { //月份改变
          this.changeDay(oldYear, newVal)
        }
        this.selectedIndex[index] = val
      },
      valueChange(val){
        function addZero(num){
          return (num < 10 ? '0' : '') + num
        }

        const result = `${val[0]}-${addZero(val[1] + 1)}-${addZero(val[2])}`
        this.$emit("confirm", result)
        this.$emit("input", result)
      },
      close(){
        this.$emit("cancel")
      },
      changeMonth(year, month){
        //年份改变影响月份
        const newMonthList = this.changeMonthList(year)
        const newMonthIndex = this.correctIndex(newMonthList, month)
        this.selectedIndex.splice(1, 1, newMonthIndex)
        this.changeDay(year, newMonthList[newMonthIndex].value || newMonthList[0].value)
      },
      changeDay(year, month){
        //月份改变影响天数
        let oldDayValue = 0
        if ( this.$lodash.get(this.pickerData[2], "length") ) {
          oldDayValue = this.pickerData[2][this.selectedIndex[2]].value
        }
        const newDayList = this.changeDayList(year, month)
        const newDayIndex = this.correctIndex(newDayList, oldDayValue)
        this.selectedIndex.splice(2, 1, newDayIndex)
      },
      changeMonthList(year){
        //根据当前年份改变月份列表
        const monthList = []
        let startMonth = 0
        let endMonth = 12

        if ( year === this.startTimeObj.year ) {
          startMonth = this.startTimeObj.month
        }
        if ( year === this.endTimeObj.year ) {
          endMonth = this.endTimeObj.month + 1
        }
        for ( let i = startMonth; i < endMonth; i++ ) {
          monthList.push({ value: i, text: i + 1 })
        }
        if ( !this.pickerData[1] ) {
          this.pickerData.push(monthList)
        } else {
          this.pickerData.splice(1, 1, monthList)
        }
        return monthList
      },
      changeDayList(year, month){
        //根据当前月份改变天数列表
        const daysInMonth = [31, { 'true': 29, 'false': 28 }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const dayList = []
        let startDay = 1
        let endDay = 0
        if ( month !== 1 ) {
          endDay = daysInMonth[month]
        } else {
          endDay = daysInMonth[month]['' + this.isLeapYear(year)]
        }
        if ( year === this.startTimeObj.year && month === this.startTimeObj.month ) {
          startDay = this.startTimeObj.day
        }
        if ( year === this.endTimeObj.year && month === this.endTimeObj.month ) {
          endDay = this.endTimeObj.day
        }
        for ( let i = startDay; i <= endDay; i++ ) {
          dayList.push({ value: i })
        }
        if ( !this.pickerData[2] ) {
          this.pickerData.push(dayList)
        } else {
          this.pickerData.splice(2, 1, dayList)
        }
        return dayList
      },
      correctIndex(newList, oldValue){
        //在列表发生变化时，纠正滚轮的selectedIndex
        if ( !oldValue ) {
          return 0
        }
        const newIndex = newList.findIndex((i) => i.value === oldValue)
        return newIndex === -1 ? 0 : newIndex
      },
      initYear(){
        const startYear = this.startTimeObj.year
        const periodYear = this.endTimeObj.year - this.startTimeObj.year + 1
        const yearList = []
        this.pickerData = []
        for ( let i = 0; i < periodYear; i++ ) {
          yearList.push({ value: startYear + i })
        }
        this.pickerData.push(yearList)
        this.changeMonth(startYear)
      },
      isLeapYear(year){
        //是否是闰年
        if ( !(year % 400) ) {
          return true
        } else if ( (year % 100) && (!(year % 4)) ) {
          return true
        } else {
          return false
        }
      },
      init(){
        this.initYear()
        this.$nextTick(() =>{
          this.changeSelectedIndexWithProp(this.time)
        })
      },
      changeSelectedIndexWithProp(time){
        //props发生变化时，做出相应改变
        if ( !time || moment(time).isBefore(this.startTime) || moment(time).isAfter(this.endTime) ) {
          //不合法的时间不予计算
          return
        }
        const m = moment(time)
        const year = m.year()
        const yearIndex = year - this.startTimeObj.year
        const month = m.month()
        const date = m.date()
        const monthList = this.changeMonthList(year)
        const monthIndex = this.correctIndex(monthList, month)
        const dayList = this.changeDayList(year, month)
        const dateIndex = this.correctIndex(dayList, date)
        this.selectedIndex = [yearIndex, monthIndex, dateIndex]
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
</style>