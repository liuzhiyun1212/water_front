<template>
  <div class="all">
    <el-main class="main" style="margin-left: 20px;">
      <el-button type="primary" @click="toTheSystem(0)">首页</el-button>
      <el-button type="primary" @click="toTheSystem(11)">设备信息管理</el-button>
      <el-button type="primary" @click="toTheSystem(12)">故障统计</el-button>
      <el-button type="primary" @click="toTheSystem(13)">设备树</el-button>
      <el-button type="primary" @click="toTheSystem(14)">故障预测</el-button>
      <el-button type="primary" @click="toTheSystem(15)">设备报废管理</el-button>
    </el-main>
    <el-card
      v-if="switchValue"
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block">设备编号：</p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dCode"
        style="width: 200px"
      >
      </el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        设备名称：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dName"
        style="width: 200px"
      ></el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        安装位置：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dLoc"
        style="width: 200px"
      ></el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        使用状态：
      </p>
      <el-select
        v-model="duseStatus"
        clearable
        placeholder="请选择"
        style="width: 200px"
      >
        <el-option
          v-for="item in duseStatuses"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <br/>
      <p style="font-family: Arial; display: inline-block">设备种类：</p>
      <el-select
        v-model="dDevAttrName"
        placeholder="请选择设备种类"
        clearable
      >
        <el-option label="水泵、电机" value="水泵、电机"></el-option>
        <el-option label="进水方向" value="进水方向"></el-option>
        <el-option label="出水方向" value="出水方向"></el-option>
      </el-select>
      <p style="font-family: Arial; display: inline-block;margin-left: 10px;">有效期至：</p>
      <el-date-picker
        v-model="dPurchesData"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        type="primary"
        style="margin-top: 10px; float: right; margin-left: 10px"
        icon="el-icon-search"
        @click="toTheSystem(11)"
      >搜索
      </el-button
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
          设备表详细信息
        </p>
        <el-button
          type="success"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-refresh"
          @click="toTheSystem(11)"
        >设备树
        </el-button>
        <el-button
          type="primary"
          style="float: right; margin-right: 10px; margin-top: 8px"
          icon="el-icon-plus"
          @click="toTheSystem(11)"
        >新增设备
        </el-button>
      </div>
      <el-table
        class="abc"
        :data="
          tableData2.slice(
            (currentPage4 - 1) * pageSize,
            currentPage4 * pageSize
          )
        "
        :header-cell-style="{
          background: '#84BBFE',
          color: '#fff',
          fontSize: '16px',
          textAlign: 'center',
          fontWeight: '600',
          fontFamily: '黑体',
          padding: '0',
        }"
        :header-row-style="{
          height: '20',
        }"
        :cell-style="{
          padding: '5px',
          border: '0',
        }"
        :height="buttomHeight"
        stripe
        style="width: 100%; margin-top: 10px"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="devName"
          label="设备名称"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-link @click="toTheSystem(11)" type="primary">{{
                scope.row.devName
              }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="devCode"
          label="设备编码"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="安装位置"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="devAttrName"
          label="设备种类"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="ageLimit"
          label="有效期至"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="维保记录"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-link
              @click="toTheSystem(11)"
              type="primary"
            >维保记录{{ scope.row.repairNum }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column width="350" prop="us" label="所处状态" align="center">
          <template slot-scope="scope"
          ><img
            style="width: 300px; height: 30px"
            :src="require('../../assets/' + scope.row.us + '.png')"
          /></template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="toTheSystem(11)"
            ></el-button>
            <el-tooltip class="item" effect="dark" content="报废申请" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-s-release"
                @click="toTheSystem(11)"
              ></el-button>
            </el-tooltip>
          </template>
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
  name: "lifecycle",
  data() {
    return {
      ustatus: '',
      // mstatus: true,
      switchValue: true,
      editValue: '',
      dialogVisible: false,
      dialogVisible1: false,
      mainHeight: 800,
      buttomHeight: '400px',
      currentPage4: 1,
      pageSize: 50,
      tableData1: [],
      findData: [],
      tableData2: [],
      totalpage: 1,
      //搜索
      dCode: '',
      dName: '',
      dNames: [],
      value: '',
      dLoc: '',
      dLocs: [],
      dmanu: '',
      dmanus: [],
      dmodel: '',
      dmarkStatus: '',
      duseStatus: '',
      duseStatuses: [
        { value: '选项1', label: '未运行' },
        { value: '选项2', label: '运行中' },
        { value: '选项3', label: '维保中' },
        { value: '选项4', label: '已报废' }
      ],
      dPurchesData: '',
      dDevAttrName: ''
    }
  },
  created() {
    this.init()
    this.getDevList()
  },
  methods: {
    init() {
      this.mainHeight = document.body.clientHeight
      this.buttomHeight = document.body.clientHeight * 0.4
    },
    //获取数据库设备表信息
    getDevList() {
      let res = [
        {
          "id": 24,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-BP-21-08",
          "devName": "变频器",
          "file": "[{\"name\":\"11.ACS580MV硬件手册_revE_20221027212007A012.pdf\",\"trueName\":\"11.ACS580MV硬件手册_revE.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期高压室",
          "manufacturer": "ABB",
          "markStatus": 1,
          "model": "ACS-580",
          "useOrg": null,
          "useStatus": -3,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2041-08-01",
          "equipmentPicture": "",
          "equipmentIntroduction": "验收意见",
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "已报废",
          "us": "4",
          "mstatus": true
        },
        {
          "id": 23,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-XY-21-08-300",
          "devName": "泄压/持压阀（500X）（dn300）",
          "file": "[{\"name\":\"8.泄压阀500X-500M安装操作维护说明书 (1)_20221027211528A009.doc\",\"trueName\":\"8.泄压阀500X-500M安装操作维护说明书 (1).doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "上海冠龙阀门节能设备股份有限公司",
          "markStatus": 1,
          "model": "SK500X-16Q",
          "useOrg": null,
          "useStatus": 0,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2041-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "运行中",
          "us": "2",
          "mstatus": true
        },
        {
          "id": 22,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-ZF-21-08-300",
          "devName": "暗杆弹性座封闸阀（dn300）",
          "file": "[{\"name\":\"7.25闸阀安装操作维护说明书-2019暗杆型弹性座封闸阀_20221027211334A005.doc\",\"trueName\":\"7.25闸阀安装操作维护说明书-2019暗杆型弹性座封闸阀.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "上海冠龙阀门节能设备股份有限公司",
          "markStatus": 1,
          "model": "RVHX",
          "useOrg": null,
          "useStatus": -3,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2041-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "已报废",
          "us": "4",
          "mstatus": true
        },
        {
          "id": 21,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-KZ-21-08-800",
          "devName": "多功能水泵控制阀（dn800）",
          "file": "[{\"name\":\"6.JD745X多功能水泵控制阀使用说明书_20221027211401A006.doc\",\"trueName\":\"6.JD745X多功能水泵控制阀使用说明书.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "上海冠龙阀门节能设备股份有限公司",
          "markStatus": 1,
          "model": "JD745X",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": "",
          "ageLimit": "2041-08-01",
          "equipmentPicture": "",
          "equipmentIntroduction": "验收意见",
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 20,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-DJ-21-08",
          "devName": "三相异步电动机",
          "file": "[{\"name\":\"5.NMI系列产品目录-202205_20221027211642A010.pdf\",\"trueName\":\"5.NMI系列产品目录-202205.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "ABB",
          "markStatus": 1,
          "model": "NMI 450L4A BAFS",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2041-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "3",
          "repairNum": "(3)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 19,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-SB-21-08",
          "devName": "单级双吸中开式离心泵",
          "file": "[{\"name\":\"4.NSC单级双吸中开式离心泵_20221027211500A008.pdf\",\"trueName\":\"4.NSC单级双吸中开式离心泵.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "南方泵业股份有限公司",
          "markStatus": 1,
          "model": "NSC500-400-660",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2031-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "1",
          "repairNum": "(1)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 18,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-9-21",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-SS-21-08-800",
          "devName": "伸缩接头（dn800）",
          "file": "",
          "location": "二期泵房",
          "manufacturer": "上海冠龙阀门节能设备股份有限公司",
          "markStatus": 1,
          "model": "E1BJ-B2F0800-16Q",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": null,
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2041-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "1",
          "repairNum": "(1)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 17,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-ZX-21-08",
          "devName": "电动执行器",
          "file": "[{\"name\":\"2.Centork电动头_说明书中文_20221027211736A011.pdf\",\"trueName\":\"2.Centork电动头_说明书中文.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "罗托克",
          "markStatus": 1,
          "model": "CK Centronik",
          "useOrg": null,
          "useStatus": 0,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2031-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "运行中",
          "us": "2",
          "mstatus": true
        },
        {
          "id": 16,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 3,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "E-DF-21-08-800",
          "devName": "软密封法兰蝶阀（dn800）",
          "file": "[{\"name\":\"1.软密封法兰蝶阀安装操作维护说明书_20221027211441A007.doc\",\"trueName\":\"1.软密封法兰蝶阀安装操作维护说明书.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "二期泵房",
          "manufacturer": "上海冠龙阀门节能设备股份有限公司",
          "markStatus": 1,
          "model": "FBEX",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2021-04-01",
          "installData": "2021-04-01",
          "startData": "2021-08-08",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2036-08-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 15,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-BP-15-04",
          "devName": "变频器",
          "file": "[{\"name\":\"11.ACS800制动控制程序固件手册_20221027212109A013.pdf\",\"trueName\":\"11.ACS800制动控制程序固件手册.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "ABB",
          "markStatus": 1,
          "model": "ACS800",
          "useOrg": null,
          "useStatus": -1,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-11-10",
          "installData": "2014-11-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "未运行",
          "us": "1",
          "mstatus": true
        },
        {
          "id": 14,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-KZ-15-04-100",
          "devName": "多功能水泵控制阀（dn100）",
          "file": "[{\"name\":\"5.多功能水泵控制阀_20221027182126A002.doc\",\"trueName\":\"5.多功能水泵控制阀.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "JD745X-10",
          "useOrg": null,
          "useStatus": -3,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-09",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "已报废",
          "us": "4",
          "mstatus": true
        },
        {
          "id": 13,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-09-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-XF-15-04",
          "devName": "消防泵",
          "file": "",
          "location": "一期泵房",
          "manufacturer": "开利泵业集团",
          "markStatus": 1,
          "model": "XBD-KL",
          "useOrg": null,
          "useStatus": -3,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-08",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2025-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "已报废",
          "us": "4",
          "mstatus": true
        },
        {
          "id": 12,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "OY-SJ-15-04-250",
          "devName": "水击泄放阀（dn250）",
          "file": "[{\"name\":\"6.水击泄放阀_20221027212245A014.doc\",\"trueName\":\"6.水击泄放阀.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "Ax742X",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "出水方向",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-07",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "1",
          "repairNum": "(1)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 11,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-DF-15-04-250",
          "devName": "双法兰式蝶阀（dn250）",
          "file": "[{\"name\":\"7.蝶阀_20221027182513A003.doc\",\"trueName\":\"7.蝶阀.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "D341X-100",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-06",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2025-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "1",
          "repairNum": "(1)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 10,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-ZX-15-04-700",
          "devName": "电动执行机构（dn700）",
          "file": "[{\"name\":\"1.SE系列智能型多回转电动执行机构操作手册_20221027212325A015.pdf\",\"trueName\":\"1.SE系列智能型多回转电动执行机构操作手册.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "深圳南方通用电气有限公司",
          "markStatus": 1,
          "model": "SE60",
          "useOrg": null,
          "useStatus": 0,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-05",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2025-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "运行中",
          "us": "2",
          "mstatus": true
        },
        {
          "id": 9,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "IY-QF-15-04-700",
          "devName": "偏心半球阀（dn700）",
          "file": "[{\"name\":\"2.偏心半球阀使用说明书_20221027212345A016.docx\",\"trueName\":\"2.偏心半球阀使用说明书.docx\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "BQ947H-1.0MP",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "进水方向",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-04",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": "",
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 8,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-XB-15-04-700",
          "devName": "膜片式斜板多功能阀（dn700）",
          "file": "[{\"name\":\"10.多功能斜板阀_20221027212737A020.doc\",\"trueName\":\"10.多功能斜板阀.doc\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "DM745X-10",
          "useOrg": null,
          "useStatus": 0,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-03",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "运行中",
          "us": "2",
          "mstatus": true
        },
        {
          "id": 7,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-DJ-15-04",
          "devName": "YSP400-4三相异步电动机",
          "file": "[{\"name\":\"5.NMI系列产品目录-202205_20221027212634A019.pdf\",\"trueName\":\"5.NMI系列产品目录-202205.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "长沙电机厂有限责任公司",
          "markStatus": 1,
          "model": "YSP400-4",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-02",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2035-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "1",
          "repairNum": "(1)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 6,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-SB-15-04",
          "devName": "KOSW-450K离心泵",
          "file": "[{\"name\":\"KOSW、KOSWL系列单级中开蜗壳式双吸离心泵_00_00(1)_20221027210857A002.pdf\",\"trueName\":\"KOSW、KOSWL系列单级中开蜗壳式双吸离心泵_00_00(1).pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "开利泵业集团",
          "markStatus": 1,
          "model": "KOSW350-430K",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-01",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "2",
          "repairNum": "(2)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        },
        {
          "id": 5,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "Y-ZX-15-04-800",
          "devName": "电动执行机构（dn800）",
          "file": "[{\"name\":\"1.SE系列智能型多回转电动执行机构操作手册_20221027211040A003.pdf\",\"trueName\":\"1.SE系列智能型多回转电动执行机构操作手册.pdf\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "深圳南方通用电气有限公司",
          "markStatus": 1,
          "model": "SE60",
          "useOrg": null,
          "useStatus": 0,
          "devAttrName": "水泵、电机",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-01",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2025-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "运行中",
          "us": "2",
          "mstatus": true
        },
        {
          "id": 4,
          "code": "",
          "addTime": "2022-9-21",
          "editTime": "2022-10-27",
          "orgId": 2,
          "tenantId": null,
          "userId": null,
          "devAttrTypeId": null,
          "devCode": "IY-QF-15-04-800",
          "devName": "偏心半球阀（dn800）",
          "file": "[{\"name\":\"2.偏心半球阀使用说明书_20221027174545A001.docx\",\"trueName\":\"2.偏心半球阀使用说明书.docx\",\"nowDate\":\"2022/10/27\"}]",
          "location": "一期泵房",
          "manufacturer": "株洲南方阀门股份有限公司",
          "markStatus": 1,
          "model": "BQ947H-1.0MP",
          "useOrg": null,
          "useStatus": -2,
          "devAttrName": "进水方向",
          "devAttrCode": "1",
          "lastRepaireTime": "",
          "purchaseData": "2014-09-01",
          "installData": "2015-04-15",
          "startData": "2015-04-15",
          "useTime": null,
          "runningTime": null,
          "ageLimit": "2030-04-01",
          "equipmentPicture": null,
          "equipmentIntroduction": null,
          "num": "0",
          "repairNum": "(0)",
          "ustatus": "维保中",
          "us": "3",
          "mstatus": true
        }
      ]
      this.tableData1 = res
      this.totalpage = res.length
      this.tableData2 = this.tableData1
      for (var i = 0; i < this.totalpage; i++) {
        this.tableData2[i].repairNum = '(' + res[i].num + ')'
        if (res[i].useStatus == -1) {
          this.tableData2[i].ustatus = '未运行'
          this.tableData2[i].us = '1'
        } else if (res[i].useStatus == 0) {
          this.tableData2[i].ustatus = '运行中'
          this.tableData2[i].us = '2'
        } else if (res[i].useStatus == -2) {
          this.tableData2[i].ustatus = '维保中'
          this.tableData2[i].us = '3'
        } else if (res[i].useStatus == -3) {
          this.tableData2[i].ustatus = '已报废'
          this.tableData2[i].us = '4'
        }
        if (res[i].markStatus === 1) {
          this.tableData2[i].mstatus = true
        } else {
          this.tableData2[i].mstatus = false
        }
      }
      this.tableData2 = this.tableData2.reverse();
      //devName下拉框赋值
      var labels = []
      for (var i = 0; i < this.totalpage; i++) {
        if (labels.indexOf(this.tableData1[i].devName) == -1) {
          labels.push(this.tableData1[i].devName)
        }
      }
      console.log(labels)
      for (var i = 0; i < labels.length; i++) {
        var array = {}
        var j = i + 1
        array.value = '选项' + j
        array.label = labels[i]
        this.dNames.push(array)
      }
      //dLoc下拉框赋值
      labels = []
      for (var i = 0; i < this.totalpage; i++) {
        if (labels.indexOf(this.tableData1[i].location) == -1) {
          labels.push(this.tableData1[i].location)
        }
      }
      console.log(labels)
      for (var i = 0; i < labels.length; i++) {
        if (labels[i] != '') {
          var array = {}
          var j = i + 1
          array.value = '选项' + j
          array.label = labels[i]
          this.dLocs.push(array)
        }
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
