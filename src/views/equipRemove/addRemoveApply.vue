<template>
  <div class="app-container">

    <table class="table" style="margin-left:10%;width:70%;height:100%;border:1px solid;align:center;font-size:13px;" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:24px;font-weight:bold;">设备设施拆除报废申请表</caption>
          <div>申请部门：{{applyDept1}}</div>
          <tr align="center" >
            <td >设备名称</td>
            <td><input readonly v-model="detailData.equipName" class="myInput"/></td>
            <td>生产厂家</td>
            <td><input  readonly v-model="detailData.manufacturer" class="myInput"/></td>
          </tr>
          <tr align="center" >
            <td >设备编号</td>
            <td><input readonly v-model="detailData.deviceId" class="myInput"/></td>
            <td>购置日期</td>
            <td>
              <input readonly v-model="detailData.buyDate" class="myInput"/>
              <!-- <input   v-model="detailData.buyDate" class="myInput"/> -->
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
            <td><input readonly v-model="detailData.specification" class="myInput"/></td>

            <td>使用年限</td>
            <td ><input readonly  v-model="detailData.useYear" class="myInput"/></td>
          </tr>

          <tr align="center">
            <td><span style="color:red">*</span>拆除、报废原因</td>
            <td colspan="3">
              <input  v-model="detailData.removalReason" class="myInput" required/>
              </td>
          </tr>
          <tr align="center">
            <td><span style="color:red">*</span>申请部门意见</td>
            <td colspan="3"><input  v-model="detailData.deptComments" class="myInput" required/></td>
          </tr>

          <tr align="center">
            <td>是否拆除风险评估</td>
            <td colspan="3">
              <el-radio v-model="radio" label="1">是</el-radio>
              <el-radio v-model="radio" label="2">否</el-radio>
              <div style="display: inline-block;" v-if="radio==1">
                <el-button type="primary" plain @click="toAddDemolition()"  v-if="!showLink">增加拆除风险作业表</el-button>
                <el-link type="primary" v-if="showLink" @click="showDemolition()">风险评估表</el-link>

              </div>
            </td>
          </tr>
          <tr align="center">
            <td>报废拆除审核流程</td>
            <td colspan="3">{{detailData.auditProcess}}</td>
          </tr>

</table>
<div slot="footer" class="dialog-footer" align="center" style="margin-top:2%">
  <el-button type="primary" @click="submitForm">新 增</el-button>
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
            <td width="20%"><input v-model="detailData2.evaluationPeople" class="myInput"/></td>
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
            <td colspan="3"><input v-model="detailData2.safetyProtection" class="myInput"/></td>
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
import * as echarts from "echarts";
import { listRemove, getRemove, delRemove, addRemove, updateRemove } from "@/api/system/remove";
import { listDemolitionAnalysis, getDemolitionAnalysis, delDemolitionAnalysis, addDemolitionAnalysis, updateDemolitionAnalysis } from "@/api/system/demolitionAnalysis";
import { listUser, getAuthRole,getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";
import {getProcess, listProcess} from "@/api/system/process";
import Link from '../../layout/components/Sidebar/Link.vue';

export default {
  components: { Link },
  name: "Remove",
  data() {
    return {
      applyDept1:null,
      userList:[],
      showLink:false,
      radio:'2',
      detailData2:{},
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
      // 设备设施拆除报废申请表格数据
      removeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 财务总监意见时间范围
      daterangeBuyDate: [],

      queryParams2:{
        evaluationProject:null,
        evaluationPeople:null,
        projectTime:null
      },
      // 查询参数
      queryParams: {
        auditName:"设备拆除报废审核流程",
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
    // this.getList();
    this.getUser();
    this.getApplyDept();

  },
  methods: {


    showAddDem(){
      if (showLink) {
        return false;
      }
    },

    showDemolition(){

      this.open=true;
    },




    toAddDemolition(){
      this.open=true;

    },




    getApplyDept(){
      console.log(this.$route.query.dev);
      this.detailData.deviceId = this.$route.query.dev.devCode;
      this.detailData.equipName=this.$route.query.dev.devName;
      this.detailData.manufacturer=this.$route.query.dev.manufacturer;
      this.detailData.specification=this.$route.query.dev.model;
      this.detailData.buyDate =this.$route.query.dev.purchaseData;
      this.detailData.useYear=this.$route.query.dev.ageLimit;

      // this.detailData = this.$route.query.dev;
      listProcess(this.queryParams).then(response => {
        this.detailData.auditProcess = response.rows[0].auditMan;
        console.log(this.detailData.auditProcess);
      });

    },

    getUser(){
        const username = this.$store.state.user.name;
        // this.detailData.applyDept=username;
        listUser(username).then(response=>{
          this.userList = response.rows;
          console.log("aaaaa:",this.userList);
          getAuthRole(response.rows[0].userId).then((response)=>{
            // console.log(response.user.dept.deptName);
            this.detailData.applyDept = response.user.dept.deptName;
            this.applyDept1 = this.detailData.applyDept;
            console.log(this.detailData.applyDept);

          })
        })
      },

     getList(){
      getRemove(this.$route.query.equipId).then(response => {
        // this.demolitionAnalysisList.push(response.data);
        this.detailData =response.data;
        // this.detailData.push(response.data);
        console.log(this.detailData);
        this.total = response.total;
        this.loading = false;

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
    /**弹窗取消 */
    cancel2() {
      this.open = false;
    },

    // 取消按钮
    cancel() {
      this.$router.push({
        path: "/life/life/equipmentTable",
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
      // this.open = true;
      this.title = "添加设备设施拆除报废申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const equipId = row.equipId || this.ids
      getRemove(equipId).then(response => {
        this.form = response.data;
        // this.open = true;
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
    /**弹窗提交 */
    submitForm2() {
          if (this.detailData2.equipId != null) {

            updateDemolitionAnalysis(this.detailData2).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.showLink = true;
              // this.getList();
            });
          } else {
            if (this.detailData2.evaluationProject!=null &&this.detailData2.projectTime!=null&&this.detailData2.evaluationPeople!=null) {
              const username = this.$store.state.user.name;
              this.detailData2.submitter =username ;
              //年
              let year = new Date().getFullYear();
              //月份是从0月开始获取的，所以要+1;
              let month = new Date().getMonth() +1;
              //日
              let day = new Date().getDate();
              this.detailData2.submitTime = year + '-' + month + '-' + day;
              console.log("grwsgrw",this.detailData2.submitTime);
              addDemolitionAnalysis(this.detailData2).then(response => {
                  console.log("reooo:",this.detailData2);
              this.$modal.msgSuccess("新增成功");
              listDemolitionAnalysis(this.detailData2).then(response=>{

              console.log("ressss2:",response);

              this.detailData2.projectId = response.rows[0].projectId;

              console.log("Pid2:",this.detailData2.projectId);

            })


              this.open = false;
              this.showLink = true;
              // this.getList();

            });
             console.log("ressss1:",this.detailData2);


            }else{
              this.$message.error('请输入必填项');
            }

          };
    },





    submitForm() {
          if (this.detailData.equipId != null) {

            updateRemove(this.detailData).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.$router.push({
        path: "/equipRemove/allRemove",
      });
              // this.getList();
            });
          } else{
            if (this.detailData.removalReason!=null&& this.detailData.deptComments!=null) {
              this.detailData.checkPeople=this.detailData.auditProcess.split("②")[0].slice(1,);
              this.detailData.state="报废申请";
              this.detailData.name=this.detailData.equipName+'报废申请';
              this.detailData.projectId = this.detailData2.projectId;
              console.log("pId1:",this.detailData.projectId);
              //年
              let year = new Date().getFullYear();
              //月份是从0月开始获取的，所以要+1;
              let month = new Date().getMonth() +1;
              //日
              let day = new Date().getDate();
              this.detailData.makingTime =year + '-' + month + '-' + day;
              const username = this.$store.state.user.name;
              this.detailData.chargePeople =username ;

            addRemove(this.detailData).then(response => {
              this.$modal.msgSuccess("新增成功");
              // this.getList();
              this.$router.push({
              path: "/equipRemove/allRemove",
            });
            });
            }else{
               this.$message.error('请输入必填项');
            }

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
	/* border: none; */
	float: left;
	zoom:1;
	/* outline: medium; */
};
#inputInline{
  display: inline;
}
</style>
