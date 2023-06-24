<template>
  <div class="all" style="padding-left: 10px; padding-right: 10px">
    <el-row :gutter="10">
      <el-col class="update-log" :span="24">
        <el-card>
          <div
            style="
          width: 100%;
          background: #d2e9ff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          padding-right: 3%;
          align-items: center;
        "
          >
            <p
              style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
            >
              已审核
            </p>
          </div>
          <el-table v-loading="loading" :data="planList"
                    class="abc"
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
                    :default-sort="{ prop: 'num', order: 'descending' }">
            <el-table-column label="序号" align="center" type="index" />
            <el-table-column label="维保计划名称" align="center" prop="name"/>
            <el-table-column label="当前状态" align="center" prop="state" />
            <el-table-column label="进度" align="center" prop="auditProcess" >
              <template slot-scope="scope">
                <div v-if="scope.row.state =='待审核'||scope.row.state =='审核中'||scope.row.state =='报废申请'||scope.row.state =='申请未通过'">
                  <span :style="{'color':'green'}">{{scope.row.auditProcess.slice(0,scope.row.auditProcess.indexOf(scope.row.checkPeople)-1)}}</span>
                  <span :style="{'color':'red'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)-1,scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length)}}</span>
                  <span :style="{'color':'grey'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length,scope.row.auditProcess.length)}}</span>
                </div>
                <div v-else-if="scope.row.state =='待验收'||scope.row.state =='验收中'">
                  <span :style="{'color':'green'}">{{scope.row.checkProcess.slice(0,scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1)}}</span>
                  <span :style="{'color':'red'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1,scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length)}}</span>
                  <span :style="{'color':'grey'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length,scope.row.checkProcess.length)}}</span>
                </div>
                <div v-else-if="scope.row.state =='已验收'">
                  <span :style="{'color':'green'}">{{scope.row.checkProcess}}</span>
                </div>
                <div :style="{'color':'green'}" v-else>{{ scope.row.auditProcess}}</div>
              </template>
            </el-table-column>
            <el-table-column label="维保计划制定时间" align="center" prop="makingTime" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.makingTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人" align="center" prop="chargePeople" >
              <template slot-scope="scope">
                <div v-if="scope.row.chargePeople[0] !='{'">
                  <span>{{scope.row.chargePeople}}</span>
                </div>
                <div v-else>
                  <span>{{JSON.parse(scope.row.chargePeople).name}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="pageNum"
            :limit.sync="pageSize"
            @pagination="getList1"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listPlan, getPlan,delPlan, addPlan, updatePlan } from "@/api/system/plan";
import { listRemove, getRemove, delRemove, addRemove, updateRemove } from "@/api/system/remove";
import { getUserProfile } from '@/api/system/user'

export default {
  name: "data",
  data() {
    return {
      // 遮罩层
      loading: true,
      id : null,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      buttomHeight: "400px",
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
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id:null,
        name: null,
        makingTime: null,
        state: null,
        chargePeople: null,
        auditProcess: null,
        maintenanceWay: null,
        level: null,
        equipmentData: null,
        maintenanceContent: null,
        maintenanceCase: null,
        parts: null,
        previousPic: null,
        subsequentPic: null,
        budget: null,
        company: null,
        applyAccessory: null,
        auditAccessor: null,
        checkAccessor: null,
        executePeople: null,
        fixdate: null,
        checkPeople: null
      },
      rqueryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        state: null,
        equipName: null,
        applyDept: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
        deptComments: null,
        partLeaderComments: null,
        managerComments: null,
        auditProcess: null,
        checkPeople: null,
        chairmanComments: null,
        financeComments: null,
        makingTime: null,
        chargePeople: null,
        auditMessage: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      alllist:[],
      shenheing: null,
      shenhelist:[],
      yanshouing:null,
      yanshoulist:[],
      username:null,
      roleName:""
    };
  },
  created() {
    getUserProfile().then(response => {
      this.username = response.data.userName
      this.roleName = response.data.roleName
      this.getList();
    })
  },
  methods: {
    /** 查询plan列表 */
    getList() {
      this.loading = true;
      this.alllist = []
      this.total = 0
      listPlan(this.queryParams).then(response1 => {
        listRemove(this.rqueryParams).then(response2 => {
          if(this.roleName.indexOf("审核人员")!=-1){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "未提交"||response1.rows[i].state == "待审核"||response1.rows[i].state == "待验收"){
              }
              else if(response1.rows[i].state == "审核中"){
                if(response1.rows[i].auditProcess.indexOf(this.username)>=response1.rows[i].auditProcess.indexOf(response1.rows[i].checkPeople)){}
                else{
                  this.alllist.push(response1.rows[i]);
                  this.total++;
                }
              }else if(response1.rows[i].state == "验收中"){
                if(response1.rows[i].checkProcess.indexOf(this.username)>=response1.rows[i].checkProcess.indexOf(response1.rows[i].acceptPeople)){}
                else{
                  this.alllist.push(response1.rows[i]);
                  this.total++;
                }
              }
              else{
                this.alllist.push(response1.rows[i]);
                this.total++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].auditProcess.indexOf(this.username)>=response2.rows[i].auditProcess.indexOf(response2.rows[i].checkPeople)){}
              else{
                this.alllist.push(response2.rows[i]);
                this.total++;
              }
              if(response2.rows[i].state == "已报废"){
                this.alllist.push(response2.rows[i]);
                this.total++;
              }
            }
          }
          else if(this.username=="admin"){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "未提交"){
              }
              else{
                this.alllist.push(response1.rows[i]);
                this.total++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "已报废"||response2.rows[i].state == "报废申请"){
                this.alllist.push(response2.rows[i]);
                this.total++;
              }
            }
          }
          this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
          this.getList1()
          this.loading = false;
        });
      });
    },
    getList1() {
      this.planList = []
      for(let i =0;i<this.pageSize;i++){
        if(this.alllist[(this.pageNum-1)*this.pageSize+i]!=undefined){
          this.planList.push(this.alllist[(this.pageNum-1)*this.pageSize+i])
        }
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        makingTime: null,
        state: null,
        chargePeople: null,
        maintenanceWay: null,
        level: null,
        equipmentData: null,
        maintenanceContent: null,
        maintenanceCase: null,
        parts: null,
        previousPic: null,
        subsequentPic: null,
        budget: null,
        company: null,
        applyAccessory: null,
        auditAccessor: null,
        checkAccessor: null,
        executePeople: null,
        fixdate: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加plan";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPlan(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改plan";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlan(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlan(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除plan编号为"' + ids + '"的数据项？').then(function() {
        return delPlan(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/plan/export', {
        ...this.queryParams
      }, `plan_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style>
.update-log {
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.id12 {
  text-align: center;
  font-family: Arial;
  font-size: 16px;
  font-weight: 600;
}
.id1 {
  text-align: center;
  font-family: Arial;
  font-size: 16px;
  font-weight: 600;
  margin-left: 50px;
  color: #333;
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
