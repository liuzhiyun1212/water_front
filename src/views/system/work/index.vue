<template>
  <div class="app-container">
    <!-- <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px"
    style="width: 100%; background: #d2e9ff; border-radius: 10px">
      <el-form-item label="发出时间段" prop="sendtime" style="
            margin-left: 20px;
            margin-top:14px;
            font-family: Arial;
          ">
    <el-date-picker clearable
      v-model="queryParams.sendtime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="
            margin-left: 20px;
            margin-top:16px;
            font-family: Arial;
          ">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-card> -->
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">  <!-- font-weight字体粗细-->
        <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          派工单详细信息
        </p>
    </div>
    <el-table v-loading="loading" :data="workList" >
      <!-- <el-table-column type="selection" width="55" align="center" ></el-table-column> -->
      <el-table-column type="index" width="50" label="序号" prop="ii"  sortable> </el-table-column>
      <el-table-column label="项目名称" align="center" prop="projectname" >
        <template slot-scope="scope">
            <el-link
              @click="toDetailInformation(scope.row.id)"
              type="primary"
              >{{ scope.row.projectname }}</el-link>
          </template>
        </el-table-column>
      <el-table-column label="项目类别" align="center" prop="category" />
      <el-table-column label="发出人" align="center" prop="sendpeople" />
      <el-table-column label="发出时间" align="center" prop="sendtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sendtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接收人" align="center" prop="receiptpeople" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row.projectname)"
            v-hasPermi="['work:work:edit']"
          >查看维保单</el-button>

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
  </el-card>
  </div>
</template>

<script>
import { listWork, getWork, delWork, addWork, updateWork } from "@/api/system/work";
// import { listPlan, getPlan, delPlan, addPlan, updatePlan } from "@/api/system/plan";
export default {
  data() {
    return {
      //时间段
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // 遮罩层
      loading: true,
      // 选中数组
      // ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // work表格数据
      workList: [],
      // 计划表格数据
      planList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        category: null,
        leader: null,
        numberid: null,
        sendunit: null,
        senddepartment: null,
        receiptunit: null,
        sendpeople: null,
        receiptpeople: null,
        sendtime: null,
        receipttime: null,
        jobcontent: null,
        acceptrequire: null,
        drawpeople: null,
        drawtime: null,
        projectname: null,


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
    /** 查询work列表 */
    getList() {
      this.loading = true;
      listWork(this.queryParams).then(response => {
        this.workList = response.rows;
        this.workList=this.workList.reverse();
        this.total = response.total;
        this.loading = false;
      });
      console.log(this.workList);
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        category: null,
        leader: null,
        numberid: null,
        sendunit: null,
        senddepartment: null,
        receiptunit: null,
        sendpeople: null,
        receiptpeople: null,
        sendtime: null,
        receipttime: null,
        jobcontent: null,
        acceptrequire: null,
        drawpeople: null,
        drawtime: null,
        remark: null,
        projectname: null,

      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd () {

      this.$router.replace('/graph/fix/workAdd');
      this.reset();
      },
    /** 查看维保单按钮操作 */
    handleUpdate: function (projectname) {
      this.$router.push({
        path: "/graph/fix/details",
        query: {
          projectname: projectname,
        },
      });
    },
    /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.id != null) {
    //         updateWork(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addWork(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    // handleDelete(row) {
    //   const ids = row.id||this.ids;
    //   this.$modal.confirm('是否确认删除此数据项？').then(function() {
    //     return delWork(ids);
    //   }).then(() => {
    //     this.getList();
    //     this.$modal.msgSuccess("删除成功");
    //   }).catch(() => {});
    // },
    //跳转页面
    toDetailInformation: function (projectname) {
      this.$router.push({
        path: "/graph/fix/workDetail",
        query: {
          id: projectname,
        },
      });
    },
  }
};
</script>
