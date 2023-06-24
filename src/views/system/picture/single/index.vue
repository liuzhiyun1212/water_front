<template>
  <div :class="className" :style="{ height: height, width: width }">
    <el-row >
      <el-col :span="12">
        <img
          style="height: 100%; width: 200px; margin-left: 40%"
          :key="key"
          :src="imgUrl"
        />
      </el-col>
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          accept=".png"
          :data="data"
          :action="uploadUrl"
          :headers="headers"
          multiple
          :limit="1"
          :on-success="handleFileSuccess"
          :on-progress="handleFileUploadProgress"
          :on-error="handleUploadError"
          :on-remove="handleFileRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button style="margin-top: 50px" size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传png文件</div>
        </el-upload></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  props: {
    className: {
      type: String,
      default: "deal",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    url: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //文件上传列表
      data: { formatName: "" },
      fileList: [],
      imgUrl: null,
      key: "key",
      headers: { Authorization: "Bearer " + getToken() },
      uploadUrl: process.env.VUE_APP_BASE_API + "/common/uploadImgWithoutTime",
    };
  },
  mounted() {
    this.data.formatName = this.fileName;
    this.imgUrl = this.url;
  },
  methods: {
    // 上传成功回调
    handleFileSuccess(res, file) {
      if (res.code === 200) {
        console.log(res);
        console.log(file);
        this.imgUrl = res.url;
        setTimeout(()=>{
          this.key = new Date().getTime();
          this.fileList = [];
        },500)

      }
    },
    // 上传失败
    handleUploadError(event, file, fileList) {
      console.log(event);
      this.$message({
        showClose: true,
        message: "上传文件失败，请重试",
        type: "error",
      });
    },
    // 上
    handleFileUploadProgress(event, file, fileList) {
      console.log(file);
    },
    // 文件个数超出
    handleExceed() {
      this.$message({
        showClose: true,
        message: "单次上传文件数量不能超过 1 个!",
        type: "error",
      });
    },
    // 文件列表移除处理
    handleFileRemove(file, fileList) {},
  },
};
</script>

<style scoped></style>
