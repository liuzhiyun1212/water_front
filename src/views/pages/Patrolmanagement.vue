<template>
  <div class="all" :style="defaultHeight">
    <el-container onload="setTime(),getTime();">
      <el-header>
        <!--头部-->
        <div class="head" :style="headerHeight">
          <div class="left nav">
            <ul>
              <li @click="toLife" style="margin-left: 0px;"><i></i>生命周期</li>
              <li @click="toPlan" style="margin-left: 43px;margin-right: 38px;"><i></i>维保管理</li>
            </ul>
          </div>
          <!-- <div class="times">{{ FormatTime(nowTime) }}</div> -->
          <h1
            style="margin-left: 20px; font-size: 22px; color: white; font-weight: 700; margin-top: 3px; background-color: rgba(0, 0, 0, 0);">
            设备全生命周期平台</h1>
          <div class="right nav text_right">
            <ul>
              <li @click="toGraph"><i></i>知识图谱 </li>
              <li @click="toSystem"><i></i>系统管理 </li>
            </ul>
          </div>
          <!-- <span style="float: right; color: white;">欢迎您： {{ this.username }}</span> -->
        </div>

      </el-header>
      <el-main class="main">
        <el-row>

          <el-col :span="7">
            <div class="box-card" :style="rightHeight1">
              <div class="title">巡检管理</div>
              <img class="syxj" src="../../assets/首页巡检.png">
            </div>


          </el-col>

          <el-col :span="10">
            <el-card class="box-card" :style="miniHeight" style="padding-top: 0px; text-align: center;">
              <h3 class="clearfix" style="vertical-align: middle;">设备数</h3>
              <div class="num">
                <span><scroll-number :val="this.devSum"></scroll-number></span>
              </div>
              <h3 class="clearfix" style="vertical-align: middle;">运行中</h3>
              <div class="num">
                <span><scroll-number :val="equ.normalequ"></scroll-number></span>
              </div>
              <h3 class="clearfix" style="vertical-align: middle;">未运行</h3>
              <div class="num">
                <span><scroll-number :val="equ.flautequ"></scroll-number></span>

              </div>
              <h3 class="clearfix" style="vertical-align: middle;">维修中</h3>
              <div class="num" :key="Timekey">
                <span><scroll-number :val="equ.repairequ"></scroll-number></span>
              </div>
              <h3 class="clearfix" style="vertical-align: middle;">已报废</h3>
              <div class="num">
                <span><scroll-number :val="equ.badequ"></scroll-number></span>
              </div>
            </el-card>
            <div :style="middleHeight1">
              <Times :height="middleHeight1.height" />
            </div>
          </el-col>

          <el-col :span="7">
            <el-card class="box-card" :style="rightHeight1">
                <div class="title">生命周期</div>

            </el-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-card class="box-card" :style="rightHeight2">
              <div style="color: white;">维保管理</div>


            </el-card>
          </el-col>

          <el-col :span="10">
            <el-card class="box-card" :style="middleHeight2">
              <div style="color: white;">知识图谱</div>


            </el-card>
          </el-col>

          <el-col :span="7">
            <el-card class="box-card" :style="rightHeight2">
              <div style="color: white;">系统管理</div>


            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Vue from 'vue'
//全局引入echarts
import * as echarts from 'echarts'
import Predict from '@/views/predict/predict.vue'
// 知识图谱
import Graph from '@/views/graph/indexShow.vue'
import 'echarts-liquidfill'
// import scrollNumber from '../scroll-number.vue'
import $ from 'jquery'
// 导入设备信息
import { listDevtable } from '@/api/system/devtable'
// 甘特图
import Gan from '@/views/maintenanceGraph/equipmentChart.vue'
// 轮播
import Times from '../maintenanceGraph/equipmentTime.vue'
// 导入采集器
import { getCount } from '@/api/system/collector'
import { getSensorCount, listAllSensor } from '@/api/system/sensor'
import { equsCount, listAllDevtable } from '@/api/system/devtable'
import { getlistTree, getTreecode, getEqus, getAncfla, getAncrep, getAncbad } from '@/api/system/tree'
import { listPlan, getPlan, delPlan, addPlan, updatePlan, state } from '@/api/system/plan'
import { autoHover } from '@/utils/tools.js'
//设备表
import firstTable from '../life/firstTable'
import Cookies from "js-cookie";
import scrollNumber from '@/components/scrollNumber/scrollNumber'
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts

export default {
  name: 'HelloWorld',
  // components: {
  //   scrollNumber
  // },
  components: {
    Graph,
    Gan,
    firstTable,
    Times,
    scrollNumber,
    Predict
  },
  data() {
    return {
      //高度
      defaultHeight: {
        height: ''
      },
      headerHeight: {
        height: ''
      },
      rightHeight1: {
        height: ''
      },
      rightHeight1Pic: {
        height: ''
      },
      rightHeight2: {
        height: ''
      },
      rHeight2: '',
      middleHeight1: {
        height: ''
      },
      middleHeight2: {
        height: ''
      },
      miniHeight: {
        height: ''
      },
      // 用户名
      username: null,
      oldValue: 0,
      // 设备总数
      devSum: 0,
      // 传感器总数
      sensor: 0,
      // 振动传感器总数
      zhendong: 0,
      // 转速传感器
      zhuansu: 0,
      // 温度传感器
      wendu: 0,
      // 采集总数
      caiji: 0,
      // 易度传感设备数量
      yidu: 0,
      // 南方泵业设备数量
      nanfang: 0,
      // ABB设备数量
      ABB: 0,
      // 厂家总数
      factory: 0,
      timer: undefined,
      nowTime: new Date(),
      latedata: '2020-1-9',
      // 左中柱状图数据
      typeData: [
        { product: '一号水泵', 一号水泵: 43, 二号水泵: 85 },
        { product: '二号水泵', 一号水泵: 43, 二号水泵: 85 }
      ],
      form: {
        name: ''
      },
      pics: [
        { id: 1, url: require('../../assets/images/2.jpg') },
        { id: 2, url: require('../../assets/images/2.jpg') },
        { id: 3, url: require('../../assets/images/2.jpg') },
        { id: 4, url: require('../../assets/images/2.jpg') }
      ],
      option: null,

      trafficWay: [{
        name: '火车',
        value: 20
      }, {
        name: '飞机',
        value: 10
      }, {
        name: '客车',
        value: 30
      }, {
        name: '轮渡',
        value: 40
      }],
      data: [],

      timer: null,
      times: null,
      index: -1,
      index1: -1,
      color: ['#00ffff', '#FF7F00', '#ffe000', '#ffa800', '#ff5b00', '#ff3000', ' #7093DB', '#238E23', '#32CD99'],
      // 知识图谱数据
      // datas: [{
      //   name: '和润水务',
      //   symbolSize: 120,
      //   // draggable: true,//加上这句话后不可点击
      //   category: 0,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#b457ff',
      //       borderWidth: 6,
      //       shadowBlur: 20,
      //       shadowColor: '#b457ff',
      //       color: '#001c43'
      //     }
      //   }
      // }, {
      //   name: '一期泵站',
      //   symbolSize: 100,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#04f2a7',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   },
      //   category: 1
      // }, {
      //   name: '1#送水泵组',
      //   symbolSize: 80,
      //   category: 2,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   }

      // }, {
      //   name: '2#送水泵组',
      //   symbolSize: 80,
      //   category: 2,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   }

      // }, {
      //   name: '3#送水泵组',
      //   symbolSize: 80,
      //   category: 2,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   }
      // }, {
      //   name: '二期泵站',
      //   symbolSize: 100,
      //   category: 1,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#04f2a7',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   }
      // }, {
      //   name: '4#送水泵组',
      //   symbolSize: 80,
      //   category: 2,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   }
      // }, {
      //   name: '5#送水泵组',
      //   symbolSize: 80,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'

      //     }
      //   },
      //   category: 2
      // }, {
      //   name: '6#送水泵组',
      //   symbolSize: 80,
      //   itemStyle: {
      //     normal: {
      //       borderColor: '#82dffe',
      //       borderWidth: 4,
      //       shadowBlur: 10,
      //       shadowColor: '#04f2a7',
      //       color: '#001c43'
      //     }
      //   },
      //   category: 2
      // }],
      linkmes: [{
        // source: '校园大数据',
        // target: '舆情大数据',
        // value: 'DNA'
        source: '和润水务',
        target: '一期泵站',
        value: 'DNA'
      }, {
        source: '和润水务',
        target: '二期泵站',
        value: 'DNA'
      }, {
        source: '一期泵站',
        target: '1#送水泵组',
        value: 'DNA'
      }, {
        source: '一期泵站',
        target: '2#送水泵组',
        value: 'DNA'
      }, {
        source: '一期泵站',
        target: '3#送水泵组',
        value: 'DNA'
      }, {
        source: '二期泵站',
        target: '4#送水泵组',
        value: 'DNA'
      }, {
        source: '二期泵站',
        target: '5#送水泵组',
        value: 'DNA'
      }, {
        source: '二期泵站',
        target: '2#送水泵组',
        value: 'DNA'
      }, {
        source: '二期泵站',
        target: '6#送水泵组',
        value: 'DNA'
      }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '张伟',
        tel: '13111345462'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        tel: '13111345462'
      }, {
        date: '2016-05-01',
        name: '大强',
        tel: '13111345462'
      }, {
        date: '2016-05-03',
        name: '刘',
        tel: '13111345462'
      }],
      // 设备状态总数
      equ: {
        normalequ: '',//运行中
        flautequ: '',//故障中
        repairequ: '',//维修中
        badequ: ''//已报废
      },
      // 新修改统计状态总数
      stateList: [],
      // 中间饼图
      xDataList: [null, null, null, null, null, null, null, null, null],
      yDataList: []
    }
  },
  created() {
    // 显示时间，在渲染页面之前一直调用该函数，对this.time进行赋值
    this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    // this.$store.state.settings.topNav
    this.username = this.$store.state.user.name
    this.timer = setInterval(() => {
      this.nowTime = new Date().toLocaleString()
    })
    //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  destroyed() {
    this.$store.dispatch('app/openSideBar', { withoutAnimation: true })
  },
  mounted() {
    // 查看设备信息
    this.getListDevSum()
    this.equsCount()
    this.state()

    // // 获取采集器总数
    // this.getCount()
    // // 获取传感器总数
    // this.getSensor()
    // // 获取传感器列表
    // this.getSensorList()
    // 左上折线图
    // this.getEchart1()
    // 左中柱状图
    // this.getEchart2()
    // 左下折线图
    // this.getEchart3()
    //  右上角
    // this.getEchartPolo()
    // 右中饼图
    // this.getEchart5()
    // // 右中下排行柱状图
    // this.getEchart6()
    // this.getRelation()
    // 设备总数滚动
    this.upTimer()
    // this.init("bingzhuangtu")
    // 图谱
    // this.getGraph()
    // 进度饼图
    // // 厂家综述
    // this.upFactory()
    const that = this
    window.addEventListener('resize', () => {
      // window.screenWidth = document.body.clientWidth;
      // that.screenWidth = window.screenWidth;
      // console.log(document.body.clientWidth);
      this.chPie.resize()
      if (document.body.clientWidth < 1100) {
        // that.signHalf = true;
        that.signAll = false
      } else {
        // that.signHalf = false;
        that.signAll = true
      }
    })
  },

  methods: {
    //获取高度
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 90 + "px";
      // this.headerHeight.height = (window.innerHeight - 90 )* 0.50+"px";
      this.rightHeight1.height = (window.innerHeight - 90) * 0.52 + "px";
      this.rightHeight1Pic.height = (window.innerHeight - 90) * 0.40 + "px";
      this.rightHeight2.height = (window.innerHeight - 90) * 0.48 + "px";

      this.middleHeight1.height = (window.innerHeight - 90) * 0.41 + "px";
      this.middleHeight2.height = (window.innerHeight - 90) * 0.48 + "px";
      this.miniHeight.height = (window.innerHeight - 90) * 0.10 + "px";
      // console.log("页面height:",this.headerHeight.height);
    },
    // 设备状态统计
    equsCount() {
      equsCount().then((response) => {
        let list = []
        list = response
        this.equ.normalequ = parseInt(list[0]) - 3
        this.equ.flautequ = list[1]
        this.equ.repairequ = list[2]
        this.equ.badequ = list[3]
      })
    },
    // 维保状态统计总数
    state() {
      state(this.queryParams).then(response => {
        this.stateList = response
        this.xDataList[0] = "未提交:" + this.stateList[0].count;
        this.xDataList[1] = "待审核:" + this.stateList[1].count;
        this.xDataList[2] = "审核中:" + this.stateList[2].count;
        this.xDataList[3] = "已审核:" + this.stateList[3].count;
        this.xDataList[4] = "维保中:" + this.stateList[4].count;
        this.xDataList[5] = "已维保:" + this.stateList[5].count;
        this.xDataList[6] = "待验收:" + this.stateList[6].count;
        this.xDataList[7] = "验收中:" + this.stateList[7].count;
        this.xDataList[8] = "已验收:" + this.stateList[8].count;
        // this.yDataList.push(this.stateList[1].name+':'+this.stateList[1].count)
        // this.yDataList.push(this.stateList[1].name+':'+this.stateList[2].count)
        // this.yDataList.push(this.stateList[4].count)
        // this.yDataList.push(this.stateList[7].count)
        this.getRelation()
      })
    },
    // 时间显示
    FormatTime() {
      //返回显示的日期时间格式
      var date = new Date()
      var year = this.formatTime(date.getFullYear())
      var month = this.formatTime(date.getMonth() + 1)
      var day = this.formatTime(date.getDate())
      /*var hour = this.formatTime(date.getHours());
      var minute = this.formatTime(date.getMinutes());
      var second = this.formatTime(date.getSeconds());*/
      var weekday = date.getDay()
      var weeks = new Array(
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      )
      var week = weeks[weekday]
      return `${year}-${month}-${day} ${week}`
    },
    // 左上角折线图
    getEchart1() {
      var myChart = echarts.init(document.getElementById('echart1'))

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#dddc6b'
            }
          }
        },
        legend: {
          top: '0%',
          data: ['一号水泵', '二号水泵'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true
        },

        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }

          },

          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

        }, {

          axisPointer: { show: false },
          axisLine: { show: false },
          position: 'bottom',
          offset: 20

        }],

        yAxis: [{
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          },

          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        }],
        series: [
          {
            name: '一号水泵',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {

              normal: {
                color: '#0184d5',
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(1, 132, 213, 0.4)'
                }, {
                  offset: 0.8,
                  color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            itemStyle: {
              normal: {
                color: '#0184d5',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12
              }
            },
            data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

          },
          {
            name: '二号水泵',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {

              normal: {
                color: '#00d887',
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 216, 135, 0.4)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            itemStyle: {
              normal: {
                color: '#00d887',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12
              }
            },
            data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

          }

        ]

      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 左中柱状图
    getEchart2() {
      var myChart = echarts.init(document.getElementById('echart2'))
      var option = {
        // tooltip: {
        //   trigger: "category",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "cross", // 默认为直线，可选为：'line' | 'shadow'
        //     crossStyle: {
        //             color: '#c1dafc'
        //           }
        //   },
        // },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['振动', '转速', '温度传感器'],
          axisLabel: {
            interval: 0, rotate: 30,
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          }
        },
        series: [
          {
            data: [this.zhendong, this.zhuansu, this.wendu],
            type: 'bar',
            showBackground: true,
            barWidth: '40%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    //左下折线图
    getEchart3() {
      var myChart = echarts.init(document.getElementById('echart3'))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 3,
              color: '#019688'
            }
          }
        },
        grid: {
          left: '4%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
          axisLabel: { color: '#808080' }
        },
        yAxis: {
          type: 'value',
          axisTick: { // 轴刻度线
            show: false
          },
          // 刻度文字颜色
          axisLabel: { color: '#808080' },
          // 网格线设置
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0)'
            }
          }

        },
        series: [
          {
            data: [10, 20, 30, 50, 20, 10, 20, 30, 50, 50, 10, 30],
            type: 'line',
            smooth: true
          }
        ],
        color: ['#019688']
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 右中饼图
    getEchart5() {
      var myChart = echarts.init(document.getElementById('echart5'))
      var option = {
        backgroundColor: '#2c343c',
        title: {
          top: 5,
          textStyle: {
            color: '#ccc',
            fontSize: 10
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 10]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: this.yidu, name: '易度传感' },
              { value: this.nanfang, name: '南方泵业' },
              { value: this.ABB, name: 'ABB' }
            ].sort(function (a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              color: 'white'
            },
            labelLine: {
              lineStyle: {
                color: 'white'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: 'red',
              shadowBlur: 200,
              shadowColor: 'rgba(250, 201, 88, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    // 右中下排行柱状图
    getEchart6() {
      var myChart = echarts.init(document.getElementById('echart6'))
      var option = {
        grid: {
          left: '5%',
          right: '8%',
          bottom: '4%',
          top: 10,
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          inverse: true,
          //城市名称
          data: ['1#水泵组', '2#水泵组', '3#水泵组'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            color: function (value, index) {
              if (index == 0) {
                return 'red'
              }
              if (index == 1) {
                return '#fff'
              }
              if (index == 2) {
                return '#ffcc00'
              }
              return 'rgb(18,205,12)'
            },
            fontSize: 10,
            fontWeight: 'bold'
          }
        },
        series: [
          {
            type: 'bar',
            stack: 'chart',
            z: 3,
            barWidth: '10',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1,
                  0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(241,239,134)'
                  }, {
                    offset: 1,
                    color: '#fff'
                  }]),
                barBorderRadius: 40
              }
            },
            label: {
              normal: {
                position: 'right',
                show: true,
                color: 'white',
                formatter: '{c}%'
              }
            },
            data: [70, 60, 20]
          },
          {//阴影条
            type: 'bar',
            stack: 'chart',
            barWidth: '10',
            itemStyle: {
              normal: {
                color: '#0D2253',
                barBorderRadius: 40
              }
            },
            data: [50, 50, 50]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    formatTime(n) {
      //判断是否需要加0
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    },
    // 查看设备信息
    getListDevSum() {
      listAllDevtable().then((res) => {
        this.devSum = res.rows.length - 3
        this.upTimer()
        // this.getJindu();
        // this.getChuanJindu();
        // this.getEchart5();
      })
    },
    // 获取采集器总数
    getCount() {
      getCount().then((res) => {
        // console.log(res);
        this.caiji = res
        // this.getJindu();
      })
    },
    // 获取传感器总数
    getSensor() {
      getSensorCount().then((res) => {
        // console.log("传感器",res);
        this.sensor = res
        // this.getChuanJindu();
      })
    },
    // 获取传感器列表
    getSensorList() {
      listAllSensor().then((res) => {
        // console.log(res.rows[1].sensorTypeName);
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].sensorTypeName === '振动速度传感器') {
            this.zhendong++
          } else if (res.rows[i].sensorTypeName === '转速') {
            this.zhuansu++
          } else if (res.rows[i].sensorTypeName === '温度') {
            this.wendu++
          }
        }
        // this.getEchart2()
        // console.log(this.wendu);
      })
    },
    // 采集器进度饼图
    getJindu() {
      var myChart = echarts.init(document.getElementById('jindu'))
      var option =
      {
        title: {
          show: true,
          x: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 10
          }
        },
        animation: true,
        tooltip: {
          show: false
        },
        series: [
          {
            name: '完成度',
            type: 'pie',
            radius: ['65%', '80%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            silent: true,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.caiji,
                name: '采集器占比',
                selected: false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    fontSize: 10,
                    formatter: '{b}\n{d}%'
                  }
                },
                itemStyle: {
                  color: '#91c7ae'
                }
              },
              {
                value: this.devSum - this.caiji,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  color: '#eee'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 传感器进度饼图
    getChuanJindu() {
      var myChart = echarts.init(document.getElementById('chuanjindu'))
      var option =
      {
        title: {
          show: true,
          x: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 10,
            color: '#fff',
            bottom: '5%'
          }
        },
        animation: true,
        tooltip: {
          show: false
        },
        series: [
          {
            name: '传感器占比',
            type: 'pie',
            radius: ['65%', '80%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            silent: true,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.sensor,
                name: '传感器占比',
                selected: false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    fontSize: 10,
                    formatter: '{b}\n{d}%'
                  }
                },
                itemStyle: {
                  color: '#91c7ae'
                }
              },
              {
                value: this.devSum - this.caiji,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  color: '#eee'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 知识图谱
    // getGraph(){
    //     var myChart = echarts.init(document.getElementById('OdfMes'));
    //     var option = {
    //         backgroundColor: '#1a4377',

    //         tooltip: {},
    //         animationDurationUpdate: 1500,
    //         animationEasingUpdate: 'quinticInOut',
    //         color: ['#83e0ff', '#45f5ce', '#b158ff'],
    //         series: [{
    //             type: 'graph',
    //             layout: 'force',
    //             force: {
    //                 repulsion: 1000,
    //                 edgeLength: 50
    //             },
    //             roam: true,
    //             label: {
    //                 normal: {
    //                     show: true
    //                 }
    //             },
    //             data: this.datas,
    //             links: this.linkmes,
    //             lineStyle: {
    //                 normal: {
    //                     opacity: 0.9,
    //                     width: 5,
    //                     curveness: 0
    //                 }
    //             },
    //             categories: [{
    //                 name: '0'
    //             }, {
    //                 name: '1'
    //             }, {
    //                 name: '2'
    //             }]
    //         }]
    //     }
    //     myChart.setOption(option);
    // },
    // 右上角图
    getEchartPolo() {
      let myChart = echarts.init(document.getElementById('chart_polo'))
      this.option = {
        series: [{
          type: 'liquidFill',
          data: [0.45],
          radius: '70%',
          color: ['#00b9f5'],
          backgroundStyle: {
            color: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#007bff',
            borderWidth: 2,
            shadowColor: 'rgba(0, 123, 225, 0.4)',
            shadowBlur: 20
          },
          label: {

            fontSize: 20
          },
          outline: {
            show: false
          }
        }]
      }

      myChart.setOption(this.option, true)

      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    toLife() {
      this.$router.push({
        path: "/life/life/equipmentTable",
      })
    },
    // 维保统计跳转
    /*toPlan(){
      this.$router.push({
        path:"/mainplan/maintenanceGraph/zhuye",
      })
    },*/
    // 跳转知识图谱
    toGraph() {
      this.$router.push({
        path: "/graph/graph/show",
      })
    },
    // 系统管理跳转
    toSystem() {
      this.$router.push({
        path: "/system/user",
      })
    },
    // 中间饼图
    getRelation() {
      this.chPie = echarts.init(document.getElementById('relation'))
      for (var i = 0; i < this.xDataList.length; i++) {
        this.data.push({
          value: 0,
          name: this.xDataList[i],
          itemStyle: {
            normal: {
              borderWidth: 10,
              shadowBlur: 30,
              color: this.color[i],
              fontSize: 30,
              borderColor: this.color[i],
              // shadowColor: this.color[i]
            }
          }
        }
        )
      }
      var option = {
        title: {
          text: '',
          top: '45%',
          left: 'center',
          color: '#00ffff',
          textStyle: {
            color: '#fff',
            fontSize: 15,
            fontWeight: '10'
          }
        },
        //           grid:{
        // 	x:25,
        // 	y:5,
        // 	x2:5,
        // 	y2:20,
        // 	borderWidth:1
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        series: [{
          // name: '访问来源',
          data: this.data,
          type: 'pie',
          radius: [50, 65],
          center: ['50%', '45%'],//调整位置
          avoidLabelOverlap: false,
          tooltip: { show: true },
          label: {
            show: true,
            emphasis: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: 10,
                fontWeight: 'bold',
                color: '#ffffff'
              },
              // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
              formatter: [`{x|{b}}`].join('\n'),
              rich: {
                x: {
                  fontSize: 17, fontWeight: 'bold'
                },
                y: {
                  fontSize: 17, fontWeight: 'bold'
                }
              }
            }

          },
          labelLine: {
            length: 10, // 第一段线 长度
            length2: 10, // 第二段线 长度
            show: true
          }
          // itemStyle: {
          // emphasis: {
          //     shadowBlur: 10,
          //     shadowOffsetX: 0,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)'
          // },
          // formatter: [`{x|{b}}`, `{y|{d}%}`].join('\n'),
          //         rich: {
          //             x: {
          //                 fontSize: 16, fontWeight: 'bold'
          //             },
          //             y: {
          //                 fontSize: 24, fontWeight: 'bold'
          //             }
          //         }
          // }
        }]
      }
      var owner = this
      this.chPie.setOption(option)
      console.log("aaaaaa", this.data.length);
      this.chPie.on('click', function (param) {
        owner.toPlan(param)
      })
      this.chPie.on('mouseover', (e) => {
        this.loopStop(e.dataIndex)
      })
      this.chPie.on('mouseout', () => {
        this.loopStart()
      })
      this.loopStart()
    },
    toPlan(param) {
      this.$router.push({
        path: '/mainplan/maintenanceGraph/zhuye'
      })
    },
    loopStart() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.chPie.dispatchAction({
          type: 'downplay',
          dataIndex: this.index
        })
        this.index++
        if (this.index >= this.data.length) {
          this.index = 0
        }
        this.chPie.dispatchAction({
          type: 'highlight',
          dataIndex: this.index
        })
      }, 1000)
    },
    loopStop(i) {
      clearInterval(this.timer)
      this.chPie.dispatchAction({
        type: 'downplay',
        dataIndex: this.index
      })
      this.index = i
      this.chPie.dispatchAction({
        type: 'highlight',
        dataIndex: i
      })
    },
    // scrollNumber() {
    //   for (let i = 0; i < document.querySelectorAll(".count").length; i++) {
    //       for (let j = 0; j < 3; j++) {
    //           let thisNumber = parseInt($(".data").eq(i).find(".count").eq(j).text())
    //           let timeFlag = 0.01;
    //           if (thisNumber < 100) {
    //               timeFlag = 50;
    //           }
    //           if (thisNumber >= 100 && thisNumber < 500) {
    //               timeFlag = 5;
    //           }
    //           countNuber(i, j, thisNumber, timeFlag);
    //       }
    //   }

    //   function countNuber(p, q, lastNum, timer) {
    //       let m = 0;
    //       setInterval(() => {
    //           if (m <= lastNum) {
    //               $(".data").eq(p).find(".count").eq(q).text(m++)
    //           }
    //       }, timer);
    //   }
    // },
    // 设备总数滚动
    upTimer() {
      let that = this
      let timer = setInterval(() => {
        if (that.oldValue < that.devSum) {
          that.oldValue++
        } else {
          clearInterval(timer)
        }
      }, 10)
    }
    // 采集器总数滚动

    // 地图

    // init(id) {
    //   this.charts = echarts.init(document.getElementById(id))

    //   var img = 'data:image/png;base64,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';

    //   var trafficWay = [{
    //     name: '火车',
    //     value: 20
    //   }, {
    //     name: '飞机',
    //     value: 10
    //   }, {
    //     name: '客车',
    //     value: 30
    //   }, {
    //     name: '轮渡',
    //     value: 40
    //   }];

    //   var data = [];
    //   var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
    //   for (var i = 0; i < trafficWay.length; i++) {
    //     data.push({
    //       value: trafficWay[i].value,
    //       name: trafficWay[i].name,
    //       itemStyle: {
    //         normal: {
    //           borderWidth: 5,
    //           shadowBlur: 20,
    //           borderColor: color[i],
    //           shadowColor: color[i]
    //         }
    //       }
    //     }, {
    //       value: 2,
    //       name: '',
    //       itemStyle: {
    //         normal: {
    //           label: {
    //             show: false
    //           },
    //           labelLine: {
    //             show: false
    //           },
    //           color: 'rgba(0, 0, 0, 0)',
    //           borderColor: 'rgba(0, 0, 0, 0)',
    //           borderWidth: 0
    //         }
    //       }
    //     });
    //   }
    //   var seriesOption = [{
    //     name: '',
    //     type: 'pie',
    //     clockWise: false,
    //     radius: [105, 109],
    //     hoverAnimation: false,
    //     itemStyle: {
    //       normal: {
    //         label: {
    //           show: true,
    //           position: 'outside',
    //           color: '#ddd',
    //           formatter: function (params) {
    //             var percent = 0;
    //             var total = 0;
    //             for (var i = 0; i < trafficWay.length; i++) {
    //               total += trafficWay[i].value;
    //             }
    //             percent = ((params.value / total) * 100).toFixed(0);
    //             if (params.name !== '') {
    //               return '交通方式：' + params.name + '\n' + '\n' + '占百分比：' + percent + '%';
    //             } else {
    //               return '';
    //             }
    //           },
    //         },
    //         labelLine: {
    //           length: 10,
    //           length2: 20,
    //           show: true,
    //           color: '#00ffff'
    //         }
    //       }
    //     },
    //     data: data
    //   }];
    //   let option = {
    //     backgroundColor: '#0A2E5D',
    //     color: color,
    //     title: {
    //       text: '交通方式',
    //       top: '48%',
    //       textAlign: "center",
    //       left: "49%",
    //       textStyle: {
    //         color: '#fff',
    //         fontSize: 22,
    //         fontWeight: '400'
    //       }
    //     },
    //     graphic: {
    //       elements: [{
    //         type: "image",
    //         z: 3,
    //         style: {
    //           image: img,
    //           width: 178,
    //           height: 178
    //         },
    //         left: 'center',
    //         top: 'center',
    //         position: [100, 100]
    //       }]
    //     },
    //     tooltip: {
    //       show: false
    //     },
    //     legend: {
    //       icon: "circle",
    //       orient: 'horizontal',
    //       // x: 'left',
    //       data: ['火车', '飞机', '客车', '轮渡'],
    //       right: 10,
    //       bottom: 10,
    //       align: 'right',
    //       textStyle: {
    //         color: "#fff"
    //       },
    //       itemGap: 10
    //     },
    //     toolbox: {
    //       show: false
    //     },
    //     series: seriesOption
    //   }

    //   // 使用刚指定的配置项和数据显示图表。
    //   this.charts.setOption(option);
    // }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.syxj{
  width: 200%;
  height: auto;
  padding-top: 3%;
  
}
* {
  /* margin: 0;
  padding: 0; */
  /* box-sizing: border-box; */
  background-color: rgba(10, 24, 99, 1.0);
  background-size: cover;
}

/* .app-container {

} */
/* 时间 */
.times {
  position: absolute;
  float: left;
  font-size: 1em;
  color: #bde4ff;
  border: none;
  background-color: rgba(0, 0, 0, 0);
}

.nav_active {
  /* box-shadow: -10px 0px 15px #034c6a inset,
    0px -10px 15px #034c6a inset,
    10px 0px 15px #034c6a inset,
    0px 10px 15px #034c6a inset; */
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0);
}

.left {
  float: left;
  background-color: rgba(0, 0, 0, 0);
}

.right {
  float: right;
  background-color: rgba(0, 0, 0, 0);
}

.title {
  display: inline-block;
  width: 100px;
  text-align: center;
  /* height: 50px; */
  position: relative;
  /* line-height: 50px; */
  /* margin-top: 15px; */
  margin-left: 35px;
  margin-right: 38px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: -10px 0px 15px #0c6a93 inset,
    0px -10px 15px #7f9aa4 inset;

  color: #ffffff;
  /*display: inline-block;*/
  /*padding: 0 15px 0 5px;*/
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}


.title i {
  width: 3px;
  /* height: 1px; */
  display: inline-block;
  position: relative;
  /* top:3px; */
  background-color: rgba(0, 0, 0, 0);
  /* margin-right: 5px; */
}

.title:hover {
  box-shadow: -10px 0px 15px #0fc0ec inset,
    0px -10px 15px #0ab0ec inset,
    10px 0px 15px #0d9ddb inset,
    0px 10px 15px #0da1e0 inset;
  box-sizing: border-box;
}


.nav {
  background-color: rgba(0, 0, 0, 0);
  margin-top: -10px;
}

.nav ul {
  background-color: rgba(0, 0, 0, 0);
}

.nav ul li {
  background-color: rgba(0, 0, 0, 0);
}

.nav>ul>li {
  display: inline-block;
  width: 100px;
  text-align: center;
  /* height: 50px; */
  position: relative;
  /* line-height: 50px; */
  /* margin-top: 15px; */
  margin-left: 35px;
  margin-right: 38px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: -10px 0px 15px #0c6a93 inset,
    /*å·¦è¾¹é˜´å½±*/
    0px -10px 15px #7f9aa4 inset;
  /*ä¸Šè¾¹é˜´å½±*/
  /* 10px 0px 15px #1b1c1c inset,
    0px 10px 15px #70c2e3 inset; */
  color: #ffffff;
  /*display: inline-block;*/
  /*padding: 0 15px 0 5px;*/
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.nav>ul>li i {
  width: 3px;
  /* height: 1px; */
  display: inline-block;
  position: relative;
  /* top:3px; */
  background-color: rgba(0, 0, 0, 0);
  /* margin-right: 5px; */
}

.nav>ul>li:hover {
  box-shadow: -10px 0px 15px #0fc0ec inset,
    0px -10px 15px #0ab0ec inset,
    10px 0px 15px #0d9ddb inset,
    0px 10px 15px #0da1e0 inset;
  box-sizing: border-box;
}

.head {
  /* height:5.3rem;   */
  /* margin:0 auto; */
  /* width:500px; */
  position: relative;
  /*height: 100%;*/
  height: 100px !important;
  /*height: 200px;*/
  background: url(../../assets/images/header.png) no-repeat;
  background-size: 100%;
  text-align: center;
  /* vertical-align: middle; */
}

img {
  border-radius: 30px;
  filter: opacity(0.8);
}

.head h1 {
  display: inline-block;
  font-size: 1.3em;
  color: #bde4ff;
  /* margin-top: 1rem;
  margin-right: 25rem; */
  /* margin:0;
padding:0;
line-height:50px;
text-align:center;
font-size:24px;
color:#5dc2fe; */
}

.clearfix {
  display: inline-block;
  color: white;
  font-size: 20px;
  position: relative;
  top: -20px;
  margin-right: 6px;

}

.main {
  margin-top: -18px;
}

/* 用于定义蓝色渐变标签 */
/* .clearfix {
    display:inline-block;
    height: 2rem;
    line-height: 30px;
    border-radius: 5px;
    padding-left: 1rem;
    color: white;
    background-image: linear-gradient(to right, rgb(14,53,95),rgb(4,17,35));
  } */

.data {
  /* width: 10rem; */
  /* height: 65px; */
  text-align: center;
  line-height: 50px;
  background-color: transparent;
  /* background-image: linear-gradient(rgb(8,41,74), rgb(4,16,42),rgb(8,41,74)); */
  color: #fff;
  font-size: 20px;
  /* font-weight: 600; */
  font-family: "LcdD";
}

/* 警告提示 */
.report1 {
  width: 150px;
  height: 150px;
  background: url(../../assets/images/report01.png) center no-repeat;
  background-size: 60%;
  text-align: center;
}

.report1 p {
  display: inline-block;
  font-weight: bold;
  font-size: 0.5em;
  color: #ff0000;
  margin-top: 50px;
}

/* 维保信息表格 */
.t_table {
  font-size: 0.16rem;
  color: #fff;
  width: 94%;
  margin: 0 auto;
  border-spacing: 0;
  text-align: center;
  box-sizing: border-box;
}

.t_table th {
  background: #053A98;
}

.t_table tr {
  margin: 0;
  padding: 0;
  height: 0.42rem;
}

.t_table thead tr {
  background: #053A98;
}

.t_table tbody tr td:first-child {
  border-left: 1px solid #053A98;
}

.t_table td {
  border-bottom: 1px solid #053A98;
  border-right: 1px solid #053A98;
}

.t_title {
  position: absolute;
  font-size: 0.18rem;
  color: #fff;
  left: 5%;
  top: 10%;
}

h3 {
  font-size: 15px;
  margin-left: 10px;
}

.num {
  display: inline-block;
}

.num span {
  font-size: 2.5rem;
  color: #ffeb7b;
  padding: .05rem 0;
  font-family: "STLiti";
  font-weight: bold;
  /* display: inline-block;
    width: 45px;
    height: 30px;
    text-align: center;
    line-height:30px;
    background-image: linear-gradient(rgb(15, 31, 119), rgb(4, 69, 115));
    color:#fff;
    font-size: 20px;
    font-weight: 600;
    font-family: "LcdD"; */
  /* margin-top: 15px; */
}

.box-card {
  padding: 10px;
  margin: 10px 5px;
  border-color: rgba(29, 86, 153, 0.5);

}

.second {
  background-image: linear-gradient(rgb(15, 31, 119), rgb(4, 69, 115));
  /* display: flex; */
  /* justify-content: space-between; */
  /* border-left: 2px solid blue; */
  /* border-color:  rgba(25, 222, 235, 0.5); */
  margin-left: 0px;
  color: white;
  width: 100%;
  height: 6rem;
}

.second li {
  list-style: none;
  width: auto;
  height: 2rem;
  /* text-align: center; */
  /* line-height: 50px; */
  /* float: left; */
}

.second span {
  /* display: inline-block; */
  font-size: 1em;
  color: white;
  background-color: transparent;
}


/* 维保表格信息 */
</style>
<style>
.all {
  padding-left: 10px;
  height: 100%;
  padding-right: 10px;
  width: 100%;
  min-height: calc(100vh);
}
</style>
<!-- <template>
  <div class="app-container home">
11111111111
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.2",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style> -->