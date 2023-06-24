<template>
  <div style="padding: 20px">
    <!-- 上传附件及图片-->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      class="demo-ruleForm"
      style="margin-top: 10px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="devDirect">
            <el-upload
              :class="{hide:hideUpload}"
              :action="upload.url"
              ref="uploadDirection"
              :file-list="fileList"
              :headers="upload.headers"
              :disabled="true"
              :on-preview="downloadFile">
              <el-button size="small" type="primary"
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
// let Base64 = require('js-base64').Base64; //Base64.encode('小飼弾');Base64.decode('ZGFua29nYWk=');
import Base64 from 'base-64'
export default {
  props:['message'],
  data() {
    return {
      loading: "",
      param: {
        token: "",
      },
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
      fileList:[],
      uploadFileList:[],
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
      this.$emit('returnData',this.uploadFileList)
    },
    watchFiles(){
      if(this.message===''||typeof(this.message)=='undefined'){
        this.afferentList = []
      }else{
        this.afferentList = JSON.parse(this.message)
      }
      this.fileList=[];
      // debugger
      for(var i=0;i<this.afferentList.length;i++){
        var array ={};
        array.name=this.afferentList[i].trueName
        let fileName = this.afferentList[i].name
        array.url=process.env.VUE_APP_BASE_API+"/profile/upload/"+this.afferentList[i].nowDate+"/"+fileName
       // array.url="http://47.99.65.198:8200/profile/upload/"+this.afferentList[i].nowDate+"/"+this.afferentList[i].trueName
        this.fileList.push(array)
      }
      this.uploadFileList=this.afferentList;
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


    downloadFile(file){
      // window.location.href = filePath
      let filePath = file.url
      filePath = window.decodeURIComponent(filePath)
      console.log("转码后路径",filePath)
      let fileName = file.name
      var ajax = new XMLHttpRequest()
      ajax.open('GET', filePath, true)
      ajax.setRequestHeader('Cache-Control', 'no-cache')
      ajax.setRequestHeader('Access-Control-Allow-Origin', '*')
      ajax.responseType = 'blob'
      ajax.onload = (e) => {
        console.log(e)
        let res = e.target.response
        // let blob = new Blob([res],{type: "application/pdf;charset=UTF-8"}) // 这里的res为后端返回的流数据
        let blob = new Blob([res])
        let aLink = document.createElement('a')
        aLink.download = `${fileName}` // 下载文件的名字
        aLink.href = URL.createObjectURL(blob)
        aLink.click()
      }
      ajax.send()
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
.hide .el-upload--text {
  display: none;
}
</style>
