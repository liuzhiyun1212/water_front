<template>
  <div>
    <div style="overflow: hidden" :style="{ height: mainHeight }">
      <div
        style="
          width: calc(100% + 17px);
          height: calc(100% + 17px);
          overflow: auto;
        "
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="margin-top: 10px"
        >
          <el-row>
            <el-col :span="7">
              <el-form-item label="设备编码" required>
                <el-input v-model="ruleForm.dCode" style="width: 100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="设备类别" prop="devAttrName" required>
                <el-select
                  v-model="ruleForm.devAttrName"
                  placeholder="请选择设备类别"
                >
                  <el-option label="电机" value="电机"></el-option>
                  <el-option label="水泵" value="水泵"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="设备编码" required>
              <el-col :span="5">
                <el-form-item prop="dCode1">
                  <el-input
                    placeholder="泵站名称首字母"
                    v-model="ruleForm.dCode1"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="0.5">-</el-col>
              <el-col :span="6.5">
                <el-form-item prop="dCode2">
                  <el-input
                    placeholder="设备名称缩写前两个字母"
                    v-model="ruleForm.dCode2"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="0.5">-</el-col>
              <el-col :span="8.5">
                <el-form-item prop="dCode3">
                  <el-input
                    placeholder="购买年限后两个数字"
                    v-model="ruleForm.dCode3"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="0.5">-</el-col>
              <el-col :span="2.5">
                <el-form-item prop="dCode4">
                  <el-input
                    placeholder="月份"
                    v-model="ruleForm.dCode4"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
          </el-form-item>
          <el-form-item label="上传图片" prop="equipmentPicture">
            <div class="alert-box-item" style="display: inline-block">
              <div
                class="bigImg-div"
                @click="toGetImg"
                style="display: inline-block"
              >
                <img class="bigImg" :src="valueUrl" v-if="valueUrl" />
              </div>
              <el-button type="text" @click="picNotSelect()"
                >取消选择</el-button
              >
            </div>
          </el-form-item>

          <el-row>
            <el-col :span="7">
              <el-form-item label="设备名称" prop="devName" required>
                <el-input
                  placeholder="请输入设备名称"
                  v-model="ruleForm.devName"
                  style="width: 100%"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="机器型号" prop="model" required>
                <el-input
                  placeholder="请输入机器型号"
                  v-model="ruleForm.model"
                  style="width: 100%"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="生产厂家" prop="manufacturer" required>
                <el-input
                  placeholder="请输入生产厂家"
                  v-model="ruleForm.manufacturer"
                  style="width: 100%"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="安装位置" prop="location" required>
                <el-select
                  v-model="ruleForm.location"
                  placeholder="请选择安装位置"
                >
                  <el-option label="500泵站" value="500泵站"></el-option>
                  <el-option label="二期泵站" value="二期泵站"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="购买时间" required>
                <el-col :span="12">
                  <el-form-item prop="purchaseDate1">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.purchaseDate1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="11.5">
                  <el-form-item prop="purchaseDate2">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="ruleForm.purchaseDate2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="安装时间" required>
                <el-col :span="12">
                  <el-form-item prop="installData1">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.installData1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="11.5">
                  <el-form-item prop="installData2">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="ruleForm.installData2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用时间" required>
                <el-col :span="12">
                  <el-form-item prop="startData1">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.startData1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="11.5">
                  <el-form-item prop="startData2">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="ruleForm.startData2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="标记状态" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用年限" required>
                <el-col :span="12">
                  <el-form-item prop="ageLimit1">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="ruleForm.ageLimit1"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="11.5">
                  <el-form-item prop="ageLimit2">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="ruleForm.ageLimit2"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="设备简介" prop="equipmentIntroduction">
            <el-input
              type="textarea"
              v-model="ruleForm.equipmentIntroduction"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >录入</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addDevtable,updateDevtable} from "@/api/system/devtable";
let inputElement = null;
export default {
  props: {
    editValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      id:2,
      mainHeight: "",
      valueUrl: "",
      ruleForm: {
        dCode: "",
        dCode1: "",
        dCode2: "",
        dCode3: "",
        dCode4: "",
        equipmentPicture: "",
        devAttrName: "",
        devName: "",
        model: "",
        manufacturer: "",
        location: "",
        purchaseDate1: "",
        purchaseDate2: "",
        status: false,
        installData1: "",
        installData2: "",
        startData1: "",
        startData2: "",
        ageLimit1: "",
        ageLimit2: "",
        equipmentIntroduction: "",
        remark: "",
      },
      rules: {
        dCode1: [
          { required: true, message: "请补全设备编码", trigger: "blur" },
        ],
        dCode2: [
          { required: true, message: "请补全设备编码", trigger: "blur" },
        ],
        dCode3: [
          { required: true, message: "请补全设备编码", trigger: "blur" },
        ],
        dCode4: [
          { required: true, message: "请补全设备编码", trigger: "blur" },
        ],
        devAttrName: [
          { required: true, message: "请选择设备类别", trigger: "blur" },
        ],
        devName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        model: [{ required: true, message: "请输入设备型号", trigger: "blur" }],
        manufacturer: [
          { required: true, message: "请输入生产厂家", trigger: "blur" },
        ],
        location: [
          { required: true, message: "请选择安装位置", trigger: "blur" },
        ],
        purchaseDate1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        purchaseDate2: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        installData1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        installData2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        startData1: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        startData2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        ageLimit1: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        ageLimit2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        // remark: [{ required: false, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },

  created() {
    this.init();
  },
  watch: {
    editValue: {
      immediate: true,
      deep: true,
      handler: function (newData, oldData) {
        console.log("============newData===============");
        console.log(newData);
        console.log(newData.installData);
        this.ruleForm.dCode = newData.devCode;
        this.id = newData.id;
        // this.code = this.ruleForm.dCode1+'-'+this.ruleForm.dCode2+'-'+this.ruleForm.dCode3+'-'+this.ruleForm.dCode4;
        this.ruleForm.equipmentPicture = newData.equipmentPicture;
        this.ruleForm.devAttrName = newData.devAttrName;
        this.ruleForm.devName = newData.devName;
        this.ruleForm.model = newData.model;
        this.ruleForm.manufacturer = newData.manufacturer;
        this.ruleForm.location = newData.location;
        this.ruleForm.purchaseDate1 = newData.purchaseData;
        this.ruleForm.purchaseDate2 = newData.purchaseData;
        this.ruleForm.status = newData.status;
        this.ruleForm.installData1 = newData.installData;
        this.ruleForm.installData2 = newData.installData;
        this.ruleForm.startData1 = newData.startData;
        this.ruleForm.startData2 = newData.startData;
        this.ruleForm.ageLimit1 = newData.ageLimit;
        this.ruleForm.ageLimit2 = newData.ageLimit;
        this.ruleForm.equipmentIntroduction = newData.equipmentIntroduction;
        this.ruleForm.remark = newData.remark;
      },
    },
  },
  methods: {
    init() {
      this.mainHeight = document.body.clientHeight * 0.6 + "px";
    },
    toGetImg() {
      if (inputElement === null) {
        // 生成文件上传的控件
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "file");
        inputElement.style.display = "none";

        if (window.addEventListener) {
          inputElement.addEventListener("change", this.uploadFile, false);
        } else {
          inputElement.attachEvent("onchange", this.uploadFile);
        }

        document.body.appendChild(inputElement);
      }
      inputElement.click();
    },
    uploadFile(el) {
      if (el && el.target && el.target.files && el.target.files.length > 0) {
        console.log(el);
        const files = el.target.files[0];
        const isLt2M = files.size / 1024 / 1024 < 2;
        const size = files.size / 1024 / 1024;
        console.log(size);
        // 判断上传文件的大小
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        } else if (files.type.indexOf("image") === -1) {
          //如果不是图片格式
          // this.$dialog.toast({ mes: '请选择图片文件' });
          this.$message.error("请选择图片文件");
        } else {
          const that = this;
          const reader = new FileReader(); // 创建读取文件对象
          reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
          reader.onload = function () {
            // 文件读取完成后
            // 读取完成后，将结果赋值给img的src
            that.valueUrl = this.result;
            that.ruleForm.equipmentPicture = this.result;
            // console.log(this.result);
            // 数据传到后台
            //const formData = new FormData()
            //formData.append('file', files); // 可以传到后台的数据
          };
        }
      }
    },
    beforeDestroy() {
      if (inputElement) {
        if (window.addEventListener) {
          inputElement.removeEventListener(
            "change",
            this.onGetLocalFile,
            false
          );
        } else {
          inputElement.detachEvent("onchange", this.onGetLocalFile);
        }
        document.body.removeChild(inputElement);
        inputElement = null;
        console.log("========inputelement destroy");
      }
    },

    submitForm(formName) {
      console.log(this.ruleForm.equipmentPicture);
      this.ruleForm.purchaseDate = this.formatDate(this.ruleForm.purchaseDate2);
      // console.log("hhhhh",this.ruleForm.purchaseDate);
      this.ruleForm.installData = this.formatDate(this.ruleForm.installData2);
      this.ruleForm.startData = this.formatDate(this.ruleForm.startData2);
      this.ruleForm.ageLimit = this.formatDate(this.ruleForm.ageLimit2);
      this.ruleForm.code =
        this.ruleForm.dCode1 +
        "-" +
        this.ruleForm.dCode2 +
        "-" +
        this.ruleForm.dCode3 +
        "-" +
        this.ruleForm.dCode4;
      this.ruleForm.id = this.id;
      if (this.ruleForm.status) {
        this.ruleForm.markStatus = 1;
      } else {
        this.ruleForm.markStatus = 0;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id != null) {
            updateDevtable(this.ruleForm).then(response => {
              this.$modal.msgSuccess("修改成功");
            })
          }
          // alert("submit!");
        } else {
          console.log("修改失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.valueUrl = "";
    },
    picNotSelect() {
      this.valueUrl = "";
      this.ruleForm.equipmentPicture = "";
    },
    formatDate(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
  },
};
</script>
<style>
.alert-box-item {
  overflow: hidden;
}

.bigImg-div {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.bigImg {
  display: block;
  width: 200px;
  height: 200px;
}
</style>