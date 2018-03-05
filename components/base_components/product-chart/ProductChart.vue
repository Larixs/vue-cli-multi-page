/**
* Created by lai on 2017/11/1.
* ProductChart 产品曲线图
* props *
* name               type             default        detail
* data               Array            []             通过/api/v1/data/simu/product/info取得的trend数据
* chartName          String           "净值走势"     曲线图的名称
* contrastIndexName  String           "沪深300指数"  对比曲线的名称
* productName        String            -             产品名称
* isShowTitle        Boolean           -             是否显示产品标题
* threshold          [Number,String]   1             绘制图表的最小数据量，如果小于这个阈值，则显示“暂无数据”
*/

<template>
  <div class="chart-wrapper">
    <div class="chart-title" v-if="isShowTitle">
      <span class="left">{{chartName}}</span>
      <span class="right">{{startTime || '--'}}至今</span>
    </div>
    <div
      v-if="data.length > thresholdNumber"
      class="chart-container"
    >
      <div
        v-if="productName"
        class="chart-product-name border-bottom-1px"
      >
        <h3>{{productName}}</h3>
      </div>
      <div
        :style="style"
        ref="chartDOM"
        id="chart">
      </div>
      <div class="dataFilters border-top-1px">
        <ul class="clearfix">
          <li
            v-for="filter in dataFilter"
            :key="filter.key"
            @click="drawChart(filter.key)"
          >
            <button
              :class="{activeFilter: activeFilter===filter.key}"
            >
              {{filter.name}}
            </button>
          </li>
        </ul>

      </div>
      <div class="chart-legend clearfix">
        <span class="legend"><i></i>本产品：{{lastPoint.point_1[1] | currency(2) | isNull | percentage}}</span>
        <span class="legend"><i></i>{{contrastIndexName}}：{{lastPoint.point_2[1] | currency(2) | isNull | percentage}} </span>
      </div>
    </div>
    <NoData v-else/>
  </div>

</template>
<script>
  import lodash from "lodash";
  import getChartConfig from "./config.js";
  import { NoData } from "base_components";

  export default {
    name: "ProductChart",
    props: {
      data: {
        type: Array,
        default: () => []
      },
      isShowTitle: {
        type: Boolean,
        default: true
      },
      contrastIndexName: {
        type: String,
        default: "沪深300指数"
      },
      chartName: {
        type: String,
        default: "净值走势"
      },
      productName: String,
      threshold: {
        type: [Number, String],
        default: 1
      }
    },
    components: {
      NoData
    },
    data: function (){
      const formattedData = this.formatData(this.data);
      const terminationDates = this.getTerminationDates();
      return {
        formattedData,
        filterCache: {},
        chartData: null,
        chartConfig: null,
        terminationDates: terminationDates,
        style: {
          height: 0,
          width: 0
        },
        dataFilter: [
          {
            name: "近半年",
            key: "halfYear"
          },
          {
            name: "近一年",
            key: "oneYear"
          },
          {
            name: "近三年",
            key: "threeYear"
          },
          {
            name: "成立以来",
            key: "all"
          }
        ],
        activeFilter: "",
        defaultFilter: "all"
      };
    },
    created: function (){
    },
    mounted: function (){
      this.$nextTick(function (){
        this.initChart();
      });
    },
    filters: {
      isNull: function (value){
        if ( !value || value === "undefined" || value === "-" || value === "NaN" ) {
          return "--";
        } else {
          return value;
        }
      },
      currency: function (value, i){
        return parseFloat(value).toFixed(i);
      },
      percentage: function (value){
        if ( value === "--" ) {
          return value;
        } else {
          return value + "%";
        }
      }
    },
    watch: {
      data: function (newVal){
        if ( !newVal.length ) {
          return;
        } else if ( newVal.length > (this.thresholdNumber || 1) ) {
          this.$nextTick(this.initChart);
          this.filterCache = {};
        }
      }
    },
    computed: {
      startTime: function (){
        const stamp = lodash.get(
          this.filterCache[this.activeFilter],
          "line_1[0][0]"
        );
        return Highcharts.dateFormat("%Y-%m-%d", stamp);
      },
      thresholdNumber(){
        return parseInt(this.threshold);
      },
      lastPoint(){
        const length = this.formattedData.line_1.length;
        if ( length ) {
          return {
            point_1: this.formattedData.line_1[length - 1],
            point_2: this.formattedData.line_2[length - 1]
          };
        } else {
          return {
            point_1: [],
            point_2: []
          };
        }
      }
    },
    methods: {
      getTerminationDates: function (){
        // 获取每个筛选条件的起始时间
        //        const originData = this.data
        //        const termination = new Date(originData[originData.length - 1].stamp)
        const termination = new Date(); //终点
        const ymd = {
          year: termination.getFullYear(),
          month: termination.getMonth(),
          day: termination.getDate()
        };
        const time = {
          halfYear: new Date(ymd.year, ymd.month - 6, ymd.day).getTime(),
          oneYear: new Date(ymd.year - 1, ymd.month, ymd.day).getTime(),
          threeYear: new Date(ymd.year - 3, ymd.month, ymd.day).getTime()
        }; //起点
        return time;
      },
      drawChart: function (filterType = this.defaultFilter,
                           data = this.formattedData,
                           contrastIndexName = this.contrastIndexName){
        //绘制图表
        this.activeFilter = filterType;
        if ( this.filterCache[filterType] ) {
          //如果有缓存，用缓存的，如果没有缓存，重新计算
          data = this.filterCache[filterType];
        } else {
          data = this.formatData(this.sliceData(filterType));
          this.filterCache[filterType] = data;
        }
        this.formattedData = data;
        const config = getChartConfig(data, contrastIndexName, filterType);
        new Highcharts.Chart(config);
      },
      setChartHeight: function (){
        // 设置图表高度
        const chartDOM = this.$refs.chartDOM;
        if ( !chartDOM ) {
          return false;
        }
        const width = chartDOM.clientWidth || window.innerWidth;
        this.style.width = width + "px";
        this.style.height = width * 0.55 + "px";
        return true;
      },
      initChart: function (){
        //初始化，必须要先设置高度，然后绘制图表
        if ( this.setChartHeight() ) {
          setTimeout(this.drawChart, 70); //设置延迟是为了确保一定设置过高度
        } else {
          setTimeout(this.initChart, 70);
        }
      },
      formatData: function (array){
        //整理数据
        const line_1 = [],
          line_2 = [],
          result = { line_1, line_2 };
        if ( !array || !Array.isArray(array) || !array.length ) {
          return result;
        }

        const y1_base = parseFloat(array[0].netvalue),
          y2_base = parseFloat(array[0].hsvalue);
        array.forEach(i =>{
          //Highcharts时间处理有问题，会把时间减少一天， 所以在这里手动增加一天
          let x = parseFloat(i.stamp) + 86400000;
          let y1 = parseFloat(
            ((parseFloat(i.netvalue) - y1_base) / y1_base * 100).toFixed(4)
          );
          let y2 = parseFloat(
            ((parseFloat(i.hsvalue) - y2_base) / y2_base * 100).toFixed(4)
          );
          line_1.push([x, y1]);
          line_2.push([x, y2]);
        });
        return result;
      },
      sliceData: function (filterType){
        //按筛选类型切割data
        let result = [];
        if (
          filterType === "all" ||
          !this.data.length ||
          this.data[0].stamp > this.terminationDates[filterType]
        ) {
          //无需切割的情况，包括筛选类型为“all”、data为空、当前数据的起始时间被包含在筛选区域内
          result = this.data;
        } else {
          const boundary = this.findBoundary(
            this.terminationDates[filterType],
            this.data
          );
          result = this.data.slice(boundary);
        }
        return result;
      },
      findBoundary: function (time, array){
        //寻找目标time所在的位置，或者离目标time最近的条目的位置。
        let boundary = 0;
        let offset = undefined; //与time的偏移值
        if ( Array.isArray(array) ) {
          array.some((i, index) =>{
            if ( i.stamp > time ) {
              //离目标日期最近的后一条数据
              boundary = index
              offset = i.stamp - time
              return true
            } else if ( +i.stamp === time ) {
              boundary = index
              offset = 0;
              return true
            }
          });
        }
        if ( offset === 0 ) {
          return boundary;
        } else if ( offset > 0 ) {
          //比对时间 取相对于准确时间点近的时间 如果一致取前面的一个天数
          return Math.abs(array[boundary - 1].stamp - time) > offset
            ? boundary
            : boundary - 1;
        } else {
          return boundary;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~static/css/variables_m";

  $activeProductColor: #9c9c9c;
  $productColor: #ff7837;

  .chart-wrapper {
    background-color: #fff;
    .chart-title {
      position: relative;
      height: 44px;
      line-height: 44px;
      text-align: left;
      @include border-bottom-1px();
      .left {
        color: $color-4;
        height: 16px;
        padding-left: 12px;
        margin-top: 14px;
        font-size: $font-3;
      }
      .right {
        float: right;
        padding-right: 12px;
        color: #505050;
        font-size: $font-7;
      }
    }
    .chart-product-name {
      padding: 16px;
      font-size: $font-5;
      color: #505050;
      h3 {
        text-align: center;
      }
    }
    #chart {
      padding-top: 10px;
    }
    .dataFilters {
      padding: 11px 6px;
      li {
        float: left;
        width: 25%;
        text-align: center;
        font-size: $font-7;
        button {
          display: inline-block;
          position: relative;
          padding: 2px 5px;
          background-color: transparent;
          color: $gray-7;
          border-radius: 20px;
          transition: all 0.3s;
          border: 1px solid transparent;
          outline: none;
          &.activeFilter {
            @include border-radius-1px-color(1px, 20px, $activeProductColor);
          }
        }
      }
    }
    .chart-legend {
      padding-bottom: 10px;
      font-size: $font-7;
      color: #838383;
      .legend {
        float: left;
        width: 50%;
        text-align: center;
        &:nth-child(1) {
          color: $productColor;
          i {
            background-image: url("~static/img/base_components/product-chart/product_legend.png");
          }
        }
        &:nth-child(2) i {
          background-image: url("~static/img/base_components/product-chart/constrast_legend.png");
        }
        i {
          display: inline-block;
          width: 18px;
          height: 8px;
          margin-top: -2px;
          margin-right: 8px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }
    }
    .no-data {
      text-align: center;
      color: $gray-6;
      padding: px2rem(40) 0;
      .no-data-img {
        width: 4.8rem;
      }
    }
  }
</style>
