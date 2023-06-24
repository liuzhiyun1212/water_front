<template>
  <table class="table" style="margin-left:10%;margin-top:3%;width:80%;border:1px solid;align:center;font-size:10px;"
         border cellspacing="0" cellpadding="9"
  >

    <tr align="center" float="left">
      <td rowspan="4">
        <div class="div1" style="font-size:15px">基本信息</div>
      </td>
      <td>设备名称</td>
      <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
      <td style="width:30%"><input readonly v-model="ruleForm.devName" class="myInput"/></td>
      <td>设备状态</td>
      <td><input readonly v-model="ruleForm.status" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td>设备编码</td>
      <td><input readonly v-model="ruleForm.dCode" class="myInput"/></td>
      <td>设备种类</td>
      <td><input readonly v-model="ruleForm.devAttrName" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td>生产厂家</td>
      <td><input readonly v-model="ruleForm.manufacturer" class="myInput"/></td>
      <td>机器型号</td>
      <td><input readonly v-model="ruleForm.model" class="myInput"/></td>
    <tr align="center">
      <td>安装位置</td>
      <td colspan="3"><input readonly v-model="ruleForm.location" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td rowspan="3">
        <div class="div1" style="font-size:15px">生命周期信息</div>
      </td>
      <td>到货时间</td>
      <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
      <td><input readonly v-model="ruleForm.purchaseDate" class="myInput"/></td>
      <td>验收时间</td>
      <td><input readonly v-model="ruleForm.installData" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td>启用时间</td>
      <td><input readonly v-model="ruleForm.startData" class="myInput"/></td>
      <td>有效期至</td>
      <td><input readonly v-model="ruleForm.ageLimit" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td>设定维保时间</td>
      <!-- <td colspan="2"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
      <td colspan="3"><input readonly v-model="ruleForm.repairTime" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td rowspan="2">
        <div class="div1" style="font-size:15px">验收信息</div>
      </td>
      <td>验收意见</td>
      <td colspan="3"><input readonly v-model="ruleForm.equipmentIntroduction" class="myInput"/></td>
      <!-- <td ><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
    <tr align="center" float="left">
      <td>验收人员</td>
      <!-- <td colspan="2"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
      <td colspan="3"><input readonly v-model="ruleForm.remark" class="myInput"/></td>
    </tr>
    <tr align="center" float="left">
      <td rowspan="3">
        <div class="div1" style="font-size:15px">附件</div>
      </td>
      <td>已上传图片</td>
      <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
      <td colspan="3"><lookPic :message="ruleForm.equipmentPicture"></lookPic></td>
    </tr>
    <tr align="center" float="left">
      <td>已上传使用说明书</td>
      <td colspan="3"><lookFile :message="ruleForm.file"></lookFile></td>
    </tr>
    <tr align="center" float="left">
      <td>已上传附件</td>
      <td colspan="3"><lookFile :message="ruleForm.runningTime"></lookFile></td>
    </tr>
  </table>

</template>

<script>
import lookFile from '@/views/life/lookFile'
import lookPic from '@/views/life/lookPic'
export default {
  components:{
    lookFile,lookPic
  },
  props: {
    editValue: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      ruleForm: {
        dCode: '',
        equipmentPicture: '',
        devAttrName: '',
        devName: '',
        model: '',
        manufacturer: '',
        location: '',
        purchaseDate: '',
        status: '未启用',
        installData: '',
        startData: '',
        ageLimit: '',
        repairTime: '',
        repairValue: '',
        timeValue: '',
        equipmentIntroduction: '',
        remark: '',
        value: '',
        file:'[]',
        runningTime:'[]'
      }
    }
  },
  watch: {
    editValue: {
      immediate: true,
      deep: true,
      handler: function(newData, oldData) {
        console.log('============newData===============')
        console.log(newData)
        this.devId = newData.id
        this.devCode = newData.devCode
        console.log(this.devCode)
        this.ruleForm.dCode = newData.devCode
        this.ruleForm.equipmentPicture = newData.equipmentPicture
        this.ruleForm.devAttrName = newData.devAttrName
        this.ruleForm.devName = newData.devName
        this.ruleForm.model = newData.model
        this.ruleForm.manufacturer = newData.manufacturer
        this.ruleForm.location = newData.location
        this.ruleForm.purchaseDate = newData.purchaseData
        this.ruleForm.status = newData.ustatus
        this.ruleForm.installData = newData.installData
        this.ruleForm.startData = newData.startData
        this.ruleForm.ageLimit = newData.ageLimit
        if (newData.lastRepaireTime.indexOf('每') != -1) {
          this.ruleForm.repairTime = '间隔时间：' + newData.lastRepaireTime
        } else if (newData.lastRepaireTime != '') {
          this.ruleForm.repairTime = '固定时间：' + newData.lastRepaireTime
        }
        this.ruleForm.equipmentIntroduction = newData.equipmentIntroduction
        this.ruleForm.remark = newData.remark
        if (newData.equipmentPicture != null) {
          this.ruleForm.equipmentPicture = newData.equipmentPicture;
        }
        if(newData.file != null){
          this.ruleForm.file = newData.file;
        }
        if(newData.runningTime != null){
          this.ruleForm.runningTime = newData.runningTime;
        }
      }
    }
  },
  created() {
    // this.getParams()
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      console.log(this.$route.query.devCode)

      var a = this.$route.query.devCode
      this.ruleForm.dCode = a.devCode
      this.ruleForm.devName = a.devName
      this.ruleForm.devAttrName = a.devAttrName
      this.ruleForm.model = a.model
      this.ruleForm.manufacturer = a.manufacturer
      this.ruleForm.location = a.location
      this.ruleForm.purchaseDate = a.purchaseData
      this.ruleForm.status = a.ustatus
      this.ruleForm.installData = a.installData
      this.ruleForm.startData = a.startData
      this.ruleForm.ageLimit = a.ageLimit
      if (a.lastRepaireTime.indexOf('每') != -1) {
        this.ruleForm.repairTime = '间隔时间：' + a.lastRepaireTime
        // this.ruleForm.repairValue = a.lastRepaireTime;
      } else if (a.lastRepaireTime != '') {
        this.ruleForm.repairTime = '固定时间：' + a.lastRepaireTime
        // this.ruleForm.timeValue = a.lastRepaireTime;
      }
      this.ruleForm.equipmentIntroduction = a.equipmentIntroduction
      this.ruleForm.remark = a.remark
    },
    toBack: function() {
      this.$router.push({
        path: '/life/life/equipmentTable'
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d)
      var YY = date.getFullYear() + '-'
      var MM =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return YY + MM + DD
    }
  }
}
</script>
<style>
.myInput {
  font-size: 12px;
  width: 100%;
  height: 100%;
  border: none;
  float: left;
  zoom: 1;
  outline: medium;
}
</style>
