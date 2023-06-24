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
                        class="uploader"
                        ref="uploadDirection"
                        :file-list="fileList"
                        :action="upload.url"
                        :auto-upload="true"
                        :headers="upload.headers"
                        accept=".pdf, .doc, .docx, .zip, .rar, .xls, .xlsx, .ppt"
                        :before-upload="handlebeforeDirectionUpload"
                        :before-remove="beforeRemove"
                        :on-remove="handleFileRemove"
                        :on-success="handlePdfFileUploadSuccess">
                        <el-button size="small" type="primary"
                          >点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip" style="width:100%">
                          只能上传.pdf,.doc,.docx,.zip,.rar,.xls,.xlsx,.ppt文件
                        </div> -->
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
    </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  props:['message2'],
  data() {
    return {
      loading: "",
      param: {
        token: "",
      },
      ruleForm:{},
      disabled: false,
      //上传
      upload: {
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: "http://47.99.65.198:8200/common/upload",
      },
      showType:{
        name:null,
        url:null,
      },
      fileList:[],
      uploadFileList:[],
      beforeList:[],
      afferentList:null,
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
      // debugger
      if (this.message2 === '' || typeof (this.message2) == 'undefined') {
        this.afferentList = []
      } else {
        this.afferentList = JSON.parse(this.message2)
      }
      // this.afferentList = JSON.parse(this.message2)
      this.fileList=[];
      // debugger
      for(var i=0;i<this.afferentList.length;i++){
        var array ={};
          array.name=this.afferentList[i].trueName
          array.url="http://47.99.65.198:8200/profile/upload/"+this.afferentList[i].nowDate+"/"+this.afferentList[i].name
          this.fileList.push(array)
          // this.showType.name=null
          // this.showType.url=null
      }
      this.uploadFileList=this.afferentList;
      console.log("111",this.uploadFileList)
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
    //文件移除
    handleFileRemove(file, fileList) {
      console.log(file, fileList);
      for(var i =0;i<this.uploadFileList.length;i++){
        // debugger
        if(this.uploadFileList[i].trueName == file.name){
            this.uploadFileList.splice(i,1)
            break;
        }
      }
      this.returnData();
    },
    handlePdfFileUploadSuccess(response, file) {
      console.log('response',response);
      console.log("file",file)
      if (response.code == 200) {
        let date= new Date();
        let time = this.formatDate2(date);
        var pdfFile ={};
        pdfFile.name = response.newFileName;
        pdfFile.trueName = response.originalFilename;
        pdfFile.nowDate = time;
        console.log("pdf文件",pdfFile);
        this.uploadFileList.push(pdfFile);
        console.log("file文件",file.raw);
        this.returnData();
      } else {
        this.$message.error(file.name + "上传失败!");
      }
    },
    handlebeforeDirectionUpload(file) {
      let fileName=file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (
        lastName.toLowerCase() !== ".pdf" &&
        lastName.toLowerCase() !== ".doc"&&
        lastName.toLowerCase() !== ".docx"&&
        lastName.toLowerCase() !== ".zip"&&
        lastName.toLowerCase() !== ".rar"&&
        lastName.toLowerCase() !== ".xls"&&
        lastName.toLowerCase() !== ".xlsx"&&
        lastName.toLowerCase() !== ".ppt"
      ) {
        this.$message.error("文件必须为.pdf .doc .docx .zip .rar .xls .xlsx .ppt类型");
        this.$refs.uploadFile.clearFiles();
        return false;
      }
    },
    closePreviewClick() {
      this.showPdf = false;
    },
    downloadFile(file){
      consele.log("file",file)
      let fileUrl =file.url;
      window.location.href = fileUrl
    },
    beforeRemove(){
      return this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
      })
    },
  },
  watch:{
    'message2'(newVal, oldVal) {
      console.log('监听')
      this.watchFiles()
    },
  }
};
</script>
