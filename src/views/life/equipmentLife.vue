<template>
  <!-- 准备具有宽高的容器 -->
  <div>
    <!-- <el-button type="primary" style="position: absolute; top: 10px; right: 50px"
      >切换</el-button
    > -->
    <!--生命周期图-->
    <div id="myChart" :style="{ width: '100%', height: '550px' }"></div>
    <!--弹框-->
    <div class="app-container" style="padding: 0px">
      <el-dialog
        title="故障详情"
        :modal-append-to-body="false"
        :visible.sync="newDialogFormVisible"
        @open="open1()"
        append-to-body
      >
        <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); width: 100%">
          <div style="width: 310px; height: 200px; float: left">
            <p
              style="
                font-size: 16px;
                font-weight: bold;
                padding-top: 10px;
                margin-left: 10px;
              "
            >
              故障件信息——城区配水管线泄露
            </p>
            <div
              style="
                width: 300px;
                height: 0px;
                border-top: 2px black dashed;
                margin-left: 10px;
              "
            />
            <div
              class="demo-image"
              style="width: 100px; height: 100px; display: inline"
            >
              <p style="margin-left: 10px">问题性质</p>
            </div>
          </div>
          <div
            style="
              width: 0;
              height: 200px;
              margin: 0 310px;
              border-left: 2px dashed black;
            "
          >
            <img
              style="
                width: 64px;
                height: 64px;
                margin-left: 37px;
                margin-top: 20px;
                float: left;
              "
              src="../../assets/warning.png"
            />
            <p
              style="
                float: left;
                width: 150px;
                margin-left: 20px;
                margin-top: 30px;
                font-size: 18px;
                color: red;
                font-weight: bold;
              "
            >
              二等风险事故
            </p>
            <div
              style="
                width: 0;
                height: 200px;
                margin: 0 150px;
                border-left: 2px dashed black;
              "
            >
              <div
                ref="grade_chart1"
                style="width: 150px; height: 250px; margin-left: 30px"
              ></div>
            </div>
          </div>
        </div>
        <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <p
            style="
              font-size: 16px;
              font-weight: bold;
              padding-top: 10px;
              margin-left: 10px;
            "
          >
            相似故障事件历史发生图
          </p>
          <div
            id="newEcharts"
            ref="grade_chart"
            style="width: 500px; height: 200px; padding-left: 20px"
          ></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
//连接数据库操作
// import { listLifecycle } from "@/api/system/lifecycle";
import { listLifecycle } from "@/api/system/lifecycle";
// 引入提示框和title组件
export default {
  name: "hello",
  data() {
    return {
      ydata: [], //x轴变量
      xdata: [], //每个点值
      linedata: [], //线条变量
      newVisible: false,
      newDialogFormVisible: false,
      dcode: "",
      devname: "",
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      this.dcode = this.$route.query.devCode || 362236; // 362236出之后修改成点击大图节点传递、
      this.devname = this.$route.query.devName || "高压水泵";
      console.log(2222, this.$route.query.devCode);
      // 将数据放在当前组件的数据内
      console.log("数据传过来啦！", this.dcode);
      this.getLifecycleList();
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
                gt: i - 1,
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
                    lte: i + 1,
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
    open(title, content) {
      this.$alert(content, title, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    // 弹框散点图
    initEcharts() {
      // var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      // const myChart1 = echarts.init(document.getElementById("newEcharts"));
      let grade_chart = this.$refs.grade_chart;
      let gradeChart = echarts.init(grade_chart);
      // 绘制图表
      const option = {
        xAxis: {
          type: "category", //x轴
          boundaryGap: false,
          data: [
            "20160605",
            "20170901",
            "20180605",
            "20190901",
            "20200605",
            "20210901",
            "20220605",
          ],
        },
        yAxis: {
          name: "事故等级",
          show: true,
          type: "category",
          data: ["预警", "一等", "二等", "三等"],
        },
        series: [
          {
            symbolSize: 18,
            data: [
              ["20160605", "预警"],
              ["20170901", "二等"],
              ["20180605", "一等"],
              ["20190901", "二等"],
              ["20200605", "三等"],
              ["20210901", "二等"],
              ["20220605", "一等"],
            ],
            type: "scatter",
          },
        ],
      };
      gradeChart.setOption(option);
    },
    open1() {
      this.newVisible = true;
      this.newDialogFormVisible = true;
      this.$nextTick(() => {
        //  执行echarts方法
        this.initEcharts();
        this.initEcharts1();
      });
    },
    //弹框评分
    initEcharts1() {
      let grade_chart1 = this.$refs.grade_chart1;
      let gradeChart1 = echarts.init(grade_chart1);
      // 绘制图表
      const option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 2,
                color: [
                  [0.25, "#FF6E76"],
                  [0.5, "#FDDD60"],
                  [0.75, "#58D9F9"],
                  [1, "#7CFFB2"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "75%",
              width: 2,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto",
                width: 5,
              },
            },
            axisLabel: {
              color: "#464646",
              fontSize: 10,
              distance: -60,
              formatter: function (value) {
                if (value === 0.875) {
                  return "A";
                } else if (value === 0.625) {
                  return "B";
                } else if (value === 0.375) {
                  return "C";
                } else if (value === 0.125) {
                  return "D";
                }
                return "";
              },
            },
            title: {
              offsetCenter: [0, "-20%"],
              fontSize: 14,
            },
            detail: {
              fontSize: 12,
              offsetCenter: [0, "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + "分";
              },
              color: "auto",
            },
            data: [
              {
                value: 0.7,
                name: "Grade Rating",
              },
            ],
          },
        ],
      };
      gradeChart1.setOption(option);
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
    // drawLine() {

    // },
  },
  created() {
    this.getParams();
  },
};
</script>
