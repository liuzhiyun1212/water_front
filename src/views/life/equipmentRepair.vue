<template>
  <!-- 准备具有宽高的容器 -->
  <div>
    <el-dialog
      width="50%"
      :visible.sync="innerVisible"
      append-to-body>

      <div slot="title" class="dialog-title">
        <!--        <span class="title-text" style="font-size: 20px;">设备详情</span>-->
<!--        <div class="button-right">
          <el-button type="primary" @click="innerVisible=false" style="float: right;"
          >关 闭
          </el-button>
        </div>-->
      </div>
      <Details :planName="planName"/>

    </el-dialog>
    <!--生命周期图-->
<!--    <div id="myChart" :style="{ width: '100%', height: '250px' }"></div>-->
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
          {{devName}}维保记录
        </p>
      </div>

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
          prop="name"
          label="维保计划名称"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-link @click="showPlanDetails(scope.row.name)" type="primary">{{
                scope.row.name
              }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="chargePeople"
          label="负责人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="chargeDepartment"
          label="部门"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="当前状态"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="fixdate"
          label="维保时间"
          align="center"
          show-overflow-tooltip
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
import * as echarts from "echarts";
//连接数据库操作
// import { listLifecycle } from "@/api/system/lifecycle";
import { listLifecycle } from "@/api/system/lifecycle";
import { listRepair } from "@/api/system/equipment";
import Details from '@/views/fix/details.vue'
// 引入提示框和title组件
export default {
  name: "hello",
  components: {
    Details
  },
  data() {
    return {
      innerVisible: false,
      planName: '',

      ydata: [], //x轴变量
      xdata: [], //每个点值
      linedata: [], //线条变量
      newVisible: false,
      newDialogFormVisible: false,
      dcode: "",
      devname: "",
      devName:"",
      mainHeight: 800,
      buttomHeight: "400px",
      currentPage4: 1,
      pageSize: 50,
      tableData: [],
      dev: {},
      totalpage: 1,
    };
  },
  methods: {
    showPlanDetails(name) {
      this.planName = name
      this.innerVisible = true
    },
    getParams() {
      // 取到路由带过来的参数
      this.dev = this.$route.query.dev
      this.devName = this.dev.devName;
      console.log(2222, this.$route.query.dev);
      // this.getLifecycleList();
      this.getRepairList();
    },
    //初始化表格数据
    getRepairList(){
      listRepair(this.dev).then((res)=>{
        // this.tableData = res;
        console.log(res);
        var a;
        for(var i = 0;i<res.length;i++){
          var array = {};
          array.chargePeople = JSON.parse(res[i].chargePeople).name;
          array.chargeDepartment = JSON.parse(res[i].chargePeople).department;
          // a = res[i].chargePeople.split(",");
          // array.chargePeople = a[1];
          // array.chargeDepartment = a[0];
          array.name = res[i].name;
          array.state = res[i].state;
          array.fixdate = res[i].fixdate;
          this.tableData.push(array);
        }
        console.log(this.tableData)
      })
    },
    //生命周期图
    getLifecycleList() {
      let aData = new Date();
      console.log("今天的日期", aData);
      let dateValue = this.formateDate(aData);
      console.log(dateValue); //2022-09-18
      var a = 0;
      listLifecycle({ devCode: this.dcode }).then((res) => {
        console.log(res.rows);
        for (let i = 0; i < res.rows.length; i++) {
          if (this.compareDate(dateValue, res.rows[i].happenTime)) {
            this.ydata.push(res.rows[i].happenTime);
            //增加点信息
            switch (res.rows[i].operate) {
              case "未运行":
                this.xdata.push({
                  value: "未运行",
                  symbol: "image://" + require("../../assets/buy.png"),
                  symbolSize: 30,
                  operate: res.rows[i].operate,
                  buyer: "张三",
                  price: "135482",
                  factory: "ET102",
                });
                this.linedata.push({
                  lte: i,
                  color: "#5B9BD5",
                });
                break;
              case "运行中":
                this.xdata.push({
                  value: "运行中",
                  symbol: "image://" + require("../../assets/repair.png"),
                  symbolSize: 30,
                  operate: res.rows[i].operate,
                  system: "供水系统",
                  department: "维修部",
                  code: "T220",
                });
                this.linedata.push({
                  gt: i - 1,
                  lte: i,
                  color: "#70AD47",
                });
                break;
              case "维保中":
                this.xdata.push({
                  value: "维保中",
                  symbol: "image://" + require("../../assets/fault.png"),
                  symbolSize: 30,
                  operate: res.rows[i].operate,
                });
                this.linedata.push({
                  gt: i - 1,
                  lte: i,
                  color: "#FFC000",
                });
                break;
              case "已报废":
                this.xdata.push({
                  value: "已报废",
                  symbol: "image://" + require("../../assets/scrap.png"),
                  symbolSize: 30,
                  operate: res.rows[i].operate,
                });
                /* this.linedata.push({
                  gt: i - 1,
                  lte: i,
                  color: "#CC3300",
                }); */
                break;
            }
          } else {
            if (a == 0) {
              a = 1;
              this.ydata.push(dateValue);
              this.ydata.push(res.rows[i].happenTime);
              this.xdata.push({
                value: "运行中",
                symbol: "image://" + require("../../assets/repair.png"),
                symbolSize: 30,
                operate: "目前状态",
              });
              this.linedata.push({
                gt: i-1,
                lte: i,
                color: "#70AD47",
              });
              //增加点信息
              switch (res.rows[i].operate) {
                case "未运行":
                  this.xdata.push({
                    value: "未运行",
                    symbol: "image://" + require("../../assets/buy.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                    buyer: "张三",
                    price: "135482",
                    factory: "ET102",
                  });
                  /* this.linedata.push({
                    lte: i,
                    color: "#5B9BD5",
                  }); */
                  break;
                case "运行中":
                  this.xdata.push({
                    value: "运行中",
                    symbol: "image://" + require("../../assets/repair.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                    system: "供水系统",
                    department: "维修部",
                    code: "T220",
                  });
                  /* this.linedata.push({
                    gt: i - 1,
                    lte: i,
                    color: "#5B9BD5",
                  }); */
                  break;
                case "维保中":
                  this.xdata.push({
                    value: "维保中",
                    symbol: "image://" + require("../../assets/fault.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                  });
                  /* this.linedata.push({
                    gt: i - 1,
                    lte: i,
                    color: "#FFC000",
                  }); */
                  break;
                case "已报废":
                  this.xdata.push({
                    value: "已报废",
                    symbol: "image://" + require("../../assets/scrap.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                  });
                  this.linedata.push({
                    gt: i,
                    lte: i+1,
                    color: "#CC3300",
                  });
                  break;
              }
            } else {
              this.ydata.push(res.rows[i].happenTime);
              //增加点信息
              switch (res.rows[i].operate) {
                case "未运行":
                  this.xdata.push({
                    value: "未运行",
                    symbol: "image://" + require("../../assets/buy.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                    buyer: "张三",
                    price: "135482",
                    factory: "ET102",
                  });
                  this.linedata.push({
                    lte: i,
                    color: "#5B9BD5",
                  });
                  break;
                case "运行中":
                  this.xdata.push({
                    value: "运行中",
                    symbol: "image://" + require("../../assets/repair.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                    system: "供水系统",
                    department: "维修部",
                    code: "T220",
                  });
                  this.linedata.push({
                    gt: i - 1,
                    lte: i,
                    color: "#5B9BD5",
                  });
                  break;
                case "维保中":
                  this.xdata.push({
                    value: "维保中",
                    symbol: "image://" + require("../../assets/fault.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                  });
                  /* this.linedata.push({
                    gt: i - 1,
                    lte: i,
                    color: "#FFC000",
                  }); */
                  break;
                case "已报废":
                  this.xdata.push({
                    value: "已报废",
                    symbol: "image://" + require("../../assets/scrap.png"),
                    symbolSize: 30,
                    operate: res.rows[i].operate,
                  });
                  /* this.linedata.push({
                    gt: i - 1,
                    lte: i,
                    color: "#CC3300",
                  }); */
                  break;
              }
            }
          }

          //增加点信息
          // switch (res.rows[i].operate) {
          //   case "未运行":
          //     this.xdata.push({
          //       value: "未运行",
          //       symbol: "image://" + require("../../assets/buy.png"),
          //       symbolSize: 30,
          //       operate: res.rows[i].operate,
          //       buyer: "张三",
          //       price: "135482",
          //       factory: "ET102",
          //     });
          //     /* this.linedata.push({
          //       lte: i,
          //       color: "#5B9BD5",
          //     }); */
          //     break;
          //   case "运行中":
          //     this.xdata.push({
          //       value: "运行中",
          //       symbol: "image://" + require("../../assets/repair.png"),
          //       symbolSize: 30,
          //       operate: res.rows[i].operate,
          //       system: "供水系统",
          //       department: "维修部",
          //       code: "T220",
          //     });
          //     /* this.linedata.push({
          //       gt: i - 1,
          //       lte: i,
          //       color: "#5B9BD5",
          //     }); */
          //     break;
          //   case "维保中":
          //     this.xdata.push({
          //       value: "维保中",
          //       symbol: "image://" + require("../../assets/fault.png"),
          //       symbolSize: 30,
          //       operate: res.rows[i].operate,
          //     });
          //     /* this.linedata.push({
          //       gt: i - 1,
          //       lte: i,
          //       color: "#FFC000",
          //     }); */
          //     break;
          //   case "已报废":
          //     this.xdata.push({
          //       value: "已报废",
          //       symbol: "image://" + require("../../assets/scrap.png"),
          //       symbolSize: 30,
          //       operate: res.rows[i].operate,
          //     });
          //     /* this.linedata.push({
          //       gt: i - 1,
          //       lte: i,
          //       color: "#CC3300",
          //     }); */
          //     break;
          // }
        }
        console.log(this.xdata);
        console.log(this.ydata);
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "全生命周期", //标题
            subtext: this.devname + "全生命周期",
          },
          tooltip: {
            trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            backgroundColor: "transparent", //可以背景设置为透明，然后在下面formatter自定义html的背景色 比如;background:rgba(000,000,000,0.5)
            formatter: function (params) {
              let str = " ";
              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;background:rgba(000,000,000,0.5)">' +
                "<div style='display:flex;align-items:center;'>" +
                params[0].axisValue +
                "<br/>" +
                params[0].data.operate +
                "</div>" +
                "</div>";
              return str;
            },
          },
          toolbox: {
            //工具栏
            show: true,
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            name: "时间轴",
            type: "category", //x轴
            boundaryGap: false,
            data: this.ydata,
          },
          yAxis: {
            show: true,
            type: "category",
            data: ["未运行", "运行中", "维保中", "已报废"],
          },
          visualMap: [
            {
              top: 100,
              left: 100,
              show: false,
              dimension: 0,
              //seriesIndex:0,
              pieces: this.linedata,
              /* pieces: [
                {
                  lt: 0,
                  color: "red",
                },
                {
                  gt: 4,
                  lte: 1,
                  color: "red",
                },
                {
                  gt: 8,
                  lte: 14,
                  color: "green",
                },
                {
                  gt: 14,
                  lte: 17,
                  color: "red",
                },
                {
                  gt: 17,
                  color: "green",
                },
              ], */
            },
          ],
          series: [
            {
              name: "01",
              type: "line",
              smooth: true,
              data: this.xdata,
              markLine: {
                data: [
                  [
                    {
                      name: "标线1起点",
                      xAxis: dateValue,
                      yAxis: "未运行",
                      symbol: "none",
                    },
                    {
                      name: "标线1终点",
                      xAxis: dateValue,
                      yAxis: "已报废",
                      symbol: "none",
                    },
                  ],
                ],
                label: {
                  normal: {
                    show: true,
                    //position: 'right',
                    formatter: "当前状态",
                    textStyle: {
                      color: "black", //标注线终点文字颜色
                      fontSize: 20,
                      fontWeight: 500,
                      padding: [0, 0, 10, 0], //文字间距
                    },
                  },
                },
                lineStyle: {
                  //标注线样式
                  normal: {
                    type: "dashed",
                    color: "red", //标注线颜色
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: "red", //线条颜色
                },
              },
            },
          ],
        });
      });
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
    formateDate(date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月要+1
      let day = date.getDate().toString().padStart(2, "0"); // 获取天是getDate，而不是 getDay
      let createTime = year + "-" + month + "-" + day;
      return createTime;
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
  created() {
    this.getParams();
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
