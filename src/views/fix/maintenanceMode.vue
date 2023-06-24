<template>
    <el-row>
        <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <el-page-header @back="preStep(4)" content="维保申请 > 选择维修方式" />
                    <div style="margin: 20px;"></div>
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-select v-model="selectedMode" class="m-2">
                                <el-option v-for="item in modes" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-table :data="collaboratorList" style="width: 100%" v-show="showThirdParty"
                            @row-click="clickRow">
                            <el-table-column label="选择" width="100%">
                                <template slot-scope="scope">
                                    <el-radio @click.native.prevent="chooesCompany" :label="scope.row.companyId" v-model="companyId">{{""}}</el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column label="序号">
                                <template slot-scope="scope">{{tableIndex(scope)}}</template>
                            </el-table-column>
                            <el-table-column prop="companyId" label="公司id" v-if="false">
                            </el-table-column>
                            <el-table-column prop="companyName" label="公司名称">
                            </el-table-column>
                            <el-table-column prop="businessAttr" label="公司业务">
                            </el-table-column>
                            <el-table-column prop="companyLevel" label="公司资质">
                            </el-table-column>
                            <el-table-column prop="linkName" label="联系人">
                            </el-table-column>
                            <el-table-column prop="tel" label="联系方式">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="90">
                                <template slot-scope="scope">
                                    <el-button link type="primary" size="small" @click="getDetail(scope.row.companyName)">
                                        查看详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <pagination v-show="showPagination>0" :total="total" :page.sync="queryParams.pageNum"
                            :limit.sync="queryParams.pageSize" :page-sizes="[5, 10, 15, 20]" :page-size="5"
                            @pagination="getList" />
                      <!-- 合作记录弹窗 -->
                      <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
                        <div style="width: 100%; background: #d2e9ff; border-radius: 10px"><p
                          style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
                        >
                          合作记录
                        </p></div>

                        <el-table
                          :data="tableData"
                          style="width: 100%"
                        >
<!--                          <el-table-column-->
<!--                            prop="id"-->
<!--                            label="维保编号"-->
<!--                            width="180"-->
<!--                          >-->
<!--                          </el-table-column>-->
                          <el-table-column
                            prop="name"
                            label="维保名称"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="company"
                            label="维保单位"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="maintenanceCase"
                            label="维保情况"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="fixdate"
                            label="维保时间"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="chargePeople"
                            label="负责人"
                          >
                          </el-table-column>
                          <el-table-column label="维保记录" width="130px">
                            <template>
                              <el-button size="mini" type="success">查看</el-button>
                            </template>
                          </el-table-column>
                        </el-table>

                        </el-dialog>
                    </el-row>
                    <div class="grid-content bg-purple" style="float: right;margin: 40px 0px">
<!--                        <el-button type="primary" @click="savePlan" >保存</el-button>-->
                        <el-button type="primary" @click="prepage">上一步</el-button>
                        <el-button type="primary" @click="nextPage">下一步</el-button>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { listCollaborator,getListByCompany } from '@/api/system/collaborator'

export default {
    props: ['preStep', 'nextStep','company'],
    data() {
        return {
            tableData: [],
            modes: [{
                value: 1,
                label: '公司自己维修',
            },
            {
                value: 2,
                label: '寻求第三方维修',
            }],
            selectedMode: '请选择维修方式',
            //是否显示第三方页面
            showThirdParty: false,
            collaboratorList: [],
            // 查询列表参数
            queryParams: {
                pageNum: 1,
                pageSize: 5,
                companyName: null,
                linkName: null,
                tel: null,
                businessAttr: null,
                companyLevel: null
            },
            total: 0,
            currentPage1: 1,
            //保存选中的第三方公司id
            companyId: '',
            //是否选择了维修方式
            isSelectedMode: false,
            // 是否显示弹出层
            open: false,
            // 弹出层标题
            title: "",
        };
    },
    computed: {
        //列表序号
        tableIndex() {
            return function (scope) { return scope.$index + 1 }
        },
        //是否展示分页
        showPagination() {
            return this.total && this.showThirdParty
        },
    },
  watch: {
    //监视下拉框变化
    selectedMode(newVal) {
      if (newVal == 2) {
        this.showThirdParty = true
        this.getList()
      } else {
        this.showThirdParty = false
      }
      this.isSelectedMode = true
    },
    //监听传入值的变化
    companyCompute: {
      handler(newVal, oldVal) {

        console.log("company1",oldVal)
        console.log("company2",newVal)
        if ('第三方维保' === newVal) {
          //将下拉框的值  转换为第三方维保

        }

      },
    }

  },
    methods: {
      //当选择第三方公司后 将数据传回
        chooesCompany() {
          // alert('aaaaa')
          // console.log('bbbbb')

          setTimeout(()=>{
            this.$emit("maintenanceMode", { selectedMode: this.selectedMode, companyId: this.companyId })
          },200)

        },
        //查看第三方详情
        getDetail(companyName) {


            getListByCompany(companyName).then(response => {

              this.tableData = response;
              // this.title = "合作记录"
              this.open = true;
            })

        },
        //保存维保计划
        savePlan() {
          this.$emit("save" )
          // if (!this.companyId) {
            //     this.$message({
            //         message: '请选择第三方公司!',
            //         type: 'warning'
            //     });
            //     return;
            // }
        },
        /** 查询collaborator列表 */
        getList() {
            listCollaborator(this.queryParams).then(response => {
                this.collaboratorList = response.rows;
                // console.log(response.rows);
                this.total = response.total;
            });
        },
        clickRow(row) {
            this.companyId = row.companyId
            // console.log('getCurrentRow中的companyId:', this.companyId);
        },
        nextPage() {
            // if (!this.isSelectedMode) {
            //     this.$message({
            //         message: '请选择维修方式!',
            //         type: 'warning'
            //     });
            //     return
            // }
            // //判断第三方维修是否有遗漏
            // if (this.showThirdParty && !this.companyId) {
            //     this.$message({
            //         message: '请选择第三方公司!',
            //         type: 'warning'
            //     });
            //     return
            // }
            this.nextStep(2)
        },
      prepage() {
        this.preStep(2)
      }
    },
  mounted() {

  },
}
</script>
<style scoped>

</style>
