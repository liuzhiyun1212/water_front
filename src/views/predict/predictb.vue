<template>
  <div>
    <el-card
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        预测时间：
      </p>
      <el-select v-model="Sdate" clearable placeholder="请选择">
        <el-option

          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
     <!-- <el-date-picker
        v-model="Sdate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>-->
      <el-button
        type="primary"
        style="margin-left: 10px"
        @click="getBeginTime()"
        >筛选</el-button
      >
    </el-card>
    <el-card style="overflow-y: auto; width: 95%; margin-left: 30px; margin-top: 10px">
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
        <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          设备故障预测
        </p>
      </div>
      <div
        id="chart"
        style="margin-left: 20px; width: 100%; height: 500px;"
      ></div>
     <!-- <el-table
        class="abc"
        :data="data"
        :header-cell-style="{
          background: '#84BBFE',
          color: '#fff',
          fontSize: '16px',
          textAlign: 'center',
          fontWeight: '600',
          fontFamily: '黑体',
          padding: '0',
        }"
        :header-row-style="{
          height: '20',
        }"
        :cell-style="{
          padding: '5px',
          border: '0',
        }"

        stripe
        style="width: 100%; margin-top: 10px"
        :default-sort="{ prop: 'num', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" align="center" width="100px"> </el-table-column>
        <el-table-column
          prop="equip_code"
          label="设备编码"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="equip_name"
          label="设备名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          prop="date"
          label="预测下次故障时间"
          align="center"
          show-overflow-tooltip

        >
        </el-table-column>
      </el-table>-->

    </el-card>
    <!-- <div id="chart" style="margin-left:20px;width: 100%; height:300px"></div>-->
  </div>
</template>
<script>
import * as echarts from "echarts";
import { predictByAll } from "../../api/system/equipment";
import { namelist } from '@/api/system/devtable'

export default {
  data() {
    return {
      num:600,
      data: [],
      name:[],
      x: [],
      y: [],
      Sdate: "",
      se: [],
      date: [],
      res: [],
      options: [{
        value: '30',
        label: '一个月内'
      }, {
        value: '90',
        label: '三个月内'
      }, {
        value: '180',
        label: '半年内'
      }],
    };
  },
  mounted() {

    this.getdata();


  },

  methods: {
    getdata() {
      predictByAll().then((response) => {
        this.data = response;
        let mark=0;
        for(let i=0;i<this.data.length;i++){
          mark=0;
          for(let j=0;j<this.date.length;j++){
            if(this.date[j]==response[i].date){
              mark=-1;
            }
          }
          if(mark===0){
            this.date.push(response[i].date);
          }
        }
        this.getalldev(this.name);


        //this.getalldev();
        /* this.data=response;*/
      //  this.deal(this.res);

        // this.dealdata(this.data);

        /*for (var i=0; i<3; i++) {
          this.y.push(this.data[i].date.substring(5,10));
          this.x.push(this.data[i].equip_name);
        }*/

      });
    },


    adjust(){
      var ediv = document.getElementById("chart");

      ediv.style.height=this.se.length*80+'px';
    },


    getalldev(){
      this.name=[];
      namelist().then((response) => {
        for(let i=0;i<response.length;i++){
          let mark=0;
          for(let j=0;j<this.data.length;j++){
            if(response[i]===this.data[j].equip){
              mark=-1;
              break;
            }
          }
          if(mark===0){
            this.name.push(response[i]);
          }
        }

        this.dealRes(this.data,this.name);

        this.adjust();
        this.initChart();
      })


    },


    deal(response) {
      this.data = [];
      this.date = [];
      let mark = 0;
      for (let i = 0; i < response.length; i++) {
        mark = 0;
        this.data.push(response[i]);
        for (let j = 0; j < this.date.length; j++) {
          if (this.date[j] === response[i].date) {
            mark = -1;
          }
        }
        if (mark === 0) {
          this.date.push(response[i].date);
        }
      }
      //   console.log(this.data);
      //   console.log(this.date);
    },

    dealRes(data,name) {



      this.se=[];
      for (let i = 0; i < data.length; i++) {
        this.se.push({
          name: data[i].equip,
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: 'triangle',
            data: [
              /*  {
                  name: "起始坐标",
                  coord: ["Wed", i],
                  label: {
                    show: true,

                    formatter: function (item) {
                      return "故障发生";
                    },
                  },
                },*/
              {
                name: '故障类型：'+data[i].trou,
                coord: [data[i].date,i],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              },
            ],
          },
        });
      }


      for (let j = 0; j < name.length; j++) {
        console.log(name[j]);
        this.se.push({
          name: name[j],
          type: "line",
          data: [],
          markPoint: {
            symbolSize: 20,
            symbol: 'triangle',
            data: [
              /*  {
                  name: "起始坐标",
                  coord: ["Wed", i],
                  label: {
                    show: true,

                    formatter: function (item) {
                      return "故障发生";
                    },
                  },
                },*/
              {
                name: '无',
                coord: [],
                label: {
                  show: true,
                  /*formatter: function (item) {
                    return "预测故障发生";
                  },*/
                },
              },
            ],
          },
        });
      }

      for(let j=0;j<this.se.length;j++){
          this.se[j].data.push(j);
      }

    },

    compareDate(d1, d2) {
      //判断两个日期的大小
      let reg = new RegExp("-", "g");
      if (new Date(d1.replace(reg, "/")) >= new Date(d2.replace(reg, "/"))) {
        // console.log("第一个大");
        return true;
      } else {
        // console.log("第二个大");
        return false;
      }
    },
    getBeginTime() {
      //  console.log(this.Sdate);
      if (!this.Sdate) {
        this.getdata();
      } else {
        predictByAll().then((response) => {
          this.data = [];
          console.log(this.Sdate);
          for (var i = 0; i < response.length; i++) {
            /*if (
              this.compareDate(
                response[i].date,
                this.formatDate(this.Sdate[0])
              ) &&
              this.compareDate(this.formatDate(this.Sdate[1]), response[i].date)
            ) */
           if(this.compareDate(this.formatDate(this.Sdate), response[i].date))
            {
              this.data.push(response[i]);
            }
            let mark=0;
            this.date=[];
            for(let i=0;i<this.data.length;i++){
              mark=0;
              for(let j=0;j<this.date.length;j++){
                if(this.date[j]==response[i].date){
                  mark=-1;
                }
              }
              if(mark===0){
                this.date.push(response[i].date);
              }
            }
          }
          this.getalldev(this.name);
          console.log(this.res);
         // this.deal(this.res);
          //this.dealRes(this.data);
         // this.initChart();
         // this.initChart();
        });
      }
    },
    formatDate(d) {
      var date = new Date(new Date().getTime() + d*24*60*60*1000);

      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      return YY + MM + DD;
    },

    initChart() {
      //初始化echarts
      let myChart = echarts.init(document.getElementById("chart"));
      myChart.resize(); //自适应大小
      myChart.setOption(this.setOption(), true);
    },
    //初始化echarts
    setOption() {
      let dataGet = this.se;
      console.log(this.se);
      //  console.log(dataGet);
      return {
        grid: {
          containLabel: true,
          left: "",
          right:'80px',
        },
        tooltip: {
          trigger: 'item',//'Temperature : <br/>{b} : {c}°C'
          /*formatter: '{a} ',
          axisPointer:{
            axis:'y',
          },*/
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: { lineStyle: { color: "black" } },
          axisLabel: {
            margin:20,
          },
          data:this.date, //["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          splitNumber : 21,
          minInterval: 1,
          nameTextStyle:{
            width:5,
            overflow:'ellipsis',
          },
          axisLine: { lineStyle: { color: "black" } },
          axisLabel: {
            margin:20,
            formatter: function (val,index) {
              console.log(val);

                return dataGet[val].name;
            },
          },
        },
        series: this.se,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.abc ::v-deep .el-table__body tr:hover > td {
  background-color: #ffffbb !important;
  font-weight: bold;
}
.abc thead {
  color: #fff;
}
.abc.el-table__header-wrapper th,
.abc .el-table__fixed-header-wrapper th {
  height: 20px;
}
</style>
