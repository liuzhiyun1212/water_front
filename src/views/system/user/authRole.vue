<template>
  <div class="app-container">
    <h4 class="form-header h4">基本信息</h4>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="form.nickName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="登录账号" prop="userName">
            <el-input  v-model="form.userName" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <h4 class="form-header h4">角色信息</h4>
    <el-table v-loading="loading" :row-key="getRowKey" @row-click="clickRow" ref="table" @selection-change="handleSelectionChange" :data="roles.slice((pageNum-1)*pageSize,pageNum*pageSize)">
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
      <el-table-column label="角色编号" align="center" prop="roleId" />
      <el-table-column label="角色名称" align="center" prop="roleName" />
      <el-table-column label="权限字符" align="center" prop="roleKey" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />

    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-120px;margin-top:30px;">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateAuthRole } from "@/api/system/user";
import { listUser, getAuthRole,getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from "@/api/system/user";

export default {
  name: "AuthRole",
  data() {
    return {
       // 遮罩层
      loading: true,
      // 分页信息
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 选中角色编号
      roleIds:[],
      // 角色信息
      roles: [],
      // 用户信息
      form: {}
    };
  },
  created() {
    const userId = this.$route.params && this.$route.params.userId;
    if (userId) {
      this.loading = true;
      getUser(userId).then((response) => {
        this.form = response.data;
        this.form.roleIds = []
        for(let i =0;i<response.roleIds.length;i++){
          if(response.roleIds[i]!=null){
            this.form.roleIds.push(response.roleIds[i]);
          }
        }
        if(this.form.roleIds.length!=0){
          getAuthRole(userId).then((response) => {
            this.roles = response.roles;
            this.total = this.roles.length;
            this.$nextTick(() => {
              this.roles.forEach((row) => {
                if (row.flag) {
                  this.$refs.table.toggleRowSelection(row);
                }
              });
            });
            this.loading = false;
          });
        }else{
          var h = this.form.roleName.split('/');
          for(let i = 0;i<h.length;i++){
            for(let a = 0;a<response.roles.length;a++)
              if(response.roles[a].roleName==h[i]){
                this.form.roleIds.push(response.roles[a].roleId);
              }
          }
          updateUser(this.form).then(response => {
            getAuthRole(userId).then((response) => {
              this.roles = response.roles;
              this.total = this.roles.length;
              this.$nextTick(() => {
                this.roles.forEach((row) => {
                  if (row.flag) {
                    this.$refs.table.toggleRowSelection(row);
                  }
                });
              });
              this.loading = false;
            });
          });
        }
      });
    }
  },
  methods: {
    /** 单击选中行数据 */
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.roleIds = selection.map((item) => item.roleId);
    },
    // 保存选中的数据编号
    getRowKey(row) {
      return row.roleId;
    },
    /** 提交按钮 */
    submitForm() {
      this.form.roleIds = this.roleIds;
      this.form.roleName = this.rolemake(this.roles,this.roleIds);
      updateUser(this.form).then(response2 => {
        this.$modal.msgSuccess("授权成功");
        this.close();
      });
    },

    rolemake(roleOptions,roleIds){
      var v = ""
      roleIds = roleIds.sort((a,b)=>a-b);
      for(let l =0;l<roleIds.length;l++){
        for(let i =0 ;i<roleOptions.length;i++){
          if(roleIds[l]==roleOptions[i].roleId&&l==roleIds.length-1){
            v = v + roleOptions[i].roleName
          }else if(roleIds[l]==roleOptions[i].roleId){
            v = v + roleOptions[i].roleName + "/"
          }
        }
      }
      return v;
    },
    /** 关闭按钮 */
    close() {
      const obj = { path: "/system/user" };
      this.$tab.closeOpenPage(obj);
    },
  },
};
</script>
