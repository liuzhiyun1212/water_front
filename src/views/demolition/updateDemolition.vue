<template>
  <div class="app-container">
    

    <!-- <el-table v-loading="loading" :data="demolitionAnalysisList" @selection-change="handleSelectionChange"> -->
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="序号" align="center" prop="projectId" />
      <el-table-column label="评价项目" align="center" prop="evaluationProject">
        <template slot-scope="scope">
              <el-link
                @click="toDetail(scope.row.projectId)"
                type="primary"
                >{{ scope.row.evaluationProject}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" prop="projectTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.projectTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评价人" align="center" prop="evaluationPeople" /> -->
      <!-- <el-table-column label="作业人员能力" align="center" prop="capacityOperator" />
      <el-table-column label="作业设备" align="center" prop="operatingEquipment" />
      <el-table-column label="安全防护" align="center" prop="safetyProtection" />
      <el-table-column label="存在风险" align="center" prop="risk" />
      <el-table-column label="采取的安全措施" align="center" prop="safetyMeasure" />
      <el-table-column label="评价简述" align="center" prop="evaluationBrief" />
      <el-table-column label="评价结论" align="center" prop="evaluationConclusion" />
      <el-table-column label="备注" align="center" prop="remarks" /> -->
      <!-- <el-table-column label="提交人" align="center" prop="submitter" />
      <el-table-column label="提交时间" align="center" prop="submitTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.submitTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row.projectId)"
            v-hasPermi="['system:demolitionAnalysis:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:demolitionAnalysis:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    
    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改拆除作业风险分析对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body> -->



  <table ref="detailData" :model="detailData" class="table" style="margin-left:10%;width:70%;height:100%;border:1px solid;align:center;font-size:13px;" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:24px;font-weight:bold;">拆除风险分析记录表</caption>
          <tr align="center">
            <!-- <td rowspan="2"><div class="div1">个人信息</div></td> -->
            <td><span style="color:red">*</span>评价项目</td>
            <td colspan="3"><input v-model="detailData.evaluationProject"  class="myInput"/></td>
          </tr>
          <tr align="center">
            <td><span style="color:red">*</span>时&nbsp;间</td>
            <td>
              <!-- <input v-model="detailData.projectTime" class="myInput"/> -->
              <el-date-picker clearable 
              style="font-size: 13px;
                      width: 100%;
                      height: 100%;
                      float: left;
                      zoom:1;
                      outline: medium;"
                v-model="detailData.projectTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间">
              </el-date-picker>
            
            
            </td>
            <td><span style="color:red">*</span>评价人</td>
            <td><input v-model="detailData.evaluationPeople" class="myInput"/></td>
          </tr>
          <tr align="center">
            <th colspan="4">评价内容</th>
          </tr>
          <tr align="left">
            <td nowrap=true>1、作业人员能力</td>
            <td colspan="3"><input v-model="detailData.capacityOperator" class="myInput"/></td>
          </tr>
          <tr align="left">
            <td>2、作业设备</td>
            <td colspan="3"><input v-model="detailData.operatingEquipment" class="myInput"/></td>
          </tr>
          <tr align="left">
            <td>3、安全防护</td>
            <td colspan="3"><input v-model="detailData.safetyProtection" class="myInput"/></td>
          </tr>
          <tr>
            <td colspan="4"><div  style="margin-left:10px;margin-top:5px">存在风险：
              <input v-model="detailData.risk" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">采取的安全措施：
              <input v-model="detailData.safetyMeasure" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">评价简述：
              <input v-model="detailData.evaluationBrief" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">评价结论：
              <input v-model="detailData.evaluationConclusion" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">备注：
              <input v-model="detailData.remarks" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          <!-- <tr align="center">
            <td>提交人</td>
            <td><input v-model="detailData.submitter" class="myInput"/></td>
            <td>提交时间</td>
            <td>
              <el-date-picker clearable
              style="font-size: 20px;
                      width: 100%;
                      height: 100%;
                      float: left;
                      zoom:1;
                      outline: medium;"
                v-model="detailData.submitTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间">
              </el-date-picker>
            </td>
          </tr>        -->
</table>
<div slot="footer" class="dialog-footer" align="center" style="margin-top:2%">
  <el-button type="primary" @click="submitForm">保 存</el-button>
  <el-button @click="cancel">取 消</el-button>
</div>  






      <!-- <el-form  ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="评价项目" prop="evaluationProject">
        <el-input v-model="form.evaluationProject" placeholder="请输入评价项目名称" />
        </el-form-item>
        <el-form-item label="时间" prop="projectTime">
          <el-date-picker clearable
            v-model="form.projectTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评价人" prop="evaluationPeople">
          <el-input v-model="form.evaluationPeople" placeholder="请输入评价人" />
        </el-form-item>
        <el-form-item label="作业人员能力" prop="capacityOperator">
          <el-input v-model="form.capacityOperator" placeholder="请输入作业人员能力" />
        </el-form-item>
        <el-form-item label="作业设备" prop="operatingEquipment">
          <el-input v-model="form.operatingEquipment" placeholder="请输入作业设备" />
        </el-form-item>
        <el-form-item label="安全防护" prop="safetyProtection">
          <el-input v-model="form.safetyProtection" placeholder="请输入安全防护" />
        </el-form-item>
        <el-form-item label="存在风险" prop="risk">
          <el-input v-model="form.risk" placeholder="请输入存在风险" />
        </el-form-item>
        <el-form-item label="采取的安全措施" prop="safetyMeasure">
          <el-input v-model="form.safetyMeasure" placeholder="请输入采取的安全措施" />
        </el-form-item>
        <el-form-item label="评价简述" prop="evaluationBrief">
          <el-input v-model="form.evaluationBrief" placeholder="请输入评价简述" />
        </el-form-item>
        <el-form-item label="评价结论" prop="evaluationConclusion">
          <el-input v-model="form.evaluationConclusion" placeholder="请输入评价结论" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="提交人" prop="submitter">
          <el-input v-model="form.submitter" placeholder="请输入提交人" />
        </el-form-item>
        <el-form-item label="提交时间" prop="submitTime">
          <el-date-picker clearable
            v-model="form.submitTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择提交时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    <!-- </el-dialog> -->





  </div>
</template>

<script>
import { listDemolitionAnalysis, getDemolitionAnalysis, delDemolitionAnalysis, addDemolitionAnalysis, updateDemolitionAnalysis } from "@/api/system/demolitionAnalysis";

export default {
  name: "DemolitionAnalysis",
  data() {
    return {
      detailData:{},
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
      // 拆除作业风险分析表格数据
      demolitionAnalysisList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        projectId: null,
        evaluationProject: null,
        projectTime: null,
        evaluationPeople: null,
        capacityOperator: null,
        operatingEquipment: null,
        safetyProtection: null,
        risk: null,
        safetyMeasure: null,
        evaluationBrief: null,
        evaluationConclusion: null,
        remarks: null,
        submitter: null,
        submitTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        evaluationProject: [
          { required: true, message: "评价项目不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getUpdateList();
  },
  methods: {
    getUpdateList(){
      getDemolitionAnalysis(this.$route.query.projectId).then(response => {
        // this.demolitionAnalysisList.push(response.data);
        this.detailData =response.data;
        // console.log(response.data);
        this.total = response.total;
        this.loading = false;
      });
    },



    /**查询详细 */
    toDetail:function(projectId){
      this.$router.push({
        path: "/demolition/detailDemolition",
        query: {
          projectId:projectId,
        },
      });
    },

    /** 查询拆除作业风险分析列表 */
    getList() {
      this.loading = true;
      listDemolitionAnalysis(this.queryParams).then(response => {
        this.demolitionAnalysisList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.$router.push({
        path: "/demolition/analysisChai",
      });
    },
    // 表单重置
    reset() {
      this.form = {
        projectId: null,
        evaluationProject: null,
        projectTime: null,
        evaluationPeople: null,
        capacityOperator: null,
        operatingEquipment: null,
        safetyProtection: null,
        risk: null,
        safetyMeasure: null,
        evaluationBrief: null,
        evaluationConclusion: null,
        remarks: null,
        submitter: null,
        submitTime: null
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
      this.ids = selection.map(item => item.projectId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加拆除作业风险分析";
    },


    /** 修改按钮操作 */
    handleUpdate(projectId) {
      // this.reset();
      // const projectId = row.projectId || this.ids
      getDemolitionAnalysis(projectId).then(response => {
        this.$router.push({
        path: "/demolition/updateDemolition",
        query: {
          projectId:projectId,
        },
      });
        // this.form = response.data;
        // this.open = true;
        // this.title = "修改拆除作业风险分析";
      });
    },
    /**
     * toDetail:function(projectId){
      this.$router.push({
        path: "/demolition/detailDemolition",
        query: {
          projectId:projectId,
        },
      });
    },
     */


    /** 提交按钮 */
    // submitForm() {
    //       if (this.detailData.projectId != null) {
            
    //         updateDemolitionAnalysis(this.detailData).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.$router.push({
    //     path: "/demolition/analysisChai",
    //   });
    //           // this.getList();
    //         });
    //       } else {
    //         addDemolitionAnalysis(this.detailData).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
        
    //   ;
    // },
    submitForm() {
      if (this.detailData.evaluationProject!="" &&this.detailData.projectTime!=""&&this.detailData.evaluationPeople!="") {
        updateDemolitionAnalysis(this.detailData).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.$router.go(-1);
              // this.open = false;
              // this.showLink = true;
              // this.getList();
            });
      }else{
              this.$message.error('请输入必填项');
            }

          
  
    },
    
    
    /** 删除按钮操作 */
    handleDelete(row) {
      const projectIds = row.projectId || this.ids;
      this.$modal.confirm('是否确认删除拆除作业风险分析编号为"' + projectIds + '"的数据项？').then(function() {
        return delDemolitionAnalysis(projectIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/demolitionAnalysis/export', {
        ...this.queryParams
      }, `demolitionAnalysis_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style>
.myInput{
  font-size: 13px;
	width: 100%;
	height: 100%;
	/* border: none; */
	float: left;
	zoom:1;
	/* outline: medium; */
}
</style>