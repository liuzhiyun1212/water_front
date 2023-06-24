<template>
  <div class="all" style="padding-left: 10px; padding-right: 10px">
    <el-row :gutter="10">
      <el-col class="update-log" :span="24">
        <el-card>
          <div
            style="
          width: 100%;
          background: #d2e9ff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          padding-right: 3%;
          align-items: center;
        "
          >
            <p
              style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
            >
              编辑公司信息
            </p>
          </div>
          <p class="id12"></p>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="公司名" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入公司名" />
            </el-form-item>
            <el-form-item label="联系人" prop="linkName">
              <el-input v-model="form.linkName" placeholder="请输入联系人" />
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="业务属性" prop="businessAttr">
              <el-input v-model="form.businessAttr" placeholder="请输入业务属性" />
            </el-form-item>
            <el-form-item label="公司资质" prop="companyLevel">
              <el-input v-model="form.companyLevel" placeholder="请输入公司资质" />
            </el-form-item>
          </el-form>
          <div style="text-align: center;" >
            <el-button type="primary" @click="submitForm">保 存</el-button>
            <el-button @click="close">返 回</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listCollaborator, getCollaborator, delCollaborator, addCollaborator, updateCollaborator, getListByCompany } from "@/api/system/collaborator";

export default {
  name: "collaboratorUpdate",
  data() {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      backpath:null,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        companyName: null,
        linkName: null,
        tel: null,
        businessAttr: null,
        companyLevel: null
      },
    };
  },
  created() {
    this.getList();
  },
  destroyed() {
    this.$store.dispatch('app/openSideBar', { withoutAnimation: true })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backpath = from.path
    })
  },
  methods: {
    /** 查询collaborator列表 */
    getList() {
      this.queryParams.companyName = decodeURIComponent(this.$route.query && this.$route.query.Name);
      listCollaborator(this.queryParams).then(response => {
        this.form = response.rows[0];
      });
    },
    // 表单重置
    reset() {
      this.form = {
        companyId: null,
        companyName: null,
        linkName: null,
        tel: null,
        businessAttr: null,
        companyLevel: null
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateCollaborator(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.getList();
          });
        }
      });
    },
    close(){
      if(this.backpath=='/'){
      }else{
        this.$tab.closeOpenPage(this.backpath);
        this.reset();
      }
    }
  }
}
</script>

<style scoped>

</style>
