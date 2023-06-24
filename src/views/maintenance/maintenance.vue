<template>
  <div class="app-container">
    <div style="background: #d2e9ff;margin-top: -3px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="margin-top:20px;position:absolute;">
      <el-form-item label="维保计划" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入维保计划名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入当前状态"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="管理人" prop="chargePeople">
        <el-input
          v-model="queryParams.chargePeople"
          placeholder="请输入管理人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    </div>


    <div style="height: auto;padding-top:20px; margin-top:20px;border-radius: 5px;box-shadow: 4px -2px 4px  #d9d9d9;">

      <div style="line-height:35px;font-weight:bold;margin-top:-5px;width:99%;height:35px;background: #d2e9ff; border-radius: 5px;box-shadow: 4px 4px 4px #d9d9d9;">维保记录</div>
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
        }"v-loading="loading" :data="planList" @selection-change="handleSelectionChange" style="height:auto;margin-top: 20px;width:99%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="维保计划" align="center" prop="name" />
      <el-table-column label="维保计划制定时间" align="center" prop="makingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center" prop="state" />
      <el-table-column label="管理人" align="center" prop="chargePeople" />
      <el-table-column label="维保方式" align="center" prop="maintenanceWay" />
      <el-table-column label="维保等级" align="center" prop="level" />
      <el-table-column label="维保项目" align="center" prop="maintenanceContent" />
      <el-table-column label="维保情况" align="center" prop="maintenanceCase" />
      <el-table-column label="预算金额" align="center" prop="budget" />
      <el-table-column label="第三方公司" align="center" prop="company" />
      <el-table-column label="实施人" align="center" prop="executePeople" />
      <el-table-column label="维保时间" align="center" prop="fixdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fixdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改plan对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="维保计划名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入维保计划名称" />
        </el-form-item>
        <el-form-item label="维保计划制定时间" prop="makingTime">
          <el-date-picker clearable
                          v-model="form.makingTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择维保计划制定时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当前状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入当前状态" />
        </el-form-item>
        <el-form-item label="管理人" prop="chargePeople">
          <el-input v-model="form.chargePeople" placeholder="请输入管理人" />
        </el-form-item>
        <el-form-item label="维保方式" prop="maintenanceWay">
          <el-input v-model="form.maintenanceWay" placeholder="请输入维保方式" />
        </el-form-item>
        <el-form-item label="维保等级" prop="level">
          <el-input v-model="form.level" placeholder="请输入维保等级" />
        </el-form-item>
        <el-form-item label="维保项目">
          <editor v-model="form.maintenanceContent" :min-height="192"/>
        </el-form-item>
        <el-form-item label="维保情况" prop="maintenanceCase">
          <el-input v-model="form.maintenanceCase" placeholder="请输入维保情况" />
        </el-form-item>
        <el-form-item label="维保前照片" prop="previousPic">
          <el-input v-model="form.previousPic" placeholder="请输入维保前照片" />
        </el-form-item>
        <el-form-item label="维保后照片" prop="subsequentPic">
          <el-input v-model="form.subsequentPic" placeholder="请输入维保后照片" />
        </el-form-item>
        <el-form-item label="预算金额" prop="budget">
          <el-input v-model="form.budget" placeholder="请输入预算金额" />
        </el-form-item>
        <el-form-item label="第三方公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入第三方公司" />
        </el-form-item>
        <el-form-item label="申请附件" prop="applyAccessory">
          <el-input v-model="form.applyAccessory" placeholder="请输入申请附件" />
        </el-form-item>
        <el-form-item label="审核附件" prop="auditAccessor">
          <el-input v-model="form.auditAccessor" placeholder="请输入审核附件" />
        </el-form-item>
        <el-form-item label="验收附件" prop="checkAccessor">
          <el-input v-model="form.checkAccessor" placeholder="请输入验收附件" />
        </el-form-item>
        <el-form-item label="实施人" prop="executePeople">
          <el-input v-model="form.executePeople" placeholder="请输入实施人" />
        </el-form-item>
        <el-form-item label="维保时间" prop="fixdate">
          <el-date-picker clearable
                          v-model="form.fixdate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择维保时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  </div></div>
</template>

<script>
import { listPlan, getPlan, delPlan, addPlan, updatePlan } from "../../api/system/plan";

export default {
  name: "Maintenance",
  data() {
    return {
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
        chargePeople: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询plan列表 */
    getList() {
      this.loading = true;
      listPlan(this.queryParams).then(response => {
        this.planList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
        fixdate: null
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
