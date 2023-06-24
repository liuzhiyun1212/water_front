<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-tabs v-model="activeTabName" type="card" @tab-click="handleClickTab">
        <el-tab-pane label="待处理" name="handling"></el-tab-pane>
        <el-tab-pane label="已处理" name="handled"></el-tab-pane>
      </el-tabs>
      <div v-if = "this.activeTabName=='handling'">
      <el-col class="update-log" :span="4">
        <el-card>
          <div
            style="
          width: 100%;
          background: #d2e9ff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          padding-right: 3%;
          align-items: center;
        "
          >
            <p
              style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
            >
              审核记录
            </p>
          </div>
          <p></p>
          <el-button style= "text-align: center;font-size: 16px;font-weight: 600;margin-left: 30px;color: #333;" @click="getall" type="text">全部   ({{ yanshouing + shenheing + baofeiing }})</el-button>
          <p></p>
          <el-button style= "text-align: center;font-size: 16px;font-weight: 600;margin-left: 30px;color: #333;" @click="shenhe" type="text">维保待审核   ({{ shenheing }})</el-button>
          <p></p>
          <el-button style= "text-align: center;font-size: 16px;font-weight: 600;margin-left: 30px;color: #333;" @click="yanshou" type="text">维保待验收   ({{ yanshouing }})</el-button>
          <p></p>
          <el-button style= "text-align: center;font-size: 16px;font-weight: 600;margin-left: 30px;color: #333;" @click="baofei" type="text">报废待审核   ({{ baofeiing }})</el-button>
        </el-card>
      </el-col>
      <el-col class="update-log" :span="20">
        <el-card>
          <div
            style="
          width: 100%;
          background: #d2e9ff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          padding-right: 3%;
          align-items: center;
        "
          >
            <p
              style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
            >
              待处理
            </p>
          </div>
          <el-table v-loading="loading" :data="planList"
                    class="abc"
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

                    :height="buttomHeight"
                    stripe
                    style="width: 100%; margin-top: 10px"
                    :default-sort="{ prop: 'num', order: 'descending' }">
            <el-table-column label="序号" align="center" type="index" />
            <el-table-column label="名称" align="center" prop="name">
              <template slot-scope="scope">
                <div v-if="scope.row.state =='报废申请'">
                  <el-button @click="skipp(scope.row.equipId)" type="text">{{ scope.row.name }}</el-button>
                </div>
                <div v-else>
                <el-button @click="skip(scope.row.id)" type="text">{{ scope.row.name }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="当前状态" align="center" prop="state" />
            <el-table-column label="进度" align="center" prop="auditProcess" >
              <template slot-scope="scope">
                <div v-if="scope.row.state =='待验收'||scope.row.state =='验收中'">
                  <span :style="{'color':'green'}">{{scope.row.checkProcess.slice(0,scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1)}}</span>
                  <span :style="{'color':'red'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1,scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length)}}</span>
                  <span :style="{'color':'grey'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length,scope.row.checkProcess.length)}}</span>
                </div>
                <div v-if="scope.row.state =='待审核'||scope.row.state =='审核中'||scope.row.state =='报废申请'">
                  <span :style="{'color':'green'}">{{scope.row.auditProcess.slice(0,scope.row.auditProcess.indexOf(scope.row.checkPeople)-1)}}</span>
                  <span :style="{'color':'red'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)-1,scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length)}}</span>
                  <span :style="{'color':'grey'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length,scope.row.auditProcess.length)}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="制定时间" align="center" prop="makingTime" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.makingTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人" align="center" prop="chargePeople" >
              <template slot-scope="scope">
                <div v-if="scope.row.chargePeople[0] !='{'">
                  <span>{{scope.row.chargePeople}}</span>
                </div>
                <div v-else>
                  <span>{{JSON.parse(scope.row.chargePeople).name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <div v-if="scope.row.state =='待验收'||scope.row.state =='验收中'">
                  <el-button
                    type="text"
                    @click="handleUpdate2(scope.row)"
                    v-hasPermi="['system:plan:edit']"
                  >验收</el-button>
                </div>
                <div v-if="scope.row.state =='待审核'||scope.row.state =='审核中'">
                  <el-button
                    type="text"
                    @click="handleUpdate1(scope.row)"
                    v-hasPermi="['system:plan:edit']"
                  >审核</el-button>
                </div>
                <div v-if="scope.row.state =='报废申请'">
                  <el-button
                    type="text"
                    @click="handleUpdate3(scope.row)"
                    v-hasPermi="['system:plan:edit']"
                  >审核</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="pageNum"
            :limit.sync="pageSize"
            @pagination="getList1"
          />
        </el-card>
      </el-col>
      </div>
      <div v-if = "this.activeTabName=='handled'">
        <el-col class="update-log" :span="24">
          <el-card>
            <div
              style="
          width: 100%;
          background: #d2e9ff;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          padding-right: 3%;
          align-items: center;
        "
            >
              <p
                style="
            font-family: Arial;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
              >
                已处理
              </p>
            </div>
            <el-table :data="planedList"
                      class="abc"
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
                      :default-sort="{ prop: 'num', order: 'descending' }">
              <el-table-column label="序号" align="center" type="index" />
              <el-table-column label="维保计划名称" align="center" prop="name"/>
              <el-table-column label="当前状态" align="center" prop="state" />
              <el-table-column label="进度" align="center" prop="auditProcess" >
                <template slot-scope="scope">
                  <div v-if="scope.row.state =='待审核'||scope.row.state =='审核中'||scope.row.state =='报废申请'||scope.row.state =='申请未通过'">
                    <span :style="{'color':'green'}">{{scope.row.auditProcess.slice(0,scope.row.auditProcess.indexOf(scope.row.checkPeople)-1)}}</span>
                    <span :style="{'color':'red'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)-1,scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length)}}</span>
                    <span :style="{'color':'grey'}">{{scope.row.auditProcess.slice(scope.row.auditProcess.indexOf(scope.row.checkPeople)+scope.row.checkPeople.length,scope.row.auditProcess.length)}}</span>
                  </div>
                  <div v-else-if="scope.row.state =='待验收'||scope.row.state =='验收中'">
                    <span :style="{'color':'green'}">{{scope.row.checkProcess.slice(0,scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1)}}</span>
                    <span :style="{'color':'red'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)-1,scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length)}}</span>
                    <span :style="{'color':'grey'}">{{scope.row.checkProcess.slice(scope.row.checkProcess.indexOf(scope.row.acceptPeople)+scope.row.acceptPeople.length,scope.row.checkProcess.length)}}</span>
                  </div>
                  <div v-else-if="scope.row.state =='已验收'">
                    <span :style="{'color':'green'}">{{scope.row.checkProcess}}</span>
                  </div>
                  <div :style="{'color':'green'}" v-else>{{ scope.row.auditProcess}}</div>
                </template>
              </el-table-column>
              <el-table-column label="维保计划制定时间" align="center" prop="makingTime" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.makingTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="负责人" align="center" prop="chargePeople" >
                <template slot-scope="scope">
                  <div v-if="scope.row.chargePeople[0] !='{'">
                    <span>{{scope.row.chargePeople}}</span>
                  </div>
                  <div v-else>
                    <span>{{JSON.parse(scope.row.chargePeople).name}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="totaled>0"
              :total="totaled"
              :page.sync="pageNum"
              :limit.sync="pageSize"
              @pagination="getList2"
            />
          </el-card>
        </el-col>
      </div>
    </el-row>
    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title1" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form1" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核意见">
          <el-input v-model="message" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">是否通过</span>
          <el-radio-group v-model="isPass">
            <el-radio label="0">通过</el-radio>
            <el-radio label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title2" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form2" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="验收意见">
          <el-input v-model="message" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">是否通过</span>
          <el-radio-group v-model="isPass">
            <el-radio label="0">通过</el-radio>
            <el-radio label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title3" :visible.sync="open3" width="500px" append-to-body>
      <el-form ref="form1" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核意见">
          <el-input v-model="message" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">是否通过</span>
          <el-radio-group v-model="isPass">
            <el-radio label="0">通过</el-radio>
            <el-radio label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAllPlan, getPlan,getState, delPlan, addPlan, planMain } from "@/api/system/plan";
import { listAllRemove, getRemove, delRemove, addRemove, updateRemove } from "@/api/system/remove";
import { getUserProfile } from '@/api/system/user'
import { listDevtable, getDevtable, delDevtable, addDevtable, updateDevtable } from "@/api/system/devtable";
import {listAllDevtable} from "../../../api/system/devtable";


export default {
  name: "Plan",
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      buttomHeight: "400px",
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      totaled: 0,
      // plan表格数据
      planList: [],
      planedList: [],
      // 弹出层标题
      title1: "",
      title2: "",
      title3: "",
      // 是否显示弹出层
      open1: false,
      open2: false,
      open3: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id:null,
        name: null,
        makingTime: null,
        state: null,
        chargePeople: null,
        auditProcess: null,
        maintenanceWay: null,
        level: null,
        equipmentData: null,
        maintenanceContent: null,
        maintenanceCase: null,
        parts: null,
        previousPic: null,
        subsequentPic: null,
        budget: null,
        company: null,
        applyAccessory: null,
        auditAccessor: null,
        checkAccessor: null,
        executePeople: null,
        fixdate: null,
        checkPeople: null,
        auditMessage: null,
        acceptMessage: null,
        acceptPeople: null,
        firstAuditTime: null,
        lastAuditTime: null,
        firstAcceptTime: null,
        lastAcceptTime: null,
        checkProcess:null,
        workCard:null
      },
      rqueryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        state: null,
        equipName: null,
        applyDept: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
        deptComments: null,
        partLeaderComments: null,
        managerComments: null,
        auditProcess: null,
        checkPeople: null,
        chairmanComments: null,
        financeComments: null,
        makingTime: null,
        chargePeople: null,
        auditMessage: null,
        deviceId:null
      },
      dqueryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        addTime: null,
        editTime: null,
        orgId: null,
        tenantId: null,
        userId: null,
        devAttrTypeId: null,
        devCode: null,
        devName: null,
        file: null,
        location: null,
        manufacturer: null,
        markStatus: null,
        model: null,
        useOrg: null,
        useStatus: null,
        devAttrName: null,
        devAttrCode: null,
        lastRepaireTime: null,
        purchaseData: null,
        installData: null,
        startData: null,
        useTime: null,
        runningTime: null,
        ageLimit: null,
        equipmentPicture: null,
        equipmentIntroduction: null,
      },
      // 表单参数
      form: {},
      rform: {},
      dform: {},
      // 表单校验
      rules: {
      },
      alllist:[],
      shenheing: 0,
      shenhelist:[],
      yanshouing:0,
      yanshoulist:[],
      baofeiing:0,
      baofeilist:[],
      isPass:null,
      message:null,
      username:null,
      activeTabName: 'handling',
      listed:[],
      roleName:""
    };
  },
  created() {
    getUserProfile().then(response => {
      this.roleName = response.data.roleName
      this.username = response.data.userName
      this.getList();
      this.getedList()
    })
  },
  methods: {
    /** 查询plan列表 */
    getList() {
      this.loading = true;
      listAllPlan(this.queryParams).then(response1 => {
        listAllRemove(this.rqueryParams).then(response2 => {
          this.pageNum = 1
          this.pageSize = 10
          this.alllist = []
          this.shenheing=0
          this.shenhelist=[]
          this.yanshouing=0
          this.yanshoulist=[]
          this.baofeiing=0
          this.baofeilist=[]
          if(this.roleName.indexOf("审核人员")!=-1){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "待审核"&&this.username==response1.rows[i].checkPeople){
                this.alllist.push(response1.rows[i]);
                this.shenhelist.push(response1.rows[i]);
                this.shenheing++;
              }
              else if(response1.rows[i].state == "审核中"&&this.username==response1.rows[i].checkPeople){
                this.alllist.push(response1.rows[i]);
                this.shenhelist.push(response1.rows[i]);
                this.shenheing++;
              }else if(response1.rows[i].state == "待验收"&&this.username==response1.rows[i].acceptPeople){
                this.alllist.push(response1.rows[i]);
                this.yanshoulist.push(response1.rows[i]);
                this.yanshouing++;
              }
              else if(response1.rows[i].state == "验收中"&&this.username==response1.rows[i].acceptPeople){
                this.alllist.push(response1.rows[i]);
                this.yanshoulist.push(response1.rows[i]);
                this.yanshouing++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "报废申请"&&this.username==response2.rows[i].checkPeople){
                this.alllist.push(response2.rows[i]);
                this.baofeilist.push(response2.rows[i]);
                this.baofeiing++;
              }
            }
          }
          else if(this.username=="admin"){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "待审核"){
                this.alllist.push(response1.rows[i]);
                this.shenhelist.push(response1.rows[i]);
                this.shenheing++;
              }
              else if(response1.rows[i].state == "审核中"){
                this.alllist.push(response1.rows[i]);
                this.shenhelist.push(response1.rows[i]);
                this.shenheing++;
              }else if(response1.rows[i].state == "待验收"){
                this.alllist.push(response1.rows[i]);
                this.yanshoulist.push(response1.rows[i]);
                this.yanshouing++;
              }
              else if(response1.rows[i].state == "验收中"){
                this.alllist.push(response1.rows[i]);
                this.yanshoulist.push(response1.rows[i]);
                this.yanshouing++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "报废申请"){
                this.alllist.push(response2.rows[i]);
                this.baofeilist.push(response2.rows[i]);
                this.baofeiing++;
              }
            }
          }
          this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
          this.getList1()
          this.total = this.shenheing + this.yanshouing + this.baofeiing;
          this.loading = false;
        });
      });
    },
    getedList() {
      listAllPlan(this.queryParams).then(response1 => {
        listAllRemove(this.rqueryParams).then(response2 => {
          this.listed = []
          this.totaled = 0
          this.pageNum = 1
          this.pageSize = 10
          if(this.roleName.indexOf("审核人员")!=-1){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "未提交"||response1.rows[i].state == "待审核"||response1.rows[i].state == "待验收"){
              }
              else if(response1.rows[i].state == "审核中"){
                if(response1.rows[i].auditProcess.indexOf(this.username)>=response1.rows[i].auditProcess.indexOf(response1.rows[i].checkPeople)){}
                else{
                  this.listed.push(response1.rows[i]);
                  this.totaled++;
                }
              }else if(response1.rows[i].state == "验收中"){
                if(response1.rows[i].checkProcess.indexOf(this.username)>=response1.rows[i].checkProcess.indexOf(response1.rows[i].acceptPeople)){}
                else{
                  this.listed.push(response1.rows[i]);
                  this.totaled++;
                }
              }
              else{
                this.listed.push(response1.rows[i]);
                this.totaled++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].auditProcess.indexOf(this.username)>=response2.rows[i].auditProcess.indexOf(response2.rows[i].checkPeople)){}
              else{
                this.listed.push(response2.rows[i]);
                this.totaled++;
              }
              if(response2.rows[i].state == "已报废"){
                this.listed.push(response2.rows[i]);
                this.totaled++;
              }
            }
          }
          else if(this.username=="admin"){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "未提交"){
              }
              else{
                this.listed.push(response1.rows[i]);
                this.totaled++;
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "已报废"||response2.rows[i].state == "报废申请"){
                this.listed.push(response2.rows[i]);
                this.totaled++;
              }
            }
          }
          this.listed.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
          this.getList2()
        });
      });
    },
    getList1() {
      this.planList = []
      for(let i =0;i<this.pageSize;i++){
        if(this.alllist[(this.pageNum-1)*this.pageSize+i]!=undefined){
          this.planList.push(this.alllist[(this.pageNum-1)*this.pageSize+i])
        }
      }
    },
    getList2() {
      this.planedList = []
      for(let i =0;i<this.pageSize;i++){
        if(this.listed[(this.pageNum-1)*this.pageSize+i]!=undefined){
          this.planedList.push(this.listed[(this.pageNum-1)*this.pageSize+i])
        }
      }
    },
    skip(id){
      this.$router.push({
        path: '/mainplan/fix/create',
        query: {
          id: id  }
      })
    },
    skipp(equipId){
      this.$router.push({
        path: "/equipRemove/detailRemove",
        query: {
          equipId:equipId,
        },
      });
    },

    /** 全部、待审核、待验收按钮 */
    getall() {
      this.loading = true;
      listAllPlan(this.queryParams).then(response1 => {
        listAllRemove(this.rqueryParams).then(response2 => {
          this.pageNum = 1
          this.pageSize = 10
          this.alllist = []
          if(this.roleName.indexOf("审核人员")!=-1){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "待审核"&&this.username==response1.rows[i].checkPeople){
                this.alllist.push(response1.rows[i]);
              }
              else if(response1.rows[i].state == "审核中"&&this.username==response1.rows[i].checkPeople){
                this.alllist.push(response1.rows[i]);
              }else if(response1.rows[i].state == "待验收"&&this.username==response1.rows[i].acceptPeople){
                this.alllist.push(response1.rows[i]);
              }
              else if(response1.rows[i].state == "验收中"&&this.username==response1.rows[i].acceptPeople){
                this.alllist.push(response1.rows[i]);
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "报废申请"&&this.username==response2.rows[i].checkPeople){
                this.alllist.push(response2.rows[i]);
              }
            }
          }
          else if(this.username=="admin"){
            for(let i =0;i<response1.rows.length;i++){
              if(response1.rows[i].state == "待审核"){
                this.alllist.push(response1.rows[i]);
              }
              else if(response1.rows[i].state == "审核中"){
                this.alllist.push(response1.rows[i]);
              }else if(response1.rows[i].state == "待验收"){
                this.alllist.push(response1.rows[i]);
              }
              else if(response1.rows[i].state == "验收中"){
                this.alllist.push(response1.rows[i]);
              }
            }
            for(let i =0;i<response2.rows.length;i++){
              if(response2.rows[i].state == "报废申请"){
                this.alllist.push(response2.rows[i]);
              }
            }
          }
          this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
          this.getList1()
          this.total = this.shenheing + this.yanshouing + this.baofeiing;
          this.loading = false;
        });
      });
    },
    shenhe(){
      this.loading = true;
      listAllPlan(this.queryParams).then(response => {
        this.pageNum = 1
        this.pageSize = 10
        this.shenhelist = [];
        this.shenheing = 0;
        if(this.roleName.indexOf("审核人员")!=-1){
          for(let i =0;i<response.rows.length;i++){
            if(response.rows[i].state == "待审核"&&this.username==response.rows[i].checkPeople){
              this.shenhelist.push(response.rows[i]);
              this.shenheing++;
            }
            else if(response.rows[i].state == "审核中"&&this.username==response.rows[i].checkPeople){
              this.shenhelist.push(response.rows[i]);
              this.shenheing++;
            }
          }
        }
        else if(this.username=="admin"){
          for(let i =0;i<response.rows.length;i++){
            if(response.rows[i].state == "待审核"){
              this.shenhelist.push(response.rows[i]);
              this.shenheing++;
            }
            else if(response.rows[i].state == "审核中"){
              this.shenhelist.push(response.rows[i]);
              this.shenheing++;
            }
          }
        }
        this.alllist =this.shenhelist;
        this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
        this.getList1()
        this.total = this.shenheing;
        this.loading = false;
      });
    },
    yanshou(){
      this.loading = true;
      listAllPlan(this.queryParams).then(response => {
        this.pageNum = 1
        this.pageSize = 10
        this.yanshoulist = [];
        this.yanshouing = 0;
        if(this.roleName.indexOf("审核人员")!=-1){
          for(let i =0;i<response.rows.length;i++){
            if(response.rows[i].state == "待验收"&&this.username==response.rows[i].acceptPeople){
              this.yanshoulist.push(response.rows[i]);
              this.yanshouing++;
            }
            else if(response.rows[i].state == "验收中"&&this.username==response.rows[i].acceptPeople){
              this.yanshoulist.push(response.rows[i]);
              this.yanshouing++;
            }
          }
        }
        else if(this.username=="admin"){
          for(let i =0;i<response.rows.length;i++){
            if(response.rows[i].state == "待验收"){
              this.yanshoulist.push(response.rows[i]);
              this.yanshouing++;
            }
            else if(response.rows[i].state == "验收中"){
              this.yanshoulist.push(response.rows[i]);
              this.yanshouing++;
            }
          }
        }
        this.alllist =this.yanshoulist;
        this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
        this.getList1()
        this.total = this.yanshouing;
        this.loading = false;
      });
    },
    baofei(){
      this.loading = true;
      listAllRemove(this.rqueryParams).then(response2 => {
        this.pageNum = 1
        this.pageSize = 10
        this.baofeiing = 0;
        this.baofeilist = [];
        if(this.roleName.indexOf("审核人员")!=-1){
          for(let i =0;i<response2.rows.length;i++){
            if(response2.rows[i].state == "报废申请"&&this.username==response2.rows[i].checkPeople){
              this.baofeilist.push(response2.rows[i]);
              this.baofeiing++;
            }
          }
        }
        else if(this.username=="admin"){
          for(let i =0;i<response2.rows.length;i++){
            if(response2.rows[i].state == "报废申请"){
              this.baofeilist.push(response2.rows[i]);
              this.baofeiing++;
            }
          }
        }
        this.alllist = this.baofeilist;
        this.alllist.sort((a, b) => new Date(b.makingTime).getTime() - new Date(a.makingTime).getTime())
        this.getList1()
        this.total = this.baofeiing;
        this.loading = false;
      });
    },
    /** 获取时间 */
    getCurrentTime() {
      var time = null;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1< 10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
      let dd = new Date().getDate()< 10 ? '0'+new Date().getDate() : new Date().getDate();
      time = yy+'-'+mm+'-'+dd;
      return time;
    },
    // 取消按钮
    cancel() {
      this.open1 = false;
      this.open2 = false;
      this.open3 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        makingTime: null,
        state: null,
        chargePeople: null,
        auditProcess: null,
        maintenanceWay: null,
        level: null,
        equipmentData: null,
        maintenanceContent: null,
        maintenanceCase: null,
        parts: null,
        previousPic: null,
        subsequentPic: null,
        budget: null,
        company: null,
        applyAccessory: null,
        auditAccessor: null,
        checkAccessor: null,
        executePeople: null,
        fixdate: null,
        remark: null,
        planType: null,
        checkPeople: null,
        auditMessage: null,
        acceptMessage: null,
        acceptPeople: null,
        firstAuditTime: null,
        lastAuditTime: null,
        firstAcceptTime: null,
        lastAcceptTime: null,
        checkProcess:null,
        workCard:null
      };
      this.rform = {
        equipId: null,
        name: null,
        state: null,
        equipName: null,
        applyDept: null,
        manufacturer: null,
        specification: null,
        buyDate: null,
        numberDeclarations: null,
        useYear: null,
        removalReason: null,
        deptComments: null,
        partLeaderComments: null,
        managerComments: null,
        auditProcess: null,
        checkPeople: null,
        chairmanComments: null,
        financeComments: null,
        makingTime: null,
        chargePeople: null,
        auditMessage: null,
        deviceId:null
      };
      this.dform = {
        id: null,
        code: null,
        addTime: null,
        editTime: null,
        orgId: null,
        tenantId: null,
        userId: null,
        devAttrTypeId: null,
        devCode: null,
        devName: null,
        file: null,
        location: null,
        manufacturer: null,
        markStatus: null,
        model: null,
        useOrg: null,
        useStatus: null,
        devAttrName: null,
        devAttrCode: null,
        lastRepaireTime: null,
        createBy: null,
        updateBy: null,
        purchaseData: null,
        installData: null,
        startData: null,
        useTime: null,
        runningTime: null,
        ageLimit: null,
        equipmentPicture: null,
        equipmentIntroduction: null,
        remark: null
      };
      this.resetForm("form");
      this.message = null;
      this.isPass = null;
    },
    /** 修改按钮操作 */
    handleUpdate1(row) {
      if(this.roleName.indexOf("审核人员")!=-1){
        this.reset();
        const id = row.id || this.ids
        getPlan(id).then(response => {
          this.form = response.data;
          this.open1 = true;
          this.title1 = "维保审核";
        });
      }
    },
    handleUpdate2(row) {
      if(this.roleName.indexOf("审核人员")!=-1){
        this.reset();
        const id = row.id || this.ids
        getPlan(id).then(response => {
          this.form = response.data;
          this.open2 = true;
          this.title2 = "维保验收";
        });
      }
    },
    handleUpdate3(row) {
      if(this.roleName.indexOf("审核人员")!=-1){
        this.reset();
        const id = row.equipId || this.ids
        getRemove(id).then(response => {
          this.rform = response.data;
          this.dqueryParams.devCode = this.rform.deviceId;
          listDevtable(this.dqueryParams).then(response1 => {
            this.dform = response1.rows[0];
            this.open3 = true;
            this.title3 = "报废审核";
          });
        });
      }
    },
    /** 提交按钮 */
    submitForm1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          if(this.form.state == "待审核"&&(this.form.firstAuditTime ==null||this.form.firstAuditTime =="")){
            this.form.firstAuditTime = this.getCurrentTime()
          }
          if(this.isPass==0){
            if(this.message==null){
              this.message="无"
            }
            if(this.form.auditMessage==null||this.form.state == "待审核"){
              this.form.auditMessage = this.message+"|"
            }else{
              this.form.auditMessage += this.message+"|"
            }
            let i = this.form.auditProcess;
            i = i.replace(/①/,'-');
            i = i.replace(/②/,'-');
            i = i.replace(/③/,'-');
            i = i.replace(/④/,'-');
            i = i.replace(/⑤/,'-');
            i = i.replace(/⑥/,'-');
            i = i.replace(/⑦/,'-');
            i = i.replace(/⑧/,'-');
            i = i.replace(/⑨/,'-');
            i = i.replace(/⑩/,'-');
            var h = i.split('-');
            if(h.indexOf(this.username)==h.length-1){
              this.form.lastAuditTime = this.getCurrentTime()
              this.form.state = "已审核"
              this.form.checkPeople = "审核完毕"
            }else{
              this.form.state = "审核中"
              this.form.checkPeople = h[h.indexOf(this.username)+1]
            }
            planMain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.message = null
              this.isPass = null
              this.getList();
            });
          }else if(this.isPass==1&&this.message != null&&this.message != ""){
            if(this.form.auditMessage==null||this.form.state == "待审核"){
              this.form.auditMessage = this.message+"|"
            }else{
              this.form.auditMessage += this.message+"|"
            }
            this.form.state = "未提交"
            planMain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.message = null
              this.isPass = null
              this.getList();
            });
          }else if(this.isPass==1&&(this.message == null||this.message == "")){
            this.$modal.msgError("审核意见不能为空");
          }
        }
      });
    },
    submitForm2() {
      this.$refs["form2"].validate(valid => {
        if (valid) {
          if(this.form.state == "待验收"&&(this.form.firstAcceptTime ==null||this.form.firstAcceptTime =="")){
            this.form.firstAcceptTime = this.getCurrentTime()
          }
          if(this.isPass==0){
            if(this.message==null){
              this.message="无"
            }
            if(this.form.acceptMessage==null||this.form.state == "待验收"){
              this.form.acceptMessage = this.message+"|"
            }else{
              this.form.acceptMessage += this.message+"|"
            }
            let i = this.form.checkProcess;
            i = i.replace(/①/,'-');
            i = i.replace(/②/,'-');
            i = i.replace(/③/,'-');
            i = i.replace(/④/,'-');
            i = i.replace(/⑤/,'-');
            i = i.replace(/⑥/,'-');
            i = i.replace(/⑦/,'-');
            i = i.replace(/⑧/,'-');
            i = i.replace(/⑨/,'-');
            i = i.replace(/⑩/,'-');
            var h = i.split('-');
            if(h.indexOf(this.username)==h.length-1){
              this.form.lastAcceptTime = this.getCurrentTime()
              this.form.state = "已验收"
              this.form.acceptPeople = "验收完毕"
            }else{
              this.form.state = "验收中"
              this.form.acceptPeople = h[h.indexOf(this.username)+1]
            }
            planMain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open2 = false;
              this.message = null
              this.isPass = null
              this.getList();
            });
          }else if(this.isPass==1&&this.message != null&&this.message != ""){
            if(this.form.acceptMessage==null||this.form.state == "待验收"){
              this.form.acceptMessage = this.message+"|"
            }else{
              this.form.acceptMessage += this.message+"|"
            }
            this.form.state = "维保中"
            planMain(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open2 = false;
              this.message = null
              this.isPass = null
              this.getList();
            });
          }else if(this.isPass==1&&(this.message == null||this.message == "")){
            this.$modal.msgError("验收意见不能为空");
          }
        }
      });
    },
    submitForm3() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          if(this.isPass==0){
            if(this.message==null){
              this.message="无"
            }
            if(this.rform.auditMessage==null||this.rform.auditMessage==""){
              this.rform.auditMessage = this.message+"|"
            }else{
              this.rform.auditMessage += this.message+"|"
            }
            let i = this.rform.auditProcess;
            i = i.replace(/①/,'-');
            i = i.replace(/②/,'-');
            i = i.replace(/③/,'-');
            i = i.replace(/④/,'-');
            i = i.replace(/⑤/,'-');
            i = i.replace(/⑥/,'-');
            i = i.replace(/⑦/,'-');
            i = i.replace(/⑧/,'-');
            i = i.replace(/⑨/,'-');
            i = i.replace(/⑩/,'-');
            var h = i.split('-');
            if(h.indexOf(this.username)==h.length-1){
              this.rform.state = "已报废"
              this.rform.checkPeople = "审核完毕"
              this.dform.useStatus = -3;
            }else{
              this.rform.state = "报废申请"
              this.rform.checkPeople = h[h.indexOf(this.username)+1]
            }
            updateRemove(this.rform).then(response => {
              updateDevtable(this.dform).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open3 = false;
                this.message = null
                this.isPass = null
                this.getList();
              });
            });
          }else if(this.isPass==1&&this.message != null&&this.message != ""){
            if(this.rform.auditMessage==null||this.rform.auditMessage==""){
              this.rform.auditMessage = this.message+"|"
            }else{
              this.rform.auditMessage += this.message+"|"
            }
            this.rform.state = "申请未通过"
            updateRemove(this.rform).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open3 = false;
              this.message = null
              this.isPass = null
              this.getList();
            });
          }else if(this.isPass==1&&(this.message == null||this.message == "")){
              this.$modal.msgError("审核意见不能为空");
          }
        }
      });
    },

    handleClickTab(tab) {
      this.pageNum = 1
      this.pageSize = 10
      this.activeTabName = tab.name;
      if(this.activeTabName=='handling'){
        this.getList()
      }else{
        this.getedList()
      }
    }
  }
};
</script>
<style>
.update-log {
  margin-block-start: 1em;
  margin-block-end: 1em;
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
