<template>
  <div class="app-container">

    <table class="table" style="margin-left:10%;width:70%;height:100%;border:1px solid;align:center;font-size:13px;" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:24px;font-weight:bold;">设备设施拆除报废申请表</caption>
          <div>申请部门：{{detailData.applyDept}}</div>
          <tr align="center" >
            <td >设备名称</td>
            <td align="left">{{detailData.equipName}}</td>
            <td>生产厂家</td>
            <td align="left">{{detailData.manufacturer}}</td>
          </tr>
          <tr align="center" >
            <td >设备编号</td>
            <td align="left">{{detailData.deviceId}}</td>

            <td>购置日期</td>
            <td align="left">{{detailData.buyDate}}
              <!-- <input readonly  v-model="detailData.buyDate" class="myInput"/> -->
              <!-- <el-date-picker clearable
              style="font-size: 20px;
                      width: 100%;
                      height: 100%;
                      float: left;
                      zoom:1;
                      outline: medium;"
                v-model="detailData.buyDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间">
              </el-date-picker> -->
            </td>
          </tr>
          <tr align="center" >
            <td >规格型号</td>
            <td align="left">{{detailData.specification}}</td>
            <td>使用年限</td>
            <td  align="left">{{detailData.useYear}}</td>
          </tr>

          <tr align="center">
            <td><span style="color:red">*</span>拆除、报废原因</td>
            <td colspan="3"><input  v-model="detailData.removalReason" class="myInput"/></td>
          </tr>
          <tr align="center">
            <td><span style="color:red">*</span>申请部门意见</td>
            <td colspan="3"><input  v-model="detailData.deptComments" class="myInput"/></td>
          </tr>
          <tr align="center" v-if="showLink">
            <td colspan="4"><el-link type="primary"  @click="showDemolition()">风险评估表</el-link></td>
          </tr>



          <!-- <tr align="center">
            <td>分管领导<br>意见</td>
            <td colspan="3"><input  v-model="detailData.partLeaderComments" class="myInput"/></td>
          </tr>
          <tr align="center">
            <td>总经理意见</td>
            <td colspan="3"><input  v-model="detailData.managerComments" class="myInput"/></td>
          </tr>
          <tr align="center">
            <td>董事长意见</td>
            <td colspan="3"><input  v-model="detailData.chairmanComments" class="myInput"/></td>
          </tr>
          <tr align="center">
            <td>财务总监<br>意见</td>
            <td colspan="3"><input  v-model="detailData.financeComments" class="myInput"/></td>
          </tr> -->

          <!-- <tr align="center">
            <td>提交人</td>
            <td><input   v-model="detailData.submitter" class="myInput"/></td>
            <td>提交时间</td>
            <td><input   v-model="detailData.submitTime" class="myInput"/></td>
          </tr>          -->
</table>
<div slot="footer" class="dialog-footer" align="center" style="margin-top:2%">
  <el-button type="primary" @click="submitForm">保 存</el-button>
  <el-button @click="cancel">取 消</el-button>
</div>

    <!-- <el-table v-loading="loading" :data="removeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="设备号" align="center" prop="equipId" />
      <el-table-column label="设备名称" align="center" prop="equipName" />
      <el-table-column label="申请部门" align="center" prop="applyDept" />
      <el-table-column label="生产厂家" align="center" prop="manufacturer" />
      <el-table-column label="规格型号" align="center" prop="specification" />
      <el-table-column label="购置日期" align="center" prop="buyDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.buyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申报数量" align="center" prop="numberDeclarations" />
      <el-table-column label="使用年限" align="center" prop="useYear" />
      <el-table-column label="拆除报废原因" align="center" prop="removalReason" />
      <el-table-column label="申请部门意见" align="center" prop="deptComments" />
      <el-table-column label="分管领导意见" align="center" prop="partLeaderComments" />
      <el-table-column label="总经理意见" align="center" prop="managerComments" />
      <el-table-column label="董事长意见" align="center" prop="chairmanComments" />
      <el-table-column label="财务总监意见" align="center" prop="financeComments" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:remove:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:remove:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    -->

    <!-- 弹窗新增风险 -->
<el-dialog :title="title" :visible.sync="open"  append-to-body>
  <table ref="detailData2" :model="detailData2" class="table" style="border:1px solid;align:center;font-size:13px;width:100%" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:18px;font-weight:bold;">拆除风险分析记录表</caption>
          <tr align="center">
            <!-- <td rowspan="2"><div class="div1">个人信息</div></td> -->
            <td><span style="color:red">*</span>评价项目</td>
            <td colspan="3"><input v-model="detailData2.evaluationProject"  class="myInput"/></td>
          </tr>
          <tr align="center">
            <td><span style="color:red">*</span>时间</td>
            <td>
              <!-- <input v-model="detailData.projectTime" class="myInput"/> -->
              <el-date-picker clearable
              style="font-size: 13px;
                      float: left;
                      zoom:1;
                      outline: medium;"
                v-model="detailData2.projectTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择时间">
              </el-date-picker>


            </td>
            <td><span style="color:red">*</span>评价人</td>
            <td><input v-model="detailData2.evaluationPeople" class="myInput"/></td>
          </tr>
          <tr align="center">
            <th colspan="4">评价内容</th>
          </tr>
          <tr align="left">
            <td>1、作业人员能力</td>
            <td colspan="3"><input v-model="detailData2.capacityOperator" class="myInput"/></td>
          </tr>
          <tr align="left">
            <td>2、作业设备</td>
            <td colspan="3"><input v-model="detailData2.operatingEquipment" class="myInput"/></td>
          </tr>
          <tr align="left">
            <td>3、安全防护</td>
            <td colspan="3"><input v-model="detailData2.safetyProtection" class="myInput" /></td>
          </tr>
          <tr>
            <td colspan="4"><div  style="margin-left:10px;margin-top:5px">存在风险：
              <input v-model="detailData2.risk" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">采取的安全措施：
              <input v-model="detailData2.safetyMeasure" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">评价简述：
              <input v-model="detailData2.evaluationBrief" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">评价结论：
              <input v-model="detailData2.evaluationConclusion" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          <tr>
            <td colspan="4"><div style="margin-left:10px;margin-top:5px">备注：
              <input v-model="detailData2.remarks" style="margin-bottom:10px;margin-top:8px" class="myInput"/></div>
            </td>
          </tr>
          </table>
        <div slot="footer" class="dialog-footer" align="center" style="margin-top:2%">
          <el-button type="primary" @click="submitForm2">保 存</el-button>
          <el-button @click="cancel2">取 消</el-button>
        </div>
</el-dialog>





  </div>
</template>

<script>
import { listRemove, getRemove, delRemove, addRemove, updateRemove } from "@/api/system/remove";
import { listDemolitionAnalysis, getDemolitionAnalysis, delDemolitionAnalysis, addDemolitionAnalysis, updateDemolitionAnalysis } from "@/api/system/demolitionAnalysis";

export default {
  name: "Remove",
  data() {
    return {
      showLink:false,
      detailData:[],
      detailData2:{},
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
        pageNum: 1,
        pageSize: 10,
        equipName: null,
        applyDept: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
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
    showDemolition(){
      this.open=true;
    },

    /**弹窗取消 */
    cancel2() {
      this.open = false;
    },


    /**弹窗提交 */
    submitForm2() {
      if (this.detailData2.evaluationProject!="" &&this.detailData2.projectTime!=""&&this.detailData2.evaluationPeople!="") {
        updateDemolitionAnalysis(this.detailData2).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.showLink = true;
              // this.getList();
            });
      }else{
              this.$message.error('请输入必填项');
            }



    },

     getList(){
      getRemove(this.$route.query.equipId).then(response => {
        // this.demolitionAnalysisList.push(response.data);
        this.detailData =response.data;
        // this.detailData.push(response.data);

        this.total = response.total;
        this.loading = false;

        if (this.detailData.projectId!==null) {
          this.showLink=true;
          getDemolitionAnalysis(this.detailData.projectId).then(response=>{
            // console.log("fsfs",response.data);
            this.detailData2 = response.data;

          });

        }

      });







    },
    /** 查询设备设施拆除报废申请列表 */
    // getList() {
    //   this.loading = true;
    //   this.queryParams.params = {};
    //   if (null != this.daterangeBuyDate && '' != this.daterangeBuyDate) {
    //     this.queryParams.params["beginBuyDate"] = this.daterangeBuyDate[0];
    //     this.queryParams.params["endBuyDate"] = this.daterangeBuyDate[1];
    //   }
    //   listRemove(this.queryParams).then(response => {
    //     this.removeList = response.rows;
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },
    // 取消按钮
    cancel() {
      this.$router.push({
        path: "/equipRemove/allRemove",
      });
    },
    // 表单重置
    reset() {
      this.form = {
        equipId: null,
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
        chairmanComments: null,
        financeComments: null
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
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设备设施拆除报废申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const equipId = row.equipId || this.ids
      getRemove(equipId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设备设施拆除报废申请";
      });
    },
    /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.equipId != null) {
    //         updateRemove(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addRemove(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
     submitForm() {
          if (this.detailData.equipId != null&&this.detailData.removalReason!=""&& this.detailData.deptComments!="") {
            if (this.detailData.state=="申请未通过") {
              this.detailData.state="报废申请";
              this.detailData.auditMessage=""
              this.detailData.checkPeople=this.detailData.auditProcess.split("②")[0].slice(1,);
            }
            updateRemove(this.detailData).then(response => {

              this.$modal.msgSuccess("修改成功");

              this.open = false;
              this.$router.push({
              path: "/equipRemove/allRemove",
      });
              // this.getList();
            });
          } else{
             this.$message.error('请输入必填项');
          }


      ;
    },





    /** 删除按钮操作 */
    handleDelete(row) {
      const equipIds = row.equipId || this.ids;
      this.$modal.confirm('是否确认删除设备设施拆除报废申请编号为"' + equipIds + '"的数据项？').then(function() {
        return delRemove(equipIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
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
<style>
.myInput{
  font-size: 13px;
	width: 100%;
	height: 100%;
	/* border: none; */
	float: left;
	zoom:1;
	/* outline: medium; */
};
#inputInline{
  display: inline;
}
</style>
