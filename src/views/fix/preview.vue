<template>
  <div>
    <el-form ref="plan" :model="plan">
      <el-row>
        <el-col :span="8">
          <el-form-item label="维保名称">
            {{ plan.name }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保等级">
            {{ plan.level }}
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item label="负责人">
            {{ plan.chargePeople }}
          </el-form-item></el-col
        >
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="实施人">
            {{ plan.executePeople }}
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item label="检修时间">
            {{ plan.fixdate }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保计划类型">
            {{ plan.planType }}
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="故障类型">
            {{ plan.equipmentData }}
          </el-form-item></el-col
        >
      </el-row>
    </el-form>

    <el-divider></el-divider>
    <el-form ref="plan" :model="plan">
      <el-row>
        <el-col :span="12">
          <el-form-item label="检修项目">
            {{ plan.maintenanceContent }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维保情况">
            {{ plan.maintenanceCase }}
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备件信息">
            {{ plan.parts }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="plan" :model="plan">
      <el-row>
        <el-col :span="12">
          <el-form-item label="维保前图片">
            {{ plan.previousPic }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司">
            {{ plan.subsequentPic }}
          </el-form-item></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司">
            {{ plan.applyAccessory }}
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item label="公司">
            {{ plan.auditAccessor }}
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item label="公司">
            {{ plan.checkAccessor }}
          </el-form-item></el-col
        >
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="plan" :model="plan">
      <el-row>
        <el-col :span="8">
          <el-form-item label="预估金额">
            {{ plan.budget }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注">
            {{ plan.remark }}
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item label="审核流程">
            {{ plan.auditProcess }}
          </el-form-item></el-col
        >
      </el-row>
      <el-row>

      </el-row>
    </el-form>
    <el-divider></el-divider>
  </div>
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
      plan: {
        //第一步
        name: "",
        level: "",
        chargePeople: "",
        executePeople: "",
        fixdate: "",
        planType: "",
        equipmentData: "{}",
        //第二步
        maintenanceContent: "",
        maintenanceCase: "",
        parts: "{}",
        //第三步
        maintenanceWay: "",
        company: "",
        //第四步
        previousPic: "",
        subsequentPic: "",
        applyAccessory: "",
        auditAccessor: "",
        checkAccessor: "",
        //第五步
        budget: "",
        remark: "",
        auditProcess: "",
        makingTime:"",
        state:"未提交",
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
        this.plan = newData;
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
