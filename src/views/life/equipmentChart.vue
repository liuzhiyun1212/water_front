<template>
  <div>
    <el-dialog
      title="维保计划详情"
      :visible.sync="dialogVisible"
      width="80%"
      :show-close="false"
    >
      <el-button type="primary" @click="closeTable()" style="float: right"
      >关 闭</el-button
      >
      <details :editValue="editValue" @dialogClose="closeDialog" />
    </el-dialog>
    <el-card
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
    <p style="font-family: Arial; display: inline-block; margin-left: 10px">维保计划制定时间：</p>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" style="margin-left: 10px;" @click="getBeginTime()">筛选</el-button>
    </el-card>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div id="myChart" :style="{ width: '95%', height: '450px' }"></div>
    </el-card>
  </div>

</template>

<script>
import {listPlan,listAllPlan} from '../../api/system/plan'
import * as echarts from "echarts";
import details from '../fix/details';
// 引入提示框和title组件
export default {
  inject: ["reload"],
  name: "hello",
  components:{
    details
  },
  data() {
    return {
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
    this.getParamet();
    this.drawLine();
  },
  methods: {
    getBeginTime(){
      // alert(this.value1);
      this.maintenancePlan = [];
      if(this.value1 == null){
        this.getParamet()
      }else {
        var mindata = this.formatDate(this.value1[0]);
        var maxdata = this.formatDate(this.value1[1]);
        var j = 0;
        listAllPlan().then((res)=>{
          this.plan = res.rows;
          for(var i = 0;i<this.plan.length;i++){
            var a = this.plan[i].fixdate.split("至")
            console.log(a[0],a[1]);
            if (
              this.compareDate(this.plan[i].makingTime, mindata) &&
              this.compareDate(maxdata, this.plan[i].makingTime)
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
            this.dataName[i] = this.maintenancePlan[i].name;
            // this.dataName.push(res.rows[i].name);
            var a = this.maintenancePlan[i].fixdate.split("至")
            this.endTime.push(a[1]);
            this.beginTime.push(a[0]);
            // this.endTime.push(new Date(res.rows[i]))
            this.makingTime.push(new Date(this.maintenancePlan[i].makingTime));

            if(this.maintenancePlan[i].firstAuditTime == "" || this.maintenancePlan[i].firstAuditTime == null || this.maintenancePlan[i].state == "未提交"){
              console.log(new Date());
              this.firstAuditTime.push(new Date())
              this.lastAuditTime.push("");

              this.firstAcceptTime.push("");
              this.lastAcceptTime.push("");
            }else {
              this.firstAuditTime.push(new Date(this.maintenancePlan[i].firstAuditTime));
              if (this.maintenancePlan[i].lastAuditTime == "" || this.maintenancePlan[i].lastAuditTime == null){
                this.lastAuditTime.push(new Date());
                this.firstAcceptTime.push("");
                this.lastAcceptTime.push("");
              }else{
                this.lastAuditTime.push(new Date(this.maintenancePlan[i].lastAuditTime));
                if(this.maintenancePlan[i].firstAcceptTime =="" || this.maintenancePlan[i].firstAcceptTime ==null || this.maintenancePlan.state == "维保中"){
                  this.firstAcceptTime.push(new Date())
                  this.lastAcceptTime.push("");
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

            /*this.firstAuditTime.push(new Date(this.maintenancePlan[i].firstAuditTime));
            this.lastAuditTime.push(new Date(this.maintenancePlan[i].lastAuditTime));
            this.firstAcceptTime.push(new Date(this.maintenancePlan[i].firstAcceptTime));
            this.lastAcceptTime.push(new Date(this.maintenancePlan[i].lastAcceptTime));*/
          }
          this.drawLine();
        })
      }

    },
    getParamet(){
      this.dataName = [];
      this.beginTime = [];
      this.endTime = [];
      this.makingTime = [];
      this.firstAcceptTime = [];
      this.firstAuditTime = [];
      this.lastAuditTime = [];
      this.lastAcceptTime = [];
      listAllPlan().then((res)=>{
        console.log(res.rows);
        res.rows = res.rows.slice(res.rows.length-3,res.rows.length);
        for(var i = 0;i<res.rows.length;i++){
          this.plan = res.rows;
          this.dataName[i] = res.rows[i].name;
          // this.dataName.push(res.rows[i].name);
          var a = res.rows[i].fixdate.split("至")
          this.endTime.push(a[1]);
          this.beginTime.push(a[0]);
          // this.endTime.push(new Date(res.rows[i]))
          this.makingTime.push(new Date(res.rows[i].makingTime));
          if(res.rows[i].firstAuditTime == "" || res.rows[i].firstAuditTime == null || res.rows[i].state == "未提交"){
            console.log(new Date());
            this.firstAuditTime.push(new Date())
            this.lastAuditTime.push("");
            this.firstAcceptTime.push("");
            this.lastAcceptTime.push("");
          }else {
            this.firstAuditTime.push(new Date(res.rows[i].firstAuditTime));
            if (res.rows[i].lastAuditTime == "" || res.rows[i].lastAuditTime == null){
              this.lastAuditTime.push(new Date())
              this.firstAcceptTime.push("");
              this.lastAcceptTime.push("");
            }else{
              this.lastAuditTime.push(new Date(res.rows[i].lastAuditTime));
              if(res.rows[i].firstAcceptTime =="" || res.rows[i].firstAcceptTime ==null || res.rows[i] == "维保中"){
                this.firstAcceptTime.push(new Date())
                this.lastAcceptTime.push("");
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
        console.log(this.lastAuditTime);
        console.log(this.formatDate(this.lastAuditTime[0]));
        console.log(this.formatDate(this.lastAuditTime[1]));
        console.log(this.formatDate(this.lastAuditTime[2]));
        this.drawLine();
      })
    },
    drawLine() {
      const owner = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        title: {
          text: "维保计划实施",
          padding: 20,
          textStyle: {
            fontSize: 17,
            fontWeight: "bolder",
            color: "#333"
          },
          subtextStyle: {
            fontSize: 13,
            fontWeight: "bolder"
          }
        },
        legend: {
          data: ["计划工期", "提交待审核阶段", "审核中阶段", "维保中阶段", "验收阶段"],
          align: "right",
          right: 80,
          top: 50
        },
        grid: {
          containLabel: true,
          show: false,
          right: 130,
          left: 40,
          bottom: 40,
          top: 90
        },
        xAxis: {
          type: "time",
          axisLabel: {
            "show": true,
            "interval": 0
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function(value, index) {
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
            }
          },
          //维保计划名称
          data: this.dataName
        },
        tooltip: {
          trigger: "axis",
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
          label: {
            normal: {
              show: true,
              color: "#000",
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
              borderWidth: 2
            }
          },
          zlevel: -1,
          //蓝色结束时间：顺序均为从下到上
          data: this.endTime
        },
          {
            name: "计划工期",
            type: "bar",
            stack: "总量0",
            itemStyle: {
              normal: {
                color: "white",
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
            label: {
              normal: {
                show: true,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "green",
                borderColor: "#fff",
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
            itemStyle: {
              normal: {
                color: "white",
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
            label: {
              normal: {
                show: true,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "red",
                borderColor: "#fff",
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
            itemStyle: {
              normal: {
                color: "white"
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
            label: {
              normal: {
                show: true,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                borderColor: "#fff",
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
            itemStyle: {
              normal: {
                color: "white",
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
            label: {
              normal: {
                show: true,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'orange',
                borderColor: "#fff",
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
            itemStyle: {
              normal: {
                color: 'white',
              }
            },
            zlevel: -1,
            z: 3,
            //橙色开始时间
            data: this.firstAcceptTime
          },
        ]
      });
      myChart.on('click',  function(param) {
        //这个params可以获取你要的图中的当前点击的项的参数
        console.dir(param)
        // window.location.href="/life/life/equipmentTotally";
        // this.toPlan(param)
        owner.toPlan(param);
      });
    },
    toPlan(param){
      this.$router.push({
        path: "/mainplan/fix/details",
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
      if (new Date(d1.replace(reg, "/")) >= new Date(d2.replace(reg, "/"))) {
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
