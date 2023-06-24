<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
// require('echarts/theme/macarons') // echarts theme
import resize from "@/views/dashboard/mixins/resize";
import { getChartData } from "@/api/deal/deal";
const animationDuration = 6000;
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      option: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initGraph();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initGraph() {
      getChartData().then((res) => {
        console.log("==========");
        console.log(res);
        var arr = [];
        var detail = [];
        var map = res.troubleMap;
        for (var key in map) {
          console.log("map[" + key + "]" + map[key]);
          arr.push(key);
          detail.push({
            type: "bar",
            data: map[key],
            coordinateSystem: "polar",
            name: key,
            stack: "a",
            emphasis: {
              focus: "series",
            },
          });
        }
        this.option = {
          angleAxis: {
            type: "category",
            triggerEvent: true,
            data: res.devNameList,
            show: true,
            axisLabel: {
              formatter: function (value) {
                if (value.length > 3) {
                  return `${value.slice(0, 3)}...`
                }
                return value
              },
            },
          },
          radiusAxis: {
          },
          tooltip: {
            trigger: 'item'
          },
          polar: {
            center:['50%','45%']
          },
          series:
            detail,

          color: ["#5470C6","#73C0DE", "#FAC858"],
          textStyle: {
                color: "white",
                    },
          legend: {
            show: true,
            bottom:0,
            textStyle: {
                color: "white",
                fontSize:12,
                    },
            data: arr,
          },
        };

        this.chart = echarts.init(this.$el);
        this.chart.setOption(this.option);
        this.extension(this.chart)
        var owner = this;
        this.chart.on('click',  function(param) {
          //这个params可以获取你要的图中的当前点击的项的参数
          console.dir(param)
          // window.location.href="/life/life/equipmentTotally";
          // this.toPlan(param)
          owner.toPlan(param);
        });
      });
    },
    extension(chart) {
      // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType == 'xAxis'改为yAxis
      // 判断是否创建过div框,如果创建过就不再创建了
      // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
      var elementDiv = document.getElementById('extension')
      if (!elementDiv) {
        var div = document.createElement('div')
        div.setAttribute('id', 'extension')
        div.style.display = 'block'
        document.querySelector('html').appendChild(div)
      }
      chart.on('mouseover', function (params) {
        if (params.componentType == 'angleAxis') {
          var elementDiv = document.querySelector('#extension')
          //设置悬浮文本的位置以及样式
          var elementStyle =
            'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
          elementDiv.style.cssText = elementStyle
          elementDiv.innerHTML = params.value
          document.querySelector('html').onmousemove = function (event) {
            var elementDiv = document.querySelector('#extension')
            var xx = event.pageX - 10
            var yy = event.pageY + 15
            elementDiv.style.top = yy + 'px'
            elementDiv.style.left = xx + 'px'
          }
        }
      })
      chart.on('mouseout', function (params) {
        //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType == 'angleAxis') {
          var elementDiv = document.querySelector('#extension')

          elementDiv.style.cssText = 'display:none'
        }
      })
    },
    toPlan(param){
      this.$router.push({
        path: "/life/faultStatistics",
      });
    },
    // getmainOption() {
    //   getCasePlaneEvent().then((result) => {
    //     var data = {
    //       highLevelCountList: [],
    //       middleLevelCountList: [],
    //       lowLevelCountList: [],
    //       planeTypeNameList: [],
    //     };
    //     var list = result.datalist;
    //     for (var key in list) {
    //       data.highLevelCountList.push(list[key]["事故"]);
    //       data.middleLevelCountList.push(list[key]["较大问题"]);
    //       data.lowLevelCountList.push(list[key]["事故征候"]);
    //       data.planeTypeNameList.push(key);
    //     }
    //     var option = {
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       textStyle: {
    //         color: "#000",
    //         // fontSize: 52,
    //         fontWeight: "bold",
    //       },
    //       center: [120, 120],
    //       grid: {
    //         left: 0,
    //         top: 0,
    //         right: 0,
    //         bottom: 0,
    //       },
    //       animationDurationUpdate: 1000,
    //       universalTransition: true,
    //       angleAxis: {
    //         type: "category",
    //         data: data.planeTypeNameList,
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       radiusAxis: {
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         splitLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       polar: {},
    //       series: [
    //         {
    //           type: "bar",
    //           data: data.lowLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故征候",
    //           stack: "a",
    //           color: "yellow",
    //         },
    //         {
    //           type: "bar",
    //           data: data.middleLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "较大问题",
    //           stack: "a",
    //           color: "orange",
    //         },
    //         {
    //           type: "bar",
    //           data: data.highLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故",
    //           stack: "a",
    //           color: "red",
    //         },
    //       ],
    //       legend: {
    //         show: true,
    //         top: "bottom",
    //         textStyle: {
    //           color: "#000",
    //           // fontSize: 15,
    //           fontWeight: "bold",
    //         },
    //         data: ["事故征候", "较大问题", "事故"],
    //         padding: 0,
    //       },
    //     };
    //     this.mainOption = option;
    //   });
    // },
    // isnitGraph() {
    //   this.chart = echarts.init(this.$el);
    //   getCasePlaneEvent().then((result) => {
    //     var data = {
    //       highLevelCountList: [],
    //       middleLevelCountList: [],
    //       lowLevelCountList: [],
    //       planeTypeNameList: [],
    //     };
    //     var list = result.datalist;
    //     for (var key in list) {
    //       data.highLevelCountList.push(list[key]["事故"]);
    //       data.middleLevelCountList.push(list[key]["较大问题"]);
    //       data.lowLevelCountList.push(list[key]["事故征候"]);
    //       data.planeTypeNameList.push(key);
    //     }
    //     var option = {
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       textStyle: {
    //         color: "#000",
    //         // fontSize: 52,
    //         fontWeight: "bold",
    //       },
    //       center: [120, 120],
    //       grid: {
    //         left: 0,
    //         top: 0,
    //         right: 0,
    //         bottom: 0,
    //       },
    //       // toolbox: {
    //       //   show: true,
    //       //   feature: {
    //       //     restore: { show: true },
    //       //     saveAsImage: { show: true },
    //       //   },
    //       // },
    //       animationDurationUpdate: 1000,
    //       universalTransition: true,
    //       angleAxis: {
    //         type: "category",
    //         data: data.planeTypeNameList,
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       radiusAxis: {
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         splitLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       polar: {},
    //       series: [
    //         {
    //           type: "bar",
    //           data: data.lowLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故征候",
    //           stack: "a",
    //           color: "yellow",
    //         },
    //         {
    //           type: "bar",
    //           data: data.middleLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "较大问题",
    //           stack: "a",
    //           color: "orange",
    //         },
    //         {
    //           type: "bar",
    //           data: data.highLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故",
    //           stack: "a",
    //           color: "red",
    //         },
    //       ],
    //       legend: {
    //         show: true,
    //         top: "bottom",
    //         textStyle: {
    //           color: "#000",
    //           // fontSize: 15,
    //           fontWeight: "bold",
    //         },
    //         data: ["事故征候", "较大问题", "事故"],
    //         padding: 0,
    //       },
    //     };
    //     this.mainOption = option;
    //     this.chart.setOption(this.mainOption);
    //     const _this = this;
    //     this.chart.on("click", function (params) {
    //       console.log(_this.clickMsg);
    //       console.log("params");
    //       console.log(params);
    //       // var clickParam = params.name;
    //       _this.clickMsg = { name: params.name, type: params.componentSubType };
    //       console.log(_this.clickMsg);
    //     });
    //   });
    // },
    // changeToRader() {
    //   getCasePlaneFaultModel(this.clickMsg.name).then((result) => {
    //     console.log(result);
    //     var maxNum = 0;
    //     var radarChartData = {
    //       data: [],
    //     };
    //     result.data.forEach((item) => {
    //       radarChartData.data.push({
    //         value: item.caseNum,
    //         name: item.faultmodelName,
    //       });
    //     });
    //     console.log(radarChartData);
    //     var option = {
    //       title: {
    //         text: this.clickMsg.name + "各类型故障案例数量",
    //         top: "bottom",
    //         left: "left",
    //       },
    //       legend: {
    //         top: "top",
    //         left: "center",
    //         type: "scroll",
    //       },
    //       // toolbox: {
    //       //   show: true,
    //       //   // feature: {
    //       //   //   mark: { show: true },
    //       //   //   dataView: { show: true, readOnly: false },
    //       //   //   restore: { show: true },
    //       //   //   saveAsImage: { show: true },
    //       //   // },
    //       // },
    //       series: [
    //         {
    //           type: "pie",
    //           radius: [30, 100],
    //           center: ["50%", "50%"],
    //           roseType: "area",
    //           // itemStyle: {
    //           //   borderRadius: 5,
    //           // },
    //           label: {
    //             formatter: "{b}:\n 共计{c}例",
    //           },
    //           data: radarChartData.data,
    //         },
    //       ],
    //     };
    //     this.raderOption = option;
    //     this.chart.setOption(this.raderOption, true);
    //     this.clickMsg = null;
    //   });
    // },
    // changeToMain() {
    //   getCasePlaneEvent().then((result) => {
    //     var data = {
    //       highLevelCountList: [],
    //       middleLevelCountList: [],
    //       lowLevelCountList: [],
    //       planeTypeNameList: [],
    //     };
    //     var list = result.datalist;
    //     for (var key in list) {
    //       data.highLevelCountList.push(list[key]["事故"]);
    //       data.middleLevelCountList.push(list[key]["较大问题"]);
    //       data.lowLevelCountList.push(list[key]["事故征候"]);
    //       data.planeTypeNameList.push(key);
    //     }
    //     var option = {
    //       tooltip: {
    //         trigger: "axis",
    //       },
    //       textStyle: {
    //         color: "#000",
    //         // fontSize: 52,
    //         fontWeight: "bold",
    //       },
    //       center: [120, 120],
    //       grid: {
    //         left: "center",
    //       },
    //       // toolbox: {
    //       //   show: true,
    //       //   feature: {
    //       //     restore: { show: true },
    //       //     saveAsImage: { show: true },
    //       //   },
    //       // },
    //       animationDurationUpdate: 1000,
    //       universalTransition: true,
    //       angleAxis: {
    //         type: "category",
    //         data: data.planeTypeNameList,
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       radiusAxis: {
    //         axisLabel: {
    //           textStyle: {
    //             color: "#000",
    //           },
    //         },
    //         splitLine: {
    //           lineStyle: {
    //             color: "#000",
    //           },
    //         },
    //       },
    //       polar: {},
    //       series: [
    //         {
    //           type: "bar",
    //           data: data.lowLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故征候",
    //           stack: "a",
    //           color: "yellow",
    //         },
    //         {
    //           type: "bar",
    //           data: data.middleLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "较大问题",
    //           stack: "a",
    //           color: "orange",
    //         },
    //         {
    //           type: "bar",
    //           data: data.highLevelCountList,
    //           coordinateSystem: "polar",
    //           name: "事故",
    //           stack: "a",
    //           color: "red",
    //         },
    //       ],
    //       legend: {
    //         show: true,
    //         top: "bottom",
    //         textStyle: {
    //           color: "#000",
    //           // fontSize: 15,
    //           fontWeight: "bold",
    //         },
    //         data: ["事故征候", "较大问题", "事故"],
    //         padding: 0,
    //       },
    //     };
    //     this.mainOption = option;
    //     this.chart.setOption(this.mainOption, true);
    //     this.clickMsg = null;
    //   });
    // },
  },
};
</script>
