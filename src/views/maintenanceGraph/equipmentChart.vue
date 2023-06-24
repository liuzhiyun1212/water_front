<template>
  <div id="myChart" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "@/views/dashboard/mixins/resize";
import {listPlan,listAllPlan} from '../../api/system/plan'
import details from '../fix/details';
const animationDuration = 6000;
export default {
  inject: ["reload"],
  name: "hello",
  mixins: [resize],
  props: {
    required:true,
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
      default: "400px",
    },
  },
  data() {
    return {
      myChart:null,
      chart: null,
      option: null,
      dialogVisible:false,
      editValue: "",
      value1:"",
      msg: "Welcome to Your Vue.js App",
      plan:[],
      maintenancePlan:[],
      dataName:[],
      makingTime:[],
      beginTime:[],
      endTime:[],
      firstAuditTime:[],
      lastAuditTime:[],
      firstAcceptTime:[],
      lastAcceptTime:[],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getParamet();
    });
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    getBeginTime(){
      var j = 0;
      for(var i = 0;i<this.plan.length;i++){
        var a = this.plan[i].fixdate.split("至")
        console.log(a[0],a[1]);
        if (
          this.compareDate(a[0], "2022-09-12") &&
          this.compareDate("2022-10-12", a[0])
        ) {
          this.maintenancePlan[j] = this.plan[i];
          j++;
        }
      }
      console.log(this.maintenancePlan);
      this.dataName = [];
      this.beginTime = [];
      this.endTime = [];
      this.makingTime = [];
      this.firstAcceptTime = [];
      this.firstAuditTime = [];
      this.lastAuditTime = [];
      this.lastAcceptTime = [];
      for(var i = 0;i<this.maintenancePlan.length;i++){
        if(i == 2){
          break;
        }
        this.dataName[i] = this.maintenancePlan[i].name;
        // this.dataName.push(res.rows[i].name);
        var a = this.maintenancePlan[i].fixdate.split("至")
        this.endTime.push(a[1]);
        this.beginTime.push(a[0]);
        // this.endTime.push(new Date(res.rows[i]))
        this.makingTime.push(new Date(this.maintenancePlan[i].makingTime));
        if(this.maintenancePlan[i].firstAuditTime == "" || this.maintenancePlan[i].firstAuditTime == null){
          console.log(new Date());
          this.firstAuditTime.push(new Date())
        }else {
          this.firstAuditTime.push(new Date(this.maintenancePlan[i].firstAuditTime));
          if (this.maintenancePlan[i].lastAuditTime == "" || this.maintenancePlan[i].lastAuditTime == null){
            this.lastAuditTime.push(new Date(this.maintenancePlan[i].lastAuditTime));
          }else{
            this.lastAuditTime.push(new Date(this.maintenancePlan[i].lastAuditTime));
            if(this.maintenancePlan[i].firstAcceptTime =="" || this.maintenancePlan[i].firstAcceptTime ==null){
              this.firstAcceptTime.push(new Date())
            }else {
              this.firstAcceptTime.push(new Date(this.maintenancePlan[i].firstAcceptTime));
              if(this.maintenancePlan[i].lastAcceptTime =="" || this.maintenancePlan[i].lastAcceptTime ==null){
                this.lastAcceptTime.push(new Date())
              }else {
                this.lastAcceptTime.push(new Date(this.maintenancePlan[i].lastAcceptTime));
              }
            }
          }
        }
      }
      this.drawLine();
      // }

    },
    getParamet(){
      listAllPlan().then((res)=>{
        console.log(res.rows);
        res.rows = res.rows.slice(res.rows.length-2,res.rows.length);
        for(var i = 0;i<res.rows.length;i++){
          this.dataName[i] = res.rows[i].name;
          // this.dataName.push(res.rows[i].name);
          var a = res.rows[i].fixdate.split("至")
          this.endTime.push(a[1]);
          // this.beginTime.push(res.rows[i].makingTime);
          // this.endTime.push(new Date(res.rows[i]))
          this.makingTime.push(new Date(res.rows[i].makingTime));
          if(res.rows[i].firstAuditTime == "" || res.rows[i].firstAuditTime == null){
            console.log(new Date());
            this.firstAuditTime.push(new Date())
          }else {
            this.firstAuditTime.push(new Date(res.rows[i].firstAuditTime));
            if (res.rows[i].lastAuditTime == "" || res.rows[i].lastAuditTime == null){
              this.lastAuditTime.push(new Date())
            }else{
              this.lastAuditTime.push(new Date(res.rows[i].lastAuditTime));
              if(res.rows[i].firstAcceptTime =="" || res.rows[i].firstAcceptTime ==null){
                this.firstAcceptTime.push(new Date())
              }else {
                this.firstAcceptTime.push(new Date(res.rows[i].firstAcceptTime));
                if(res.rows[i].lastAcceptTime =="" || res.rows[i].lastAcceptTime ==null){
                  this.lastAcceptTime.push(new Date())
                }else {
                  this.lastAcceptTime.push(new Date(res.rows[i].lastAcceptTime));
                }
              }
            }
          }
        }
        console.log(this.dataName,this.makingTime,this.endTime);
        this.drawLine();
      })
    },
    drawLine() {
      const owner = this;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        // title: {
        //   text: "维保计划实施态势",
        //   padding: 1,
        //   textStyle: {
        //     fontSize: 17,
        //     fontWeight: "bolder",
        //     color: "#fff"
        //   },
        //   subtextStyle: {
        //     fontSize: 13,
        //     fontWeight: "bolder",
        //   }
        // },
        // color:['#1eeab1','#045b03','#f80a11','#dec301','#fc9912'],
        legend: {
          // type: 'scroll',
          // data: ["计划工期", "提交待审核阶段", "审核中阶段", "维保中阶段", "验收阶段"],
          data: [
            {
              name: '计划工期',
              // 强制设置图形为圆。
              icon: 'roundRect'
              // 设置文本为红色
            },
            {
              name: '提交待审核阶段',
              // 强制设置图形为圆。
              icon: 'roundRect'
              // 设置文本为红色
            },
            {
              name: '审核中阶段',
              // 强制设置图形为圆。
              icon: 'roundRect'
              // 设置文本为红色
            },
            {
              name: '维保中阶段',
              // 强制设置图形为圆。
              icon: 'roundRect'
              // 设置文本为红色
            },
            {
              name: '验收阶段',
              // 强制设置图形为圆。
              icon: 'roundRect'
              // 设置文本为红色
            }],
          align: 'right',
          show: true,
          // orient: 'horizontal',
          // orient: 'vertical',

          itemWidth: 10,
          itemHeight: 10,
          right: 5,
          // left: 10,
          // top: 50,
          // bottom:10,
          textStyle: {
            color: 'white',
            fontsize: 5
          },
          formatter: function(name) {
            if('计划工期'!==name){
              return name.slice(0, 2)
            }else{
              return name
            }
          },
          tooltip: {
            show: true
          }
        },

        grid: {
          containLabel: true,
          show: false,
          // right: 130,
          left: 10,
          bottom: 90,
          top: 15
        },
        xAxis: {
          type: "time",
          axisLabel: {
            "show": true,
            formatter: function (value, index) {
              let t_date = new Date(value)
              return [ t_date.getMonth() + 1, t_date.getDate()].join('-');
            },
            textStyle: {
              color: 'white'
            },
            "interval": 0,
          },
          splitLine:{
            show:false
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1, //这里是为了突出显示加上的
            }
          },
        },
        yAxis: {
          splitLine:{
            show:false,
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 1, //这里是为了突出显示加上的
            }
          },
          triggerEvent: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white'
            },
            formatter: function (value) {
              if (value.length > 3) {
                return `${value.slice(0, 3)}...`
              }
              return value
            },
            interval: 0,
            /*formatter: function(value, index) {
              var last = ""
              var max = 5;
              var len = value.length;
              var hang = Math.ceil(len / max);
              if (hang > 1) {
                for (var i = 0; i < hang; i++) {
                  var start = i * max;
                  var end = start + max;
                  var temp = value.substring(start, end) + "\n";
                  last += temp; //凭借最终的字符串
                }
                return last;
              } else {
                return value;
              }
            }*/
          },
          //维保计划名称
          data: this.dataName
        },
        tooltip: {
          trigger: "axis",
          // position: ['30%', '20%'],
          //解决显示不全的问题
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          },
          formatter: function(params) {
            var res = "";
            var name = "";
            var start0 = "";
            var start = "";
            var end0 = "";
            var end = "";
            for (var i in params) {
              var k = i % 2;
              if (!k) { //偶数
                start0 = new Date(params[i].data);
                start = start0.getFullYear() + "-" + (start0.getMonth() + 1) + "-" + start0.getDate();
              }
              if (k) { //奇数
                name = params[i].seriesName;
                end0 = new Date(params[i].data);
                end = end0.getFullYear() + "-" + (end0.getMonth() + 1) + "-" + end0.getDate();
                res += name + " : " + end + "~" + start + "</br>";

              }
            }
            return res;
          }
        },
        series: [{
          name: "计划工期",
          type: "bar",
          stack: "总量0",
          barWidth:"10",
          label: {
            normal: {
              show: false,
              color: "red",
              position: "right",
              formatter: function(params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: "skyblue",
              borderColor: "#fff",
              borderWidth: 1,
              barWidth:"5",
            }
          },
          zlevel: -1,
          //蓝色结束时间：顺序均为从下到上
          data: this.endTime
        },
          {
            name: "计划工期",
            type: "bar",
            barWidth:"10",
            stack: "总量0",
            itemStyle: {
              normal: {
                color: "rgb(10, 24, 99)",
              }
            },
            zlevel: -1,
            z: 3,
            //蓝色开始时间
            data: this.makingTime
          },
          {
            name: "提交待审核阶段",
            type: "bar",
            stack: "总量2",
            barWidth:"10",
            label: {
              normal: {
                show: false,
                color: "orange",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "green",
                // borderColor: "#fff",
                borderWidth: 2
              }
            },
            zlevel: -1,
            //绿色结束时间
            data: this.firstAuditTime
          },
          {
            name: "提交待审核阶段",
            type: "bar",
            stack: "总量2",
            barWidth:"10",
            itemStyle: {
              normal: {
                color: "rgba(10, 24, 99)",
              }
            },
            zlevel: -1,
            z: 3,
            //绿色开始时间
            data: this.makingTime
          },
          {
            name: "审核中阶段",
            type: "bar",
            stack: "总量3",
            barWidth:"10",
            label: {
              normal: {
                show: false,
                color: "pink",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "red",
                // borderColor: "#fff",
                borderWidth: 2
              }
            },
            zlevel: -1,
            //红色结束时间
            data: this.lastAuditTime
          },
          {
            name: "审核中阶段",
            type: "bar",
            stack: "总量3",
            barWidth:"10",
            itemStyle: {
              normal: {
                color: "rgba(10, 24, 99)"
              }
            },
            zlevel: -1,
            z: 3,
            //红色开始时间
            data: this.firstAuditTime
          },
          {
            name: "维保中阶段",
            type: "bar",
            stack: "总量5",
            barWidth:"10",
            label: {
              normal: {
                show: false,
                color: "white",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                // borderColor: "#fff",
                borderWidth: 2
              }
            },
            zlevel: -1,
            //黄色结束时间
            data: this.firstAcceptTime
          },
          {
            name: "维保中阶段",
            type: "bar",
            stack: "总量5",
            barWidth:"10",
            itemStyle: {
              normal: {
                color: "rgb(10, 24, 99)",
              }
            },
            zlevel: -1,
            z: 3,
            //黄色开始时间
            data: this.lastAuditTime
          },
          {
            name: "验收阶段",
            type: "bar",
            stack: "总量6",
            barWidth:"10",
            label: {
              normal: {
                show: false,
                color: "white",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'orange',
                // borderColor: "#fff",
                borderWidth: 2
              }
            },
            zlevel: -1,
            //橙色结束时间
            data: this.lastAcceptTime
          },
          {
            name: "验收阶段",
            type: "bar",
            stack: "总量6",
            barWidth:"10",
            itemStyle: {
              normal: {
                color: 'rgb(10, 24, 99)',
              }
            },
            zlevel: -1,
            z: 3,
            //橙色开始时间
            data: this.firstAcceptTime
          },
        ]
      });
      this.extension(this.myChart);
      this.myChart.on('click',  function(param) {
        //这个params可以获取你要的图中的当前点击的项的参数
        console.dir(param)
        // window.location.href="/life/life/equipmentTotally";
        // this.toPlan(param)
        owner.toPlan(param);
      });
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
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
        if (params.componentType == 'yAxis') {
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
            // console.log('22', xx)
            elementDiv.style.top = yy + 'px'
            elementDiv.style.left = xx + 'px'
          }
        }
      })
      chart.on('mouseout', function (params) {
        //注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType == 'yAxis') {
          var elementDiv = document.querySelector('#extension')

          elementDiv.style.cssText = 'display:none'
        }
      })
    },
    toPlan(param){
      this.$router.push({
        path: "/mainplan/life/equipmentChart",
        query: {
          planname: param.name,
        },
      });
      /*this.editValue = param;
      this.dialogVisible = true;
      localStorage.setItem("dialogHeight", 110);*/
    },
    closeDialog(text) {
      this.dialogVisible = text;
      this.editValue = null;
    },
    closeTable() {
      this.dialogVisible = false;
      // location.reload();
      this.reload();
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
    //判断两个日期大小
    compareDate(d1, d2) {
      //判断两个日期的大小
      let reg = new RegExp("-", "g");
      if (new Date(d1.replace(reg, "/")) > new Date(d2.replace(reg, "/"))) {
        console.log("第一个大");
        return true;
      } else {
        console.log("第二个大");
        return false;
      }
    },
  },
};
</script>
