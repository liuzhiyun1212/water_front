<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>
  
<script>
import * as echarts from "echarts";
import resize from "@/views/dashboard/mixins/resize";
import { listFaultDataNoLimit } from "@/api/deal/deal";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      option: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initGraph();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initGraph() {
        listFaultDataNoLimit().then((res) => {
        console.log("==========");
        console.log(res);
        var arr = [];
        var detail = [];
        var map = res.troubleMap;
        for (var key in map) {
          console.log("map[" + key + "]" + map[key]);
          arr.push(key);
          detail.push({
            type: "bar",
            data: map[key],
            coordinateSystem: "polar",
            name: key,
            stack: "a",
            emphasis: {
              focus: "series",
            },
          });
        }
        this.option = {
          angleAxis: {
            type: "category",
            data: res.devNameList,
            show: true
          },
          radiusAxis: {
          },
          tooltip: {
            trigger: 'item'
          },
          polar: {
            center: ['50%', '45%']
          },
          series:
            detail,

          color: ["#5470C6", "#73C0DE", "#FAC858"],
          textStyle: {
            // color: "white",
          },
          legend: {
            show: true,
            bottom: -5,
            textStyle: {
              // color: "white",
              fontSize: 12,
            },
            data: arr,
          },
        };

        this.chart = echarts.init(this.$el);
        this.chart.setOption(this.option);
        var owner = this;
        this.chart.on('click', function (param) {
          //这个params可以获取你要的图中的当前点击的项的参数
          console.dir(param)
          // window.location.href="/life/life/equipmentTotally";
          // this.toPlan(param)
          owner.toPlan(param);
        });
      });
    },
    toPlan(param) {
      this.$router.push({
        path: "/life/faultStatistics",
      });
    },
  },
};
</script>
  