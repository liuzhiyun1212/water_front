<template>
  <div class="app-container">
    <div style="width: 100%; background: #d2e9ff; border-radius: 10px"><p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          外派公司详细信息
        </p></div>
    <el-card
    style="
        width: 100%;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block">公司名称：</p>
      <!-- 搜索与添加区域 -->
      <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable @clear="getList"
          @keyup.enter.native="handleQuery" style="width: 200px;"
        />
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
    </el-card>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          style="margin-top: 10px;"
        >新增</el-button>
      </el-col>
    </el-row>


    <el-table
      :data="collaboratorList"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column type="index" label="序号"> </el-table-column>
      <!-- <el-table-column
        prop="companyId"
        label="序号"
        width="180">
        <template slot-scope="scope">
          <el-button
              size="mini" type="primary"
              @click="getCompanyList(scope.row)"
            >{{ scope.row.companyId }}</el-button>
          </template>
      </el-table-column> -->
      <el-table-column
        prop="companyName"
        label="公司名称"
        width="180">
        <template slot-scope="scope">
          <el-link
              size="mini" type="primary"
              @click="getCompanyList(scope.row,scope.$index)"
            >{{ scope.row.companyName }}</el-link>
          </template>
      </el-table-column>
      <el-table-column
        prop="businessAttr"
        label="公司业务">
      </el-table-column>
      <el-table-column
        prop="companyLevel"
        label="公司资质">
      </el-table-column>
      <el-table-column
        prop="linkName"
        label="联系人">
      </el-table-column>
      <el-table-column label="合作记录" width="130px">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="getListByCompany(scope.row,scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button  type="danger" plain size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      @pagination="getList"
    />
    <!-- 添加或修改collaborator对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司名" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkName">
          <el-input v-model="form.linkName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="业务属性" prop="businessAttr">
          <el-input v-model="form.businessAttr" placeholder="请输入业务属性" />
        </el-form-item>
        <el-form-item label="公司资质" prop="companyLevel">
          <el-input v-model="form.companyLevel" placeholder="请输入公司资质" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 合作记录弹窗 -->
    <el-dialog :visible.sync="open1" width="1000px" append-to-body>
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px"><p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          合作记录
        </p></div>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="维保编号"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="维保名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="company"
          label="维保单位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="maintenanceCase"
          label="维保情况">
        </el-table-column>
        <el-table-column
          prop="fixdate"
          label="维保时间">
        </el-table-column>
        <el-table-column label="维保记录" width="130px">
          <template  slot-scope="scope">
            <el-button size="mini" type="success"  @click="showMore(scope.row.name)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog :visible.sync="openDetail" width="1000px" append-to-body>
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px"><p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          公司详细信息
        </p></div>

      <el-table
        :data="detailData"
        style="width: 100%">
        <el-table-column
        prop="detailDataIndex"
        label="序号"
        width="180">
      </el-table-column>
        <!-- <el-table-column
          prop="companyId"
          label="公司编号"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="companyName"
          label="公司名称"
          width="180">
        </el-table-column>
        <el-table-column
        prop="businessAttr"
        label="公司业务">
      </el-table-column>
      <el-table-column
        prop="companyLevel"
        label="公司资质">
      </el-table-column>
      <el-table-column
        prop="linkName"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="公司介绍">
      </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { listCollaborator, getCollaborator, delCollaborator, addCollaborator, updateCollaborator, getListByCompany } from "@/api/system/collaborator";
import { getToken } from "@/utils/auth";

export default {
  name: "Collaborator",
  data() {
    return {
      collaboratorList: [],
        currentPage1: 1,
      // 查询列表参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        companyName: null,
        linkName: null,
        tel: null,
        businessAttr: null,
        companyLevel: null
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      open1:false,
      // 详情弹出层判断
      openDetail:false,
      total:0,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyName: [
                { required: true, message: "请输入公司名称", trigger: "blur" },
              ],
      },
      // 查看合作记录
      tableData: {},
      // 公司详情
      detailData: [],
      // 负责人名字
      showChargePeople: '',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询collaborator列表 */
    getList() {
      // this.loading = true;
      listCollaborator(this.queryParams).then(response => {
        this.collaboratorList = response.rows;
        console.log(response.rows);
        this.total = response.total;
        // this.loading = false;
      });
    },
    /** 查询collaborator列表 */
    getCompanyList(row,index) {
      const companyId = row.companyId || this.ids
      getCollaborator(companyId).then(response => {
        this.openDetail = true;
        response.data.detailDataIndex = index+1;
        this.detailData.push(response.data) ;
      });
      this.detailData.pop();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        companyId: null,
        companyName: null,
        linkName: null,
        tel: null,
        businessAttr: null,
        companyLevel: null
      };
      this.resetForm("form");
    },
    // /** 重置按钮操作 */
    // resetQuery() {
    //   this.resetForm("queryForm");
    //   this.handleQuery();
    // },
    // // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.companyId)
    //   this.single = selection.length!==1
    //   this.multiple = !selection.length
    // },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公司信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const companyname = encodeURI(row.companyName)
      // getCollaborator(companyId).then(response => {
      //   this.form = response.data
      //   this.open = true;
      //   this.title = "修改外派公司信息";
      // });
       this.$router.push({
           path: "/collaborator/collaborator/collaboratorUpdate",
           query: {
             Name: companyname,
           },
         });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.companyId != null) {
            updateCollaborator(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCollaborator(this.form).then(response => {
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
      const companyIds = row.companyId || this.ids;
      this.$modal.confirm('是否确认删除').then(function() {
        return delCollaborator(companyIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
      this.getList();
    },
    // 合作记录操作
    getListByCompany(row){
      const companyName = row.companyName || this.name;
      getListByCompany(companyName).then(response => {
        this.tableData = response;
        console.log("aa",this.tableData);
        this.open1=true;
      })

    },
    // 维保记录页面
    showMore(row){
        /*this.moreId = row
        this.open = true;
        this.title = "详情";*/
        this.$router.push({
          path: "/mainplan/fix/details",
          query: {
            planname: row,
          },
        });
      },
      tableRowClassName({row, rowIndex}) {
         // 把每一行的索引放进row
      row.index = rowIndex;
      }
    // /** 导出按钮操作 */
    // handleExport() {
    //   this.download('system/collaborator/export', {
    //     ...this.queryParams
    //   }, `collaborator_${new Date().getTime()}.xlsx`)
    // }

  }
};
</script>
