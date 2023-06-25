<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(11)">设备信息管理</el-button>
      <el-button type="primary" @click="toTheSystem(12)">故障统计</el-button>
      <el-button type="primary" @click="toTheSystem(13)">设备树</el-button>
      <el-button type="primary" @click="toTheSystem(14)">故障预测</el-button>
      <el-button type="primary" @click="toTheSystem(15)">设备报废管理</el-button>
    </el-main>
    <el-card
      v-if="switchValue"
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block">设备编号：</p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dCode"
        style="width: 200px"
      >
      </el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        设备名称：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dName"
        style="width: 200px"
      ></el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        安装位置：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dLoc"
        style="width: 200px"
      ></el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        使用状态：
      </p>
      <el-select
        v-model="duseStatus"
        clearable
        placeholder="请选择"
        style="width: 200px"
      >
        <el-option
          v-for="item in duseStatuses"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <br/>
      <p style="font-family: Arial; display: inline-block">设备种类：</p>
      <el-select
        v-model="dDevAttrName"
        placeholder="请选择设备种类"
        clearable
      >
        <el-option label="水泵、电机" value="水泵、电机"></el-option>
        <el-option label="进水方向" value="进水方向"></el-option>
        <el-option label="出水方向" value="出水方向"></el-option>
      </el-select>
      <p style="font-family: Arial; display: inline-block;margin-left: 10px;">有效期至：</p>
      <el-date-picker
        v-model="dPurchesData"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        type="primary"
        style="margin-top: 10px; float: right; margin-left: 10px"
        icon="el-icon-search"
        @click="toTheSystem(11)"
      >搜索
      </el-button
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
          设备表详细信息
        </p>
        <el-button
          type="success"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-refresh"
          @click="toTheSystem(11)"
        >设备树
        </el-button>
        <el-button
          type="primary"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-plus"
          @click="toTheSystem(11)"
        >新增设备
        </el-button>
      </div>
      <el-table
        class="abc"
        :data="
          tableData2.slice(
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
        stripe
        style="width: 100%; margin-top: 10px"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="devName"
          label="设备名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="devCode"
          label="设备编码"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="安装位置"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="devAttrName"
          label="设备种类"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="ageLimit"
          label="有效期至"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="维保记录"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="350" prop="us" label="所处状态" align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="toTheSystem(11)"
            ></el-button>
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
  name: "lifecycle",
  data() {
    return {
      ustatus: '',
      // mstatus: true,
      switchValue: true,
      editValue: '',
      dialogVisible: false,
      dialogVisible1: false,
      mainHeight: 800,
      buttomHeight: '400px',
      currentPage4: 1,
      pageSize: 50,
      tableData1: [],
      findData: [],
      tableData2: [],
      totalpage: 1,
      //搜索
      dCode: '',
      dName: '',
      dNames: [],
      value: '',
      dLoc: '',
      dLocs: [],
      dmanu: '',
      dmanus: [],
      dmodel: '',
      dmarkStatus: '',
      duseStatus: '',
      duseStatuses: [
        { value: '选项1', label: '未运行' },
        { value: '选项2', label: '运行中' },
        { value: '选项3', label: '维保中' },
        { value: '选项4', label: '已报废' }
      ],
      dPurchesData: '',
      dDevAttrName: ''
    }
  },
  created() {
    this.init()
    this.getDevList()
  },
  methods: {
    init() {
      this.mainHeight = document.body.clientHeight
      this.buttomHeight = document.body.clientHeight * 0.4
    },
    //获取数据库设备表信息
    getDevList() {
      let res = [
        {
          "id": 24,
          "code": "",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": null,
          "devName": null,
          "location": null,
          "manufacturer": "ABB",
          "markStatus": 1,
          "model": "ACS-580",
          "useOrg": null,
          "devAttrName": null,
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "useTime": null,
          "runningTime": null,
          "ageLimit": null,
          "equipmentPicture": "",
          "equipmentIntroduction": "验收意见",
          "us": null,
          "repairNum":null,
          "mstatus": true
        }
      ]
      this.tableData1 = res
      this.totalpage = res.length
      this.tableData2 = this.tableData1
      for (var i = 0; i < this.totalpage; i++) {
        this.tableData2[i].repairNum = '(' + res[i].num + ')'
        if (res[i].useStatus == -1) {
          this.tableData2[i].ustatus = '未运行'
          this.tableData2[i].us = '1'
        } else if (res[i].useStatus == 0) {
          this.tableData2[i].ustatus = '运行中'
          this.tableData2[i].us = '2'
        } else if (res[i].useStatus == -2) {
          this.tableData2[i].ustatus = '维保中'
          this.tableData2[i].us = '3'
        } else if (res[i].useStatus == -3) {
          this.tableData2[i].ustatus = '已报废'
          this.tableData2[i].us = '4'
        }
        if (res[i].markStatus === 1) {
          this.tableData2[i].mstatus = true
        } else {
          this.tableData2[i].mstatus = false
        }
      }
      this.tableData2 = this.tableData2.reverse();
      //devName下拉框赋值
      var labels = []
      for (var i = 0; i < this.totalpage; i++) {
        if (labels.indexOf(this.tableData1[i].devName) == -1) {
          labels.push(this.tableData1[i].devName)
        }
      }
      console.log(labels)
      for (var i = 0; i < labels.length; i++) {
        var array = {}
        var j = i + 1
        array.value = '选项' + j
        array.label = labels[i]
        this.dNames.push(array)
      }
      //dLoc下拉框赋值
      labels = []
      for (var i = 0; i < this.totalpage; i++) {
        if (labels.indexOf(this.tableData1[i].location) == -1) {
          labels.push(this.tableData1[i].location)
        }
      }
      console.log(labels)
      for (var i = 0; i < labels.length; i++) {
        if (labels[i] != '') {
          var array = {}
          var j = i + 1
          array.value = '选项' + j
          array.label = labels[i]
          this.dLocs.push(array)
        }
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

<style scoped>

</style>
