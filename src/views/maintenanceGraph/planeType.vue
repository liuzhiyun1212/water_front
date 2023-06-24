<template>
    <div>
          <div
            id="fiveYearCase"
            style="width: 100%; height: 200px;"
          ></div>
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
          维保计划按种类统计
        </p>
        <el-button type="primary" icon="el-icon-s-home"  @click="allInfo" style="float: right; margin-right: 10px; margin-top: 8px">全部信息</el-button>
      </div>

          <el-table
            v-loading="loading"
            :data="caseList"
            stripe
            height="250px"
            style="width: 100%;margin-top:0px !important"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="name"
              label="维保计划名称"
              :show-overflow-tooltip="true"

            >
              <template slot-scope="scope">
                <el-link type="primary"  @click="showMore(scope.row.name)">{{
                    scope.row.name
                  }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="level"
              label="维保等级"
              :show-overflow-tooltip="true" sortable
            >
            </el-table-column>
            <el-table-column
              prop="planType"
              label="维保计划"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="维保计划制定时间" align="center" prop="makingTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>.<el-table-column
            prop="state"
            label="执行阶段"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
            <!-- <el-table-column
              prop="state"
              label="执行阶段"
              :show-overflow-tooltip="true"
            >
            <template slot-scope="scope"><img
                    style="width: 100%; height: 100%"
                    :src="require('../../assets/' + scope.row.state + '.jpg')"/></template>
            </el-table-column> -->
          </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          @pagination="getList"
        />


      <!-- 详情展示 -->
      <!-- <DetaiDialogSearch
        ref="caseDetaiInfoTest"
      /> -->

    </div>
  </template>

  <script>
  import * as echarts from 'echarts';
  import { listPlan, getPlan, delPlan, addPlan, updatePlan, plantTypeCount, planeCount } from "@/api/system/plan";
  export default {
      data() {
          return {
              // 表格数据
              caseList: [],
            //   临时计划总数
            // planeTypeList:[],
            xData: [],
            yData: [],
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              troubleName: null,
              troubleIntroduction: null
            },
            // 总条数
            total: 0,
            // 新修改计划总数
            planeList:[],
            // 选中柱形图
            selectedDataIndex: null,
          }
      },
      methods: {
          /** 查询plan列表 */
          getList() {
          this.loading = true;
          listPlan(this.queryParams).then(response => {
              this.caseList = response.rows;
              this.total = response.total;
              this.loading = false;
          });
          },
          allInfo() {
            this.queryParams.pageNum = 1;
            this.queryParams.planType = "";
            this.selectedDataIndex=null;
            this.getList();
            this.chartView();
          },
          // 新修改计划总数
          planeCount(){
            planeCount(this.queryParams).then(response => {
              this.planeList = response;
              for(let i=0;i<this.planeList.length;i++){
                this.yData.push(this.planeList[i].count);
                this.xData.push(this.planeList[i].name);
              }
              this.chartView()
          });
          },
        //   统计临时计划总数
        // plantTypeCount(){
        //     plantTypeCount(this.queryParams).then(response => {
        //     this.planeTypeList = response;
        //     for(let i=0;i<this.planeTypeList.length;i++){
        //       this.yData.push(this.planeTypeList[i].count);
        //       this.xData.push(this.planeTypeList[i].name);
        //     }
        //     this.chartView()
        // });
        // },
          chartView() {
          var colorList = [];
          this.option = {
            /*title: {
                text: '维保计划按种类统计',
            },*/
            tooltip: {
                trigger: 'axis',
                formatter: "{b} : {c}",
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: this.xData,
              textStyle: {
                fontSize: 14,
              },
            },
            yAxis: {
                axisLine: {
                show: false
                },
                interval: 1,
                axisTick: {
                show: false
                },
                axisLabel: {
                  fontSize: 14,
                color: '#999'
                }
            },
            dataZoom: [
                {
                type: 'inside'
                }
            ],
            series: [
                {
                type: 'bar',
                showBackground: true,
                barWidth: 20,
                itemStyle: {
                  color: (params) => {
                  if(params.dataIndex == this.selectedDataIndex) {
                    colorList[params.dataIndex] = 'red'
                  } else {
                    colorList[params.dataIndex] = 'blue'

                  }
                  return colorList[params.dataIndex]
                }
                    // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    // { offset: 0, color: '#83bff6' },
                    // { offset: 0.5, color: '#188df0' },
                    // { offset: 1, color: '#188df0' }
                    // ])
                },
                data: this.yData
                }
            ]
            };
        this.myChart.setOption(this.option);
        this.myChart.off("click");
        this.myChart.setOption(this.option);
        this.myChart.on("click", (params) => {
          this.queryParams.pageNum = 1;
          this.dateRange= [];
          this.queryParams.planType = params.name;
          // 设置选中值
          this.selectedDataIndex = params.dataIndex;
          this.myChart.dispatchAction({
              type: 'dataZoom',
              dataIndex: params.dataIndex,
              seriesIndex: params.seriesIndex
          });
            this.getList();
          });

        // echarts自适应
        window.addEventListener("resize", () => {
          this.myChart.resize();
        });
      },
      // 详情页面
      showMore(row){
        /*this.moreId = row
        this.open = true;
        this.title = "详情";*/
        this.$router.push({
          path: "/mainplan/fix/details",
          query: {
            planname: row,
          },
        });
      }
      },
      created() {
          this.getList()
          // this.plantTypeCount()
          this.planeCount()
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
          (this.myChart = echarts.init(document.getElementById("fiveYearCase"))),
          this.myChart.showLoading();
          this.chartView();
          this.myChart.hideLoading();
      },
      beforeCreate() {}, //生命周期 - 创建之前
      beforeMount() {}, //生命周期 - 挂载之前
      beforeUpdate() {}, //声明周期 - 更新之前
      updated() {}, //生命周期 - 更新之后
      beforeDestroy() {}, //生命周期 - 销毁之前
      destroyed() {}, //生命周期 - 销毁之后
      activated() {}, //缓存keep-alive

  }
  </script>

  <style>

  </style>
