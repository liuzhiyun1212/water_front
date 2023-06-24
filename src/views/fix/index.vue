<template>
  <div>
    <el-dialog
      title="编辑设备"
      :visible.sync="dialogVisible"
      width="80%"
      :show-close="false"
    >
      <equipmentInputEdit :editValue="editValue" @dialogClose="closeDialog" />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeTable()">关 闭</el-button>
      </span>
    </el-dialog>
    <el-card
      v-if="switchValue"
      style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
    >
      <p style="font-family: Arial; display: inline-block">维保计划名称：</p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dCode"
        style="width: 200px"
      >
      </el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        开始时间：
      </p>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        计划内容：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dCode"
        style="width: 200px"
      >
      </el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        负责人：
      </p>
      <el-select
        v-model="responsiblePerson"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择">
        <el-option
          v-for="item in dmanus"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <br />
      <!-- <p style="font-family: Arial; display: inline-block">机器型号：</p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dmodel"
        style="width: 200px"
      >
      </el-input>
      <p style="font-family: Arial; display: inline-block; margin-left: 10px">
        标记状态：
      </p>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="dmarkStatus"
        style="width: 200px"
      >
      </el-input> -->
      <p style="font-family: Arial; display: inline-block">进度：</p>
      <el-select
        v-model="duseStatus"
        @change="searchSelect1(duseStatus)"
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

      <el-button
        type="primary"
        style="margin-top: 10px; float: right"
        icon="el-icon-search"
        @click="findDataMethod()"
      >搜索</el-button>


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
          维保设备信息
        </p>
        <el-button
          type="success"
          style="margin-top: 8px; float: right;margin-right: 10px"
          icon="el-icon-circle-plus-outline"
          @click="findDataMethod()"
        >新增维保计划</el-button>
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
        :default-sort="{ prop: 'num', order: 'descending' }"
      >
        <el-table-column type="index" width="50" fixed> </el-table-column>
        <el-table-column

          prop="devCode"
          label="维保计划名称"
          show-overflow-tooltip
          align="center"
        >
          <!-- sortable -->
          <template slot-scope="scope">
            <el-link
              @click="toDetailInformation(scope.row.devCode)"
              type="primary"
            >{{ scope.row.devCode }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column

          prop="code"
          label="开始时间"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column

          prop="devName"
          label="计划内容"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="location"
          label="负责人"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="进度"
          align="center"
          show-overflow-tooltip
        >
          <el-button type="primary"   size="mini" circle></el-button>
<!--          <el-button type="success"    size="mini" circle></el-button>-->
          <el-button type="info" size="mini" circle></el-button>
          <el-button type="info" size="mini" circle></el-button>
          <el-button type="info" size="mini" circle></el-button>
          <el-button type="info" size="mini" circle></el-button>
<!--          <el-button type="warning" size="mini" circle></el-button>-->
<!--          <el-button type="danger" size="mini" circle></el-button>-->
        </el-table-column>

<!--        <el-table-column prop="ustatus" label="使用状态" align="center"-->
<!--        >{{ ustatus }}-->
<!--        </el-table-column>-->
<!--        -->
<!--        <el-table-column label="使用时长" width="100px"> </el-table-column>-->
<!--        <el-table-column label="运行时长" width="100px"> </el-table-column>-->
<!--        <el-table-column label="使用年限" width="100px"> </el-table-column>-->
        <el-table-column label="操作" width="150" align="center" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-view"
              @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button>
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              icon="el-icon-delete"-->
<!--              @click="handleDelete(scope.$index, scope.row)"-->
<!--            ></el-button>-->
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
import axios from "axios";
import { listDevtable, delDevtable } from "@/api/system/devtable";
import equipmentInputEdit from "../life/equipmentInputEdit.vue";
export default {
  components: {
    equipmentInputEdit,
  },
  methods: {
    testAxios:function(){
      this.$router.push({
        path: "/life/life/equipmentGraph",
      });
    },
    /* testAxios() {
      const url = 'http://117.190.235.205:1535/SCADAService/data/GetYiDuDataYiQi';
      axios.get(url)
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        })
        .catch((err) => {
          alert("请求失败");
        });
    }, */
    init() {
      this.mainHeight = document.body.clientHeight;
      this.buttomHeight = document.body.clientHeight * 0.4;
    },
    //跳转页面
    toDetailInformation: function (devname) {
      this.$router.push({
        path: "/life/life/equipmentTime",
        query: {
          devCode: devname,
        },
      });
    },
    devTable: function () {
      this.$router.push({
        path: "/equtree",
      });
    },
    //获取数据库设备表信息
    getDevList() {
      listDevtable().then((res) => {
        console.log(res.rows);
        this.tableData1 = res.rows;
        this.totalpage = res.rows.length;
        this.tableData2 = this.tableData1;
        for (var i = 0; i < this.totalpage; i++) {
          if (res.rows[i].useStatus == -1) {
            this.tableData2[i].ustatus = "未运行";
          } else {
            this.tableData2[i].ustatus = "正在运行";
          }
          if (res.rows[i].markStatus === 1) {
            this.tableData2[i].mstatus = true;
          } else {
            this.tableData2[i].mstatus = false;
          }
        }
        console.log(this.tableData2);
        //devName下拉框赋值
        var labels = [];
        for (var i = 0; i < this.totalpage; i++) {
          if (labels.indexOf(this.tableData2[i].devName) == -1) {
            labels.push(this.tableData2[i].devName);
          }
        }
        console.log(labels);
        for (var i = 0; i < labels.length; i++) {
          var array = {};
          var j = i + 1;
          array.value = "选项" + j;
          array.label = labels[i];
          this.dNames.push(array);
        }
        //dLoc下拉框赋值
        labels = [];
        for (var i = 0; i < this.totalpage; i++) {
          if (labels.indexOf(this.tableData2[i].location) == -1) {
            labels.push(this.tableData2[i].location);
          }
        }
        console.log(labels);
        for (var i = 0; i < labels.length; i++) {
          var array = {};
          var j = i + 1;
          array.value = "选项" + j;
          array.label = labels[i];
          this.dLocs.push(array);
        }
        //dmanu下拉框赋值
        labels = [];
        for (var i = 0; i < this.totalpage; i++) {
          if (labels.indexOf(this.tableData2[i].manufacturer) == -1) {
            labels.push(this.tableData2[i].manufacturer);
          }
        }
        console.log(labels);
        for (var i = 0; i < labels.length; i++) {
          var array = {};
          var j = i + 1;
          array.value = "选项" + j;
          array.label = labels[i];
          this.dmanus.push(array);
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
      console.log(this.editValue);
      // 组件赋值
      this.editValue = row;
      console.log(this.editValue);
      this.dialogVisible = true;
      // 用于计算卡片高度，在equipmentTime页面init有调用
      localStorage.setItem("dialogHeight", 110);
      console.log("设备修改信息页");
    },
    closeDialog(text) {
      this.dialogVisible = text;
      this.editValue = null;
    },
    closeTable() {
      this.dialogVisible = false;
      location.reload();
    },
    handleDelete(index, row) {
      console.log(index, row);
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除设备编号为"' + row.devCode + '"的数据项？')
        .then(function () {
          delDevtable(ids);
          // location.reload();
          // this.getDevList();
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
      this.getDevList();
    },
    searchSelect(label) {
      console.log(label);
      this.dName = label;
    },
    searchSelect1(label) {
      console.log(label);
      this.duseStatus = label;
    },
    findDataMethod() {
      this.tableData2 = this.tableData1;
      this.findData = [];
      if (
        this.dCode == "" &&
        this.dName == "" &&
        this.dLoc == "" &&
        this.dmanu == "" &&
        this.dmodel == "" &&
        this.dmarkStatus == "" &&
        this.duseStatus == ""
      ) {
        this.tableData2 = this.tableData1;
        this.totalpage = this.tableData2.length;
        alert("请输入搜索内容！");
      }
      var x;
      var i = 0;
      if (this.dCode != "") {
        for (x = 0; x < this.tableData1.length; x++) {
          console.log(this.tableData2[x].devCode);
          if (
            this.tableData2[x].devCode !== null &&
            this.tableData2[x].devCode.match(this.dCode) != null
          ) {
            this.findData[i] = this.tableData1[x];
            i++;
          }
        }
        this.tableData2 = this.findData;
        this.totalpage = this.tableData2.length;
        // console.log(this.tableData2.length);
        this.findData = [];
        i = 0;
      }
      if (this.dName != "") {
        for (x = 0; x < this.tableData2.length; x++) {
          if (this.tableData2[x].devName.match(this.dName) != null) {
            this.findData[i] = this.tableData2[x];
            i++;
          }
        }
        this.tableData2 = this.findData;
        this.totalpage = this.tableData2.length;
        this.findData = [];
        i = 0;
      }
      if (this.dLoc != "") {
        for (x = 0; x < this.tableData2.length; x++) {
          if (this.tableData2[x].location.match(this.dLoc) != null) {
            this.findData[i] = this.tableData2[x];
            i++;
          }
        }
        this.tableData2 = this.findData;
        this.totalpage = this.tableData2.length;
        this.findData = [];
        i = 0;
      }
      if (this.dmanu != "") {
        for (x = 0; x < this.tableData2.length; x++) {
          if (this.tableData2[x].manufacturer.match(this.dmanu) != null) {
            this.findData[i] = this.tableData2[x];
            i++;
          }
        }
        this.tableData2 = this.findData;
        this.totalpage = this.tableData2.length;
        this.findData = [];
        i = 0;
      }
      if (this.duseStatus != "") {
        for (x = 0; x < this.tableData2.length; x++) {
          // console.log("mmy",this.tableData2[x].ustatus)
          if (this.tableData2[x].ustatus.match(this.duseStatus)) {
            this.findData[i] = this.tableData2[x];
            i++;
          }
        }
        this.tableData2 = this.findData;
        this.totalpage = this.tableData2.length;
        this.findData = [];
        i = 0;
      }
    },
  },
  data() {
    return {
      //负责人多选
      responsiblePerson: [],

      ustatus: "",
      // mstatus: true,
      switchValue: true,
      editValue: "",
      dialogVisible: false,
      mainHeight: 800,
      buttomHeight: "400px",
      currentPage4: 1,
      pageSize: 50,
      tableData1: [],
      findData: [],
      tableData2: [],
      totalpage: 1,
      //搜索
      dCode: "",
      dName: "",
      dNames: [],
      value: "",
      dLoc: "",
      dLocs: [],
      dmanu: "",
      dmanus: [],
      dmodel: "",
      dmarkStatus: "",
      duseStatus: "",
      duseStatuses: [
        { value: "选项1", label: "未运行" },
        { value: "选项2", label: "正在运行" },
      ],
    };
  },
  created() {
    this.init();
    this.getDevList();
  },
};
</script>
<style>
.el-icon-my-analysis {
  /*background: url("~@/assets/analysis.png") center center no-repeat;*/
  background-size: cover;
}
.el-icon-my-analysis:before {
  content: "替";
  font-size: 16px;
  visibility: hidden;
}
</style>
<style lang="scss" scoped>
.abc ::v-deep .el-table__body tr:hover > td {
  background-color: #ffffbb !important;
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
  background: #84bbfe;
  border-color: #84bbfe;
}
.abc.el-table::before {
  //去掉最下面的那一条线
  height: 0px;
}
</style>
