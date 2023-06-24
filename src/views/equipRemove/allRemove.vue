<template>
  <div class="app-container">
    <div style=" background: #d2e9ff;margin-top: -3px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
       <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="position:absolute;margin-left: 30px;
        margin-top: 20px;">

      <el-form-item  prop="equipName" label="设备名称">
        
        <el-input
          v-model="queryParams.equipName"
          placeholder="请输入设备名称"
         
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="提交时间">
            <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
      <el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery1">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    </div>

<el-card style=" margin-top: 10px">
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
          设备拆除报废
        </p>
<!--          <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:collaborator:add']" style="float: right;"
        >新增</el-button>-->
        </div>
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px"> -->
      <!-- <el-form-item label="设备名称" prop="equipName">
        <el-input
          v-model="queryParams.equipName"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产厂家" prop="manufacturer">
        <el-input
          v-model="queryParams.manufacturer"
          placeholder="请输入生产厂家"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="specification">
        <el-input
          v-model="queryParams.specification"
          placeholder="请输入规格型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="购置日期">
        <el-date-picker
          v-model="daterangeBuyDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="申报数量" prop="numberDeclarations">
        <el-input
          v-model="queryParams.numberDeclarations"
          placeholder="请输入申报数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用年限" prop="useYear">
        <el-input
          v-model="queryParams.useYear"
          placeholder="请输入使用年限"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="拆除报废原因" prop="removalReason">
        <el-input
          v-model="queryParams.removalReason"
          placeholder="请输入拆除报废原因"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请部门意见" prop="deptComments">
        <el-input
          v-model="queryParams.deptComments"
          placeholder="请输入申请部门意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分管领导意见" prop="partLeaderComments">
        <el-input
          v-model="queryParams.partLeaderComments"
          placeholder="请输入分管领导意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总经理意见" prop="managerComments">
        <el-input
          v-model="queryParams.managerComments"
          placeholder="请输入总经理意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="董事长意见" prop="chairmanComments">
        <el-input
          v-model="queryParams.chairmanComments"
          placeholder="请输入董事长意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务总监意见" prop="financeComments">
        <el-input
          v-model="queryParams.financeComments"
          placeholder="请输入财务总监意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item> -->
    <!-- </el-form> -->

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:remove:add']"
        >新增</el-button>
      </el-col> -->

      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:remove:edit']"
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
          v-hasPermi="['system:remove:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:remove:export']"
        >导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->


    <div style=" margin-top: 10px; height:70px;outline: #d9d9d9 solid 1px;border-radius: 5px;box-shadow: 4px 4px 4px #d9d9d9; background-color: aliceblue;">

          <i class="iconfont icon-circle" @click="stateQuery('报废申请')"  style="color: #5B8FF9; margin-left: 50px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;报废申请</i>
          <div
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 140px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList1}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已报废')"  style="ccolor: #be002f; margin-left: 180px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;已报废</i>
          <div
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 255px;margin-top: 21px; position: absolute;">
            <p style="  font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList2}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('申请未通过')" style="ccolor: #be002f; margin-left: 300px;margin-top: 25px; position: absolute; cursor: pointer; color: #FF9912;">&nbsp;&nbsp;申请未通过</i>
           <div
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 410px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList3-this.stateList2-this.stateList1}}</p>
          </div>


          <i class="iconfont icon-circle" @click="stateQuery()"
          style="color: #FF6347; margin-left: 450px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;全部</i>
          <div
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 510px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList3}}</p>
          </div>

      </div>







    <el-table v-loading="loading"  :data="removeList"  style=" margin-top:10px" @selection-change="handleSelectionChange" :header-cell-style="{
            background: '#84BBFE',
            color: '#fff',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: '黑体',
            padding: '0',
           

          }"
            >
      <el-table-column type="index" align="center" label="序号" width="50"/>
      <!-- <el-table-column label="设备号" align="center" prop="equipId" /> -->
      <el-table-column label="设备编号" align="center" prop="deviceId" />
      <el-table-column label="设备名称" align="center" prop="equipName" >
      <!-- <template slot-scope="scope">
              <el-link
                @click="toDetail(scope.row.equipId)"
                type="primary"
                >{{ scope.row.equipName}}</el-link>
        </template> -->
      </el-table-column>
      <!-- <el-table-column label="生产厂家" align="center" prop="manufacturer" />
      <el-table-column label="规格型号" align="center" prop="specification" />
      <el-table-column label="购置日期" align="center" prop="buyDate" width="180" sortable="">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.buyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="申报数量" align="center" width="100px"  prop="numberDeclarations" /> -->
      <!-- <el-table-column label="使用年限" align="center" prop="useYear" /> -->
      <el-table-column label="状态" align="center" prop="state"></el-table-column>
      <el-table-column label="拆除风险表" align="center">
        <template slot-scope="scope">
            <span>{{haveProId(scope.row.projectId)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" align="center" prop="makingTime">
        <template slot-scope="scope">
            <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
          </template>
      </el-table-column>
      <el-table-column label="当前审核人" align="center" prop="checkPeople"></el-table-column>


  <el-table-column label="审核流程" align="center" prop="auditProcess">
  <template slot-scope="scope">

    <div v-if="scope.row.state =='已报废'">
      <span :style="{'color':'green'}">{{scope.row.auditProcess}}</span>

    </div>
    <div v-if="scope.row.state =='报废申请'||scope.row.state =='申请未通过'">
      <span :style="{'color':'green'}">{{scope.row.auditProcess.slice(0,scope.row.auditProcess.indexOf(scope.row.checkPeople)-1)}}</span>
      <span :style="{'color':'red'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)-1,scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length)}}</span>
      <span :style="{'color':'grey'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length,scope.row.auditProcess.length)}}</span>
    </div>
  </template>
</el-table-column>






      <!-- <el-table-column label="拆除报废原因" align="center" prop="removalReason" />
      <el-table-column label="申请部门意见" align="center" prop="deptComments" />
      <el-table-column label="分管领导意见" align="center" prop="partLeaderComments" />
      <el-table-column label="总经理意见" align="center" prop="managerComments" />
      <el-table-column label="董事长意见" align="center" prop="chairmanComments" />
      <el-table-column label="财务总监意见" align="center" prop="financeComments" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
           <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="toDetail(scope.row.equipId)"
          >查看</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row.equipId)"
            v-show="scope.row.state !='已报废'"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-show="scope.row.state !='已报废'"
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
    </el-card>
 

    <!-- 添加或修改设备设施拆除报废申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备名称" prop="equipName">
          <el-input v-model="form.equipName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
        </el-form-item>
        <el-form-item label="规格型号" prop="specification">
          <el-input v-model="form.specification" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="购置日期" prop="buyDate">
          <el-date-picker clearable
            v-model="form.buyDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择购置日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申报数量" prop="numberDeclarations">
          <el-input v-model="form.numberDeclarations" placeholder="请输入申报数量" />
        </el-form-item>
        <el-form-item label="使用年限" prop="useYear">
          <el-input v-model="form.useYear" placeholder="请输入使用年限" />
        </el-form-item>
        <el-form-item label="拆除报废原因" prop="removalReason">
          <el-input v-model="form.removalReason" placeholder="请输入拆除报废原因" />
        </el-form-item>
        <el-form-item label="申请部门意见" prop="deptComments">
          <el-input v-model="form.deptComments" placeholder="请输入申请部门意见" />
        </el-form-item>
        <el-form-item label="分管领导意见" prop="partLeaderComments">
          <el-input v-model="form.partLeaderComments" placeholder="请输入分管领导意见" />
        </el-form-item>
        <el-form-item label="总经理意见" prop="managerComments">
          <el-input v-model="form.managerComments" placeholder="请输入总经理意见" />
        </el-form-item>
        <el-form-item label="董事长意见" prop="chairmanComments">
          <el-input v-model="form.chairmanComments" placeholder="请输入董事长意见" />
        </el-form-item>
        <el-form-item label="财务总监意见" prop="financeComments">
          <el-input v-model="form.financeComments" placeholder="请输入财务总监意见" />
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
import { listRemove, getRemove, delRemove, addRemove, updateRemove } from "@/api/system/remove";

export default {
  name: "Remove",
  data() {
    return {
      dateRange:[],
      stateList1:null,
      stateList2:null,
      stateList3:null,
      stateList4:null,
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
      // 设备设施拆除报废申请表格数据
      removeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 财务总监意见时间范围
      daterangeBuyDate: [],
      // 查询参数
      queryParams: {
        makingTime:null,
        startTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        state:null,
        equipName: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        checkPeople:null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
        deptComments: null,
        partLeaderComments: null,
        managerComments: null,
        chairmanComments: null,
        financeComments: null
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
    this.state();
  },
  // watch: {
  //       'queryParams.makingTimeRange': {
  //           handler: function (newVal) {
  //               this.queryParams.startTime = newVal[0];
  //               this.queryParams.endTime = newVal[1]
  //           },
  //           deep: true,
  //       },
  //   },
  methods: {

    // dateRangeChange() {
    //         //由于时间选择组件的清空按钮没有回调函数，所以要手动更新状态
    //         if (!this.queryParams.makingTimeRange) {
    //             this.queryParams.makingTimeRange = []
    //             this.queryParams.startTime = null;
    //             this.queryParams.endTime = null
    //         }
    //     },
   haveProId(pro) {
      if (pro!=null) {
        return "有";
      }
      else{
        return "无";
      }
      
    },

    /** 搜索按钮操作 */
    handleQuery1() {
      this.queryParams.pageNum = 1;
      this.queryParams.state=null;
      this.getList2();
    },
    getList2() {
      this.loading = true;
      this.queryParams.params = {};
  if (null != this.dateRange && '' != this.dateRange) {
    this.queryParams.params["beginMakingTime"] = this.dateRange[0];
    this.queryParams.params["endMakingTime"] = this.dateRange[1];
  }
      listRemove(this.queryParams).then(response => {
        this.removeList = response.rows;
      
        this.total = response.total;
        this.loading = false;
      });
    },

    // 新修改统计状态总数
      // 新修改统计状态总数
      state() {
          this.queryParams.state ='报废申请';
          listRemove(this.queryParams).then(response => {
          this.stateList1= response.rows.length;
      });
          this.queryParams.state ='已报废';
          listRemove(this.queryParams).then(response => {
          this.stateList2= response.rows.length;
      });
          listRemove().then(response => {
          this.stateList3= response.rows.length;

      });
        },


      stateQuery(params){
        this.queryParams.state = params;

        // console.log(this.queryParams.state);
        this.handleQuery();
      },

    toDetail:function(equipId){
      this.$router.push({
        path: "/equipRemove/detailRemove",
        query: {
          equipId:equipId,
        },
      });
    },

    /** 查询设备设施拆除报废申请列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      // if (null != this.daterangeBuyDate && '' != this.daterangeBuyDate) {
      //   this.queryParams.params["beginBuyDate"] = this.daterangeBuyDate[0];
      //   this.queryParams.params["endBuyDate"] = this.daterangeBuyDate[1];
      // }
      listRemove().then(response => {

        this.removeList = response.rows;
        console.log("llll",this.removeList);
        // console.log(this.removeList[2].auditProcess);
        this.total = response.total;
        this.loading = false;
        // this.stateLength = this.removeList.length;
      });
      // console.log("ccccc:");
    },

    /**横版点击搜索用 */
    getList1() {
      this.loading = true;
      // if (null != this.daterangeBuyDate && '' != this.daterangeBuyDate) {
      //   this.queryParams.params["beginBuyDate"] = this.daterangeBuyDate[0];
      //   this.queryParams.params["endBuyDate"] = this.daterangeBuyDate[1];
      // }
      listRemove(this.queryParams).then(response => {

        this.removeList = response.rows;

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
        equipId: null,
        equipName: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
        deptComments: null,
        partLeaderComments: null,
        managerComments: null,
        chairmanComments: null,
        financeComments: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      console.log("yjfgyjfjg",this.queryParams);
      listRemove(this.queryParams).then(response => {

        this.removeList = response.rows;

        this.total = response.total;
        this.loading = false;
      });;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeBuyDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.equipId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加设备设施拆除报废申请";
    // },
    handleAdd() {
      this.$router.push({
      path: "/equipRemove/addRemoveApply",
    });
    },




    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const equipId = row.equipId || this.ids
    //   getRemove(equipId).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改设备设施拆除报废申请";
    //   });
    // },
    handleUpdate(equipId) {
      // this.reset();
      // const projectId = row.projectId || this.ids
      getRemove(equipId).then(response => {
        this.$router.push({
        path: "/equipRemove/updateRemove",
        query: {
          equipId:equipId,
        },
      });
        // this.form = response.data;
        // this.open = true;
        // this.title = "修改拆除作业风险分析";
      });
    },






    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.equipId != null) {
            updateRemove(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRemove(this.form).then(response => {
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
      const equipIds = row.equipId || this.ids;
      this.$modal.confirm('是否确认删除设备设备名称为"' + row.equipName + '"的数据项？').then(function() {
        return delRemove(equipIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
        this.getList();
        this.state();
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/remove/export', {
        ...this.queryParams
      }, `remove_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style >

</style>