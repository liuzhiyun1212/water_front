<template>
  <el-form ref="ruleForm" :model="ruleForm">
    <el-row>
      <el-col :span="6">
        <el-form-item label="设备名称">
          {{ ruleForm.devName }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="设备状态">
          {{ ruleForm.status }}
        </el-form-item></el-col
      >
      <el-col :span="6">
        <el-form-item label="设备编码">
          {{ ruleForm.dCode }}
        </el-form-item></el-col
      >
      <el-col :span="6">
        <el-form-item label="设备种类">
          {{ ruleForm.devAttrName }}
        </el-form-item></el-col
      >
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-form-item label="生产厂家">
          {{ ruleForm.manufacturer }}
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="设备关联">
          {{ ruleForm.value }}
        </el-form-item></el-col
      >
      <el-col :span="6">
        <el-form-item label="安装位置">
          {{ ruleForm.location }}
        </el-form-item></el-col
      >
      <el-col :span="6">
        <el-form-item label="机器型号">
          {{ ruleForm.model }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8">
        <el-form-item label="到货时间">
          {{ ruleForm.purchaseDate }}
        </el-form-item></el-col
      >
      <el-col :span="8">
        <el-form-item label="验收时间">
          {{ ruleForm.installData }}
        </el-form-item></el-col
      >
      <el-col :span="8">
        <el-form-item label="启用时间">
          {{ ruleForm.startData }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="有效期至">
          {{ ruleForm.ageLimit }}
        </el-form-item></el-col
      >
      <el-col :span="16">
        <el-form-item label="设定维保时间">
          {{
            ruleForm.repairTime +
            ":" +
            ruleForm.repairValue +
            ruleForm.timeValue
          }}
        </el-form-item></el-col
      >
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10">
        <el-form-item label="验收意见">
          {{ ruleForm.equipmentIntroduction }}
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="验收人员">
          {{ ruleForm.remark }}
        </el-form-item></el-col
      >
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10">
        <el-form-item label="已上传图片"> </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="已上传附件"> </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    editValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ruleForm: {
        dCode: "",
        equipmentPicture: "",
        devAttrName: "",
        devName: "",
        model: "",
        manufacturer: "",
        location: "",
        purchaseDate: "",
        status: "未启用",
        installData: "",
        startData: "",
        ageLimit: "",
        repairTime: "",
        repairValue: "",
        timeValue: "",
        equipmentIntroduction: "",
        remark: "",
        value: "",
      },
    };
  },
  watch: {
    editValue: {
      immediate: true,
      deep: true,
      handler: function (newData, oldData) {
        console.log("============newData===============");
        console.log(newData);
        console.log(newData.installData);
        this.devId = newData.id;
        this.ruleForm.dCode = newData.dCode;
        this.ruleForm.equipmentPicture = newData.equipmentPicture;
        this.ruleForm.devAttrName = newData.devAttrName;
        this.ruleForm.devName = newData.devName;
        this.ruleForm.model = newData.model;
        this.ruleForm.manufacturer = newData.manufacturer;
        this.ruleForm.location = newData.location;
        this.ruleForm.purchaseDate = this.formatDate(newData.purchaseDate);
        this.ruleForm.status = newData.status;
        this.ruleForm.installData = this.formatDate(newData.installData);
        this.ruleForm.startData = this.formatDate(newData.startData);
        this.ruleForm.ageLimit = this.formatDate(newData.ageLimit);
        this.ruleForm.repairTime = newData.repairTime;
        this.ruleForm.repairValue = newData.repairValue;
        this.ruleForm.value = newData.value;
        this.ruleForm.equipmentIntroduction = newData.equipmentIntroduction;
        this.ruleForm.remark = newData.remark;
        var a = "";
        for (var i = 0; i < newData.timeValue.length; i++) {
          a = a + this.formatDate(newData.timeValue[i]) + ",";
        }
        this.ruleForm.timeValue = a;
        console.log(newData.repairTime);
        // this.ruleForm.value = "河润水务 / 一期泵站 / 1#泵组 / 水泵"
        /* var orgIds = [];
        var orgId;
        while(newData.orgId != 0 || orgId !=-1){
          getDevtable(newData.orgId).then((res)=>{
            orgId = ""+res.data.orgId;
          })
        } */
      },
    },
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
  },
};
</script>