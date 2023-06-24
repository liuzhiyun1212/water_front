<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :show-close="false"
    >
      <el-button type="primary" @click="closeTable()" style="float: right"
      >关 闭
      </el-button
      >
      <equipmentAddEdit :editValue="editValue" @dialogClose="closeDialog"/>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible1"
      width="55%"
      :show-close="false"
    >
      <div slot="title" class="dialog-title">
        <!--        <span class="title-text" style="font-size: 20px;">设备详情</span>-->
        <div class="button-right">
          <el-button type="primary" @click="closeTable1()" style="float: right;"
          >关 闭
          </el-button>
        </div>
      </div>


      <equipmentTotally :editValue="editValue" @dialogClose="closeDialog1"/>
    </el-dialog>
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
      <!--      <el-select
              v-model="dName"
              @change="searchSelect(dName)"
              clearable
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option
                v-for="item in dNames"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>-->
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        安装位置：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dLoc"
        style="width: 200px"
      ></el-input>
      <!--      <el-select
              v-model="dLoc"
              @change="searchSelect2(dLoc)"
              clearable
              placeholder="请选择"
              style="width: 200px"
            >
              <el-option
                v-for="item in dLocs"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>-->
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        使用状态：
      </p>
      <el-select
        v-model="duseStatus"
        @change="searchSelect1(duseStatus)"
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
        @click="findDataMethod()"
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
          @click="devTable()"
        >设备树
        </el-button
        >
        <el-button
          type="primary"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-plus"
          @click="addDev()"
          v-hasRole="['admin']"
        >新增设备
        </el-button
        >
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
        :height="buttomHeight"
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
        >
          <template slot-scope="scope">
            <el-link @click="handleEdit1(scope.row)" type="primary">{{
                scope.row.devName
              }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="devCode"
          label="设备编码"
          show-overflow-tooltip
          align="center"
        >
          <!-- sortable -->
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
        >
          <template slot-scope="scope">
            <el-link
              @click="toLifeRepair(scope.row)"
              type="primary"
            >维保记录{{ scope.row.repairNum }}
            </el-link
            >
          </template
          >
        </el-table-column>
        <el-table-column width="350" prop="us" label="所处状态" align="center">
          <template slot-scope="scope"
          ><img
            style="width: 300px; height: 30px"
            :src="require('../../assets/' + scope.row.us + '.png')"
          /></template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-hasRole="['admin']"
            ></el-button>
            <el-tooltip class="item" effect="dark" content="报废申请" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-s-release"
                @click="handleScrap(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
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
import axios from 'axios'
import { listDevtable, delDevtable } from '@/api/system/devtable'
import equipmentAddEdit from '../life/equipmentAddEdit.vue'
import equipmentTotally from './equipmentTotally'
import { listRepair, listRepairNum } from '@/api/system/equipment'

export default {
  inject: ['reload'],
  components: {
    equipmentAddEdit, equipmentTotally
  },
  methods: {
    testAxios: function() {
      this.$router.push({
        path: '/life/life/equipmentGraph'
      })
    },
    toLifeRepair: function(dev) {
      if(dev.num != 0){
        this.$router.push({
          path: '/life/life/equipmentRepair',
          query: {
            dev: dev
          }
        })
      }else{
        this.$message({
          message: '当前设备无维保记录!',
          type: 'warning'
        });
      }
    },
    /* testAxios() {
      const url = 'http://117.190.235.205:1535/SCADAService/data/GetYiDuDataYiQi';
      axios.get(url)
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        })
        .catch((err) => {
          alert("请求失败");
        });
    }, */
    init() {
      this.mainHeight = document.body.clientHeight
      this.buttomHeight = document.body.clientHeight * 0.4
    },
    //跳转页面
    toDetailInformation: function(devname) {
      this.$router.push({
        path: '/life/life/equipmentTotally',
        query: {
          devCode: devname
        }
      })
    },
    devTable: function() {
      this.$router.push({
        path: '/equtree'
      })
    },
    addDev: function() {
      this.$router.push({
        path: '/life/life/equipmentAdd'
      })
    },
    //获取数据库设备表信息
    getDevList() {
      listRepairNum().then((res) => {
        console.log(res)
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
      })
      /*listDevtable({ devAttrCode: '1' }).then((res) => {
        console.log(res.rows)
        this.tableData1 = res.rows
        this.totalpage = res.rows.length
        /!*for (var i = 0; i < this.totalpage; i++) {
          listRepair(res.rows[i]).then((response) => {
            console.log(response);
            this.tableData2[i].repairNum = "("+ response.length+")";
          })
        }*!/
        listRepairNum().then((response)=>{
          console.log(response);
          this.tableData2 = this.tableData1;
          var num = response.split("");
          for(var i = 0;i<num.length;i++){
            this.tableData2[i].repairNum = "(" + num[i] + ")";
          }
          for (var i = 0; i < this.totalpage; i++) {
            if (res.rows[i].useStatus == -1) {
              this.tableData2[i].ustatus = '未运行'
              this.tableData2[i].us = '1'
            } else if (res.rows[i].useStatus == 0) {
              this.tableData2[i].ustatus = '运行中'
              this.tableData2[i].us = '2'
            } else if (res.rows[i].useStatus == -2) {
              this.tableData2[i].ustatus = '维保中'
              this.tableData2[i].us = '3'
            } else if (res.rows[i].useStatus == -3) {
              this.tableData2[i].ustatus = '已报废'
              this.tableData2[i].us = '4'
            }
            if (res.rows[i].markStatus === 1) {
              this.tableData2[i].mstatus = true
            } else {
              this.tableData2[i].mstatus = false
            }
          }
          this.tableData2 = this.tableData2.reverse()
        })
        // console.log(this.tableData2)
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
      })*/
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
    },
    handleEdit(index, row) {
      console.log(index, row)
      console.log('已有数据' + this.editValue)
      // 组件赋值
      this.editValue = row
      console.log(this.editValue)
      this.dialogVisible = true
      // 用于计算卡片高度，在equipmentTime页面init有调用
      localStorage.setItem('dialogHeight', 110)
      console.log('设备修改信息页')
    },
    closeDialog(text) {
      this.dialogVisible = text
      this.editValue = null
    },
    closeTable() {
      this.dialogVisible = false
      // location.reload();
      this.reload()
    },
    handleEdit1(index) {
      console.log(index)
      console.log('已有数据' + this.editValue)
      // 组件赋值
      this.editValue = index
      console.log(this.editValue)
      this.dialogVisible1 = true
      // 用于计算卡片高度，在equipmentTime页面init有调用
      localStorage.setItem('dialogHeight', 110)
      console.log('设备修改信息页')
    },
    closeDialog1(text) {
      this.dialogVisible1 = text
      this.editValue = null
    },
    closeTable1() {
      this.dialogVisible1 = false
      // location.reload();
      // this.reload();
    },
    handleDelete(index, row) {
      console.log(index, row)
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除设备编号为"' + row.devCode + '"的数据项？')
        .then(function() {
          delDevtable(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
          // this.reload();
          location.reload()
        })
        .catch(() => {
        })
      this.getDevList()
    },
    handleScrap(index, row) {
      this.$router.push({
        path: '/equipRemove/addRemoveApply',
        query: {
          dev: row
        }
      })
    },
    searchSelect(label) {
      console.log(label)
      this.dName = label
    },
    searchSelect1(label) {
      console.log(label)
      this.duseStatus = label
    },
    findDataMethod() {
      this.tableData2 = this.tableData1
      this.findData = []
      if (
        this.dCode == '' &&
        this.dName == '' &&
        this.dLoc == '' &&
        this.dmanu == '' &&
        this.dmodel == '' &&
        this.dmarkStatus == '' &&
        this.duseStatus == '' &&
        (this.dPurchesData == '' || this.dPurchesData == null) &&
        this.dDevAttrName == ''
      ) {
        this.tableData2 = this.tableData1
        this.totalpage = this.tableData2.length
        alert('请输入搜索内容！')
      }
      var x
      var i = 0
      if (this.dCode != '') {
        for (x = 0; x < this.tableData1.length; x++) {
          console.log(this.tableData2[x].devCode)
          if (
            this.tableData2[x].devCode !== null &&
            this.tableData2[x].devCode.match(this.dCode) != null
          ) {
            this.findData[i] = this.tableData1[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        // console.log(this.tableData2.length);
        this.findData = []
        i = 0
      }
      if (this.dName != '') {
        for (x = 0; x < this.tableData2.length; x++) {
          if (
            this.tableData2[x].devName != null &&
            this.tableData2[x].devName.match(this.dName) != null
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
      if (this.dLoc != '') {
        for (x = 0; x < this.tableData2.length; x++) {
          if (
            this.tableData2[x].location != null &&
            this.tableData2[x].location.match(this.dLoc) != null
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
      if (this.dmanu != '') {
        for (x = 0; x < this.tableData2.length; x++) {
          if (
            this.tableData2[x].manufacturer != null &&
            this.tableData2[x].manufacturer.match(this.dmanu) != null
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
      if (this.duseStatus != '') {
        for (x = 0; x < this.tableData2.length; x++) {
          // console.log("mmy",this.tableData2[x].ustatus)
          if (
            this.tableData2[x].ustatus != null &&
            this.tableData2[x].ustatus.match(this.duseStatus)
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
      if (this.dDevAttrName != '') {
        for (x = 0; x < this.tableData2.length; x++) {
          if (
            this.tableData2[x].devAttrName != null &&
            this.tableData2[x].devAttrName.match(this.dDevAttrName)
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
      if (this.dPurchesData != '') {
        var mindata = ''
        var maxdata = ''
        mindata = this.formatDate(this.dPurchesData[0])
        maxdata = this.formatDate(this.dPurchesData[1])
        console.log(mindata, maxdata)
        console.log(this.tableData2.length)
        for (x = 0; x < this.tableData2.length; x++) {
          if (
            this.tableData2[x].purchaseData != null &&
            this.compareDate(this.tableData2[x].ageLimit, mindata) &&
            this.compareDate(maxdata, this.tableData2[x].ageLimit)
          ) {
            this.findData[i] = this.tableData2[x]
            i++
          }
        }
        this.tableData2 = this.findData
        this.totalpage = this.tableData2.length
        this.findData = []
        i = 0
      }
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d)
      var YY = date.getFullYear() + '-'
      var MM =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return YY + MM + DD
    },
    //判断两个日期大小
    compareDate(d1, d2) {
      //判断两个日期的大小
      let reg = new RegExp('-', 'g')
      if (new Date(d1.replace(reg, '/')) >= new Date(d2.replace(reg, '/'))) {
        console.log('第一个大')
        return true
      } else {
        console.log('第二个大')
        return false
      }
    }
  },
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
  }
}
</script>
<style>
.el-icon-my-analysis {
  background: url("~@/assets/analysis.png") center center no-repeat;
  background-size: cover;
}

.el-icon-my-analysis:before {
  content: "替";
  font-size: 16px;
  visibility: hidden;
}
</style>
<style lang="scss" scoped>
.abc ::v-deep .el-table__body tr:hover > td {
  background-color: #ffffbb !important;
  font-weight: bold;
}

.abc thead {
  color: #fff;
}

.abc.el-table__header-wrapper th,
.abc .el-table__fixed-header-wrapper th {
  height: 20px;
}

.el-button--primary,
.el-button--primary:focus,
.el-button--primary.is-active,
.el-button--primary:active {
  background: #84bbfe;
  border-color: #84bbfe;
}

.abc.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
</style>
