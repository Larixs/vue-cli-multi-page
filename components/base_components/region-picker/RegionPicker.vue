/**
* Created by lai on 2017/12/28.
*
*  目前使用regionTreeSimple.json。
*  这是一个数组形式的树，json结构形如：
* [
*  [ 省0, [ [ 市00, [ 区000 ] ], [ 市01, [ 区010, 区011 ] ] ]
*  [ 省1, [ [ 市10, [ 区100 ] ], [ 市11, [ 区110 ] ] ]
* ]
*  树结构图示：
*               regionTreeSimple.json
*                       |
*  —————————————————————
*  |                                         |
*  省0                                       省1
*  |————————                         |————————
*  |               |                         |               |
*  市00            市01                      市10            市11
*  |               |——————             |               |
*  |               |           |             |               |
*  区000           区010       区011         区100           区110
*
*

* props *
* name          type                default                                   detail
* value         Object              {province:"",city:"",county:""}           选定地区
* show          Boolean             false                                     控制显示隐藏

* emit *
* event     triggerTime                           return
* cancel    点击“取消”按钮、点击外面的遮罩      false
* confirm   点击“确定”触发。                    当前选定的地区。
* input     点击“确定”触发。                    当前选定的地区。 (允许有v-model语法糖)

*/
<template>
  <BasePicker
    ref="basepicker"
    :data="pickerData"
    :selectedIndex="selectedIndex"
    :styleRules="basePickerStyleRules"
    @valuechange="valueChange"
    @change="change"
    @hide="close"
  />
</template>
<script>
  import * as utils from "components/utils"
  import { BasePicker } from "base_components"
  import region from './regionTreeSimple.json'

  export default {
    name: "RegionPicker",
    props: {
      value: {
        type: [Object, String],
        default: () => ({
          province: "",
          city: "",
          county: "",
        })
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
      return {
        pickerData: [[], [], []],
        selectedIndex: [0, 0, 0],
        selectedVal: [],
        basePickerStyleRules: {
          wrapperStyle: {
            padding: 0
          },
          optionStyle: {
            fontSize: utils.px2rem(14)
          }
        }
      };
    },
    created(){
      this.init()
      this.changeSelectedIndexWithProp(this.value)
    },
    mounted(){

    },
    filters: {},
    watch: {
      show(val){
        if ( val ) {
          this.$refs.basepicker.show()
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
        if ( index === 0 ) {
          this.changeCityList(region[val])
        } else if ( index === 1 ) {
          this.changeCountyList(region[this.selectedIndex[0]][1][val])
        }
        this.selectedIndex.splice(index, 1, val)
      },
      valueChange(val){
        const result = {
          province: val[0],
          city: val[1],
          county: val[2],
        }
        this.$emit("confirm", result)
        this.$emit("input", result)
      },
      close(){
        this.$emit("cancel")
      },
      changeCityList(province, selectedCityIndex = 0, selectedCountyIndex = 0){
        //根据省份province获取对应的城市列表
        //province[1] 当前省的所有市
        const cityList = province[1].map(i => ({
          value: i[0]
        }))
        this.pickerData.splice(1, 1, cityList)
        this.selectedIndex.splice(1, 1, selectedCityIndex)
        this.changeCountyList(province[1][selectedCityIndex], selectedCountyIndex)
      },
      changeCountyList(city, selectedCountyIndex = 0){
        //根据城市city获取对应的区列表
        //city[1] 当前市的所有区
        const county = city[1].map(i => ({
          value: i
        }))
        this.pickerData.splice(2, 1, county)
        this.selectedIndex.splice(2, 1, selectedCountyIndex)
      },
      initProvince(){
        //获取所有省份
        const provinceList = region.map(i => ({
          value: i[0],
        }))
        this.pickerData.splice(0, 1, provinceList)
        this.changeCityList(region[0])
      },
      init(){
        //整个组件初始化
        this.initProvince()
      },
      changeSelectedIndexWithProp(val){
        //当props中的value改变时，重新计算省、市、区列表
        if ( val === "" || !val.province ) {
          return
        }

        function getValidIndex(index){
          return index === -1 ? 0 : index
        }

        let province, city, provinceIndex, cityIndex, countyIndex
        province = region.find(i => i[0] === val.province)
        provinceIndex = getValidIndex(region.findIndex(i => i[0] === val.province))
        if ( province ) {
          city = province[1].find(i => i[0] === val.city)
          cityIndex = getValidIndex(province[1].findIndex(i => i[0] === val.city))
          if ( city ) {
            countyIndex = getValidIndex(city[1].findIndex(i => i === val.county))
          }
        }
        this.selectedIndex.splice(0, 3, provinceIndex, cityIndex, countyIndex)
        this.selectedIndex.splice(0, 3, provinceIndex, cityIndex, countyIndex)
        this.changeCityList(province, cityIndex, countyIndex)
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";
</style>
