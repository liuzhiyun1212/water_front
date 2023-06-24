<template>
  <div style="background: #0A1863;width: 100%;">
    <el-row>
      <el-col :span="6">
        <p style="color:white;display: inline-block;margin-left: 20px">设备名称</p>
      </el-col>
      <el-col :span="18">
        <p style="color:white;display: inline-block;margin-left: 240px">所处状态</p>
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


          <el-col :span="16">
            <!--            width="320"-->
            <el-table-column prop="us" label="所处状态" align="left">
              <template slot-scope="scope"
              ><img

                :src="require('../../assets/' + scope.row.us + '.png')"
                @click="toTable()"
              /></template>
            </el-table-column>
          </el-col>
          <el-col :span="8">
            <el-table-column
              prop="devName"
              label="设备名称"
              align="left"
              show-overflow-tooltip

            >
              <!--            width="220"-->
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
      listDevtable({devAttrCode: "1"}).then((res) => {
        // this.tableData1 = res.rows;
        this.totalpage = res.rows.length;
        this.tableData1 = res.rows;
        this.tableData2 = this.tableData1;
        for (var i = 0; i < this.totalpage; i++) {
          if (res.rows[i].useStatus == -1) {
            this.tableData2[i].ustatus = "未运行";
            this.tableData2[i].us = "11";
          } else if(res.rows[i].useStatus == 0){
            this.tableData2[i].ustatus = "运行中";
            this.tableData2[i].us = "12";
          }else if(res.rows[i].useStatus == -2){
            this.tableData2[i].ustatus = "维保中";
            this.tableData2[i].us = "13";
          }else if(res.rows[i].useStatus == -3){
            this.tableData2[i].ustatus = "已报废";
            this.tableData2[i].us = "14";
          }
        }
        this.tableData2 = this.tableData2.reverse();
        console.log(this.tableData2);
        // this.tableData1 = this.tableData1.slice(0,1);
      });
    },
    //获取数据库设备表信息
    /*getDevList() {
      listDevtable({devAttrCode: "1",useStatus:-1}).then((res) => {
        if(res.rows.length != 0){
          var array = res.rows.reverse()[0];
          array.ustatus = "未运行";
          array.us = "11";
          console.log(array);
          this.tableData2.push(array);
        }
        /!*!// this.tableData1 = res.rows;
        this.totalpage = res.rows.length;
        this.tableData1 = res.rows;
        // this.tableData2 = this.tableData1;
        for (var i = 0; i < this.totalpage; i++) {
          this.tableData1[i].ustatus = "未运行";
          this.tableData1[i].us = "11";
          /!*if (res.rows[i].useStatus == -1) {
            this.tableData2[i].ustatus = "未运行";
            this.tableData2[i].us = "11";
          } else if(res.rows[i].useStatus == 0){
            this.tableData2[i].ustatus = "运行中";
            this.tableData2[i].us = "12";
          }else if(res.rows[i].useStatus == -2){
            this.tableData2[i].ustatus = "维保中";
            this.tableData2[i].us = "13";
          }else if(res.rows[i].useStatus == -3){
            this.tableData2[i].ustatus = "已报废";
            this.tableData2[i].us = "14";
          }*!/
          if (res.rows[i].markStatus === 1) {
            this.tableData1[i].mstatus = true;
          } else {
            this.tableData1[i].mstatus = false;
          }
        }
        this.tableData1 = this.tableData1.reverse();
        this.tableData1 = this.tableData1.slice(0,1);*!/
          listDevtable({devAttrCode: "1",useStatus:0}).then((res) => {
            if(res.rows.length != 0){
              var array = res.rows.reverse()[0];
              array.ustatus = "运行中";
              array.us = "12";
              console.log(array);
              this.tableData2.push(array);
            }
            listDevtable({devAttrCode: "1",useStatus:-3}).then((res) => {
              if(res.rows.length != 0){
                var array = res.rows.reverse()[0];
                array.ustatus = "已报废";
                array.us = "14";
                console.log(array);
                this.tableData2.push(array);
              }
              listDevtable({devAttrCode: "1",useStatus:-2}).then((res) => {
                if(res.rows.length != 0){
                  for(var i = 0;i<res.rows.length;i++){
                    var array = res.rows.reverse()[i];
                    array.ustatus = "维保中";
                    array.us = "13";
                    console.log(array);
                    this.tableData2.push(array);
                  }
                }
                this.tableData2 = this.tableData2.slice(0,5)
              });
            });
          });

      });
    },*/
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
      if (new Date(d1.replace(reg, "/")) > new Date(d2.replace(reg, "/"))) {
        console.log("第一个大");
        return true;
      } else {
        console.log("第二个大");
        return false;
      }
    },
    changeTable(){
      const table = this.$refs.myTable// 拿到表格挂载后的真实DOM
      console.log(table);
      const divData = table.$refs.bodyWrapper// 拿到表格中承载数据的div元素
      console.log(divData);
// 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      setInterval(() => {
        divData.scrollTop += 1// 元素自增距离顶部1像素
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
          divData.scrollTop = 0// 重置table距离顶部距离
        }
      }, 500)
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
      tableData2: [],
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
