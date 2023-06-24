<template>
  <div class="app-container">
    <div style="padding-top:20px;border-radius: 5px;box-shadow: 4px -2px 4px  #d9d9d9;">
      <div style="width: 98%; margin-left: 10px; background: #d2e9ff; border-radius: 10px">
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
        <el-button
          type="primary"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-s-claim"
          @click="acceptButton()"
          :disabled="acceptPlan"
        >验收
        </el-button
        >
        <el-button
          type="primary"
          style="float: right; margin-right: 5px; margin-top: 8px"
          icon="el-icon-video-pause"
          @click="endButton()"
          :disabled="endRepair"
        >结束维保
        </el-button
        >
        <el-button
          type="primary"
          style="float: right; margin-top: 8px"
          icon="el-icon-video-play"
          @click="beginButton()"
          :disabled="beginRepair"
        >开始维保
        </el-button
        >
        <el-button
          type="primary"
          style="float: right; margin-top: 8px"
          icon="el-icon-upload2"
          @click="commitButton()"
          :disabled="submitFlag"
        >提交
        </el-button
        >
        <el-button
          type="primary"
          style="float: right; margin-top: 8px"
          icon="el-icon-plus"
          @click="handleAdd()"
        >新增
        </el-button
        >
      </div>
      <div style="width: 98%; margin-left: 10px;">
        <el-table
          :header-cell-style="{
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
          v-loading="loading" :data="planList.slice(
            (currentPage4 - 1) * pageSize,
            currentPage4 * pageSize
          )"
          style="margin-top: 20px;width:99%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index" label="序号" :width="80">
            <template slot-scope="scope">
              <el-radio v-model="templateSelection" :label="scope.$index+1" @change="forskip(scope.row)"></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="维保计划名称"
            :show-overflow-tooltip="true" align="center"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="showMore(scope.row.name)">{{
                  scope.row.name
                }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column label="计划制定时间" align="center" prop="makingTime" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="维保方式" align="center" prop="maintenanceWay"/>
          <el-table-column label="维保项目" align="center" prop="maintenanceContent"/>
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
                icon="el-icon-edit"
                @click="handleUpdate(scope.row.id)"
                v-hasPermi="['system:plan:edit']"
                v-if="scope.row.state === '未提交'||scope.row.state === '维保中'||scope.row.state === '已维保'"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:plan:remove']"
              >删除</el-button>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getListreverse, getPlan, delPlan, addPlan, state, planMain, listPlan } from '../../api/system/plan'
import { getUserProfile } from '@/api/system/user'

export default {
  name: 'Maintenance',
  data() {
    return {
      templateSelection: '',
      currentPage4: 1,
      pageSize: 10,
      totalpage: 1,
      // 遮罩层
      loading: true,
      planList: [],
      planRow: {},
      acceptPlan: true,
      endRepair: true,
      beginRepair: true,
      submitFlag: true,
      userName:"",
    }
  },
  created() {
    // this.getList()
    this.getUser()
    // this.getTableData();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        console.log(response.data)
        this.user = response.data.userId;
        this.userName = response.data.userName;
        this.getTableData()
      })
    },
    getTableData() {
      listPlan().then((res) => {
        // console.log('aaaa', res.rows)
        var j = 0
        if(this.userName == "admin"){
          for (var i = 0; i < res.rows.length; i++) {
            if(res.rows[i].state !== "已验收"){
              this.planList[j] = res.rows[i]
              j++
            }
          }
        }else{
          for (var i = 0; i < res.rows.length; i++) {
            // console.log(res.rows[i].chargePeople);
            if (res.rows[i].chargePeople != '' && JSON.parse(res.rows[i].chargePeople).id == this.user && res.rows[i].state !== "已验收") {
              this.planList[j] = res.rows[i]
              j++
            }
          }
        }
        // console.log(this.planList);
        this.planList = this.planList.reverse();
        this.totalpage = this.planList.length
        this.loading = false
      })
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if(row.firstAuditTime != null && row.firstAuditTime != "" && row.state == '未提交'){
        return 'warning-row'
      }
      if(row.firstAcceptTime != null && row.firstAcceptTime != "" && row.state == '维保中'){
        return 'success-row'
      }
      /*if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }*/
      return ''
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.$router.push({
        path: "/mainplan/fix/create",
        query: {
          id:row
        },
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除?').then(function() {
        return delPlan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
        this.state();
        this.getList();
      }).catch(() => {});
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
    // 详情页面
    showMore(row) {
      /*this.moreId = row
      this.open = true;
      this.title = "详情";*/
      this.$router.push({
        path: '/mainplan/fix/details',
        query: {
          planname: row
        }
      })
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({
        path: '/mainplan/fix/create'
      })
    },
    //为跳转赋值
    forskip(value) {
      // console.log(value);
      this.planRow = value
      switch (value.state) {
        case '未提交':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = false
          break
        case '待审核':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
        case '审核中':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
        case '已审核':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = false
          this.submitFlag = true
          break
        case '维保中':
          this.acceptPlan = true
          this.endRepair = false
          this.beginRepair = true
          this.submitFlag = true
          break
        case '已维保':
          this.acceptPlan = false
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
        case '待验收':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
        case '验收中':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
        case '已验收':
          this.acceptPlan = true
          this.endRepair = true
          this.beginRepair = true
          this.submitFlag = true
          break
      }
    },
    //提交按钮
    commitButton() {
      this.$confirm('提交之后不能再修改维修计划,是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.planRow.auditProcess == null || this.planRow.auditProcess == ""){
          this.$alert('请先填写审核流程后再开启待审核', '提醒', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else {
          this.planRow.state = '待审核';
          let auditPeople = this.planRow.auditProcess.split(/[①②③④⑤⑥⑦⑧⑨⑩]/);
          this.planRow.checkPeople = auditPeople[1];
          console.log(this.planRow)
          planMain(this.planRow).then((res) => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            this.submitFlag = true
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    //开始维保按钮
    beginButton() {
      this.$confirm('是否开始维保?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.planRow.state = '维保中'
        console.log(this.planRow)
        planMain(this.planRow).then((res) => {
          this.$message({
            type: 'success',
            message: '已开始维保!'
          })
          this.beginRepair = true
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消开始维保'
        })
      })
    },
    //结束维保按钮
    endButton() {
      this.$confirm('是否结束维保?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.planRow.state = '已维保'
        console.log(this.planRow)
        planMain(this.planRow).then((res) => {
          this.$message({
            type: 'success',
            message: '已结束维保!'
          })
          this.endRepair = true
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消结束维保'
        })
      })
    },
    //开始验收按钮
    acceptButton() {
      this.$confirm('是否开始验收?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.planRow.checkProcess == null || this.planRow.checkProcess == ""){
          this.$alert('请先填写验收流程后再开启待验收', '提醒', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else {
          this.planRow.state = '待验收'
          let checkPeople = this.planRow.checkProcess.split(/[①②③④⑤⑥⑦⑧⑨⑩]/);
          this.planRow.acceptPeople = checkPeople[1];
          console.log(this.planRow)
          planMain(this.planRow).then((res) => {
            this.$message({
              type: 'success',
              message: '已进入待验收阶段!'
            })
            this.acceptPlan = true
          })
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消待验收'
        })
      })
    }
  }
}
</script>
<style>
.el-table .warning-row {
  /*background: oldlace;*/
  background: #FFCCCC;
}

.el-table .success-row {
  background: #FBD6A4;
}
</style>
