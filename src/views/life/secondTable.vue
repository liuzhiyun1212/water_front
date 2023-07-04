<template>
    <div style="background: #0A1863;width: 100%;">
      <el-row>
        <el-col :span="8">
          <p style="color:white;display: inline-block;margin-left: 20px">设备名称</p>
        </el-col>
        <el-col :span="8">
          <p style="color:white;display: inline-block;margin-left: 20px">设备编码</p>
        </el-col>
        <el-col :span="8">
          <p style="color:white;display: inline-block;margin-left: 20px">设备种类</p>
        </el-col>
      </el-row>
      <vue-seamless-scroll :data="tableData2" class="seamless-warp" :class-option="classOption" ref="seamlessScroll">
        <el-table
          class="abc"
          ref="myTable"
          :data="tableData2"
          :show-header="false"
          :header-cell-style="{
            background: '#0A1863',
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
            color: '#fff',
            background: '#0A1863',
          }"
          stripe
          style="width: 100%;background: #0A1863;"
        >
          <el-row>
            <el-col :span="8">
              <el-table-column
                prop="devName"
                label="设备名称"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-col>
            <el-col :span="8">
              <el-table-column
                prop="devCode"
                label="设备编码"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-col>
            <el-col :span="8">
              <el-table-column
                prop="devAttrName"
                label="设备种类"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-col>
          </el-row>
        </el-table>
      </vue-seamless-scroll>
  
    </div>
  </template>
  <style lang="scss" scoped>
  .seamless-warp {
    height: 300px;
    overflow: hidden;
  }
  .abc ::v-deep .el-table__body tr:hover > td {
    background-color: #3A71A8 !important;
    font-weight: bold;
  }
  .abc thead {
    color: #fff;
  }
  .abc.el-table__header-wrapper th,
  .abc .el-table__fixed-header-wrapper th {
    height: 20px;
  }
  .el-button--primary,
  .el-button--primary:focus,
  .el-button--primary.is-active,
  .el-button--primary:active {
    //background: #84bbfe;
    //border-color: #84bbfe;
  }
  .abc.el-table::before {
    //去掉最下面的那一条线
    height: 0px;
  }
  </style>
  <script>
  import { listDevtable, delDevtable } from "@/api/system/devtable";
  export default {
    methods: {
      toTable(){
        this.$router.push({
          path:"/life/life/equipmentTable",
        })
      },
      init() {
        this.mainHeight = document.body.clientHeight;
        this.buttomHeight = document.body.clientHeight * 0.4;
      },
      //获取数据库设备表信息
      getDevList() {
          // this.tableData1 = res.rows;
          this.totalpage = this.tableData2.length;
          for (var i = 0; i < this.totalpage; i++) {
            if (this.tableData2[i].useStatus == -1) {
              this.tableData2[i].ustatus = "未运行";
              this.tableData2[i].us = "11";
            } else if(this.tableData2[i].useStatus == 0){
              this.tableData2[i].ustatus = "运行中";
              this.tableData2[i].us = "12";
            }else if(this.tableData2[i].useStatus == -2){
              this.tableData2[i].ustatus = "维保中";
              this.tableData2[i].us = "13";
            }else if(this.tableData2[i].useStatus == -3){
              this.tableData2[i].ustatus = "已报废";
              this.tableData2[i].us = "14";
            }
          }
        //   this.tableData2 = this.tableData2.reverse();

      },
    },
    data() {
      return {
        classOption: {
          step: 0.45
          // step: 3
        },
        ustatus: "",
        // mstatus: true,
        switchValue: true,
        editValue: "",
        dialogVisible: false,
        dialogVisible1:false,
        mainHeight: 800,
        buttomHeight: "400px",
        currentPage4: 1,
        pageSize: 50,
        tableData1: [],
        findData: [],
        tableData2: [
    {
        
        "updateBy": "admin",
        "id": 4,
        "addTime": "2022-9-21",
        "editTime": "2022-10-27",
        "orgId": 2,
        "devCode": "IY-QF-15-04-800",
        "devName": "偏心半球阀（dn800）",
        "file": "[{\"name\":\"2.偏心半球阀使用说明书_20221027174545A001.docx\",\"trueName\":\"2.偏心半球阀使用说明书.docx\",\"nowDate\":\"2022/10/27\"}]",
        "location": "一期泵房",
        "manufacturer": "株洲南方阀门股份有限公司",
        "markStatus": 1,
        "model": "BQ947H-1.0MP",
        "useStatus": -2,
        "devAttrName": "进水方向",
        "devAttrCode": "1",
        "lastRepaireTime": "",
        "purchaseData": "2014-09-01",
        "installData": "2015-04-15",
        "startData": "2015-04-15",
        "ageLimit": "2030-04-01",
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "updateBy": "admin",
        "params": {},
        "id": 5,
        "code": "",
        "addTime": "2022-9-21",
        "editTime": "2022-10-27",
        "orgId": 2,
        "devCode": "Y-ZX-15-04-800",
        "devName": "电动执行机构（dn800）",
        "file": "[{\"name\":\"1.SE系列智能型多回转电动执行机构操作手册_20221027211040A003.pdf\",\"trueName\":\"1.SE系列智能型多回转电动执行机构操作手册.pdf\",\"nowDate\":\"2022/10/27\"}]",
        "location": "一期泵房",
        "manufacturer": "深圳南方通用电气有限公司",
        "markStatus": 1,
        "model": "SE60",
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
        "ustatus": "运行中",
        "us": "12"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "运行中",
        "us": "12"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "运行中",
        "us": "12"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "已报废",
        "us": "14"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "已报废",
        "us": "14"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "未运行",
        "us": "11"
    },
    {
        "searchValue": null,
        "createBy": null,
        "createTime": null,
        "updateBy": "admin",
        "updateTime": null,
        "remark": null,
        "params": {},
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
        "ustatus": "维保中",
        "us": "13"
    },
   
],
        totalpage: 1,
      };
    },
    created() {
      this.init();
      this.getDevList();
    },
    mounted() {
      setTimeout(() => {
        // listData length无变化，仅仅是属性变更，手动调用下组件内部的reset方法
        this.$refs.seamlessScroll.reset()
      }, 2000);
    },
  };
  </script>
  