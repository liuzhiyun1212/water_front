<template>
    <div class="app-container">

        <el-tabs v-model="activeTabName" type="card" @tab-click="handleClickTab">
            <el-tab-pane label="设备统计" name="deviceName"></el-tab-pane>
            <el-tab-pane label="故障统计" name="faultType"></el-tab-pane>
            <!-- <el-tab-pane label="故障分析" name="analysis"></el-tab-pane> -->
        </el-tabs>

        <fault-chart ref="chart_line_one" @getClickedBarName="getClickedBarName" v-if="showBarChart"></fault-chart>
        <analysisChart v-if="!showBarChart"></analysisChart>
<el-card

      style="
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px" style="margin-top:10px">
            <el-form-item label="设备编码" prop="deviceCode" v-if="false">
                <el-input v-model="queryParams.deviceCode" placeholder="请输入设备编码" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="设备名称" prop="deviceName">
                <el-input v-model="queryParams.deviceName" placeholder="请输入设备名称" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- <el-form-item label="故障类型" prop="faultType">
                <el-input v-model="queryParams.faultType" placeholder="请输入故障类型" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item> -->
            <el-form-item label="故障类型" prop="faultType">
                <el-select v-model="queryParams.faultType" placeholder="请选择故障类型">
                    <el-option v-for="item in faultTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发生时间" prop="happenTimeRange">
                <el-date-picker v-model="queryParams.happenTimeRange" type="daterange" @input="dateRangeChange"
                    value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item >
                <el-button type="primary"
        style=" float: right; margin-left: 10px"
        icon="el-icon-search" @click="handleQuery" >搜索</el-button>
                <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" style="margin-top: 10px; float: right; margin-left: 10px">重置</el-button> -->
            </el-form-item>
        </el-form>
</el-card>

<el-card style=" margin-top: 10px">
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">

        <el-table v-loading="loading" :data="faultStatisticsList" :header-cell-style="{
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
        style="width: 100%; margin-top: 10px">
            <el-table-column label="序号" type="index" align="center" width="60" />
            <el-table-column label="设备编号" align="center" prop="deviceCode" sortable />
            <el-table-column label="设备名称" align="center" prop="deviceName" sortable />
            <el-table-column label="故障类型" align="center" prop="faultType" sortable />
            <el-table-column label="发生时间" align="center" prop="happenTime" sortable />
            <el-table-column label="维保记录" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
</el-card>

        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getList" />

    </div>
</template>

<script>
import { listFaultStatistics, countData, getMaintenanceName, getFaultList } from "@/api/system/faultStatistics";
import faultChart from './faultChart.vue';
import analysisChart from './analysisChart.vue'

export default {
    name: "FaultStatistics",
    components: { faultChart, analysisChart },
    data() {
        return {
            editValue: "",
            // 遮罩层
            loading: true,
            // 总条数
            total: 0,
            // faultStatistics表格数据
            faultStatisticsList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                deviceCode: null,
                deviceName: null,
                faultType: null,
                happenTime: null,
                startTime: null,
                endTime: null,
                //发生时间的范围
                happenTimeRange: [],
                //以哪个属性作为分类依据
                groupType: 'deviceName',
            },
            //柱状图数据
            legendName: '柱状图详情',
            //tab切换状态
            activeTabName: 'deviceName',
            //展示柱状图
            showBarChart: true,
            // 故障类型列表
            faultTypeList: []
        };
    },
    created() {
        this.getList();
        switch (this.activeTabName) {
            case 'deviceName':
                this.countDeviceName();
                break;
            case 'faultType':
                this.countFaultType();
                break;
            default:
                break;
        }
        this.getFaultTypeList()
    },
    watch: {
        'queryParams.happenTimeRange': {
            handler: function (newVal) {
                this.queryParams.startTime = newVal[0];
                this.queryParams.endTime = newVal[1]
            },
            deep: true,
        },
    },
    methods: {
        /** 查询faultStatistics列表 */
        getList() {
            this.loading = true;
            listFaultStatistics(this.queryParams).then(response => {
                this.faultStatisticsList = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        //获取设备故障类型
        getFaultTypeList() {
            getFaultList().then(response => {
                let list = response.rows;
                list.forEach(item => {
                    this.faultTypeList.push({value:item})
                });
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
            switch (this.activeTabName) {
                case 'deviceName':
                    this.countDeviceName();
                    break;
                case 'faultType':
                    this.countFaultType();
                    break;
                default:
                    break;
            }
        },

        /** 重置按钮操作 */
        resetQuery() {
            this.resetForm("queryForm");
            //watch监视的改动会在方法结束后进行，所以这里手动修改时间范围
            this.queryParams.startTime = null;
            this.queryParams.endTime = null;
            this.handleQuery();
        },
        dateRangeChange() {
            //由于时间选择组件的清空按钮没有回调函数，所以要手动更新状态
            if (!this.queryParams.happenTimeRange) {
                this.queryParams.happenTimeRange = []
                this.queryParams.startTime = null;
                this.queryParams.endTime = null
            }
        },
        //查看维保记录详情
        handleDetail(val) {
            getMaintenanceName({
                deviceCode: val.deviceCode,
                happenTime: val.happenTime
            }).then(response => {
                this.$router.push({
                    path: "/mainplan/fix/details",
                    query: {
                        planname: response.rows[0].name,
                    },
                });
            })
        },
        closeDialog(text) {
            this.dialogVisible = text;
            this.editValue = null;
        },
        //根据设备名统计
        countDeviceName() {
            countData(this.queryParams).then(response => {
                let resultArray = response.rows;
                let xArray = [];
                let yArray = [];
                resultArray.forEach(item => {
                    xArray.push(item.deviceName);
                    yArray.push(item.count)
                });
                //如果数据为空，填充“暂无数据”
                if (xArray === null || xArray.length === 0) {
                    this.$refs.chart_line_one.setData({
                        hasData: false
                    });
                } else {
                    this.$refs.chart_line_one.setData({
                        xData: xArray,
                        yData: yArray,
                        legendName: this.legendName,
                        //是否有数据，无数据则填充“暂无数据”
                        hasData: true
                    });
                }
                this.$refs.chart_line_one.initChart()
            });
        },

        //根据故障类型统计
        countFaultType() {
            countData(this.queryParams).then(response => {
                let resultArray = response.rows;
                let xArray = [];
                let yArray = [];
                resultArray.forEach(item => {
                    xArray.push(item.faultType);
                    yArray.push(item.count)
                });
                //如果数据为空，填充“暂无数据”
                if (xArray === null || xArray.length === 0) {
                    this.$refs.chart_line_one.setData({
                        hasData: false
                    });
                } else {
                    this.$refs.chart_line_one.setData({
                        xData: xArray,
                        yData: yArray,
                        legendName: this.legendName,
                        //是否有数据，无数据则填充“暂无数据”
                        hasData: true
                    });
                }
                this.$refs.chart_line_one.initChart()
            });
        },

        //触发柱状图点击事件后的回调函数
        getClickedBarName(val) {
            switch (this.activeTabName) {
                case 'deviceName':
                    this.queryParams.deviceName = val.clickedBarVal
                    // this.countDeviceName();
                    break;
                case 'faultType':
                    this.queryParams.faultType = val.clickedBarVal
                    // this.countFaultType()
                    break;
                default:
                    break;
            }
            this.queryParams.pageNum = 1;
            this.getList();
        },

        //柱状图tab按钮点击事件回调函数
        handleClickTab(tab) {
            this.activeTabName = tab.name;
            this.queryParams.groupType = tab.name;
            switch (this.activeTabName) {
                case 'deviceName':
                    this.showBarChart = true;
                    break;
                case 'faultType':
                    this.showBarChart = true;
                    break;
                case 'analysis':
                    this.showBarChart = false;
                    break;
                default:
                    break;
            }
            this.resetQuery()
        }
    },
};
</script>
