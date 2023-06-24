<template>
    <div class="app-container">
      <table class="table" style="margin-left:10%;width:80%;height:100%;border:1px solid;align:center;font-size:20px;" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:20px;">项目派工单添加</caption>
      <tr align="center"> <td style="width:120px;font-size:12px;">项目名称</td>
        <td colspan="7"><input readonly v-model="form.projectname" class="myInput"/> </td>
          </tr>

          <tr align="center">
            <td style="font-size:12px;">项目类别</td>
            <td ><input readonly v-model="form.category"  class="myInput"/></td>
	<td  style="width:120px;font-size:12px;">项目负责人</td>
            <td ><input readonly v-model="form.leader"  class="myInput" style="width:120px;"/></td>
            <td style="width:80px;font-size:12px;">编号</td>
            <td ><input  v-model="form.numberid"  class="myInput" placeholder="请输入编号"/></td>
          </tr>

          <tr align="center" >
            <td style="font-size:12px;">发出单位</td>
            <td colspan="2"><input readonly v-model="form.sendunit" class="myInput"/></td>
            <td  style="width:120px;font-size:12px;">发出部门</td>
            <td colspan="2"><input  readonly v-model="form.senddepartment" class="myInput"/></td>
          </tr>
          <tr align="center" float="left">
 <td style="font-size:12px;">接收单位</td>
            <td colspan="7" ><input readonly v-model="form.receiptunit"  class="myInput"/></td>
 </tr>
  <tr align="center" >
            <td style="font-size:12px;">发出人</td>
            <td colspan="2"><input readonly v-model="form.sendpeople" class="myInput" placeholder="请输入"/></td>
            <td style="width:120px;font-size:12px;">接收人</td>
            <td colspan="2"><input   v-model="form.receiptpeople" class="myInput" placeholder="请输入"/></td>
          </tr>
     <tr align="center" >
            <td style="font-size:12px;">发出时间</td>
            <td colspan="2" style="font-size:13px;">{{ dateTime }}  </td>

            <td style="width:120px;font-size:12px;">接收时间</td>
            <td colspan="2">
            <input type="date" v-model="form.receipttime" class="myInput" placeholder="请输入"/></td>
          </tr>

          <tr>
            <td colspan="6"><div   style="margin-left:10px;margin-top:5px;font-size:12px;">具体工作内容：
              <input  v-model="form.jobcontent" style="margin-bottom:10px;margin-top:8px" class="myInput" placeholder="请输入"/>
            </div>
            </td>
          </tr>
          <tr>
            <td colspan="6"><div style="margin-left:10px;margin-top:5px;font-size:12px;">施工验收要求：
              <input  v-model="form.acceptrequire" style="margin-bottom:10px;margin-top:8px" class="myInput" placeholder="请输入"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="6"><div style="margin-left:10px;margin-top:5px;font-size:12px;">备注：
              <input  v-model="form.remark" style="margin-bottom:10px;margin-top:8px" class="myInput" placeholder="请输入"/></div>
            </td>
          </tr>
          <tr>
            <td colspan="6"><div style="margin-left:10px;margin-top:5px;font-size:12px;">附件：
              <UploadFile :message2="'[]'" @returnData="getApplyFile" placeholder="请上传"></UploadFile>
              <!-- <input  v-model="form.remark" style="margin-bottom:10px;margin-top:8px" class="myInput" placeholder="请上传"/> -->
            </div>
            </td>
          </tr>
        </table>


      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['work:work:add']"
          >提交</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import  UploadFile  from '../life/uploadFile.vue'
    import { listWork, getWork, delWork, addWork, updateWork } from "@/api/system/work";

    export default {
      name: "Work",
      components: {
        UploadFile
      },
      data() {
        return {
          dateTime: "",
          // 遮罩层
          loading: true,
          // 选中数组
          ids: [],

          // 总条数
          total: 0,
          // work表格数据
          workList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,
          // 表单参数
          form: {
            projectname:'维修什么呢',
            category:'北京烤鸭',
            leader:'王哈哈',
            sendpeople:'hhh ',
            receiptpeople: 'gggg',
            drawpeople:'制定人',
            sendunit:'新疆水务',
            senddepartment:'自来水部门',
            receiptunit:'笑果文化',
            sendPeople:'guoguo',

          },
          // 表单校验
          rules: {
          projectname: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        }],
          },
        };
      },
      created() {
        this.getList();
        this.getTime();
      },

      methods: {
        //上传文件
        getApplyFile(val) {
          console.log('getApplyFile', val)
        },
        /** 查询work列表 */
        getList() {
            this.loading = true;
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
            sendpeople:null,
            receiptpeople: null,
            sendtime: null,
            receipttime: null,
            jobcontent: null,
            acceptrequire: null,
            drawpeople: null,
            drawtime: null,
            remark: null,
            projectname: null,
            attachment:null,
            company: null,
        level: null,
          };
          this.resetForm("form");
        },
         /** 新增成功 */
        handleAdd () {
        listWork({ projectname: this.form.projectname }).then((res) => {
   console.log(res.total);
  if (res.total != 0) {
    this.$modal.msgSuccess("项目名重复，增加失败");
  }
 else {
  listWork({ numberid: this.form.numberid }).then((res) => {
   console.log(res.total);
  if (res.total != 0) {
    this.$modal.msgSuccess("编号重复，增加失败");;
  }
  else{
    addWork(this.form).then(response => {
    this.$modal.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                  this.$router.replace('/graph/work')
                });
        }
      });
  }
})
    },
    //调用日期
    getTime(){
let aDate=new Date();
console.log(aDate);
this.dateTime=this.formatDd(aDate);
    },
//格式化日期
formatDd(date) {
      let year=date.getFullYear();
      let month=(date.getMonth()+1).toString().padStart(2,"0");//获取月要+1
      let day=date.getDate().toString().padStart(2,"0");//获取天是getDate
      let createTime=year+"-"+month+"-"+day;
      return createTime;
    },
      }
    };
    </script>
      <style>
        .myInput{
          font-size: 12px;
          width: 100%;
          height: 100%;
          border: none;
          float: left;
          zoom:1;
          outline: medium;
        }
        </style>
