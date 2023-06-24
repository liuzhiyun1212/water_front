<template>
  <div class="all">
    <el-main class="main">
      <table border="1" >
        <tr>
          <td style="width:150px">巡检管理</td>
          <td>
            <el-button type="primary" @click="toTheSystem(1)">巡检记录</el-button>
          </td>
        </tr>
        <tr>
          <td>审核管理</td>
          <td><el-button type="primary" @click="toTheSystem(2)">待审核</el-button>
            <el-button type="primary" @click="toTheSystem(3)">已审核</el-button></td>
        </tr>
        <tr>
          <td>知识图谱</td>
          <td><el-button type="primary" @click="toTheSystem(4)">图谱构建</el-button>
            <el-button type="primary" @click="toTheSystem(5)">图谱展示</el-button>
            <el-button type="primary" @click="toTheSystem(6)">图谱管理</el-button></td>
        </tr>
        <tr>
          <td>维保管理</td>
          <td> <el-button type="primary" @click="toTheSystem(7)">综合查询</el-button>
            <el-button type="primary" @click="toTheSystem(8)">综合统计</el-button>
            <el-button type="primary" @click="toTheSystem(9)">状态调整</el-button>
            <el-button type="primary" @click="toTheSystem(10)">进度可视化</el-button>
          </td>
        </tr>
        <tr>
          <td>生命周期</td>
          <td><el-button type="primary" @click="toTheSystem(11)">设备信息管理</el-button>
            <el-button type="primary" @click="toTheSystem(12)">故障统计</el-button>
            <el-button type="primary" @click="toTheSystem(13)">设备树</el-button>
            <el-button type="primary" @click="toTheSystem(14)">故障预测</el-button>
            <el-button type="primary" @click="toTheSystem(15)">设备报废管理</el-button></td>
        </tr>
        <tr>
          <td>系统管理</td>
          <td>
            <el-button type="primary" @click="toTheSystem(16)">用户管理</el-button>
            <el-button type="primary" @click="toTheSystem(17)">角色管理</el-button>
            <el-button type="primary" @click="toTheSystem(18)">部门管理</el-button>
            <el-button type="primary" @click="toTheSystem(19)">外派公司管理</el-button>
            <el-button type="primary" @click="toTheSystem(20)">轮播图片管理</el-button>
            <el-button type="primary" @click="toTheSystem(21)">审核流程管理</el-button>
            <el-button type="primary" @click="toTheSystem(22)">备件管理</el-button>
            <el-button type="primary" @click="toTheSystem(23)">故障类型</el-button>
          </td>
        </tr>
      </table>
    </el-main>
  </div>
</template>

<script>

export default {
  name: "Login",
  methods: {
    toTheSystem(i){
      var ticket = this.$route.query.ticket
      const routeData = this.$router.resolve({
        path: '/register',
        query:{
          ticket: ticket,
          id:i
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}
* {
  background-color: rgba(10, 24, 99, 1.0);
  background-size: cover;
}
</style>
<style>
.all{
  padding-left: 10px;height: 100%; padding-right: 10px;width: 100%;min-height: calc(100vh);
}
table{
  color: #ffffff;
  margin-top: 200px;
  margin-left: 18%;

}
th,td{
  border: 1px solid #999;
  text-align: center;
  padding: 20px 0;
  max-height: 60px;

}
</style>
