<template>
  <div>
    <el-card
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block">故障类型：</p>
      <!-- 搜索与添加区域 -->
      <el-input
          v-model="queryParams.troubleName"
          placeholder="请输入故障类型"
          clearable @clear="getList"
          @keyup.enter.native="handleQuery" style="width: 200px;"
        />
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
    </el-card>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
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
    <div style="width: 100%; background: #d2e9ff; border-radius: 10px"><p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          故障类型管理
        </p></div>
    <el-table
     :data="troubleList"
      style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <!-- <el-table-column
        prop="troubleId"
        label="序号"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="troubleName"
        label="故障类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="troubleIntroduction"
        label="故障介绍">
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
    </el-card>
    <!-- 添加或修改trouble对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="故障类型" prop="troubleName">
          <el-input v-model="form.troubleName" placeholder="请输入故障类型" />
        </el-form-item>
        <el-form-item label="故障介绍" prop="troubleIntroduction">
          <el-input type="textarea" v-model="form.troubleIntroduction" placeholder="请输入故障介绍" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTrouble, getTrouble, delTrouble, addTrouble, updateTrouble } from "@/api/system/trouble";
export default {
    name: "Trouble",
    data() {
      //自定义校验规则
    var checkName = (rule, value, callback) => {
      let checked = true
      if (!value) {
        return callback(new Error('编码不能为空'))
      } else {
        listTrouble({ troubleName: value }).then((res) => {
          console.log(res.total)
          if (res.total != 0) {
            checked = false
          }
          if (checked) {
            return callback()
          } else {
            return callback(new Error('类型重复'))
          }
        })
      }
    }
        return {

            troubleList: [],
            open: false,
            // 表单参数
            form: {},
            rules: {
              troubleName: [
                { required: true, message: "请输入故障类型", trigger: "blur" },
                { required: true, validator: checkName, trigger: 'blur' },
              ],
            },
            // 弹出层标题
            title: "",
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 5,
              troubleName: null,
              troubleIntroduction: null
            },
            // 总条数
            total: 0,
        }
    },
    created() {
    this.getList();
    },
    methods: {
      /** 查询trouble列表 */
      getList() {
          listTrouble(this.queryParams).then(response => {
            this.troubleList = response.rows;
            this.total = response.total;
            console.log(response.rows);
          });
        },
      /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const troubleId = row.troubleId || this.ids
      getTrouble(troubleId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改故障信息";
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const troubleIds = row.troubleId || this.ids;
      this.$modal.confirm('是否确认删除').then(function() {
        return delTrouble(troubleIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
     // 表单重置
     reset() {
      this.form = {
        troubleId: null,
        troubleName: null,
        troubleIntroduction: null
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.troubleId != null) {
            updateTrouble(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTrouble(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加故障类型信息";
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
  },


}
</script>

<style>

</style>
