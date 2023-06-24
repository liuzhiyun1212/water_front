<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(7)">综合查询</el-button>
      <el-button type="primary" @click="toTheSystem(8)">综合统计</el-button>
      <el-button type="primary" @click="toTheSystem(9)">状态调整</el-button>
      <el-button type="primary" @click="toTheSystem(10)">进度可视化</el-button>
    </el-main>
      <el-card
        style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
      >
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">维保计划名称：</p>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="planName"
          style="width: 200px"
        >
        </el-input>
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">负责人：</p>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="planPerson"
          style="width: 200px"
        >
        </el-input>
        <p style="font-family: Arial; display: inline-block;margin-left: 20px">计划制定时间：</p>
        <el-date-picker
          v-model="planTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          type="primary"
          style="margin-top: 10px;margin-left: 20px"
          icon="el-icon-search"
          @click="toTheSystem(7)"
        >搜索</el-button
        >
      </el-card>
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
            维保记录
          </p>
        </div>
        <div style="width: 100%; margin-top: 10px;height:70px;display: flex;border-radius: 5px; background-color: aliceblue;">
          <i class="iconfont icon-circle" style="align-self: center; color: #5B8FF9;float: left; cursor: pointer; font-size: 20px;margin-left: 20px;">&nbsp;&nbsp;{{this.stateName[0]}}</i>
          <div class="未提交"
               style="align-self: center;width:30px; height:30px;float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color:  #be002f;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[1]}}</i>
          <div class="待审核"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #FF6347;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[2]}}</i>
          <div class="审核中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: blue;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[3]}}</i>
          <div class="已审核"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #228b22;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[4]}}</i>
          <div class="维保中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #da70d6;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[5]}}</i>
          <div class="已维保"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #40e0d0;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[6]}}</i>
          <div class="待验收"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: darkkhaki;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[7]}}</i>
          <div class="验收中"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle"  style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[8]}}</i>
          <div class="已验收"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
          <i class="iconfont icon-circle" style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;全部</i>
          <div class="全部"
               style="align-self: center;width:30px; height:30px; float: left;">
          </div>
        </div>
        <el-table :header-cell-style="{
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
          }"
                  v-loading="loading"
                  :data="planList.slice(
            (currentPage4 - 1) * pageSize,
            currentPage4 * pageSize
          )"
                  :height="buttomHeight"
                  :row-class-name="tableRowClassName"
                  style="margin-top: 20px;width:100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column
            prop="name"
            label="维保计划名称"
            :show-overflow-tooltip="true" align="center"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="toTheSystem(7)">{{
                  scope.row.name
                }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="计划制定时间" align="center" prop="makingTime" width="120">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="维保方式" align="center" prop="maintenanceWay" />
          <el-table-column label="维保项目" align="center" prop="maintenanceContent" />
          <el-table-column
            prop="state"
            label="执行阶段"
            :show-overflow-tooltip="true" align="center"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
          style="margin-left: 650px; margin-top: 10px"
        >
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  name: "equipmanager",
  data() {
    return {
      buttomHeight: '400px',
      planName:"",
      planPerson:"",
      planTime:"",
      planData: [],
      findData: [],
      currentPage4: 1,
      pageSize: 10,
      totalpage: 1,
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
      // plan表格数据
      planList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        state: null,
        makingTime: null,
        maintenanceWay: null,
        maintenanceContent: null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 新修改统计状态总数
      stateList: [],
      // 执行阶段名称
      stateName: ["未提交", "待审核", "审核中", "已审核", "维保中", "已维保", "待验收", "验收中", "已验收"],
      moreId: null,
      length1: null,
    };
  },
  created() {
    this.init();
    this.getList();
  },
  methods: {
    init() {
      this.mainHeight = document.body.clientHeight
      this.buttomHeight = document.body.clientHeight * 0.4
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if(row.firstAuditTime != null && row.firstAuditTime != "" && row.state == '未提交'){
        return 'warning-row'
      }
      if(row.firstAcceptTime != null && row.firstAcceptTime != "" && row.state == '维保中'){
        return 'success-row'
      }
      return ''
    },
    findDataMethod() {
      this.planList = this.planData;
      this.findData = [];
      if (
        this.planName == "" &&
        this.planPerson == "" &&
        (this.planTime == "" || this.planTime == null)
      ) {
        this.planList = this.planData;
        this.totalpage = this.planList.length;
        alert("请输入搜索内容！");
      }
      var x;
      var i = 0;
      if (this.planName != "") {
        for (x = 0; x < this.planData.length; x++) {
          if (
            this.planList[x].name !== null &&
            this.planList[x].name.match(this.planName) != null
          ) {
            this.findData[i] = this.planData[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
      if (this.planPerson != "") {
        for (x = 0; x < this.planData.length; x++) {
          if (
            this.planList[x].chargePeople !== null &&
            (JSON.parse(this.planList[x].chargePeople).name).match(this.planPerson) != null
          ) {
            this.findData[i] = this.planData[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
      if (this.planTime != "") {
        var mindata = "";
        var maxdata = "";
        mindata = this.formatDate(this.planTime[0]);
        maxdata = this.formatDate(this.planTime[1]);
        console.log(mindata, maxdata);
        console.log(this.planList.length);
        for (x = 0; x < this.planList.length; x++) {
          if (
            this.planList[x].makingTime != null &&
            this.compareDate(this.planList[x].makingTime, mindata) &&
            this.compareDate(maxdata, this.planList[x].makingTime)
          ) {
            this.findData[i] = this.planList[x];
            i++;
          }
        }
        this.planList = this.findData;
        this.totalpage = this.planList.length;
        this.findData = [];
        i = 0;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
    },
    /** 查询plan列表 */
    getList() {
      this.loading = true;
      this.planData = [
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "",
          "params": {},
          "id": 224,
          "name": "测试12-2",
          "makingTime": "2022-12-02",
          "state": "未提交",
          "chargePeople": "{\"id\":\"1\",\"name\":\"admin\",\"department\":\"管理部\",\"departmentId\":\"103\"}",
          "auditProcess": "",
          "maintenanceWay": "",
          "level": "一级",
          "equipmentData": "[]",
          "maintenanceContent": "",
          "maintenanceCase": "",
          "parts": "[]",
          "previousPic": "[]",
          "subsequentPic": "[]",
          "budget": 0,
          "company": "河润科技",
          "applyAccessory": "[]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "",
          "planType": "",
          "checkPeople": "",
          "auditMessage": null,
          "acceptMessage": null,
          "acceptPeople": "",
          "fixdate": "2022-12-28至2022-12-30",
          "firstAuditTime": null,
          "lastAuditTime": null,
          "firstAcceptTime": null,
          "lastAcceptTime": null,
          "checkProcess": "",
          "workCard": null,
          "acceptRemark": ""
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "严格审核",
          "params": {},
          "id": 223,
          "name": "电机维保10.24下午",
          "makingTime": "2022-10-24",
          "state": "已审核",
          "chargePeople": "{\"id\":\"119\",\"name\":\"刘志赟\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛",
          "maintenanceWay": "第三方维保",
          "level": "三级",
          "equipmentData": "[{\"code\": \"E-SS-21-08-800\", \"name\": \"伸缩接头（dn800）\", \"state\": \"磨损性故障\"}]",
          "maintenanceContent": "对电机进行日常维保",
          "maintenanceCase": "日常性维保",
          "parts": "[{\"id\": 35, \"num\": 1, \"code\": \"ZZ010\", \"name\": \"转子\", \"amount\": 60000, \"maxNum\": 27, \"location\": \"\", \"associatedDevices\": \"二期泵房/单级双吸中开式离心泵 E-SB-21-08\"}]",
          "previousPic": "[{\"name\":\"电机01_20221024143102A011.jpg\",\"nowDate\":\"2022/10/24\"}]",
          "subsequentPic": "[]",
          "budget": 60800,
          "company": "凯士比",
          "applyAccessory": "[{\"name\":\"JL-13-02设备维修保养记录表_20221024143113A012.docx\",\"trueName\":\"JL-13-02设备维修保养记录表.docx\",\"nowDate\":\"2022/10/24\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "司成玉",
          "planType": "常规计划",
          "checkPeople": "审核完毕",
          "auditMessage": "审核通过|验收通过|验收通过|",
          "acceptMessage": null,
          "acceptPeople": "",
          "fixdate": "2022-10-26至2022-11-03",
          "firstAuditTime": "2022-10-24",
          "lastAuditTime": "2022-10-24",
          "firstAcceptTime": null,
          "lastAcceptTime": null,
          "checkProcess": "①张宗恒②司成玉③马梦媛",
          "workCard": 113,
          "acceptRemark": "严格审核"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "严格审核",
          "params": {},
          "id": 222,
          "name": "水泵维保10.24上午",
          "makingTime": "2022-10-24",
          "state": "已验收",
          "chargePeople": "{\"id\":\"120\",\"name\":\"司成玉\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛",
          "maintenanceWay": "第三方维保",
          "level": "三级",
          "equipmentData": "[{\"code\": \"Y-DF-15-04-250\", \"name\": \"双法兰式蝶阀（dn250）\", \"state\": \"磨损性故障\"}, {\"code\": \"OY-SJ-15-04-250\", \"name\": \"水击泄放阀（dn250）\", \"state\": \"腐蚀性故障\"}]",
          "maintenanceContent": "对水泵进行日常检修",
          "maintenanceCase": "日常进行维保",
          "parts": "[{\"id\": 26, \"num\": 1, \"code\": \"YL001\", \"name\": \"水泵叶轮\", \"amount\": 3000, \"maxNum\": 13, \"location\": \"\", \"associatedDevices\": \"一期泵房/YSP400-4三相异步电动机 Y-DJ-15-04\"}, {\"id\": 27, \"num\": 2, \"code\": \"JX002\", \"name\": \"水泵机械密封\", \"amount\": 2000, \"maxNum\": 24, \"location\": \"\", \"associatedDevices\": \"一期泵房/KOSW-450K离心泵 Y-SB-15-04\"}]",
          "previousPic": "[{\"name\":\"水泵006_20221024110210A002.jpg\",\"nowDate\":\"2022/10/24\"}]",
          "subsequentPic": "[{\"name\":\"水泵005_20221024135656A007.jpg\",\"nowDate\":\"2022/10/24\"},{\"name\":\"水泵_20221024142458A009.jpg\",\"nowDate\":\"2022/10/24\"}]",
          "budget": 5800,
          "company": "格兰富",
          "applyAccessory": "[{\"name\":\"JL-13-02设备维修保养记录表_20221024110221A003.docx\",\"trueName\":\"JL-13-02设备维修保养记录表.docx\",\"nowDate\":\"2022/10/24\"},{\"name\":\"设备维修保养记录表 _20221024135711A008.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/24\"},{\"name\":\"JL-13-03设备维修记录表_20221024142509A010.docx\",\"trueName\":\"JL-13-03设备维修记录表.docx\",\"nowDate\":\"2022/10/24\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "司成玉",
          "planType": "常规计划",
          "checkPeople": "审核完毕",
          "auditMessage": "审核通过|审核通过|审核通过|",
          "acceptMessage": "验收通过|验收通过|验收通过|",
          "acceptPeople": "验收完毕",
          "fixdate": "2022-10-05至2022-11-25",
          "firstAuditTime": "2022-10-24",
          "lastAuditTime": "2022-10-24",
          "firstAcceptTime": "2022-10-24",
          "lastAcceptTime": "2022-10-24",
          "checkProcess": "①张宗恒②司成玉③马梦媛",
          "workCard": 112,
          "acceptRemark": "严格审核"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "审核备注",
          "params": {},
          "id": 221,
          "name": "维保1013晚上",
          "makingTime": "2022-12-13",
          "state": "维保中",
          "chargePeople": "{\"id\":\"124\",\"name\":\"王心茹\",\"department\":\"巡检部\",\"departmentId\":\"202\"}",
          "auditProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "maintenanceWay": "第三方维保",
          "level": "一级",
          "equipmentData": "[{\"code\": \"Y-SB-15-04\", \"name\": \"KOSW-450K离心泵\", \"state\": \"磨损性故障\"}, {\"code\": \"Y-DJ-15-04\", \"name\": \"YSP400-4三相异步电动机\", \"state\": \"腐蚀性故障\"}]",
          "maintenanceContent": "检修项目",
          "maintenanceCase": "",
          "parts": "[{\"id\": 30, \"num\": 2, \"code\": \"CT005\", \"name\": \"泵轴承体\", \"amount\": 1000, \"maxNum\": 39, \"location\": \"\", \"associatedDevices\": \"一期泵房/消防泵 Y-XF-15-04\"}]",
          "previousPic": "[{\"name\":\"u=2785442067,2244671174&fm=253&fmt=auto&app=120&f=JPEG_20221013173730A038.jpg\",\"nowDate\":\"2022/10/13\"},{\"name\":\"u=2785442067,2244671174&fm=253&fmt=auto&app=120&f=JPEG_20221013193712A002.jpg\",\"nowDate\":\"2022/10/13\"}]",
          "subsequentPic": "[]",
          "budget": 3500,
          "company": "凯泉",
          "applyAccessory": "[{\"name\":\"测试_20221013193002A001.docx\",\"trueName\":\"测试.docx\",\"nowDate\":\"2022/10/13\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "张宗恒",
          "planType": "临时计划",
          "checkPeople": "审核完毕",
          "auditMessage": "马梦媛审核|张宗恒|刘志赟|司成玉|",
          "acceptMessage": "很好！|不行！|",
          "acceptPeople": "张宗恒",
          "fixdate": "2022-10-13至2022-10-20",
          "firstAuditTime": "2022-10-13",
          "lastAuditTime": "2022-10-13",
          "firstAcceptTime": "2022-10-13",
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 111,
          "acceptRemark": "验收备注"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "按照流程来",
          "params": {},
          "id": 213,
          "name": "电机损坏维保计划10.12-5",
          "makingTime": "2022-11-09",
          "state": "已验收",
          "chargePeople": "{\"id\":\"119\",\"name\":\"刘志赟\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛④刘志赟",
          "maintenanceWay": "第三方维保",
          "level": "二级",
          "equipmentData": "[{\"code\": \"E-DJ-21-08\", \"name\": \"三相异步电动机\", \"state\": \"老化性故障\"}]",
          "maintenanceContent": "电机损坏维保",
          "maintenanceCase": "需要维保,无法正常运行",
          "parts": "[{\"id\": 28, \"num\": 1, \"code\": \"ZT003\", \"name\": \"轴套\", \"amount\": 3000, \"maxNum\": 17, \"location\": \"\", \"associatedDevices\": \"一期泵房/多功能水泵控制阀（dn100） Y-KZ-15-04-100\"}]",
          "previousPic": "[{\"name\":\"电机01_20221012150734A021.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[]",
          "budget": 3800,
          "company": "威乐",
          "applyAccessory": "[{\"name\":\"设备维修保养记录表 _20221012150739A022.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "马梦媛",
          "planType": "临时计划",
          "checkPeople": "审核完毕",
          "auditMessage": "通过|可以|通过|可以|",
          "acceptMessage": "无|通过|无|无|",
          "acceptPeople": "验收完毕",
          "fixdate": "2022-10-12至2022-11-22",
          "firstAuditTime": "2022-11-01",
          "lastAuditTime": "2022-11-01",
          "firstAcceptTime": "2022-11-01",
          "lastAcceptTime": "2022-11-01",
          "checkProcess": "①张宗恒②司成玉③马梦媛④刘志赟",
          "workCard": 107,
          "acceptRemark": "请严格按照验收流程"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "认真审核",
          "params": {},
          "id": 212,
          "name": "电机维保10.12-8",
          "makingTime": "2022-10-25",
          "state": "验收中",
          "chargePeople": "{\"id\":\"121\",\"name\":\"马梦媛\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛④刘志赟",
          "maintenanceWay": "第三方维保",
          "level": "一级",
          "equipmentData": "[{\"code\": \"E-DJ-21-08\", \"name\": \"三相异步电动机\", \"state\": \"断裂性故障\"}]",
          "maintenanceContent": "检修电机",
          "maintenanceCase": "维保电机",
          "parts": "[{\"id\": 35, \"num\": 1, \"code\": \"ZZ010\", \"name\": \"转子\", \"amount\": 800, \"maxNum\": 28, \"location\": \"\", \"associatedDevices\": \"二期泵房/单级双吸中开式离心泵 E-SB-21-08\"}]",
          "previousPic": "[{\"name\":\"电机01_20221012144111A016.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[]",
          "budget": 1600,
          "company": "凯泉",
          "applyAccessory": "[{\"name\":\"设备维修保养记录表 _20221012144121A017.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "王心茹",
          "planType": "常规计划",
          "checkPeople": "审核完毕",
          "auditMessage": "需要维保|10.12-8需要维保|电机许哟啊维保|进行下一个流程|",
          "acceptMessage": "无|验收通过|",
          "acceptPeople": "刘志赟",
          "fixdate": "2022-10-07至2022-11-26",
          "firstAuditTime": "2022-10-12",
          "lastAuditTime": "2022-10-12",
          "firstAcceptTime": "2022-10-12",
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 105,
          "acceptRemark": "认真验收"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "",
          "params": {},
          "id": 211,
          "name": "水泵损坏维保计划10.12-4",
          "makingTime": "2022-10-23",
          "state": "审核中",
          "chargePeople": "{\"id\":\"121\",\"name\":\"马梦媛\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛④刘志赟",
          "maintenanceWay": "第三方维保",
          "level": "三级",
          "equipmentData": "[{\"code\": \"E-SB-21-08\", \"name\": \"单级双吸中开式离心泵\", \"state\": \"断裂性故障\"}]",
          "maintenanceContent": "水泵损坏维保",
          "maintenanceCase": "需要维保,无法正常运行",
          "parts": "[{\"id\": 26, \"num\": 1, \"code\": \"YL001\", \"name\": \"水泵叶轮\", \"amount\": 3000, \"maxNum\": 14, \"location\": \"\", \"associatedDevices\": \"一期泵房/YSP400-4三相异步电动机 Y-DJ-15-04\"}, {\"id\": 29, \"num\": 1, \"code\": \"BZ004\", \"name\": \"泵轴\", \"amount\": 6000, \"maxNum\": 5, \"location\": \"\", \"associatedDevices\": \"一期泵房/多功能水泵控制阀（dn100） Y-KZ-15-04-100\"}]",
          "previousPic": "[{\"name\":\"水泵02_20221012142939A014.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[]",
          "budget": 10100,
          "company": "阿里巴巴",
          "applyAccessory": "[{\"name\":\"设备维修保养记录表 _20221012142944A015.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "马梦媛",
          "planType": "常规计划",
          "checkPeople": "马梦媛",
          "auditMessage": "很好！|补充了餐饮费|",
          "acceptMessage": null,
          "acceptPeople": "",
          "fixdate": "2022-10-12至2022-11-30",
          "firstAuditTime": "2022-10-13",
          "lastAuditTime": null,
          "firstAcceptTime": null,
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 104,
          "acceptRemark": ""
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "认真审核",
          "params": {},
          "id": 210,
          "name": "电机故障维保10.12-9",
          "makingTime": "2022-10-11",
          "state": "待审核",
          "chargePeople": "{\"id\":\"126\",\"name\":\"郭卉嘉\",\"department\":\"巡检部\",\"departmentId\":\"202\"}",
          "auditProcess": "①张宗恒②司成玉③马梦媛④刘志赟",
          "maintenanceWay": "第三方维保",
          "level": "一级",
          "equipmentData": "[{\"code\": \"E-DJ-21-08\", \"name\": \"三相异步电动机\", \"state\": \"磨损性故障\"}]",
          "maintenanceContent": "电机故障维保",
          "maintenanceCase": "已发现故障位置,需要维保",
          "parts": "[{\"id\": 32, \"num\": 8, \"code\": \"ZC007\", \"name\": \"轴承\", \"amount\": 800, \"maxNum\": 11, \"location\": \"\", \"associatedDevices\": \"一期泵房/变频器 Y-BP-15-04\"}, {\"id\": 28, \"num\": 8, \"code\": \"ZT003\", \"name\": \"轴套\", \"amount\": 400, \"maxNum\": 17, \"location\": \"\", \"associatedDevices\": \"一期泵房/多功能水泵控制阀（dn100） Y-KZ-15-04-100\"}]",
          "previousPic": "[{\"name\":\"电机02_20221012141436A006.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[{\"name\":\"电机01_20221012141448A008.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "budget": 2800,
          "company": "阿里巴巴",
          "applyAccessory": "[{\"name\":\"设备维修保养记录表 _20221012141528A009.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "郭卉嘉",
          "planType": "临时计划",
          "checkPeople": "张宗恒",
          "auditMessage": "不行！|",
          "acceptMessage": null,
          "acceptPeople": "",
          "fixdate": "2022-10-12至2022-10-21",
          "firstAuditTime": "2022-10-13",
          "lastAuditTime": null,
          "firstAcceptTime": null,
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 110,
          "acceptRemark": "认真验收"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "认真审核",
          "params": {},
          "id": 209,
          "name": "水泵维保10.12-7",
          "makingTime": "2022-10-29",
          "state": "维保中",
          "chargePeople": "{\"id\":\"124\",\"name\":\"王心茹\",\"department\":\"巡检部\",\"departmentId\":\"202\"}",
          "auditProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "maintenanceWay": "第三方维保",
          "level": "一级",
          "equipmentData": "[{\"code\": \"Y-SB-15-04\", \"name\": \"KOSW-450K离心泵\", \"state\": \"磨损性故障\"}]",
          "maintenanceContent": "检修水泵",
          "maintenanceCase": "还没维保",
          "parts": "[{\"id\": 31, \"num\": 1, \"code\": \"ZL006\", \"name\": \"轴联接器\", \"amount\": 800, \"maxNum\": 32, \"location\": \"\", \"associatedDevices\": \"一期泵房/消防泵 Y-XF-15-04\"}]",
          "previousPic": "[{\"name\":\"水泵_20221012141427A005.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[]",
          "budget": 1600,
          "company": "威乐",
          "applyAccessory": "[{\"name\":\"JL-36-01设备设施拆除报废申请表_20221012141439A007.docx\",\"trueName\":\"JL-36-01设备设施拆除报废申请表.docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "王心茹",
          "planType": "临时计划",
          "checkPeople": "审核完毕",
          "auditMessage": "需要维保|确实需要维保|维保吧|验收吧|",
          "acceptMessage": "很好！|很好|不行|",
          "acceptPeople": "刘志赟",
          "fixdate": "2022-10-21至2022-11-15",
          "firstAuditTime": "2022-10-12",
          "lastAuditTime": "2022-10-12",
          "firstAcceptTime": "2022-10-13",
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 103,
          "acceptRemark": "认真验收"
        },
        {
          "searchValue": null,
          "createBy": null,
          "createTime": null,
          "updateBy": null,
          "updateTime": null,
          "remark": "要求认真审核",
          "params": {},
          "id": 208,
          "name": "水泵运行故障维保10.12-1",
          "makingTime": "2022-10-12",
          "state": "审核中",
          "chargePeople": "{\"id\":\"120\",\"name\":\"司成玉\",\"department\":\"审核部\",\"departmentId\":\"105\"}",
          "auditProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "maintenanceWay": "第三方维保",
          "level": "三级",
          "equipmentData": "[{\"code\": \"Y-SB-15-04\", \"name\": \"KOSW-450K离心泵\", \"state\": \"磨损性故障\"}]",
          "maintenanceContent": "对水泵运行时的故障进行检修",
          "maintenanceCase": "已发现存在故障",
          "parts": "[{\"id\": 26, \"num\": 1, \"code\": \"YL001\", \"name\": \"水泵叶轮\", \"amount\": 30000, \"maxNum\": 15, \"location\": \"\", \"associatedDevices\": \"一期泵房/YSP400-4三相异步电动机 Y-DJ-15-04\"}]",
          "previousPic": "[{\"name\":\"水泵_20221012134541A001.jpg\",\"nowDate\":\"2022/10/12\"},{\"name\":\"水泵006_20221012134549A002.jpg\",\"nowDate\":\"2022/10/12\"}]",
          "subsequentPic": "[]",
          "budget": 30800,
          "company": "格兰富",
          "applyAccessory": "[{\"name\":\"设备维修保养记录表 _20221012134621A003.docx\",\"trueName\":\"设备维修保养记录表 .docx\",\"nowDate\":\"2022/10/12\"}]",
          "auditAccessor": "[]",
          "checkAccessor": "[]",
          "executePeople": "司成玉",
          "planType": "临时计划",
          "checkPeople": "司成玉",
          "auditMessage": "很好|很好！|无|",
          "acceptMessage": null,
          "acceptPeople": "",
          "fixdate": "2022-10-13至2022-11-22",
          "firstAuditTime": "2022-10-13",
          "lastAuditTime": null,
          "firstAcceptTime": null,
          "lastAcceptTime": null,
          "checkProcess": "①马梦媛②张宗恒③刘志赟④司成玉",
          "workCard": 102,
          "acceptRemark": "认真执行验收流程"
        }
      ];
      this.planList = this.planData;
      this.totalpage = this.planList.length;
      this.planList = this.planList.reverse();
      this.loading = false;
    },
    toNew() {
      this.$router.push({
        path: "/maintenanceGraph/maintenanceGraph/index",
      });
    },
    // 详情页面
    showMore(row){
      this.$router.push({
        path: "/mainplan/fix/details",
        query: {
          planname: row,
        },
      });
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
    //判断两个日期大小
    compareDate(d1, d2) {
      //判断两个日期的大小
      let reg = new RegExp("-", "g");
      if (new Date(d1.replace(reg, "/")) >= new Date(d2.replace(reg, "/"))) {
        console.log("第一个大");
        return true;
      } else {
        console.log("第二个大");
        return false;
      }
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

<style>
.el-table .warning-row {
  background: #FFCCCC;
}

.el-table .success-row {
  background: #FBD6A4;
}
</style>
