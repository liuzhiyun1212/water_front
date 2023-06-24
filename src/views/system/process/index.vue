<!-- 审核流程管理 -->
<template>
  <div class="app-container">
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 头部区域 -->
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
          审核流程管理
        </p>
        <!-- 添加按钮 -->
        <el-button
          type="success"
          size="mini"
          @click="handleAdd"
        >添加</el-button
        >
      </div>

      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        class="abc"
        :data="processList"
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
        height="400px"
        stripe
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column
          label="审核流程名称"
          prop="auditName"
          align="center"
        ><template slot-scope="scope">
          <div v-if="scope.row.auditName =='设备拆除报废审核流程'">
            <span>{{scope.row.auditName}}（固定）</span>
          </div>
          <div v-else>
            <span>{{scope.row.auditName}}</span>
          </div>
        </template>
        </el-table-column>
        <el-table-column label="审核人" align="center" prop="auditMan" />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row.auditId)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />

      <!-- 添加/修改审核流程对话框 -->
      <el-dialog
        :title="title"
        :visible.sync="open"
        width="820px"
        append-to-body
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="110px"
          inline
        >
          <el-form-item
            label="审核流程名称"
            prop="auditName"
            style="width: 780px"
          >
            <div v-if="this.form.auditName=='设备拆除报废审核流程'">
              <el-input
                v-model="form.auditName"
                placeholder="请输入审核流程名称"
                style="width: 650px"
                disabled
              />
            </div>
            <div v-else>
              <el-input
                v-model="form.auditName"
                placeholder="请输入审核流程名称"
                style="width: 650px"
              />
            </div>
          </el-form-item>
          <el-form-item
            v-for="(item, index) in audit"
            :key="index"
            :label="'第' + item.num + '审核人'"
            prop="auditMan"
            style="width: 335px"
          >
            <el-select
              v-model="item.nValue"
              placeholder="请选择"
              clearable
              @change="selectChange(item.num)"
            >
              <el-option
                v-for="item in auditOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-button type="success" circle class="bt" @click="addAudit"
          >+</el-button
          >
          <el-button type="danger" circle class="bt" @click="deleteAudit"
          >-</el-button
          >
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {listProcess, getProcess, delProcess, addProcess, updateProcess,} from "@/api/system/process"
import { listUser, getAuthRole,getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";

export default {
  name: "Process",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // 表格数据
      processList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        auditId:null,
        auditName: null,
        auditMan: null,
        makeMan: null,
      },
      // 查询参数
      userqueryParams: {
        userName: undefined,
        roleName: "审核人员",
        phonenumber: undefined,
        status: 0,
        deptId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        auditName: [
          { required: true, message: "请输入审核流程名称", trigger: "blur" },
        ],
      },
      //审核人选项
      auditOptions: [],
      //审核人
      audit: [
        {
          num: "1",
          nValue: "",
          fValue: "",
        },
      ],
    }
  },
  created() {
    this.getList()
    this.getauditOptions()
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true
      listProcess(this.queryParams).then((response) => {
        this.processList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getauditOptions(){
      listUser(this.userqueryParams).then((response) => {
        for(let i =0;i<response.rows.length;i++){
          this.auditOptions.push({value: "选项"+(i+1), label: response.rows[i].userName, disabled: false,})
        }
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        auditId: null,
        auditName: null,
        auditMan: null,
        makeMan: null,
      }
      this.audit= [{num: "1", nValue: "", fValue: ""}]
      for (var key in this.auditOptions) {
        this.auditOptions[key].disabled = false
      }
      this.resetForm("form")
    },
    //选定选项
    selectChange(num) {
      var key
      for (key in this.audit) {
        if (this.audit[key].num === num) break
      }
      for (var k in this.auditOptions) {
        if (this.auditOptions[k].value === this.audit[key].fValue)
          this.auditOptions[k].disabled = false
        if (this.auditOptions[k].value === this.audit[key].nValue)
          this.auditOptions[k].disabled = true
      }
      this.audit[key].fValue = this.audit[key].nValue
    },
    //添加审核人
    addAudit() {
      var a = {
        num: "",
        nValue: "",
        fValue: "",
      }
      a.num = this.audit.length + 1 + ""
      this.audit.push(a)
    },
    //删除审核人
    deleteAudit() {
      for (var k in this.auditOptions) {
        if (
          this.auditOptions[k].value ===
          this.audit[this.audit.length - 1].nValue
        )
          this.auditOptions[k].disabled = false
      }
      this.audit.pop()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加审核流程"
    },

    handleUpdate(auditId) {
      this.reset();
      getProcess(auditId).then(response => {
        this.form = response.data;
        this.title = "修改审核流程";
        this.handleAuditMan()
        this.open = true;
      });
    },

    handleAuditMan(){
      let i = this.form.auditMan;
      i = i.slice(1,this.form.auditMan.length);
      i = i.replace(/②/,'-');
      i = i.replace(/③/,'-');
      i = i.replace(/④/,'-');
      i = i.replace(/⑤/,'-');
      i = i.replace(/⑥/,'-');
      i = i.replace(/⑦/,'-');
      i = i.replace(/⑧/,'-');
      i = i.replace(/⑨/,'-');
      i = i.replace(/⑩/,'-');
      var h = i.split('-');
      for (let a=1;a<h.length;a++) {
        this.addAudit()
      }
      for (let b=0;b<h.length;b++) {
        for (var key in this.audit) {
          if (this.audit[key].num == b+1){
            for (var k in this.auditOptions) {
              if(this.auditOptions[k].label==h[b]){
                this.audit[key].fValue=this.auditOptions[k].value
                this.audit[key].nValue=this.auditOptions[k].value
                this.auditOptions[k].disabled = true
                break
              }
            }
            break
          }
        }
      }
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        for (var k in this.audit) {
          if (this.audit[k].nValue === "") {
            return this.$message.error("请选择审核人！")
          }
        }
        if (valid) {
          var cNum = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"]
          this.form.auditMan = ""
          for (var k in this.audit) {
            if (this.audit[k].nValue !== "") {
              this.form.auditMan += cNum[this.audit[k].num - 1]
              for (var key in this.auditOptions) {
                if (this.auditOptions[key].value === this.audit[k].nValue)
                  this.form.auditMan += this.auditOptions[key].label
              }
            }
          }
          if (this.form.auditId != null) {
            updateProcess(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false
              this.getList()
            })
          } else {
            addProcess(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功")
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const auditIds = row.auditId || this.ids
      if(row.auditName=="设备拆除报废审核流程"){
        this.$modal.msgError("该数据项只可编辑，不可删除！")
      }else{
        this.$modal.confirm("是否确认删除该数据项？").then(function () {
          return delProcess(auditIds)
        }).then(() => {
          this.getList()
          this.$modal.msgSuccess("删除成功")
        }).catch(() => {})
      }
    },
  },
}
</script>

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
.abc.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
.bt {
  width: 36px;
  height: 36px;
  font-size: large;
}
</style>
