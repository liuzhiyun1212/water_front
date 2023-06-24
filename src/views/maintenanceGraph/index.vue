<template>
  <div>
    <el-card  style="width: 95%; margin-left: 30px; margin-top: 10px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="维保计划" name="planeType" :lazy="true">
        <PlaneType ref="child"/>
      </el-tab-pane>

      <el-tab-pane label="执行阶段" name="maintenanceCase" :lazy="true">
        <MaintenanceCase/>
      </el-tab-pane>

      <el-tab-pane label="维保等级" name="level" :lazy="true">
        <Level/>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-card :body-style="{ padding: '0px 10px 10px 10px' }">
      <el-table
        v-loading="loading"
        :data="caseList"
        stripe
        height="279px"
        style="width: 100%;margin-top:0px !important"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="70px"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="维保计划名称"
          :show-overflow-tooltip="true"

        >
        <template slot-scope="scope">
            <el-link type="primary">{{
              scope.row.name
            }}</el-link>
        </template>
      </el-table-column>
        <el-table-column
          prop="level"
          label="维保等级"
          :show-overflow-tooltip="true" sortable
        >
        </el-table-column>
        <el-table-column
            prop="planType"
            label="维保计划"
            :show-overflow-tooltip="true"
          >
        </el-table-column>
        <el-table-column label="制定时间" align="center" prop="fixdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fixdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="执行阶段"
        :show-overflow-tooltip="true"
      >
      <template slot-scope="scope"><img
              style="width: 100%; height: 100%"
              :src="require('../../assets/' + scope.row.state + '.jpg')"/></template>
      </el-table-column>
      </el-table>
    </el-card>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      @pagination="getList"
    /> -->
    </el-card>
  </div>
</template>

<script>
import MaintenanceCase from "./maintenanceCase.vue";
import PlaneType from "./planeType.vue";
import Level from "./level.vue";
import { listPlan, getPlan, delPlan, addPlan, updatePlan, levelState, level } from "@/api/system/plan";
import { truncateSync } from "fs";
export default {
//import 引入的组件需要注入到对象中才能使用
  components: {
    PlaneType,
    MaintenanceCase,
    Level
  },
  data() {
    //这里存数据
    return {
      isFirst: true,
      isSecond: true,
      isThird:true,
      activeName: "planeType",
      // 表格数据
      caseList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        troubleName: null,
        troubleIntroduction: null
      },
      total: 0,
      // 新修改level统计
      levelList: [],
      // 选中柱形图
      selectedDataIndex: null,
    };
  },
  methods: {

       /** 查询plan列表 */
       getList() {
          this.loading = true;
          listPlan(this.queryParams).then(response => {
              this.caseList = response.rows;
              this.total = response.total;
              this.loading = false;
          });
          },
  },
  created() {
  },
  // 如果不是来自首页点击，默认显示第一个
  beforeRouteEnter(to, from, next) {
    if (from.fullPath != "/index") {
      localStorage.removeItem("tabFlag");
    }
    next();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //声明周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁之后
  activated() {}, //缓存keep-alive

}
</script>

<style>

</style>
