<template>
  <div class="app-container"  :title="title" >
    <table class="table" style="margin-left:10%;width:50%;height:100%;border:1px solid;align:center;font-size:20px;" border cellspacing="0" cellpadding="9" >
      <caption style="font-size:20px;font-weight:bold;">维保单</caption>
      <tr class="tableFont"  align="center" float="left">
        <td style="border-left:0px;font-size:12px" >维保名称</td>
        <td colspan="2" ><input readonly v-model="detailData.name" class="myInput"/></td>
        <td  style="width:120px;font-size:12px">维保等级</td>
        <td colspan="2" ><input  readonly v-model="detailData.level" class="myInput"/></td>
      </tr>
      <tr class="tableFont"  align="center" float="left">
        <td style="border-left:0px;font-size:12px">负责人</td>
        <td colspan="2" ><input readonly v-model="detailData.chargePeople" class="myInput"/></td>
        <td  style="width:120px;font-size:12px">实施人</td>
        <td colspan="2" ><input  readonly v-model="detailData.executePeople" class="myInput"/></td>
      </tr>
      <tr  class="tableFont"  align="center" float="left">
        <td style="border-left:0px;font-size:12px" >检修时间</td>
        <td colspan="2" style="font-size:12px"><input readonly v-model="detailData.fixdate" class="myInput"/></td>
        <td  style="width:120px;font-size:12px">维保计划类型</td>
        <td colspan="2" style="font-size:12px"><input  readonly v-model="detailData.planType" class="myInput"/></td>
      </tr>
      <tr class="tableFont"  >
        <td colspan="7" style="border-left:0px;border-bottom: 0px;">
          <div readonly  align="left" style="margin-right:10px;font-size:12px">设备列表:</div>
          <el-table
            ref="singleTable"
            :data="planList"
            highlight-current-row
            style="width: 100%;border:0px;font-size: 12px"
            :header-cell-style="{
                      fontSize: '12px',
                      }">
            <el-table-column
              property="name"
              label="名称"
              width="200"

            >
            </el-table-column>
            <el-table-column
              property="code"
              label="编号"
              width="200"
            >
            </el-table-column>
            <el-table-column
              property="state"
              label="故障类型"
              width="200"
            >
            </el-table-column>
          </el-table>
        </td>
      </tr>
      <!--      <hr colspan="9" class="hrStyle"/>-->
      <tr class="tableFont"   float="left">
        <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">检修项目：
          <input  readonly v-model="detailData.maintenanceContent" style="margin-bottom:10px;margin-top:8px;font-size:12px" class="myInput"/>
        </div>
        </td>
      </tr>
      <tr class="tableFont"   float="left">
        <td colspan="6" style="border-left:0px;"><div readonly style="margin-left:10px;margin-top:5px;font-size:12px">维保情况：
          <input  readonly v-model="detailData.maintenanceCase" style="margin-bottom:10px;margin-top:8px;font-size:12px" class="myInput"/>
        </div>
        </td>
      </tr>
      <tr class="tableFont"   float="left">
        <td colspan="7"  style="border-left:0px;font-size:12px">
          <div  readonly align="left" style="font-size:12px;margin-left: 10px;">备件:</div>
          <el-table
            ref="singleTable"
            :data="planLis"
            highlight-current-row
            style="width: 100%;font-size: 12px"
            :header-cell-style="{
                      fontSize: '12px',
                      }">
            <el-table-column
              property="name"
              label="备件名称"
              width="200"
            >
            </el-table-column>
            <el-table-column
              property="code"
              label="备件编号"
              width="200"
            >
            </el-table-column>
            <el-table-column
              property="num"
              label="调拨数量"
              width="200"
            >
            </el-table-column>
          </el-table></td>
      </tr>
      <tr class="tableFont" float="left">
        <td colspan="7" style="border-left:0px;font-size:12px">
          <div readonly align="left" style="margin-right:10px;font-size:12px">金额明细:</div>
          <el-table
            ref="singleTable"
            :data="amountData"
            highlight-current-row
            style="width: 100%;font-size: 12px"
            :header-cell-style="{
                      fontSize: '12px',
                      }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="expenseName"
              label="明细名称"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="expenseAmount"
              label="明细金额"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="expenseRemark"
              label="备注"
              width="200"
            >
            </el-table-column>
          </el-table>
        </td>
      </tr>
      <tr class="tableFont"  align="center" float="left">
        <td colspan="2" style="border-left:0px;font-size:12px">维修方式</td>
        <td style="font-size:12px"><input readonly v-model="detailData.company"  class="myInput"/></td>
        <td style="font-size:12px">预估金额</td>
        <td colspan="2" >
          <div style="font-size: 12px;float: left;">{{detailData.budget}}元</div>
        </td>
      </tr>
      <tr class="tableFont"  float="left">
        <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修前）：
          <look-pic :message='detailData.previousPic' ref="beforePicChild"></look-pic>
        </div>
        </td>
      </tr>
      <tr class="tableFont"  float="left">
        <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修后）：
          <look-pic :message='detailData.subsequentPic' ref="afterPicChild"></look-pic>

        </div>
        </td>
      </tr>
      <tr class="tableFont"  float="left">
        <td colspan="6"  style="border-left:0px;"><div style="margin-left:10px;margin-top:5px;font-size:12px">附件：
          <!--          <input  readonly v-model="detailData.applyAccessory" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
          <look-file  :message="detailData.applyAccessory" ref="fileChild"></look-file>
        </div>
        </td>
      </tr>
      <tr class="tableFont"  align="center" float="left">
        <td colspan="2"  style="border-left:0px;font-size:15px">审核流程</td>
        <td colspan="6">
          <el-table
            ref="singleTable"
            :cell-class-name="auditClass"
            :data="auditList"
            highlight-current-row
            style="width: 100%;border:0px;font-size: 12px;"
            :header-cell-style="{
                      fontSize: '12px',
                      }">
            <el-table-column
              property="name"
              label="姓名"
              width="200"
              style="font-size: 12px;"
            >
              <template slot-scope="scope">
                <i class="el-icon-document"></i>
                <span  style="margin-left: 10px">{{ scope.row.name }} </span>
              </template>
            </el-table-column>
            <el-table-column
              property="suggestion"
              label="意见"
              width="200"
              style="font-size: 12px;"
            >
            </el-table-column>

          </el-table>
        </td>
      </tr>
      <tr class="tableFont"  float="left">
        <td colspan="6"  style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">备注：
          <input  readonly v-model="detailData.remark" style="margin-bottom:10px;margin-top:8px" class="myInput"/>
        </div>
        </td>
      </tr>
      <tr class="tableFont" align="center" float="left">
        <td colspan="2"  style="border-left:0px;font-size:15px">验收流程</td>
        <td colspan="6">
          <el-table
            ref="singleTable"
            :cell-class-name="acceptClass"
            :data="acceptList"
            highlight-current-row
            style="width: 100%;border:0px;font-size: 12px;"
            :header-cell-style="{
                      fontSize: '12px',
                      }">
            <el-table-column
              property="name"
              label="姓名"
              width="200"
              style="font-size: 12px;"
            >
              <template slot-scope="scope">
                <i class="el-icon-document"></i>
                <span  style="margin-left: 10px">{{ scope.row.name }} </span>
                <!--                <span v-if="scope.row.name===this.acceptPeople" style="margin-left: 10px;color:red">{{ scope.row.name }}</span>-->
                <!--                <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              property="suggestion"
              label="意见"
              width="200"
              style="font-size: 12px;"
            >
            </el-table-column>
          </el-table>
        </td>
      </tr>
      <tr class="tableFont" float="left">
        <td colspan="6"  style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">备注：
          <input  readonly v-model="detailData.acceptRemark" style="margin-bottom:10px;margin-top:8px" class="myInput"/>
        </div>
        </td>
      </tr>
    </table>

  </div>
</template>
<script>
import { getPlan,listPlan } from '@/api/system/plan'
import { listDetails } from '@/api/system/details'
import  UploadFile  from '../life/uploadFile2.vue'
import  UploadPic  from '@/views/life/uploadPic2.vue'
import  lookFile  from '../life/lookFile.vue'
import  lookPic  from '@/views/life/lookPic.vue'

export default {
  components: {
    UploadFile, UploadPic,lookFile,lookPic,
  },
  name: 'Plan',
  props: ['planName','UploadFile','UploadPic'],
  watch: {
    'planName'(newVal, oldVal) {
      this.getList()
    },
  },
  data() {

    return {
      amountData: [],
      detailData: [],
      // 遮罩层
      loading: true,
      // 选中数组
      name: '',
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // work表格数据
      planList: [],
      planLis: [],
      auditList:[],
      acceptList:[],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      //图片列表
      picList:[],
      afterList:[],
      checkPeople:null,
      acceptPeople:null,
      auditNum:null,
      checkNum:null,
      auditMessage:null,
      acceptMessage:null,
      auditProcess:'',
      checkProcess:'',
      // fileList:[],
      myRow :0,
      myRow1:0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询work列表 */
    getList() {
      this.loading = true
      console.log(this.$route.query.planname)
      if (typeof (this.$route.query.planname) !== 'undefined') {
        this.name = this.$route.query.planname
      } else {
        this.name = this.planName
      }

      listPlan({ name: this.name }).then(response => {
        // this.form=response.data;
        console.log(response)
        this.detailData = response.rows[0]
        // debugger
        if(this.detailData.previousPic==''){
          this.detailData.previousPic = '[]'
        }else if(this.detailData.applyAccessory==''){
          this.detailData.applyAccessory = '[]'
        }else if(this.detailData.subsequentPic==''){
          this.detailData.subsequentPic = '[]'
        }
        if(response.rows[0].chargePeople!=""){
          let peopleList = JSON.parse(response.rows[0].chargePeople)
          this.detailData.chargePeople = peopleList.name
        }

        // if(response.rows[0].executePeople!=""){
        //   let peopleName = JSON.parse(response.rows[0].executePeople)
        //   this.detailData.executePeople = peopleName.name
        // }

        if(response.rows[0].equipmentData!=""){
          this.planList = JSON.parse(response.rows[0].equipmentData)
        }

        if(response.rows[0].parts!=""){
          this.planLis = JSON.parse(response.rows[0].parts)
        }

        if(response.rows[0].auditProcess!==""){
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = response.rows[0].auditProcess.split(/[①②③④⑤⑥⑦⑧⑨]/);
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          console.log('auditMessage',response.rows[0].auditMessage)
          if(response.rows[0].auditMessage!==""&&typeof(response.rows[0].auditMessage)!=='undefined'&&response.rows[0].auditMessage!==null){
            const suggest = response.rows[0].auditMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.auditList = []

          for(var i=0;i<processlist.length-1;i++){
            var arr = {}
            arr.name = processlist[i+1]
            arr.suggestion = messageList[i]
            this.auditList.push(arr)
          }
        }

        if(response.rows[0].checkProcess!==""){
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = response.rows[0].checkProcess.split(/[①②③④⑤⑥⑦⑧⑨]/);
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          if(response.rows[0].acceptMessage!==""&&typeof(response.rows[0].acceptMessage)!=='undefined'&&response.rows[0].acceptMessage!==null){
            const suggest = response.rows[0].acceptMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.acceptList = []

          for(var i=0;i<processlist.length-1;i++){
            var arr = {}
            arr.name = processlist[i+1]
            arr.suggestion = messageList[i]
            this.acceptList.push(arr)
          }
        }

        if(response.rows[0].checkPeople!==""){
          this.checkPeople = response.rows[0].checkPeople
        }
        if(response.rows[0].acceptPeople!==""){
          this.acceptPeople = response.rows[0].acceptPeople
        }

        this.loading = false

        //显示图片
        console.log("detaildata",this.detailData)
        console.log("1255553",this.detailData.previousPic)
        console.log("456",this.detailData.previousPic)
        this.$refs.beforePicChild.watchFiles()
        this.$refs.afterPicChild.watchFiles()
        this.$refs.fileChild.watchFiles()

        listDetails({planId:this.detailData.id}).then(response=>{
          this.amountData = response.rows
          console.log(response)
        })
        // let picData = JSON.parse(this.detailData.previousPic)
        // for(var i=0;i<picData.length;i++){
        //   console.log("picData",picData)
        //   console.log("picData1",picData[i])
        //   let arr = picData[i]
        //   var picUrl="http://localhost:8080/profile/upload/"+arr.nowDate+"/"+arr.name
        //   this.picList.push(picUrl)
        // }
        // let picData2 = JSON.parse(this.detailData.subsequentPic)
        // for(var i=0;i<picData2.length;i++){
        //   console.log("picData",picData2)
        //   console.log("picData1",picData2[i])
        //   let arr = picData2[i]
        //   var picUrl="http://localhost:8080/profile/upload/"+arr.nowDate+"/"+arr.name
        //   this.afterList.push(picUrl)
        // }
        // console.log("picList",this.picList)
      })


    },
    // 表单重置
    //   reset() {
    //     this.form = {
    //       id: null,
    //       category: null,
    //       leader: null,
    //       numberid: null,
    //       sendunit: null,
    //       senddepartment: null,
    //       receiptunit: null,
    //       sendpeople: null,
    //       receiptpeople: null,
    //       sendtime: null,
    //       receipttime: null,
    //       jobcontent: null,
    //       acceptrequire: null,
    //       drawpeople: null,
    //       drawtime: null,
    //       remark: null,
    //       projectname: null
    //     };
    //     this.resetForm("form");
    //   },
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        this.$modal.msgSuccess('查看成功')
        this.open = false
        this.getList()
        this.$router.replace('/weibao/index')
      })
    },
    //修改单元格样式的方法
    //指定行颜色
    auditClass: function({ row, rowIndex }) {
      // debugger
      // console.log(rowIndex, 'rowIndex');
      if (row.name == this.checkPeople&&this.checkPeople!=''&&this.checkPeople!=null&&this.checkPeople!='审核完毕') {
        this.myRow = rowIndex
        return 'setclass2'
      }
      else if(rowIndex<this.myRow||this.checkPeople=='审核完毕'){
        // this.detailData.auditProcess.slice(0,myRow-1)
        return 'setclass1'
      }
      else{
        return 'setclass3'
      }
    },
    acceptClass: function({ row, rowIndex }) {
      // console.log(row, 'row');
      if (row.name == this.acceptPeople&&this.acceptPeople!=''&&this.acceptPeople!=null&&this.acceptPeople!='验收完毕') {
        this.myRow1 = rowIndex
        return 'setclass2';
      }
      else if(rowIndex<this.myRow1||this.acceptPeople=='验收完毕'){
        return 'setclass1'
      }
      else{
        return 'setclass3'
      }
    },
  }
}
</script>

<style scoped>
.myInput{
  font-size: 12px;
  width: 100%;
  height: 100%;
  border: none;
  float: left;
  zoom:1;
  outline: medium;
}
.hrStyle{
  width: 100%;
  height: 100%;
  border: none;
  float: left;
}
.tableFont{
  font-size: 15px;
}
/*tr{*/
/*  pointer-events: none;*/
/*}*/

</style>
<style>
.setclass1{
  background: lime;
}
.setclass2{
  background: rgba(255, 76, 0, 0.76);
}
.setclass3{
  background: 	#C0C0C0;
}
</style>
