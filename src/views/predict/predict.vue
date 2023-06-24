<template>
  <div>
    <div
      id="chart"
      style="cursor: pointer;  width: 100%;"
      :style="height"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { predictByAll,predict } from "../../api/system/equipment";
import { namelist } from "../../api/system/devtable";
import log from "@/views/monitor/job/log";

export default {
  props:{
    height:'',
  },
  data() {
    return {
      data: [],
      x: [],
      y: [],
      se: [],
      date:[],
      name:[],
    };
  },
  mounted() {
    this.getdata();
    this.getalldev();

  },

  methods: {

    getalldev(){
      namelist().then((response) => {
        this.name=response;
      })
    },



    getdata() {
      predictByAll().then((response) => {
        console.log(response);
        let mark=0;
        let limit=4;
        if(response.length<5){
          limit=response.length;
        }
        for(let i=0;i<limit;i++){
          mark=0;
          this.data.push(response[i]);
          for(let j=0;j<this.date.length;j++){
            if(this.date[j]==response[i].date){
              mark=-1;
            }
          }
          if(mark===0){
            this.date.push(response[i].date);
          }
        }
        /* this.data=response;*/


        // this.dealdata(this.data);
        this.dealRes(this.data);
        /*for (var i=0; i<3; i++) {
          this.y.push(this.data[i].date.substring(5,10));
          this.x.push(this.data[i].equip_name);
        }*/

        this.initChart();
      });
    },

    skipto() {
      this.$router.push({
        path: "/predict",
      });
    },

    initChart() {
      const owner = this;
      //初始化echarts
      let myChart = echarts.init(document.getElementById("chart"));
      myChart.resize(); //自适应大小
      myChart.setOption(this.setOption());
      myChart.getZr().on("click", function () {
        owner.skipto();

        // window.location.href="/life/life/equipmentTotally";
        // this.toPlan(param)
      });
      myChart.getZr().on("mousemove", (param) => {
        var pointInPixel = [param.offsetX, param.offsetY];
        if (myChart.containPixel("grid", pointInPixel)) {
          //若鼠标滑过区域位置在当前图表范围内 鼠标设置为小手
          myChart.getZr().setCursorStyle("pointer");
        } else {
          myChart.getZr().setCursorStyle("default");
        }
      });
      //this.extension(myChart);
    },




    dealRes(data) {
      for (var i = 0; i < data.length; i++) {
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
                name:'故障类型：'+data[i].trou ,
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
      if(data.length<4){
        for(let i=0;i<this.name.length;i++){
          let mark=0;
          for(let j=0;j<data.length;j++){
              if(data[j].equip===this.name[i])
                mark=-1;
          }
          if(mark===0) {
            this.se.push({
              name: this.name[i],
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
                    name: '',
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
          if(this.se.length===4)
            break;
        }
      }
      for(let j=0;j<this.se.length;j++){
      //  for(let i=0;i<this.date.length;i++){
          this.se[j].data.push(j);
      //  }
      }
    },
    //初始化echarts
    setOption() {
      let dataGet = this.se;
      console.log(dataGet);
      let option = {
        tooltip: {
          trigger: 'item',//'Temperature : <br/>{b} : {c}°C'
        //  formatter: '{a} ',
         /* axisPointer:{
            axis:'y',
          },*/
        },
        axisPointer:{
          //axis:'y',
        },
        grid: {
          left: '0px',
          right: '40px',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: { lineStyle: { color: "white" } },
          axisLabel: {
            margin:20,
          },
          data:this.date, //["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          //splitNumber : 4,
          minInterval: 1,
          nameTextStyle:{
            width:5,
            overflow:'ellipsis',
          },
          axisLine: { lineStyle: { color: "white" } },
          axisLabel: {
            margin:20,
            formatter: function (val,index) {

               if(dataGet[val].name.length>5)
              return dataGet[val].name.slice(0,5)+'...';
            },
          },
        },
        series: this.se,
      };
      return option;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
