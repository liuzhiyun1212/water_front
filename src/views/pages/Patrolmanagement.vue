<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(1)">巡检记录</el-button>
    </el-main>
    <div style="width:95%;margin-left: 30px;background: #d2e9ff; margin-top: 10px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" style="margin-top:20px;position:absolute;margin-left: 20px">
        <el-form-item label="巡检名称" prop="inspectName">
        <span slot="label">
          <span class="formLabel" style="font-size: 16px;font-family: Arial;font-weight: normal">巡检名称</span>
        </span>
          <el-input
            v-model="queryParams.inspectName"
            placeholder="请输入巡检名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="巡检时间">
        <span slot="label">
          <span class="formLabel" style="font-size: 16px;font-family: Arial;font-weight: normal">巡检时间</span>
        </span>
          <el-date-picker
            v-model="dateRange"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="toTheSystem(1)">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">
      <div style="width: 100%; background: #d2e9ff; border-radius: 10px">
        <p
          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >
          设备巡检记录
        </p>
        <el-button
          type="success"
          icon="el-icon-plus"
          size="mini"
          @click="toTheSystem(1)"
          style="float: right; margin-right: 10px;margin-top: 13px; "
        >生成维保</el-button>
      </div>
      <el-table
        :header-cell-style="{
          background: '#84BBFE',
          color: '#fff',
          fontSize: '14px',
          textAlign: 'center',
          fontWeight: '600',
          fontFamily: '黑体',
          padding: '0',
        }"
        :header-row-style="{
          height: '20',
        }"v-loading="loading" :data="inspectionList" @selection-change="handleSelectionChange" style="height:auto;margin-top: 20px;width:99%">
        <el-table-column label="序号" :width="80">
          <template  slot-scope="scope" >
            <el-radio  v-model="templateSelection" :label="scope.$index+1"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="巡检名称" align="center" prop="inspectName"  >
          <template slot-scope="scope">
            <el-link @click="toTheSystem(1)" type="primary">{{scope.row.inspectName }}</el-link>
          </template></el-table-column>
        <el-table-column label="故障地点" align="center" prop="dangerAddress" />
        <el-table-column label="巡检时间" align="center" prop="date" />
        <el-table-column label="是否维保" align="center" prop="isMaintain" />
        <el-table-column label="维保计划名称" align="center" prop="maintenanceName" >
          <template slot-scope="scope">
            <el-link @click="toTheSystem(1)" type="primary">{{scope.row.maintenanceName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="toTheSystem(1)"
              :disabled="scope.row.maintenanceName!==null&&scope.row.maintenanceName!==''"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="toTheSystem(1)"
              :disabled="scope.row.maintenanceName!==null&&scope.row.maintenanceName!==''"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Patrolmanagement",
  data() {
    return {

      // 日期范围
      dateRange: [],

      //图片上传
      beforePic: [{
        name: "",
        nowDate: ""
      }],
      //跳转数据
      plan:{
        value:'',
        equipments:[],
        pics:[],
      },
      //是否维保下拉框选项
      options: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      //添加照片返回的数据
      backpic:'',
      //单选按钮
      templateSelection: '',
      //所有设备
      equipmentOptions:[],
      //设备故障类型
      faultCauseOption:[],
      //选择设备Id
      equipmentId: '',
      //设备编码
      equipmentCode: '',
      //设备表
      equipmentData: [],
      //设备名称
      name:null,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // inspect表格数据
      inspectionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹详情出层
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        inspectName: null,
        date: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      readonly:true,
      tupian:[],
      urls: [
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询inspect列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.dateRange && '' != this.dateRange) {
        this.queryParams.params["beginDate"] = this.dateRange[0];
        this.queryParams.params["endDate"] = this.dateRange[1];
      }
      let res = {
        "total": 4,
        "rows": [
          {
            "searchValue": null,
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "id": 117,
            "inspectName": "10-13第二次巡检",
            "dangerAddress": "二期泵站",
            "description": "机器运转温度过高，转速下降",
            "equipemnts": "[{\"name\":\"三相异步电动机\",\"code\":\"E-DJ-21-08\",\"state\":\"老化性故障\"}]",
            "isMaintain": "否",
            "pic": "[{\"name\":\"u=2785442067,2244671174&fm=253&fmt=auto&app=120&f=JPEG_20221013173914A039.jpg\",\"nowDate\":\"2022/10/13\"}]",
            "date": "2022-10-13",
            "inspectPeople": "王心茹",
            "maintenanceName": null
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "id": 116,
            "inspectName": "10-13巡检",
            "dangerAddress": "一期泵站一号泵组",
            "description": "机器异响，运转噪音过大。",
            "equipemnts": "[{\"name\":\"KOSW-450K离心泵\",\"code\":\"Y-SB-15-04\",\"state\":\"磨损性故障\"}]",
            "isMaintain": "是",
            "pic": "[{\"name\":\"u=2785442067,2244671174&fm=253&fmt=auto&app=120&f=JPEG_20221013173730A038.jpg\",\"nowDate\":\"2022/10/13\"}]",
            "date": "2022-10-13",
            "inspectPeople": "王心茹",
            "maintenanceName": "维保1013晚上"
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "id": 114,
            "inspectName": "测试1012",
            "dangerAddress": "测试1012",
            "description": "测试1012",
            "equipemnts": "[{\"name\":\"伸缩接头（dn800）\",\"code\":\"E-SS-21-08-800\",\"state\":\"腐蚀性故障\"},{\"name\":\"YSP400-4三相异步电动机\",\"code\":\"Y-DJ-15-04\",\"state\":\"磨损性故障\"}]",
            "isMaintain": "是",
            "pic": "[{\"name\":\"profile_20220925234304A002_20221012130114A017.jpg\",\"nowDate\":\"2022/10/12\"}]",
            "date": "2022-10-12",
            "inspectPeople": "admin",
            "maintenanceName": null
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "id": 113,
            "inspectName": "1",
            "dangerAddress": "1",
            "description": "1",
            "equipemnts": "[{\"name\":\"伸缩接头（dn800）\",\"code\":\"E-SS-21-08-800\",\"state\":\"腐蚀性故障\"}]",
            "isMaintain": "是",
            "pic": "[{\"name\":\"profile_20220925234304A002_20221011211015A016.jpg\",\"nowDate\":\"2022/10/11\"}]",
            "date": "2022-10-11",
            "inspectPeople": "admin",
            "maintenanceName": null
          }
        ],
        "code": 200,
        "msg": "查询成功"
      }
      this.inspectionList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        inspectName: null,
        dangerAddress: null,
        description: null,
        equipemnts: null,
        isMaintain: null,
        pic: null,
        date: null,
        inspectPeople: null
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
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
