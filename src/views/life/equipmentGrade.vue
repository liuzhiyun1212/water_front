<template>
  <div class="row">
    <div class="col-lg-7 col-md-7">
      <div class="card">
        <span :style="{'font-size': '0.5rem','color':'white'}">今日任务 : </span>
        <span :style="{'font-size': '0.5rem','color':'white'}">设备报废 </span>
        <span :style="{'font-size': '1.5rem','color': '#ffeb7b','padding': '.05rem 0','font-family': 'STLiti','font-weight': 'bold'}">  {{todaybaofei}} </span>
        <span :style="{'font-size': '0.5rem','color':'white'}">审核 </span>
        <span :style="{'font-size': '1.5rem','color': '#ffeb7b','padding': '.05rem 0','font-family': 'STLiti','font-weight': 'bold'}">  {{todayshenhe}} </span>
        <span :style="{'font-size': '0.5rem','color':'white'}">维保 </span>
        <span :style="{'font-size': '1.5rem','color': '#ffeb7b','padding': '.05rem 0','font-family': 'STLiti','font-weight': 'bold'}">  {{todayweixiu}} </span>
        <span :style="{'font-size': '0.5rem','color':'white'}">验收 </span>
        <span :style="{'font-size': '1.5rem','color': '#ffeb7b','padding': '.05rem 0','font-family': 'STLiti','font-weight': 'bold'}">  {{todayyanshou}} </span>
        <div class="chart" :style="{height:height}" style="background: #0A1863" id="container"></div>
      </div>
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts'
import {listAllPlan, listPlan} from '../../api/system/plan'
import { listAllDevtable } from '../../api/system/devtable'
import { getUserProfile } from '@/api/system/user'
import moment from 'moment'
// 引入提示框和title组件
export default {
  props:{
    height:String,
  },
  data() {
    return {
      date: '',
      month: '',
      startTime: '',
      endTime: '',
      planTimes: [],
      todaybaofei:0,
      todayshenhe:0,
      todayweixiu:0,
      todayyanshou:0,
      pqueryParams: {
        pageNum: 1,
        pageSize: 10,
        id:null,
        name: null,
        makingTime: null,
        state: null,
        chargePeople: null,
        auditProcess: null,
        maintenanceWay: null,
        level: null,
        equipmentData: null,
        maintenanceContent: null,
        maintenanceCase: null,
        parts: null,
        previousPic: null,
        subsequentPic: null,
        budget: null,
        company: null,
        applyAccessory: null,
        auditAccessor: null,
        checkAccessor: null,
        executePeople: null,
        fixdate: null,
        checkPeople: null,
        auditMessage: null,
        acceptMessage: null,
        acceptPeople: null,
        firstAuditTime: null,
        lastAuditTime: null,
        firstAcceptTime: null,
        lastAcceptTime: null,
        checkProcess:null,
        workCard:null
      },
      dqueryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        addTime: null,
        editTime: null,
        orgId: null,
        tenantId: null,
        userId: null,
        devAttrTypeId: null,
        devCode: null,
        devName: null,
        file: null,
        location: null,
        manufacturer: null,
        markStatus: null,
        model: null,
        useOrg: null,
        useStatus: null,
        devAttrName: null,
        devAttrCode: null,
        lastRepaireTime: null,
        purchaseData: null,
        installData: null,
        startData: null,
        useTime: null,
        runningTime: null,
        ageLimit: null,
        equipmentPicture: null,
        equipmentIntroduction: null,
      },
      daynumber:0,
      dataList:[],
      username:null
    }
  },
  mounted() {
    getUserProfile().then(response => {
      this.username = response.data.userName
      if(this.username=="admin"){
        this.getData()
      }else{
        this.getData1()
      }
    })
  },
  created() {
  },
  methods: {
    getData(){
      this.todaybaofei=0
      this.todayshenhe=0
      this.todayweixiu=0
      this.todayyanshou=0
      this.getNumData()
      var time = null;
      var shenehlist = []
      var weixiulist = []
      var yanshoulist = []
      let yy = this.date.getFullYear();
      let mm = this.date.getMonth()+1< 10 ? '0'+(this.date.getMonth()+1) : this.date.getMonth()+1;
      listAllPlan(this.queryParams).then(response1 => {
        listAllDevtable(this.dqueryParams).then(response2 => {
          for(let i =0;i<response1.rows.length;i++){
            if(response1.rows[i].state == "待审核"){
              this.todayshenhe++
              shenehlist.push(response1.rows[i].name)
            }
            else if(response1.rows[i].state == "审核中"){
              this.todayshenhe++
              shenehlist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "维保中"){
              this.todayweixiu++
              weixiulist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "待验收"){
              this.todayyanshou++
              yanshoulist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "验收中"){
              this.todayyanshou++
              yanshoulist.push(response1.rows[i].name)
            }
          }
          var todaynum = this.date.getDate()
          for(let ii =1;ii<this.daynumber+1;ii++){
            if(ii<todaynum){
              this.dataList.push([])
            }else if(ii==todaynum){
              let dd = ii< 10 ? '0'+ii : ii;
              time = yy+'-'+mm+'-'+dd;
              let baofeilist = []
              for(let a =0;a<response2.rows.length;a++){
                if(time==response2.rows[a].ageLimit){
                  this.todaybaofei++
                  baofeilist.push(response2.rows[a].devName)
                }
              }
              this.dataList.push([
                { name: '设备报废', value: this.todaybaofei,list:baofeilist ,label:{show: true,},labelLine: {show: true}},
                { name: '审核', value: this.todayshenhe,list:shenehlist ,label:{show: true,},labelLine: {show: true}},
                { name: '维保', value: this.todayweixiu,list:weixiulist ,label:{show: true,},labelLine: {show: true}},
                { name: '验收', value: this.todayyanshou,list:yanshoulist ,label:{show: true,},labelLine: {show: true}}
              ])
            }else if(ii>todaynum){
              let dd = ii< 10 ? '0'+ii : ii;
              time = yy+'-'+mm+'-'+dd;
              let num = 0
              let baofeilist = []
              for(let a =0;a<response2.rows.length;a++){
                if(time==response2.rows[a].ageLimit){
                  num++
                  baofeilist.push(response2.rows[a].devName)
                }
              }
              this.dataList.push([
                { name: '设备报废', value: num ,list:baofeilist ,label:{show: true,},labelLine: {show: true}},
                { name: '审核', value: this.todayshenhe,list:shenehlist ,label:{show: true,},labelLine: {show: true}},
                { name: '维保', value: this.todayweixiu,list:weixiulist ,label:{show: true,},labelLine: {show: true}},
                { name: '验收', value: this.todayyanshou,list:yanshoulist ,label:{show: true,},labelLine: {show: true}}
              ])
            }
          }
          this.drawLine1()
        });
      });
    },
    getData1(){
      this.todaybaofei=0
      this.todayshenhe=0
      this.todayweixiu=0
      this.todayyanshou=0
      this.getNumData()
      var time = null;
      var shenehlist = []
      var weixiulist = []
      var yanshoulist = []
      let yy = this.date.getFullYear();
      let mm = this.date.getMonth()+1< 10 ? '0'+(this.date.getMonth()+1) : this.date.getMonth()+1;
      listAllPlan(this.queryParams).then(response1 => {
        listAllDevtable(this.dqueryParams).then(response2 => {
          for(let i =0;i<response1.rows.length;i++){
            if(response1.rows[i].state == "待审核"&&this.username==response1.rows[i].checkPeople){
              this.todayshenhe++
              shenehlist.push(response1.rows[i].name)
            }
            else if(response1.rows[i].state == "审核中"&&this.username==response1.rows[i].checkPeople){
              this.todayshenhe++
              shenehlist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "维保中"&&this.username==JSON.parse(response1.rows[i].chargePeople).name){
              this.todayweixiu++
              weixiulist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "待验收"&&this.username==response1.rows[i].acceptPeople){
              this.todayyanshou++
              yanshoulist.push(response1.rows[i].name)
            }else if(response1.rows[i].state == "验收中"&&this.username==response1.rows[i].acceptPeople){
              this.todayyanshou++
              yanshoulist.push(response1.rows[i].name)
            }
          }
          var todaynum = this.date.getDate()
          for(let ii =1;ii<this.daynumber+1;ii++){
            if(ii<todaynum){
              this.dataList.push([])
            }else if(ii==todaynum){
              let dd = ii< 10 ? '0'+ii : ii;
              time = yy+'-'+mm+'-'+dd;
              let baofeilist = []
              for(let a =0;a<response2.rows.length;a++){
                if(time==response2.rows[a].ageLimit){
                  this.todaybaofei++
                  baofeilist.push(response2.rows[a].devName)
                }
              }
              if(this.todaybaofei==0&&this.todayshenhe==0&&this.todayweixiu==0&&this.todayyanshou==0){
                this.dataList.push([])
              }else{
                this.dataList.push([
                  { name: '设备报废', value: this.todaybaofei,list:baofeilist ,label:{show: true,},labelLine: {show: true}},
                  { name: '审核', value: this.todayshenhe,list:shenehlist ,label:{show: true,},labelLine: {show: true}},
                  { name: '维保', value: this.todayweixiu,list:weixiulist ,label:{show: true,},labelLine: {show: true}},
                  { name: '验收', value: this.todayyanshou,list:yanshoulist ,label:{show: true,},labelLine: {show: true}}
                ])
              }
            }else if(ii>todaynum){
              let dd = ii< 10 ? '0'+ii : ii;
              time = yy+'-'+mm+'-'+dd;
              let num = 0
              let baofeilist = []
              for(let a =0;a<response2.rows.length;a++){
                if(time==response2.rows[a].ageLimit){
                  num++
                  baofeilist.push(response2.rows[a].devName)
                }
              }
              if(num==0&&this.todayshenhe==0&&this.todayweixiu==0&&this.todayyanshou==0){
                this.dataList.push([])
              }else{
                this.dataList.push([
                  { name: '设备报废', value: num ,list:baofeilist ,label:{show: true,},labelLine: {show: true}},
                  { name: '审核', value: this.todayshenhe,list:shenehlist ,label:{show: true,},labelLine: {show: true}},
                  { name: '维保', value: this.todayweixiu,list:weixiulist ,label:{show: true,},labelLine: {show: true}},
                  { name: '验收', value: this.todayyanshou,list:yanshoulist ,label:{show: true,},labelLine: {show: true}}
                ])
              }
            }
          }
          this.drawLine1()
        });
      });
    },
    getNumData() {
      this.date = new Date()
      this.month = this.date.getMonth()
      //某月第一天
      this.startTime = moment(this.date).month(this.month).date(1).startOf('month').format('YYYY-MM-DD')
      //某月最后一天
      this.endTime = moment(this.date).month(this.month + 1).date(1).startOf('month').format('YYYY-MM-DD')
      this.daynumber = new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate()
    },
    drawLine1() {
      //日历饼图
      var myChart = echarts.init(document.getElementById('container'))
      let a = this.height.substring(0,this.height.length-2)/8;
      console.log("高度",a);
      var cellSize = [50, a]  //日历大小
      var pieRadius = 13  //饼图大小
      var app = {}
      var incomclass = this.dataList
      var that = this

      //获取日历显示的日期范围
      function getVirtulData() {

        var date = +echarts.number.parseDate(that.startTime)
        var end = +echarts.number.parseDate(that.endTime)
        var dayTime = 3600 * 24 * 1000
        var data = []
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ])
        }
        return data
      }

      function getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function(item, index) {
          var center = chart.convertToPixel('calendar', item)
          return {
            id: index + 'pie',
            center: center
          }
        })
      }

      var scatterData = getVirtulData()
      var option = {
        tooltip: {
          trigger: 'item',
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
            var res = params.data.name +":"+ "</br>";
            if(params.data.list.length==0){
              res += "无";
            }
            for(let a =0;a<params.data.list.length;a++){
              res += params.data.list[a] + "</br>";
            }
            return res;
          }
        },
        /*legend: {
          data: ['设备报废', '待审核', '维保中', '待验收'],
          bottom: -5,
          textStyle: { color: '#FFFDFE', fontSize: 10 }
        },*/
        color: ['#FF0000', '#FFC206', '#02D110', '#A84DD1'],
        calendar: {
          splitLine: {
            lineStyle: {
              color: '#ccc' // This will change the border color
            }
          },
          itemStyle: {
            normal: {
              color: '#0A1863',
              borderWidth: 1,
              borderColor: '#ccc'
            }
          },
          top: 'middle',
          left: 'center',
          orient: 'vertical',
          cellSize: cellSize,
          yearLabel: {
            show: false
          },
          dayLabel: {
            show: false
          },
          monthLabel: {
            show: false
          },
          range: [that.startTime.substring(0, 7)]
        },
        /*visualMap: {
          type: 'piecewise', // 类型为分段型
          calculable: true,
          seriesIndex: [2], // 指定取哪个系列的数据，即哪个系列的 series.data。默认取所有系列。可不写
          orient: 'horizontal', // 如何放置 visualMap 组件，水平（'horizontal'）或者竖直（'vertical'）。
          left: 'center', //  组件离容器左侧的距离。left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
          bottom: 100, //底部标签的位置
        },*/
        series: [{
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            normal: {
              show: true,
              formatter: function(params) {
                return echarts.format.formatTime('dd', params.value[0])
              },
              offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          },
          data: scatterData
        }]
      }

      function getPieSeries(scatterData, chart) {
        var i = 0
        return echarts.util.map(scatterData, function(item, index) {
          var center = chart.convertToPixel('calendar', item)
          var pieData = incomclass[i]
          i = i + 1
          return {
            id: index + 'pie',
            type: 'pie',
            center: center,
            label: {
              normal: {
                formatter: function (params,option) {
                  if(params.data.value == 0){
                    params.data.label.show = false;
                    params.data.labelLine.show = false;
                  }else{
                    return params.data.value
                  }
                },
                fontSize: 10,
                position: 'inside'
              }
            },
            radius: pieRadius,
            data: pieData
          }
        })
      }

      if (!app.inNode) {
        var pieInitialized
        setTimeout(function() {
          pieInitialized = true
          myChart.setOption({
            series: getPieSeries(scatterData, myChart)
          })
        }, 10)

        app.onresize = function() {
          if (pieInitialized) {
            myChart.setOption({
              series: getPieSeriesUpdate(scatterData, myChart)
            })
          }
        }
      }
      myChart.setOption(option)
      myChart.on('click',  function(param) {
        if(param.data.name=="审核"||param.data.name=="验收"){
          window.open("/check/plan");
        }else if(param.data.name=="维保"){
          window.open("/mainplan/maintenanceGraph/submitPlan");
        }else if(param.data.name=="设备报废"){
          window.open("/life/life/equipmentTable");
        }
      });
      // 刷新调整
      window.addEventListener('resize', () => {
        myChart.resize()
        app.onresize()
      })
    }
  }
}
</script>
