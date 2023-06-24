<template>
<!--  <h1>11111</h1>-->
  <div>
    <el-card
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block;margin-left: 20px">预测故障时间：</p>
      <el-date-picker
        v-model="planTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
            type="primary"
            style="margin-top: 10px;margin-left: 20px"
            icon="el-icon-search"
            @click="findDataMethod()"
          >搜索</el-button
          >
    </el-card>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
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
        style="cursor: pointer;  width: 100%; height: 500px"
      ></div>

      <el-table
        class="abc"
        :data="
          tableData.slice(
            (currentPage4 - 1) * pageSize,
            currentPage4 * pageSize
          )
        "
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
        :height="buttomHeight"
        stripe
        style="width: 100%; margin-top: 10px"
        :default-sort="{ prop: 'num', order: 'descending' }"
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          prop="partsName"
          label="备件名称"
          show-overflow-tooltip
          align="center"
        >
          <!--        <template slot-scope="scope">
                    <el-link @click="showPlanDetails(scope.row.name)" type="primary">{{
                        scope.row.name
                      }}</el-link>
                  </template>-->
        </el-table-column>
        <el-table-column
          prop="partsCode"
          label="备件编号"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="equipmentCode"
          label="设备编码"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="predictTime"
          label="预测下次故障时间"
          align="center"
          show-overflow-tooltip
          :formatter="carTimeFilter"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
        style="margin-left: 650px; margin-top: 10px"
      >
      </el-pagination>
    </el-card>
  </div>

</template>

<script>
import moment from 'moment';
import { predictByParts } from '@/api/system/part'
import { predict } from '@/api/system/equipment'
import * as echarts from 'echarts'
export default {
  name: 'predict',
  data(){
    return {
      data: [],
      x: [],
      y: [],
      se: [],
      date:[],
      innerVisible: false,
      planName: '',
      planTime:'',
      dcode: "",
      devName:"",
      mainHeight: 800,
      buttomHeight: "400px",
      currentPage4: 1,
      pageSize: 50,
      tableData: [],
      findData:[],
      planData:[],
      dev: {},
      totalpage: 1,
    };
  },
  methods: {
    //初始化表格数据
    getPredictList(){
      predictByParts().then(res=>{
        console.log(res)
        this.planData = res;
        this.tableData = res;
      })
    },


    getdata() {
      predict().then((response) => {
        let mark=0;
        for(let i=0;i<5;i++){
          mark=0;
          this.data.push(response[i]);
          this.y.push(response[i].equip_name);
          for(let j=0;j<this.date.length;j++){
            if(this.date[j]==response[i].date){
              mark=-1;
            }
          }
          if(mark===0){
            this.date.push(response[i].date);
          }
        }

        for(let j=0;j<this.data.length;j++){
          for(let i=0;i<this.date.length;i++){
            if(this.data[j].date===this.date[i]){
              this.x.push(i);
              break;
            }
          }
        }
        console.log(this.x);
        console.log(this.data);
        /*for(let i=0;i<this.y.length/2;i++){
            let j=this.y[i];
            this.y[i]=this.y[this.y.length-1-i];
            this.y[this.y.length-1-i]=j;
        }*/
        /* this.data=response;*/


        // this.dealdata(this.data);
        // this.dealRes(this.data);
        /*for (var i=0; i<3; i++) {
          this.y.push(this.data[i].date.substring(5,10));
          this.x.push(this.data[i].equip_name);
        }*/

        this.initChart();
      });
    },

    initChart() {
      const owner = this;
      //初始化echarts
      let myChart = echarts.init(document.getElementById("chart"));
      myChart.resize(); //自适应大小
      myChart.setOption(this.setOption(),true);
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
      this.extension(myChart);







    },

    extension(myChart) {
      // 注意这里，是以X轴显示内容过长为例，如果是y轴的话，需要把params.componentType ==      'xAxis'改为yAxis，多条件可以在此次添加， 判断是否创建过div框,如果创建过就不再创建了， 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
      var elementDiv = document.getElementById('extension')
      if (!elementDiv) {
        var div = document.createElement('div')
        div.setAttribute('id', 'extension')
        div.style.display = 'block'
        document.querySelector('html').appendChild(div)
      }
      myChart.on('mouseover', function(params) {
        if (params.componentType == 'yAxis') {
          var elementDiv = document.querySelector('#extension')
          //设置悬浮文本的位置以及样式
          var elementStyle =
            'position: absolute;z-index: 99999;color: #fff;font-size: 12px;padding: 5px;display: inline;border-radius: 4px;background-color: #303133;box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px'
          elementDiv.style.cssText = elementStyle
          elementDiv.innerHTML = params.value
          document.querySelector('html').onmousemove = function(event) {
            var elementDiv = document.querySelector('#extension')
            var xx = event.pageX - 10
            var yy = event.pageY + 15
            elementDiv.style.top = yy + 'px'
            elementDiv.style.left = xx + 'px'
          }
        }
      })
      myChart.on('mouseout', function(params) {
        //注意这里，我是以Y轴显示内容过长为例，如果是x轴的话，需要改为yAxis
        if (params.componentType == 'yAxis') {
          var elementDiv = document.querySelector('#extension')
          elementDiv.style.cssText = 'display:none'
        }
      })
    },

    setOption(){
      let dataGet=this.date;
      let option={
        tooltip: {
          trigger: 'axis',//'Temperature : <br/>{b} : {c}°C'
          formatter: '{b} '
        },
        grid: {
          left: '0px',
          right: '40px',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: { onZero: true,
            lineStyle: { color: "black" },
          },
          axisLabel: {
            formatter: function (val, index) {    //  '{value} °C'
              console.log(dataGet[val]);
              // console.log(dataGet[val].name);
              // if(!index) {
              //   return
              // }
              return dataGet[val];
            },

          }
        },
        yAxis: {
          type: 'category',
          axisLine: { onZero: true,
            lineStyle: { color: "black" },
          },
          axisLabel: {
           /* formatter: function (value) {
              if (value.length > 5) {
                return `${value.slice(0, 5)}...`
              }
              return value
            },*/
          },
          boundaryGap: false,
          data: this.y,
        },
        series: [
          {
            name: 'Altitude (km) vs. temperature (°C)',
            type: 'line',
            symbolSize: 20,
            symbol: 'triangle',
            // smooth: true,
            lineStyle: {
              color: '#5470C6',
              width: 3,
              type: 'dashed'
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#EE6666',
              color: 'yellow'
            },
            data: this.x,
          }
        ]
      }

      return option;
    },


    carTimeFilter(row, column, cellValue, index) {
      const daterc = row[column.property]
      if(daterc !=null){
        return moment(daterc).format("YYYY-MM-DD")
      }
    },
    findDataMethod() {
      this.tableData = this.planData;
      this.findData = [];
      if (
        (this.planTime == "" || this.planTime == null)
      ) {
        this.tableData = this.planData;
        this.totalpage = this.tableData.length;
        alert("请输入搜索内容！");
      }
      var x;
      var i = 0;
      if (this.planTime != "") {
        var mindata = "";
        var maxdata = "";
        mindata = this.formatDate(this.planTime[0]);
        maxdata = this.formatDate(this.planTime[1]);
        console.log(mindata, maxdata);
        console.log(this.tableData.length);
        for (x = 0; x < this.tableData.length; x++) {
          let predictTime = this.formatDate(this.tableData[x].predictTime);
          if (
            predictTime != null &&
            this.compareDate(predictTime, mindata) &&
            this.compareDate(maxdata, predictTime)
          ) {
            this.findData[i] = this.tableData[x];
            i++;
          }
        }
        this.tableData = this.findData;
        this.totalpage = this.tableData.length;
        this.findData = [];
        i = 0;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
    },
    // 格式化日期
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
  created() {
    this.getPredictList();
    this.getdata();
  },
}
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
.el-button--primary,
.el-button--primary:focus,
.el-button--primary.is-active,
.el-button--primary:active {
  background: #84bbfe;
  border-color: #84bbfe;
}
.abc.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
</style>
