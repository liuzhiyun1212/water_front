<template>
  <div class="app-container">
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="备件编码" prop="sparepartNode">
        <el-input
          v-model="queryParams.sparepartNode"
          placeholder="请输入备件编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备件名称" prop="sparepartName">
        <el-input
          v-model="queryParams.sparepartName"
          placeholder="请输入备件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联设备" prop="associatedDevices">
        <!--el-input
          v-model="queryParams.associatedDevices"
          placeholder="请输入关联设备"
          clearable
          @keyup.enter.native="handleQuery"
        /-->
        <el-cascader v-model="qassociatedDevices" :options="field102Options" :props="field102Props"
                     :style="{width: '100%'}" placeholder="请选择关联设备" clearable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table ref="partList" v-loading="loading" :data="partList"
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
              :default-sort="{ prop: 'num', order: 'descending' }"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="备件编码" align="center" prop="sparepartNode" />
      <el-table-column label="备件名称" align="center" prop="sparepartName" />
      <el-table-column label="库存数量" align="center" prop="number" />
      <el-table-column label="调拨使用情况" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleFind(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="关联设备" align="center" prop="associatedDevices" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
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

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="备件编码" prop="sparepartNode">
          <el-input v-model="form.sparepartNode" placeholder="请输入备件编码" />
        </el-form-item>
        <el-form-item label="备件名称" prop="sparepartName">
          <el-input v-model="form.sparepartName" placeholder="请输入备件名称" />
        </el-form-item>
        <el-form-item label="库存数量" prop="number">
          <el-input v-model.number="form.number" placeholder="请输入库存数量(限数字)" oninput="value=value.replace(/[^0-9.]/g,'')"/>
        </el-form-item>
        <el-form-item label="关联设备" prop="associatedDevices">
          <!--el-input v-model="form.associatedDevices" placeholder="请输入关联设备" /-->
          <el-cascader v-model="fassociatedDevices" :options="field102Options" :props="field102Props"
                       :style="{width: '100%'}" placeholder="请选择关联设备" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 对话框 -->
    <el-dialog :title="retitle" :visible.sync="openrecord" width="1000px">
      <el-table ref="recordList" v-loading="reloading" :data="recordList"
                class="abc" :header-cell-style="{
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
        }">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="配件名称" align="center" prop="sparepartName" />
        <el-table-column label="调拨使用数量" align="center" prop="transferNum" />
        <el-table-column label="调拨使用时间" align="center" prop="transferUsageTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.transferUsageTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调拨人" align="center" prop="transferMan" >
          <template slot-scope="scope">
              <span>{{JSON.parse(scope.row.transferMan).name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用人" align="center" prop="useMan" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="skip(scope.row.planId)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="retotal>0"
        :total="retotal"
        :page.sync="requeryParams.pageNum"
        :limit.sync="requeryParams.pageSize"
        @pagination="getrecordList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
      <!-- 添加或修改【请填写功能名称】对话框 -->
      <el-dialog :title="rtitle" :visible.sync="ropen" width="500px" append-to-body>
        <el-form ref="rform" :model="rform" :rules="rules" label-width="80px">
          <el-form-item label="配件名称" prop="sparepartName">
            <el-input v-model="rform.sparepartName" placeholder="请输入配件名称" disabled/>
          </el-form-item>
          <el-form-item label="调拨数量" prop="transferNum">
            <el-input v-model="rform.transferNum" placeholder="请输入调拨数量" disabled/>
          </el-form-item>
          <el-form-item label="调拨使用时间" prop="transferUsageTime">
            <el-date-picker clearable
                            v-model="rform.transferUsageTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择调拨使用时间" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调拨人" prop="transferMan">
            <el-input v-model="rform.transferMan" placeholder="请输入调拨人" disabled/>
          </el-form-item>
          <el-form-item label="使用人" prop="useMan">
            <el-input v-model="rform.useMan" placeholder="请输入使用人" disabled/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="recancel">关 闭</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { listPart, getPart, delPart, addPart, updatePart } from "@/api/system/part";
import { listRecord} from "@/api/system/record";
import {listLevelButLeaf} from "@/api/system/devtable";
import {getPlan} from "../../../api/system/plan";

export default {
  name: "Part",
  data() {
    return {
      // 遮罩层
      loading: true,
      reloading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [],
      // 非单个禁用
      single: true,
      buttomHeight: "400px",
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      retotal: 0,
      // 表格数据
      partList: [],
      recordList: [],
      qassociatedDevices:[],
      fassociatedDevices:[],
      // 弹出层标题
      title: "",
      retitle: "调拨使用记录",
      rtitle: "详情",
      // 是否显示弹出层
      open: false,
      openrecord: false,
      ropen: false,
      field102Options: [],
      field102Props: {
        "multiple": false
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sparepartNode: null,
        sparepartName: null,
        number: null,
        associatedDevices: null
      },
      requeryParams: {
        pageNum: 1,
        pageSize: 10,
        recordId: null,
        sparepartNode: null,
        sparepartName: null,
        transferNum: null,
        transferMan: null,
        useMan: null,
        planId:null
      },
      devqueryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        addTime: null,
        editTime: null,
        orgId: null,
        tenantId: null,
        userId: null,
        devAttrTypeId: null,
        devCode: null,
        devName: null,
        file: null,
        location: null,
        manufacturer: null,
        markStatus: null,
        model: null,
        useOrg: null,
        useStatus: null,
        devAttrName: null,
        devAttrCode: null,
        lastRepaireTime: null,
        purchaseData: null,
        installData: null,
        startData: null,
        useTime: null,
        runningTime: null,
        ageLimit: null,
        equipmentPicture: null,
        equipmentIntroduction: null,
    },
      // 表单参数
      form: {},
      rform: {},
      // 表单校验
      rules: {
        sparepartNode: [
          { required: true, message: "请输入备件编码", trigger: "blur" },
        ],
      },
      node:null,
    };
  },
  created() {
    this.getList();
    this.getdev();
  },
  methods: {
    getdev(){
      listLevelButLeaf(this.devqueryParams).then(response => {
        this.field102Options = response;
      });
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      listPart(this.queryParams).then(response => {
        this.partList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleFind(row){
      this.requeryParams.sparepartNode = row.sparepartNode;
      this.openrecord = true;
      this.getrecordList();
    },
    getrecordList() {
      this.reloading = true;
      listRecord(this.addDateRange(this.requeryParams, this.dateRange)).then(response => {
        this.recordList = response.rows;
        this.retotal = response.total;
        this.reloading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.openrecord = false;
      this.reset();
    },
    recancel() {
      this.ropen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        sparepartId: null,
        sparepartNode: null,
        sparepartName: null,
        number: null,
        associatedDevices: null
      };
      this.rform = {
        recordId: null,
        sparepartName: null,
        transferNum: null,
        transferUsageTime: null,
        transferMan: null,
        useMan: null,
        planId:null
      };
      this.fassociatedDevices = null
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.associatedDevices = this.assDevices(this.qassociatedDevices);
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.qassociatedDevices = null
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.sparepartId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加";
    },
    skip(id){
      this.cancel()
      getPlan(id).then(response => {
        this.$router.push({
          path: '/mainplan/fix/details',
          query: {
            planname: response.data.name  }
        })
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sparepartId = row.sparepartId || this.ids
      getPart(sparepartId).then(response => {
        this.form = response.data;
        if(this.form.associatedDevices != null&&this.form.associatedDevices != ""){
          let fDev = this.form.associatedDevices.split('/');
          this.fassociatedDevices = this.fssDevices(fDev);
        }
        this.node = this.form.sparepartNode;
        this.open = true;
        this.title = "修改";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if(this.fassociatedDevices != null&&this.fassociatedDevices != ""){
        this.form.associatedDevices = this.assDevices(this.fassociatedDevices);
      }else{
        this.form.associatedDevices = ""
      }
      if(this.form.number==""||this.form.number==null){
        this.form.number=0
      }
      this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.sparepartId != null) {
              updatePart(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addPart(this.form).then(response => {
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
      const sparepartIds = row.sparepartId || this.ids;
      this.$modal.confirm('是否确认删除数据项？').then(function() {
        return delPart(sparepartIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    assDevices(associatedDevices){
      if(associatedDevices == null){
        return null
      }
      let childid1 = 0
      for(let i =0;i<this.field102Options.length;i++){
        if(this.field102Options[i].value == associatedDevices[0]){
          childid1 = i
        }
      }
      const dev2 = this.field102Options[childid1].label
      let childid2 = 0
      for(let i =0;i<this.field102Options[childid1].children.length;i++){
        if(this.field102Options[childid1].children[i].value == associatedDevices[1]){
          childid2 = i
        }
      }
      const dev3 = this.field102Options[childid1].children[childid2].label
      const alldev = dev2+"/"+dev3
      return alldev
    },
    fssDevices(associatedDevices){
      if(associatedDevices == null){
        return null
      }
      let childid1 = 0
      for(let i =0;i<this.field102Options.length;i++){
        if(this.field102Options[i].label == associatedDevices[0]){
          childid1 = i
        }
      }
      const dev2 = this.field102Options[childid1].value
      let childid2 = 0
      for(let i =0;i<this.field102Options[childid1].children.length;i++){
        if(this.field102Options[childid1].children[i].label == associatedDevices[1]){
          childid2 = i
        }
      }
      const dev3 = this.field102Options[childid1].children[childid2].value
      const alldev = []
      alldev[0] = dev2
      alldev[1] = dev3
      return alldev
    },
  }
};
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
