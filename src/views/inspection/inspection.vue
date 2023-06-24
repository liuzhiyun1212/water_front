<template>
  <div class="app-container">
    <div style="background: #d2e9ff;margin-top: -3px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="margin-top:20px;position:absolute;margin-left: 20px">
           <el-form-item label="巡检时间" prop="date">
        <el-date-picker clearable
                        v-model="queryParams.date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择巡检时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="巡检人" prop="inspectPeople">
        <el-input
          v-model="queryParams.inspectPeople"
          placeholder="请输入巡检人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
</div>
<!--    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:inspection:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:inspection:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:inspection:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:inspection:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->
    <div style="height: auto;padding-top:20px; margin-top:20px;border:1px solid #d9d9d9;border-radius: 5px;box-shadow: 4px -2px 4px  #d9d9d9;">
      <div style="line-height:35px;font-weight:bold;margin-top:-5px;width:99%;height:35px;background: #d2e9ff; border-radius: 5px;box-shadow: 4px 4px 4px #d9d9d9;">设备巡检记录
        <el-button
          style="margin-right: 10px; margin-top:5px; float:right;"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
        <el-button
        style="margin-right: 10px; margin-top:5px; float:right;"
        type="success"
        plain
        icon="el-icon-plus"
        size="mini"

      >生成维保计划</el-button></div>
<!--      @click="handleAdd"
      v-hasPermi="['system:inspection:add']"-->
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
        }" v-loading="loading" :data="inspectionList" @selection-change="handleSelectionChange" style="height:auto;margin-top: 20px;width:99%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="故障地点" align="center" prop="dangerAddress" />
      <el-table-column label="故障描述" align="center" prop="description" />
      <el-table-column label="故障设备" align="center" prop="equipemnts" />
      <el-table-column label="是否维保" align="center" prop="isMaintain" />
      <el-table-column label="巡检时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="巡检人" align="center" prop="inspectPeople" />
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
      style="margin-bottom: 15px;"
    />
    </div>

    <!-- 添加或修改inspect对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="故障地点" prop="dangerAddress">
          <el-input v-model="form.dangerAddress" placeholder="请输入故障地点" />
        </el-form-item>
        <el-form-item label="故障描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入故障描述" />
        </el-form-item>
<!--        <el-form-item label="故障设备" prop="equipemnts">
          <el-input v-model="form.equipemnts" placeholder="请输入故障设备" />
        </el-form-item>-->
        <el-cascader
          style="width:30%"
          ref="equipmentCascader"
          placeholder="试试搜索：电机"
          :props= "{ multiple: true }"
          :options="equipmentOptions"
          v-model="equipment"
          @change="test"
          filterable
        >
        </el-cascader>

        <el-form-item label="是否维保" prop="isMaintain">
          <el-input v-model="form.isMaintain" placeholder="请输入是否维保" />
        </el-form-item>
        <el-form-item label="照片" prop="pic">
          <el-input v-model="form.pic" placeholder="请输入照片" />
        </el-form-item>
        <el-form-item label="巡检时间" prop="date">
          <el-date-picker clearable
                          v-model="form.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择巡检时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检人" prop="inspectPeople">
          <el-input v-model="people" placeholder="请输入巡检人"  />
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
import { listInspection, getInspection, delInspection, addInspection, updateInspection } from "../../api/system/inspection";
import { listLevelNode } from '../../api/system/tree'

export default {
  name: "Inspection",
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
      // inspect表格数据
      inspectionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dangerAddress: null,
        description: null,
        equipemnts: null,
        isMaintain: null,
        pic: null,
        date: null,
        inspectPeople: null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      //巡检人
      people:null,
      //所有设备
      equipmentOptions:[],
      //选择的设备
      equipment: [],
      //设备名称
      name:null,
      testlist:{},
    };
  },
  created() {
    this.getList();
    this.getEquipmentOption();
    console.log(process.env.VUE_APP_BASE_API);

  },
  methods: {
    /** 查询inspect列表 */
    getList() {
      this.loading = true;
      listInspection(this.queryParams).then(response => {
        this.inspectionList = response.rows;
        this.total = response.total;
        this.loading = false;
        /*console.log(response);
        console.log("11111"+JSON.stringify(response.rows[5].equipemnts));*/
      });
    },

    test(){
      let strs = this.$refs['equipmentCascader'].getCheckedNodes()[0].label.split(' ')
      this.testlist=this.$refs['equipmentCascader'].getCheckedNodes()
      this.name=strs[0];
      console.log(this.$refs['equipmentCascader']);
      console.log("名字"+this.testlist);
    },
    //获取设备表
    getEquipmentOption() {
      listLevelNode().then(response => {
        this.equipmentOptions = response
       /* console.log(this.equipmentOptions);*/
      })
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
        dangerAddress: null,
        description: null,
        equipemnts: null,
        isMaintain: null,
        pic: null,
        date: null,
        inspectPeople: null
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
      this.title = "添加巡检记录";
      this.people= this.$store.state.user.name;

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInspection(id).then(response => {
        this.form = response.data;
        this.people=this.form.inspectPeople;
        this.open = true;
        this.title = "修改巡检记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInspection(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.equipemnts=JSON.parse(this.name);
            console.log("2222-"+this.name+this.form.equipemnts);
            addInspection(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除inspect编号为"' + ids + '"的数据项？').then(function() {
        return delInspection(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/inspection/export', {
        ...this.queryParams
      }, `inspection_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
