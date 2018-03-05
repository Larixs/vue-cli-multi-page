/**
 * Created by lai on 2017/11/1.
 */
const options = {
  "halfYear":{
    formatStr: "%m-%d",
    num: 3,
  },
  "oneYear":{
    formatStr: "%m-%d",
    num: 3,
  },
  "threeYear":{
    formatStr: "%y-%m-%d",
    num: 4,
  },
  "all":{
    formatStr: "%y-%m-%d",
    num: 4,
  }
}
export default function getChartConfig(data, contrastIndexName, filterType = "all"){
  // const productColor = "#FEA365"
  const productColor = "#FF7837"
  const gridLineColor =  '#f3f3f3'
  const contrastProductColor = '#9c9c9c'

  const defaultConfig = {
    chart: {
      renderTo: "chart",  // chart 元素
      marginTop: 3,
      marginLeft: 40,
      style: {
        fontSize: '12px',
        fontWeight: 'normal',
        color: '#505050',
        backgroundColor: '#ffffff'
      },
    },
    title: {
      text: ''
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: productColor,
      borderRadius: 6,
      borderWidth: 1,
      shadow: false,
      hideDelay: 250,
      style: {
        padding: '2px',
        color: productColor,
        fontSize: 10
      },
      xDateFormat: '时间: %Y-%m-%d',
      pointFormat: `<span style="color:${productColor}">{series.name}</span>: {point.y: .2f}%<br/>`,
      shared: true,
      crosshairs: [{
        width: 1,
        color: productColor
      }]
    },
    xAxis: {
      ordinal: true, // 无数据的时间是否显示空间隔
      type: 'datetime',
      labels: { // 坐标轴标签
        align: 'center',
        x: -6,
        style: {
          fontSize: 8,
          color: '#838383'
        },
        overflow: 'justity',
        formatter: function (){
          return Highcharts.dateFormat(options[filterType].formatStr, this.value)
        }
      },
      lineWidth: 0,
      tickLength: 0,
      offset: 2,
      gridLineWidth: 1,
      gridLineColor: gridLineColor,
      gridLineDashStyle: 'Solid',
      alternateGridColor: '#fff',

      gridZindex: -1,
      tickPositioner: function (){
        // if(filterType==="halfYear"){
        //   console.log(this.ordinalPositions) //在点数量少时，为何this.ordinalPositions是undefined
        // }
        const positions = []
        let num,
          xdata = this.ordinalPositions;
        if ( !xdata ) {
          return;
        }
        num = options[filterType].num;
        for ( let i = 0; i < num; i++ ) {
          let x_axis = xdata[Math.round(xdata.length / num) * i];
          positions[i] = x_axis;
        }
        positions[0] = xdata[0];
        positions[num] = xdata[xdata.length - 1];
        return positions;
      }
    },
    yAxis: {
      ordinal: false,
      tickAmount: 5,
      title: {
        text: ''
      },
      maxPadding: 0.01,
      offset: -1,
      gridLineWidth: 1,
      gridLineColor: gridLineColor,
      labels: {
        x: -5,
        style: {
          color: '#838383',
          fontSize: '8px'
        },
        formatter: function (){
          return this.value + '%';
        }
      },
    },
    series: [{
      name: '本产品',
      type: 'area',
      data: data.line_1,
      lineWidth: 1,
      lineColor: productColor,
      threshold: null,
      marker: {
        lineColor: productColor
      },
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, Highcharts.Color(productColor).setOpacity(0.4).get('rgba')],
          [1, Highcharts.Color(productColor).setOpacity(0).get('rgba')]
        ]
      }
    }, {
      data: data.line_2,
      name: contrastIndexName,
      type: 'line',
      lineWidth: 1,
      lineColor: contrastProductColor,
      marker: {
        lineColor: contrastProductColor
      },
      connectNulls: true,
    }],
    plotOptions: {
      series: {
        color: 'transparent',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 0.5,
          fillColor: '#fff',
          zIndex: 100
        },
        states: {
          hover: {
            lineWidth: 1
          }
        }
      }
    },
    legend: { // 图例
      enabled: false,
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  }

  return defaultConfig
}