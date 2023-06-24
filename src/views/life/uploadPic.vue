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
                      class="uploader"
                      :file-list="picList"
                      list-type="picture-card"
                      ref="uploadPic"
                      :action="upload.url"
                      :auto-upload="true"
                      :headers="upload.headers"
                      :accept="'.jpg,.png'"
                      :on-success="handleGoodsImagesUploadSuccess"
                      :before-upload="handlebeforeUpload"
                      :on-preview="handlePictureCardPreview"
                      :before-remove="beforeRemove"
                      :on-remove="handlePicRemove">
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
      picFile: {
        name:null,
        nowDate:null,
      },
      showType:{
        name:null,
        url:null,
      },
      picList:[],
      uploadList:[],
      beforeList:[],
      afferentList:null,
    };
  },
  created() {
    this.watchFiles()
  },
  methods: {
    returnData(){
      this.$emit('returnData',this.uploadList)
    },
    watchFiles(){
        if (this.message === '' || typeof (this.message) == 'undefined') {
          this.afferentList = []
        } else {
          this.afferentList = JSON.parse(this.message)
        }
        // this.afferentList = JSON.parse(this.message);
        this.picList=[];
        for(var i=0;i<this.afferentList.length;i++){
          var array ={};
          array.name=this.afferentList[i].name
          array.url=process.env.VUE_APP_BASE_API+"/profile/upload/"+this.afferentList[i].nowDate+"/"+this.afferentList[i].name
          this.picList.push(array)
        }
        this.uploadList=this.afferentList;
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
    //图片移除
    handlePicRemove(file, picList) {
        if(file.hasOwnProperty('response')){
          //row对象存在'url'属性
          for(var i =0;i<this.uploadList.length;i++){
            let fileUrl = process.env.VUE_APP_BASE_API+"/profile/upload/"+this.uploadList[i].nowDate+"/"+this.uploadList[i].name
            if(file.response.url === fileUrl){
                this.uploadList.splice(i,1)
                break;
            }
          }
        }else{
          for(var i =0;i<this.uploadList.length;i++){
            let fileUrl = process.env.VUE_APP_BASE_API+"/profile/upload/"+this.uploadList[i].nowDate+"/"+this.uploadList[i].name
            if(file.url === fileUrl){
                this.uploadList.splice(i,1)
                break;
            }
          }
        }
        this.returnData();
    },
    handlebeforeUpload(file) {
      // 这里做可以做文件校验操作
      let isAccept = new RegExp("image/*").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择image/*类型的文件");
      }
      return isAccept;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleGoodsImagesUploadSuccess(response, file, picList) {
      if (response.code == 200) {
        let imageUrl = response.url;
        this.imgs.push(imageUrl);
        this.num++;
        let date= new Date();
        let time = this.formatDate2(date);
        var picFile ={};
        picFile.name = response.newFileName;
        picFile.nowDate = time;
        this.uploadList.push(picFile);
        if (this.num == this.fileNum) {
          this.num = 0;
          this.fileNum = 0;
          // 这里如果 this.value.push(imageUrl) 这么写，vue会报出警告，大概意思是value作为props不应该在子组件中被修改
          // 应该根据 value 得到新的值，而不能修改它，this.value.concat(imageUrl)也是可以的，concat方法返回新的数组
          // this.$emit('input', [...this.value, imageUrl])
          this.$emit("input", this.value.concat(this.imgs));
          this.imgs = [];
        }
        this.returnData();
      } else {
        this.$message.error(file.name + "上传失败!");
      }
    },
    beforeRemove(){
      return this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
      })
    },
  },
};
</script>
