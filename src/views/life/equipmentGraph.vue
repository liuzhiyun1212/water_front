<template>
  <div>
    <el-card
      style="width: 95%; align: center; margin-left: 30px; margin-top: 10px"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="安装位置" name="first"
          ><div id="myChart" style="width:100%;height:230px;"></div
        ></el-tab-pane>
        <el-tab-pane label="生产厂家" name="second">生产厂家</el-tab-pane>
        <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"
          >定时任务补偿</el-tab-pane
        > -->
      </el-tabs>
    </el-card>
    <el-card
      style="width: 95%; align: center; margin-left: 30px; margin-top: 10px"
    >
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
        <el-table-column type="index" width="50" fixed> </el-table-column>
        <el-table-column
          fixed
          prop="actuaval"
          label="actuaval"
          show-overflow-tooltip
          align="center"
        >
          <!-- sortable -->
          <!-- <template slot-scope="scope">
            <el-link
              @click="toDetailInformation(scope.row.devCode)"
              type="primary"
              >{{ scope.row.devCode }}</el-link
            >
          </template> -->
        </el-table-column>
        <el-table-column
          fixed
          prop="install_site"
          label="安装位置"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="名称"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="nowtime"
          label="目前时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="pname"
          label="所属泵组"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="sensor_id" label="传感器id" width="100px"></el-table-column>
        <el-table-column prop="sensor_type_name" label="传感器类型名称" width="100px"> </el-table-column>
        <el-table-column prop="unit" label="单位" width="100px"> </el-table-column>
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
import axios from "axios";
import { listDevtable, delDevtable } from "@/api/system/devtable";
export default {
  data() {
    return {
      activeName: "first",
      switchValue: true,
      dialogVisible: false,
      mainHeight: 800,
      buttomHeight: "200px",
      currentPage4: 1,
      pageSize: 50,
      tableData: [],
      findData: [],
      totalpage: 1,
    };
  },
  mounted(){
    this.drawLine();
    this.testAxios();
  },
  created() {
    // this.getDevList();
  },
  methods: {
    testAxios() {
      const url = 'http://117.190.235.205:1535/SCADAService/data/GetYiDuDataYiQi';
      axios.get(url)
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            // console.log(response.data.KeyValue);
            // console.log(typeof(response.data.KeyValue));
            let data = eval("("+response.data.KeyValue+")")
            console.log(data.rows);
            this.tableData = data.rows;
            this.totalpage = data.total;
          }
        })
        .catch((err) => {
          alert("请求失败");
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    init() {
      this.mainHeight = document.body.clientHeight;
      this.buttomHeight = document.body.clientHeight * 0.4;
    },
    //获取数据库设备表信息
    getDevList() {
      listDevtable().then((res) => {
        // console.log(res.rows);
        this.tableData = res.rows;
        this.totalpage = res.rows.length;
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
    drawLine() {
      const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {}),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };
      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {},
        },
      };
      let myChart = echarts.init(document.getElementById("myChart"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Forest", "Steppe", "Desert", "Wetland"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012", "2013", "2014", "2015", "2016"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "Steppe",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290],
          },
          {
            name: "Desert",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190],
          },
          {
            name: "Wetland",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [98, 77, 101, 99, 40],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
