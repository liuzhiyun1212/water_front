<template>
  <div>
      <div
        id="mainten"
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
        维保计划按阶段统计
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
        </el-table-column>
        <el-table-column
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

  </div>
</template>

<script>
import * as echarts from 'echarts';
import { listPlan, getPlan, delPlan, addPlan, updatePlan, countState, state } from "@/api/system/plan";
export default {
    data() {
        return {
          // 遮罩层
          loading: false,
            // 表格数据
            caseList: [],
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              troubleName: null,
              troubleIntroduction: null
            },
            // 总条数
            total: 0,
            // 执行状态统计总数
            // countStateList: [],
            xData:["未提交", "待审核", "审核中", "已审核", "维保中", "已维保", "待验收", "验收中", "已验收"],
            yData:[],
            // 新修改统计状态总数
            stateList: [],
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
        //刷新全部信息
        allInfo() {
            this.queryParams.pageNum = 1;
            this.queryParams.state = "";
            this.getList();
            this.selectedDataIndex=null;
            this.chartView();
        },
        // 新修改统计状态总数
        state() {
          state(this.queryParams).then(response => {
            this.stateList = response;
            for(let i=0;i<this.stateList.length;i++){
              this.yData.push(this.stateList[i].count);
              // this.xData.push(this.stateList[i].name);
            }
            this.chartView()
        });
        },
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
        },
        // countState(){
        //   countState(this.queryParams).then(response => {
        //     this.countStateList = response;
        //     for(let i=0;i<this.countStateList.length;i++){
        //       this.yData.push(this.countStateList[i].count);
        //       this.xData.push(this.countStateList[i].name);
        //     }
        //     this.chartView()
        // });
        // // this.chartView()
        // },
        chartView() {
          let colorList = []
          this.option = {
              tooltip: {
                trigger: 'axis',
                formatter: "{b} : {c}",
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: [{
              type: 'category',
              //横向网格
              splitLine: {
                  show: true,
                  lineStyle: {
                      color: '#e1e1e1',
                  }
              },
              axisTick: {
                  show: false
              },
              //是否显示x轴线
              axisLine: {
                  show: false,
                  // lineStyle: {
                  //     color: '#2A2A2A',
                  // }
              },
              //x轴字体设置
              axisLabel: {
                  rotate: 0,
                  show: true,
                  textStyle: {
                      fontSize: 14,
                      fontFamily: 'PingFang-SC-Medium',
                      // padding: [5,0,0,0],
                      color: '#000000'
                  },
              },
              data: this.xData,

          }],
          yAxis: [{
            type: 'value',
            interval: 5,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e1e1e1',
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'PingFang-SC-Medium',
                    color: '#838383'
                }
            }
        }],
            series: [
            {
              name: '销量',      // 序列名称
              type: 'bar',      // 类型
              legendHoverLink: true,  // 是否启用图列 hover 时的联动高亮
              label: {   // 图形上的文本标签
                show: false,
                position: 'insideTop', // 相对位置
                rotate: 0,  // 旋转角度
                color: '#eee'
              },
              itemStyle: {    // 图形的形状
                // color: 'blue',
                barBorderRadius: [18, 18, 0 ,0],
                color: (params) => {
                  if(params.dataIndex == this.selectedDataIndex) {
                    colorList[params.dataIndex] = 'red'
                  } else {
                    colorList[params.dataIndex] = 'green'

                  }
                  return colorList[params.dataIndex]
                }
              },
              barWidth: 20,  // 柱形的宽度
              barCategoryGap: '20%',  // 柱形的间距
              data: this.yData
            }
          ]
        };
      this.myChart.setOption(this.option);
      this.myChart.off("click");
      this.myChart.setOption(this.option);
      this.myChart.on("click", (params) => {
        this.curStartYear = "";
        this.curEndYear = "";
        this.queryParams.pageNum = 1;
        this.dateRange= [];
        // 设置选中值
        this.selectedDataIndex = params.dataIndex;
        this.myChart.dispatchAction({
            type: 'dataZoom',
            dataIndex: params.dataIndex,
            seriesIndex: params.seriesIndex
        });
        this.queryParams.state = params.name;
        this.handleQuery();
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
        // this.countState()
        this.state()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        (this.myChart = echarts.init(document.getElementById("mainten"))),
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
