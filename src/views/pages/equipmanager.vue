<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(7)">综合查询</el-button>
      <el-button type="primary" @click="toTheSystem(8)">综合统计</el-button>
      <el-button type="primary" @click="toTheSystem(9)">状态调整</el-button>
      <el-button type="primary" @click="toTheSystem(10)">进度可视化</el-button>
    </el-main>
      <el-card
        style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
      >
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">维保计划名称：</p>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="planName"
          style="width: 200px"
        >
        </el-input>
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">负责人：</p>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="planPerson"
          style="width: 200px"
        >
        </el-input>
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">计划制定时间：</p>
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
          @click="toTheSystem(7)"
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
            维保记录
          </p>
        </div>
        <div style="width: 100%; margin-top: 10px;height:70px;display: flex;border-radius: 5px; background-color: aliceblue;">
          <i class="iconfont icon-circle" style="align-self: center; color: #5B8FF9;float: left; cursor: pointer; font-size: 20px;margin-left: 20px;">&nbsp;&nbsp;{{this.stateName[0]}}</i>
          <div class="未提交"
               style="align-self: center;width:30px; height:30px;float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color:  #be002f;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[1]}}</i>
          <div class="待审核"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #FF6347;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[2]}}</i>
          <div class="审核中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: blue;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[3]}}</i>
          <div class="已审核"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #228b22;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[4]}}</i>
          <div class="维保中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #da70d6;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[5]}}</i>
          <div class="已维保"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #40e0d0;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[6]}}</i>
          <div class="待验收"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: darkkhaki;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[7]}}</i>
          <div class="验收中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle"  style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[8]}}</i>
          <div class="已验收"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;全部</i>
          <div class="全部"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
        </div>
        <el-table :header-cell-style="{
            background: '#84BBFE',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: '黑体',
            padding: '0',
          }"
                  :header-row-style="{
            height: '20',
          }"
                  v-loading="loading"
                  :data="planList.slice(
            (currentPage4 - 1) * pageSize,
            currentPage4 * pageSize
          )"
                  :row-class-name="tableRowClassName"
                  style="margin-top: 20px;width:100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column
            prop="name"
            label="维保计划名称"
            :show-overflow-tooltip="true" align="center"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="toTheSystem(7)">{{
                  scope.row.name
                }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="计划制定时间" align="center" prop="makingTime" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="维保方式" align="center" prop="maintenanceWay" />
          <el-table-column label="维保项目" align="center" prop="maintenanceContent" />
          <el-table-column
            prop="state"
            label="执行阶段"
            :show-overflow-tooltip="true" align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-document"
                @click="toTheSystem(7)"
              >详情</el-button>
            </template>
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
export default {
  name: "equipmanager",
  data() {
    return {
      buttomHeight: '400px',
      planName:"",
      planPerson:"",
      planTime:"",
      planData: [],
      findData: [],
      currentPage4: 1,
      pageSize: 10,
      totalpage: 1,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // plan表格数据
      planList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        state: null,
        makingTime: null,
        maintenanceWay: null,
        maintenanceContent: null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 新修改统计状态总数
      stateList: [],
      // 执行阶段名称
      stateName: ["未提交", "待审核", "审核中", "已审核", "维保中", "已维保", "待验收", "验收中", "已验收"],
      moreId: null,
      length1: null,
    };
  },
  created() {
    this.init();
    this.getList();
  },
  methods: {
    init() {
      this.mainHeight = document.body.clientHeight
      this.buttomHeight = document.body.clientHeight * 0.4
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if(row.firstAuditTime != null && row.firstAuditTime != "" && row.state == '未提交'){
        return 'warning-row'
      }
      if(row.firstAcceptTime != null && row.firstAcceptTime != "" && row.state == '维保中'){
        return 'success-row'
      }
      return ''
    },
    findDataMethod() {
      this.planList = this.planData;
      this.findData = [];
      if (
        this.planName == "" &&
        this.planPerson == "" &&
        (this.planTime == "" || this.planTime == null)
      ) {
        this.planList = this.planData;
        this.totalpage = this.planList.length;
        alert("请输入搜索内容！");
      }
      var x;
      var i = 0;
      if (this.planName != "") {
        for (x = 0; x < this.planData.length; x++) {
          if (
            this.planList[x].name !== null &&
            this.planList[x].name.match(this.planName) != null
          ) {
            this.findData[i] = this.planData[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
      if (this.planPerson != "") {
        for (x = 0; x < this.planData.length; x++) {
          if (
            this.planList[x].chargePeople !== null &&
            (JSON.parse(this.planList[x].chargePeople).name).match(this.planPerson) != null
          ) {
            this.findData[i] = this.planData[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
      if (this.planTime != "") {
        var mindata = "";
        var maxdata = "";
        mindata = this.formatDate(this.planTime[0]);
        maxdata = this.formatDate(this.planTime[1]);
        console.log(mindata, maxdata);
        console.log(this.planList.length);
        for (x = 0; x < this.planList.length; x++) {
          if (
            this.planList[x].makingTime != null &&
            this.compareDate(this.planList[x].makingTime, mindata) &&
            this.compareDate(maxdata, this.planList[x].makingTime)
          ) {
            this.findData[i] = this.planList[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
    },
    /** 查询plan列表 */
    getList() {
      this.loading = true;
      this.planData = [
        {
          "id": 224,
          "name": null,
          "makingTime": null,
          "state": null
        }
      ];
      this.planList = this.planData;
      this.totalpage = this.planList.length;
      this.planList = this.planList.reverse();
      this.loading = false;
    },
    toNew() {
      this.$router.push({
        path: "/maintenanceGraph/maintenanceGraph/index",
      });
    },
    // 详情页面
    showMore(row){
      this.$router.push({
        path: "/mainplan/fix/details",
        query: {
          planname: row,
        },
      });
    },
    //日期转换方法
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
    toTheSystem(i){
      var ticket = this.$route.query.ticket
      const routeData = this.$router.resolve({
        path: '/register',
        query:{
          ticket: ticket,
          id:i
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: #FFCCCC;
}

.el-table .success-row {
  background: #FBD6A4;
}
</style>
