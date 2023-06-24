<template>
  <div class="login">
    <el-form v-if = false ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">系统登录窗口</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span></span>
    </div>
  </div>
</template>

<script>
import { getUserInfo,getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { listUser, getAuthRole,getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 用户信息
      form: {},
      role:'',
      loginresult:false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    //this.getUserInfo();
    this.g();
  },
  methods: {
    g(){
      var ticket = this.$route.query.ticket
      var pathid = this.$route.query.id
      console.log(ticket)
      console.log(pathid)
      this.loginForm = {username: "admin", password: "admin123", rememberMe: false};
      console.log(this.loginForm)
      this.$store.dispatch("Login", this.loginForm).then(() => {
        console.log("this right")
        console.log(111)
        this.toPages(pathid);
      }).catch(() => {
        console.log("this error")
        this.loading = false;
        if (this.captchaOnOff) {
          this.getCode();
        }
      });
    },
    getUserInfo(){
      var ticket = this.$route.query.ticket
      var pathid = this.$route.query.id
      console.log(ticket)
      console.log(pathid)
      this.$http.get('http://117.190.235.205:8082/qkidentity/api/account/getUserInfo?ticket='+ticket).then(function(response){
        console.log(response)
        this.loginresult = response.data.Result
        if(this.loginresult==true){
          this.loading = true;
          const username = JSON.parse(response.data.KeyValue).usercode
          this.loginForm = {username: username, password: "admin123", rememberMe: false};
          console.log(this.loginForm)
          this.$store.dispatch("Login", this.loginForm).then(() => {
            console.log("this right")
            console.log(111)
            this.toPages(pathid);
          }).catch(() => {
            console.log("this error")
            this.loading = false;
            this.loginresult = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }else{
          this.$modal.msgError("获取用户信息失败，请返回登录页面，重新登录。");
        }
      },function(response){
        // 发生错误
      });
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 ,sameSite:"None",secure:true});
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 ,sameSite:"None",secure:true});
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 ,sameSite:"None",secure:true});
            // Cookies.set("username", this.loginForm.username, { expires: 30 });
            // Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            // Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            console.log(111)
            console.log(this.redirect)
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    },
    toPages(id){
      switch (id) {
        case "1":
          this.$router.push({ path: "/inspection/inspection" })
          break;
        case "2":
          this.$router.push({ path: "/check/plan" })
          break;
        case "3":
          this.$router.push({ path: "/check/plan/data" })
          break;
        case "4":
          this.$router.push({ path: "/graph/graph/create" })
          break;
        case "5":
          this.$router.push({ path: "/graph/graph/show" })
          break;
        case "6":
          this.$router.push({ path: "/graph/graph/manage" })
          break;
        case "7":
          this.$router.push({ path: "/mainplan/maintenanceGraph/zhuye" })
          break;
        case "8":
          this.$router.push({ path: "/mainplan/maintenanceGraph/index" })
          break;
        case "9":
          this.$router.push({ path: "/mainplan/maintenanceGraph/submitPlan" })
          break;
        case "10":
          this.$router.push({ path: "/mainplan/life/equipmentChart" })
          break;
        case "11":
          this.$router.push({ path: "/life/life/equipmentTable" })
          break;
        case "12":
          this.$router.push({ path: "/life/faultStatistics" })
          break;
        case "13":
          this.$router.push({ path: "/life/tree/equ_tree/equimenttree" })
          break;
        case "14":
          this.$router.push({ path: "/life/allRemove" })
          break;
        case "15":
          this.$router.push({ path: "/life/predict/predictb" })
          break;
        case "16":
          this.$router.push({ path: "/system/user" })
          break;
        case "17":
          this.$router.push({ path: "/system/role" })
          break;
        case "18":
          this.$router.push({ path: "/system/dept" })
          break;
        case "19":
          this.$router.push({ path: "/system/collaborator/collaboratorTable" })
          break;
        case "20":
          this.$router.push({ path: "/system/picture" })
          break;
        case "21":
          this.$router.push({ path: "/system/process" })
          break;
        case "22":
          this.$router.push({ path: "/system/part" })
          break;
        case "23":
          this.$router.push({ path: "/system/trouble/troubleTable" })
          break;
        default:
          this.$router.push({ path: "/" })
          break;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //background-image: url("../assets/images/login-background.jpg");
  //background-size: cover;
  background: #3A71A8;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
