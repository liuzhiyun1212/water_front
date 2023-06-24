<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(2)">待审核</el-button>
      <el-button type="primary" @click="toTheSystem(3)">已审核</el-button>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "AuditManagement",
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
