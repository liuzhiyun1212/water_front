<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(16)">用户管理</el-button>
      <el-button type="primary" @click="toTheSystem(17)">角色管理</el-button>
      <el-button type="primary" @click="toTheSystem(18)">部门管理</el-button>
      <el-button type="primary" @click="toTheSystem(19)">外派公司管理</el-button>
      <el-button type="primary" @click="toTheSystem(20)">轮播图片管理</el-button>
      <el-button type="primary" @click="toTheSystem(21)">审核流程管理</el-button>
      <el-button type="primary" @click="toTheSystem(22)">备件管理</el-button>
      <el-button type="primary" @click="toTheSystem(23)">故障类型</el-button>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "systemmanagement",
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
}
</script>

<style scoped>

</style>
