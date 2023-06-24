<template>
  <div style="padding: 20px">
    <!--设备详情-->
      <el-dialog
        width="65%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        :show-close="false"
        append-to-body>

        <div slot="title" class="dialog-title">
          <!--        <span class="title-text" style="font-size: 20px;">设备详情</span>-->
          <div class="button-right">
            <el-button type="primary" @click="innerVisible=false" style="float: right;"
            >关 闭
            </el-button>
          </div>
        </div>

        <Details :planName="planName"/>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
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
            {{devObject.devName}}故障信息
          </p>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="deviceCode"
            label="设备编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="faultType"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="happenTime"
            label="地址">
          </el-table-column>
          <el-table-column
            label="维保记录">
            <template slot-scope="scope">
<!--              <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
              <el-link @click.native="showPlanDetails(scope.row)" type="primary">查看<i class="el-icon-view el-icon--right"></i> </el-link>
            </template>

          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="showFaultDetails(devName)"
        />

<!--        <el-button @click="outerVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
      </div>
  </div>
</template>



<script>
import { listDevtable } from "@/api/system/devtable";
import { listLifecycle } from "@/api/system/lifecycle";
import { countData ,listFaultStatistics ,getMaintenanceName} from '@/api/system/faultStatistics'
import * as echarts from 'echarts'
import Details from '@/views/fix/details.vue'
// import Details from '../system/details'

export default {
  props: ['devObject'],
  components: { Details  },
  watch: {
    devObject: {
      immediate: true,
      deep: true,
      handler: function(newData, oldData) {
        this.devName = newData.devName
        this.showFaultDetails(newData.devName)
      }
    }
  },
  data() {
    return {
      // outerVisible: false,
      innerVisible: false,
      tableData: [],
      planName:'',
      devName: '',

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        graphId: null,
        graphName: null,
        graphNodes: null,
        graphEdges: null,
        graphType: null,
        graphInfo: null,
        graphCreator: null,
        createTime: null
      },
      // 总条数
      total: 0,

    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    showFaultDetails(name) {
      this.loading = true;
      listFaultStatistics({ groupType: 'deviceName', deviceName: name }).then(response => {
        console.log(response.rows)
        this.tableData = response.rows
        this.total = response.total;
        this.loading = false;
      })
    },
    showPlanDetails(row) {
      getMaintenanceName(row).then(response => {
        console.log('plan', response)
        let row = response.rows[0]
        this.planName = row.name
        this.innerVisible = true
      })

    }
  },
};
</script>

