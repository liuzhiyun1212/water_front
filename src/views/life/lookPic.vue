<template>
    <div style="padding: 20px">
        <!-- 上传附件及图片-->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                class="demo-ruleForm"
                style="margin-top: 10px">
                <el-row>
                  <el-form-item prop="devPicture">
                    <el-upload
                      :class="{hide:hideUpload}"
                      :action="upload.url"
                      :file-list="picList"
                      list-type="picture-card"
                      ref="uploadPic"
                      :headers="upload.headers"
                      :disabled="true"
                      :on-preview="handlePictureCardPreview">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                  </el-form-item>
                </el-row>
              </el-form>
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  props:['message'],
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      loading: "",
      param: {
        token: "",
      },
      disabled: false,
      imgs: [],
      ruleForm:{},
      //上传
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/common/upload",
      },
      picList:[],
      uploadList:[],
      beforeList:[],
      afferentList:null,
      hideUpload: true,
    };
  },
  created() {
    this.watchFiles()
  },
  methods: {
    returnData(){
      this.$emit('returnData',this.uploadList)
    },
    watchFiles() {
      if (this.message === '' || typeof (this.message) == 'undefined') {
        this.afferentList = []
      } else {
        this.afferentList = JSON.parse(this.message)
      }
      // this.afferentList = JSON.parse(this.message)
      this.picList = []
      for (var i = 0; i < this.afferentList.length; i++) {
        var array = {}
        array.name = this.afferentList[i].name
        array.url = 'http://47.99.65.198:8200/profile/upload/' + this.afferentList[i].nowDate + '/' + this.afferentList[i].name
        this.picList.push(array)
      }
      this.uploadList = this.afferentList
    },
    //时间戳格式化为yyyy/MM/dd
    formatDate2(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + "/";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  watch:{
    'message'(newVal, oldVal) {
      console.log('监听')
      this.watchFiles()
    },
  }
};
</script>
<style>
.hide .el-upload--picture-card {
	display: none;
}
</style>
