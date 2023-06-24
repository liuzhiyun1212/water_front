<template>
    <div>
        <div
          id="levelCount"
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
          维保计划按等级统计
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

      <!-- 详情展示 -->
      <!-- <DetaiDialogSearch
        ref="caseDetaiInfoTest"
      /> -->

    </div>
  </template>

  <script>
  import * as echarts from 'echarts';
  import { listPlan, getPlan, delPlan, addPlan, updatePlan, levelState, level } from "@/api/system/plan";
  export default {
      data() {
          return {
            // 遮罩层
            loading: false,
              // 表格数据
              caseList: [],
              // levelStateList: [],
              xData: [],
              yData: [],
              // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              troubleName: null,
              troubleIntroduction: null
            },
            total: 0,
            // 新修改level统计
            levelList: [],
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
            this.queryParams.level = "";
            this.getList();
            this.selectedDataIndex=null;
            this.chartView();
            console.log("fufufu",this.$parent);
        },
        //   统计等级信息
        //   levelState() {
        //     levelState(this.queryParams).then(response => {
        //         this.levelStateList = response;
        //         for(let i=0;i<this.levelStateList.length;i++){
        //         this.yData.push(this.levelStateList[i].count);
        //         this.xData.push(this.levelStateList[i].name);
        //         }
        //         this.chartView()
        // });
        //   },
          // 新修改统计等级
          level(){
            level(this.queryParams).then(response => {
                this.levelList = response;
                for(let i=0;i<this.levelList.length;i++){
                this.yData.push(this.levelList[i].count);
                this.xData.push(this.levelList[i].name);
                }
                this.chartView()

        });
          },
          chartView() {
            let colorList = []
          this.option  = {
            /*title: {
                text: '维保计划按等级统计',
            },*/
            legend: {
                show: true,       // 是否显示图例
                top: 'auto'  ,    // 距离容器侧边距离上方
                //left:'auto',    //距离容器侧边距离左侧
                right:'auto',     //距离容器侧边距离右侧
                //bottom: 'auto', // 距离容器侧边距离下方
                orient: 'horizontal',      // 图例列表的布局朝向; horizontal; vertical
                align: 'auto',    // 图例标记和文本的对齐。默认自动
                padding: 2,       // 图例内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
                itemGap: 5,      // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔
                itemWidth: 25,    // 图例标记的图形宽度
                itemHeight: 14,   // 图例标记的图形高度// 使用字符串模板，模板变量为图例名称 {name}
                textStyle:{
                color:"black",
                fontSize:14
                },
            },
            xAxis: {
                type: 'category',
                name: '等级（级）',
                data: this.xData,
                axisTick:{
                    show:true,
                },
                axisLabel: {
                    textStyle: {
                        fontSize:'14',
                    }
            },
            axisLine:{
                lineStyle:{
                    color:'black',
                },
            },
            },
            yAxis:  {
                        type: 'value',
                        min:0,
                        max:10,
                        axisLabel: {
                        textStyle: {
                            color: 'black',
                            fontSize:'14',
                        }
                    },
                        interval: 500,
                        axisLine: {
                            lineStyle: {
                                color: 'black',
                                width: 2
                            }
                        },
                        splitLine: {
                        show: true,
                            lineStyle: {
                            color: ['rgba(255,255,255,0.4)']
                        }
                    },
                        },

                        series: {
                        data: this.yData,
                            type: 'bar',
                            showBackground: false,
                            barWidth: '30px', //柱体宽度
                            itemStyle: {
                            normal:{
                            barBorderRadius: [20, 20, 0, 0], //柱体圆角
                            color: (params) => {
                              if(params.dataIndex == this.selectedDataIndex) {
                                colorList[params.dataIndex] = 'red'
                              } else {
                                colorList[params.dataIndex] = 'rgb(153,154,255)'

                              }
                              return colorList[params.dataIndex]
                            },
                                label:{
                                show:true,
                                position:'top',
                                textStyle:{
                                    color:'#1cd0c3',
                                    fontSize:14,
                                    fontWeight:'bold',
                                }
                                }
                            },
                            }
                        },
            };

        this.myChart.setOption(this.option);
        this.myChart.off("click");
        this.myChart.setOption(this.option);
        this.myChart.on("click", (params) => {
          this.queryParams.pageNum = 1;
          this.dateRange= [];

          this.queryParams.level = params.name;
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
          // this.levelState()
          this.level()
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
          (this.myChart = echarts.init(document.getElementById("levelCount"))),
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
