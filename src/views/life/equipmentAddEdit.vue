<template>
  <div style="padding: 20px">
    <el-dialog
      title="设备信息"
      :visible.sync="dialogVisible1"
      width="80%"
      :show-close="false"
      :modal="false"
      :append-to-body="true"
    >
      <el-form ref="ruleForm" :model="ruleForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="设备名称">
              {{ ruleForm.devName }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备状态">
              {{ ruleForm.status }}
            </el-form-item>
          </el-col
          >
          <el-col :span="6">
            <el-form-item label="设备编码">
              {{ ruleForm.dCode }}
            </el-form-item>
          </el-col
          >
          <el-col :span="6">
            <el-form-item label="设备种类">
              {{ ruleForm.devAttrName }}
            </el-form-item>
          </el-col
          >
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="生产厂家">
              {{ ruleForm.manufacturer }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备关联">
              {{ ruleForm.value }}
            </el-form-item>
          </el-col
          >
          <el-col :span="6">
            <el-form-item label="安装位置">
              {{ ruleForm.location }}
            </el-form-item>
          </el-col
          >
          <el-col :span="6">
            <el-form-item label="机器型号">
              {{ ruleForm.model }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="到货时间">
              {{ ruleForm.purchaseDate }}
            </el-form-item>
          </el-col
          >
          <el-col :span="8">
            <el-form-item label="验收时间">
              {{ ruleForm.installData }}
            </el-form-item>
          </el-col
          >
          <el-col :span="8">
            <el-form-item label="启用时间">
              {{ ruleForm.startData }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="有效期至">
              {{ ruleForm.ageLimit }}
            </el-form-item>
          </el-col
          >
          <el-col :span="16">
            <el-form-item label="设定维保时间">
              {{
                ruleForm.repairTime +
                ':' +
                ruleForm.repairValue +
                timeValue
              }}
            </el-form-item>
          </el-col
          >
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="10">
            <el-form-item label="验收意见">
              {{ ruleForm.equipmentIntroduction }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="验收人员">
              {{ ruleForm.remark }}
            </el-form-item>
          </el-col
          >
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="10">
            <el-form-item label="已上传图片"></el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="已上传附件"></el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeTable()">关 闭</el-button>
      </span>
    </el-dialog>
    <el-card style="width: 100%; height: 100%">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4"
        >
          <div class="grid-content bg-purple">
            <el-steps :active="step">
              <el-step title="基本信息" icon="el-icon-edit"></el-step>
              <el-step title="生命周期信息" icon="el-icon-timer"></el-step>
              <el-step title="验收信息" icon="el-icon-s-order"></el-step>
              <el-step title="附件" icon="el-icon-upload"></el-step>
              <el-step title="预览" icon="el-icon-view"></el-step>
            </el-steps>
          </div
          >
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div
          :style="{ height: mainHeight, background: '#FAFAFA' }"
        >
          <el-col :span="24">
            <div
              style="
                width: calc(100% + 17px);
                height: calc(100% + 17px);
                overflow: auto;
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
                {{ stepName }}
              </p>
              <!-- 基本信息 :rules="rules"-->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top: 10px"
                v-show="isShow1"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="设备名称" prop="devName">
                      <el-input
                        placeholder="请输入设备名称"
                        v-model="ruleForm.devName"
                        style="width: 100%"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="设备状态" prop="status">
                      <el-select
                        v-model="ruleForm.status"
                        placeholder="请选择当前状态"
                      >
                        <el-option label="未运行" value="未运行"></el-option>
                        <el-option label="运行中" value="运行中"></el-option>
                        <el-option label="维保中" value="维保中"></el-option>
                        <el-option label="已报废" value="已报废"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="设备种类" prop="devAttrName">
                      <el-select
                        v-model="ruleForm.devAttrName"
                        placeholder="请选择设备种类"
                      >
                        <el-option label="水泵、电机" value="水泵、电机"></el-option>
                        <el-option label="进水方向" value="进水方向"></el-option>
                        <el-option label="出水方向" value="出水方向"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="设备编码" prop="dCode">
                      <el-input
                        placeholder="请输入设备编码"
                        v-model="ruleForm.dCode"
                        style="width: 100%"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生产厂家" prop="manufacturer">
                      <el-input
                        placeholder="请输入生产厂家"
                        v-model="ruleForm.manufacturer"
                        style="width: 100%"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安装位置" prop="location">
                      <el-col :span="20">
                        <el-select
                          v-model="ruleForm.location"
                          placeholder="请选择安装位置"
                        >
                          <el-option
                            label="一期泵房"
                            value="一期泵房"
                          ></el-option>
                          <el-option
                            label="二期泵房"
                            value="二期泵房"
                          ></el-option>
                          <el-option
                            label="二期高压室"
                            value="二期高压室"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="机器型号" prop="model">
                      <el-input
                        placeholder="请输入机器型号"
                        v-model="ruleForm.model"
                        style="width: 100%"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 生命周期信息 -->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                class="demo-ruleForm"
                style="margin-top: 10px; margin-left: 20px"
                v-show="isShow2"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="到货时间">
                      <el-col :span="20">
                        <el-form-item prop="purchaseDate">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.purchaseDate"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="验收时间">
                      <el-col :span="20">
                        <el-form-item prop="installData">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.installData"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="启用时间">
                      <el-col :span="20">
                        <el-form-item prop="startData">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.startData"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="有效期至">
                      <el-col :span="20">
                        <el-form-item prop="ageLimit">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.ageLimit"
                            style="width: 100%"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="设定维保时间"
                      prop="repairTime"
                    >
                      <!-- <el-cascader
                        v-model="ruleForm.repairTime"
                        :options="times"
                        :show-all-levels="false"
                        placeholder="请选择时间"
                        clearable
                      ></el-cascader> -->
                      <el-select
                        v-model="ruleForm.repairTime"
                        placeholder="请选择时间"
                        @change="changeTime()"
                      >
                        <el-option
                          label="间隔时间"
                          value="间隔时间"
                        ></el-option>
                        <el-option
                          label="固定时间"
                          value="固定时间"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="选择时间间隔"
                      prop="repairTime"
                      v-show="isPick1"
                    >
                      <el-select
                        v-model="ruleForm.repairValue"
                        placeholder="请选择时间"
                        @change="changeTime()"
                      >
                        <el-option label="每10天" value="每10天"></el-option>
                        <el-option label="每20天" value="每20天"></el-option>
                        <el-option label="每30天" value="每30天"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="选择时间"
                      prop="repairTime"
                      v-show="isPick2"
                    >
                      <el-date-picker
                        type="dates"
                        v-model="timeValue"
                        placeholder="选择一个或多个日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 验收 -->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top: 10px"
                v-show="isShow3"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="验收意见" prop="equipmentIntroduction">
                      <el-col :span="20">
                        <el-input
                          :rows="6"
                          type="textarea"
                          v-model="ruleForm.equipmentIntroduction"
                        ></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="参验人员" prop="remark">
                      <el-col :span="20">
                        <el-input
                          type="textarea"
                          v-model="ruleForm.remark"
                        ></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 上传附件及图片-->
              <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top: 10px"
                v-show="isShow4"
              >
                <el-row>
                  <el-form-item label="上传设备图片" prop="devPicture">
                    <upload-pic :message="picList" @returnData="getPic"></upload-pic>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="使用说明书" prop="devDirect">
                      <upload-file :message2="directionList" @returnData="getDirectionFile"></upload-file>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="其他附件" prop="devDirect">
                      <upload-file :message2="otherList" @returnData="getOtherFile"></upload-file>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 预览 -->
              <table class="table" v-show="isShow5"
                     style="margin-left:10%;width:70%;height:100%;border:1px solid;align:center;font-size:10px;"
                     border cellspacing="0" cellpadding="9"
              >

                <tr align="center" float="left">
                  <td rowspan="4">
                    <div class="div1" style="font-size:15px">基本信息</div>
                  </td>
                  <td>设备名称</td>
                  <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                  <td style="width:30%"><input readonly v-model="ruleForm.devName" class="myInput"/></td>
                  <td>设备状态</td>
                  <td><input readonly v-model="ruleForm.status" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td>设备编码</td>
                  <td><input readonly v-model="ruleForm.dCode" class="myInput"/></td>
                  <td>设备种类</td>
                  <td><input readonly v-model="ruleForm.devAttrName" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td>生产厂家</td>
                  <td><input readonly v-model="ruleForm.manufacturer" class="myInput"/></td>
                  <td>机器型号</td>
                  <td><input readonly v-model="ruleForm.model" class="myInput"/></td>
                <tr align="center">
                  <td>安装位置</td>
                  <td colspan="3"><input readonly v-model="ruleForm.location" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td rowspan="3">
                    <div class="div1" style="font-size:15px">生命周期信息</div>
                  </td>
                  <td>到货时间</td>
                  <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                  <td><input readonly v-model="ruleForm.purchaseDate1" class="myInput"/></td>
                  <td>验收时间</td>
                  <td><input readonly v-model="ruleForm.installData1" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td>启用时间</td>
                  <td><input readonly v-model="ruleForm.startData1" class="myInput"/></td>
                  <td>有效期至</td>
                  <td><input readonly v-model="ruleForm.ageLimit1" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td>设定维保时间</td>
                  <!-- <td colspan="2"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                  <td colspan="3"><input readonly v-model="maintenanceTime" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td rowspan="2">
                    <div class="div1" style="font-size:15px">验收信息</div>
                  </td>
                  <td>验收意见</td>
                  <td colspan="3"><input readonly v-model="ruleForm.equipmentIntroduction" class="myInput"/></td>
                  <!-- <td ><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                <tr align="center" float="left">
                  <td>验收人员</td>
                  <!-- <td colspan="2"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                  <td colspan="3"><input readonly v-model="ruleForm.remark" class="myInput"/></td>
                </tr>
                <tr align="center" float="left">
                  <td rowspan="3">
                    <div class="div1" style="font-size:15px">附件</div>
                  </td>
                  <td>已上传图片</td>
                  <!-- <td colspan="3"><input readonly v-model="ruleForm.evaluationProject"  class="myInput"/></td> -->
                  <td colspan="3"><lookPic :message="ruleForm.equipmentPicture" ref="picChild"></lookPic></td>
                </tr>
                <tr align="center" float="left">
                  <td>已上传使用说明书</td>
                  <td colspan="3"><lookFile :message="ruleForm.file" ref="directionChild"></lookFile></td>
                </tr>
                <tr align="center" float="left">
                  <td>已上传附件</td>
                  <td colspan="3"><lookFile :message='ruleForm.runningTime' ref="fileChild"></lookFile></td>
                </tr>
              </table>
            </div>
          </el-col>
        </div>
        <el-col :span="16" :offset="8">
          <div>
            <el-button type="primary" :disabled="before" @click="lastStep()"
            >上一步
            </el-button
            >
            <el-button type="primary" :disabled="after" @click="nextStep()"
            >下一步
            </el-button
            >
            <el-button type="success" @click="submitForm('ruleForm')"
            >保存
            </el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { listLevelButLeaf } from '@/api/system/tree'
import {
  addDevtable,
  getDevtable,
  updateDevtable,
  listDevtable
} from '@/api/system/devtable'
import { getToken } from '@/utils/auth'
import equipmentTotal from '../life/equipmentTotal.vue'
import { getUserProfile } from '@/api/system/user'
import  UploadFile  from '../life/uploadFile2.vue'
import  UploadPic  from '@/views/life/uploadPic.vue'
import lookPic from './lookPic'
import lookFile from './lookFile'
export default {
  components: {
    equipmentTotal,
    UploadFile, UploadPic,lookPic,lookFile
  },
  props: {
    editValue: {
      type: Object,
      default: null
    }
  },
  data() {
    //自定义校验规则
    var checkId = (rule, value, callback) => {
      let checked = true
      if (!value) {
        return callback(new Error('编码不能为空'))
      } else {
        listDevtable({ devCode: value }).then((res) => {
          console.log(res.total)
          if (res.total != 0) {
            checked = false
          }
          if (checked) {
            return callback()
          } else {
            return callback(new Error('编码重复'))
          }
        })
      }
    }
    return {
      maintenanceTime:"",
      devCode: '',
      updateBy: '',
      editValue: '',
      dialogVisible1: false,
      timeValue: '',
      mainHeight: '',
      stepName: '基本信息',
      isShow1: true,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isPick1: false,
      isPick2: false,
      before: true,
      after: false,
      step: 0,
      ruleForm: {
        dCode: '',
        equipmentPicture: '',
        devAttrName: '',
        devName: '',
        model: '',
        manufacturer: '',
        location: '',
        purchaseDate: '',
        status: '未运行',
        installData: '',
        startData: '',
        ageLimit: '',
        repairTime: '',
        repairValue: '',
        timeValue: '',
        equipmentIntroduction: '',
        remark: '',
        value: '',
        file1:"",
        file:"",
        runningTime:"",
      },
      rules: {
        dCode: [{ required: true, validator: checkId, trigger: 'blur' }],
        devName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        purchaseDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        installData: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        startData: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        ageLimit: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ]
      },
      options: [],
      times: [
        {
          value: '间隔时间',
          label: '间隔时间',
          children: [
            {
              value: '每10天',
              label: '每10天'
            },
            {
              value: '每20天',
              label: '每20天'
            },
            {
              value: '每30天',
              label: '每30天'
            }
          ]
        },
        {
          value: '固定时间',
          label: '固定时间'
        }
      ],
      devId: '',
      directionList: '',
      otherList: '',
      picList: ''
    }
  },
  created() {
    this.init()
    this.getUser()
    this.selectDevTree()
  },
  watch: {
    editValue: {
      immediate: true,
      deep: true,
      handler: function(newData, oldData) {
        console.log('============newData===============')
        console.log(newData)
        this.devId = newData.id
        this.devCode = newData.devCode
        console.log(this.devCode)
        this.ruleForm.dCode = newData.devCode
        this.ruleForm.equipmentPicture = newData.equipmentPicture
        this.ruleForm.devAttrName = newData.devAttrName
        this.ruleForm.devName = newData.devName
        this.ruleForm.model = newData.model
        this.ruleForm.manufacturer = newData.manufacturer
        this.ruleForm.location = newData.location
        this.ruleForm.purchaseDate = newData.purchaseData
        this.ruleForm.status = newData.ustatus
        this.ruleForm.installData = newData.installData
        this.ruleForm.startData = newData.startData
        this.ruleForm.ageLimit = newData.ageLimit
        if (
          newData.lastRepaireTime != null &&
          newData.lastRepaireTime.indexOf('每') != -1
        ) {
          this.ruleForm.repairTime = '间隔时间'
          this.isPick1 = true
          this.isPick2 = false
          this.ruleForm.repairValue = newData.lastRepaireTime
        } else if (newData.lastRepaireTime != null && newData.lastRepaireTime != "") {
          this.ruleForm.repairTime = '固定时间'
          this.isPick1 = false
          this.isPick2 = true
          var a = newData.lastRepaireTime.split(',')
          console.log(a)
          this.timeValue = a
        }
        this.ruleForm.equipmentIntroduction = newData.equipmentIntroduction
        this.ruleForm.remark = newData.remark

        this.picList = newData.equipmentPicture
        this.directionList = newData.file
        this.otherList = newData.runningTime

        this.ruleForm.runningTime = newData.runningTime
        this.ruleForm.file = newData.file
        this.ruleForm.equipmentPicture = newData.equipmentPicture

        // var pic;
        // if (newData.equipmentPicture != null) {
        //   pic = JSON.parse(newData.equipmentPicture)
        //   console.log(pic);
        //   for(var i = 0;i<pic.length;i++){
        //     var array = {};
        //     array.name = pic[i].name;
        //     var url = "http://localhost:8080/profile/upload/"+pic[i].nowDate +"/"+ pic[i].name;
        //     array.url = url;
        //     this.picList.push(array);
        //   }
        //   var file;
        //   var fileName;
        //   if (newData.equipmentPicture != null) {
        //     file = JSON.parse(newData.file)
        //     console.log(file);
        //     for (var i = 0; i < file.length; i++) {
        //       var array = {};
        //       fileName = fileName+file[i].trueName+",";
        //       array.name = file[i].trueName;
        //       var url = "http://localhost:8080/profile/upload/" + file[i].nowDate + "/" + file[i].name;
        //       array.url = url;
        //       this.directionList.push(array);
        //     }
        //     this.ruleForm.file1 = fileName;
          }
        }
      },

  methods: {
    init() {
      //动态设置高度
      this.mainHeight = document.body.clientHeight * 0.5 + 'px'
    },
    getUser() {
      getUserProfile().then((response) => {
        this.updateBy = response.data.userName
        /* this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup; */
      })
    },
    //设备维保时间选择
    changeTime() {
      console.log('您选择了', this.ruleForm.repairTime)
      if (this.ruleForm.repairTime == '间隔时间') {
        this.isPick1 = true
        this.isPick2 = false
      }
      if (this.ruleForm.repairTime == '固定时间') {
        this.isPick1 = false
        this.isPick2 = true
      }
    },
    //上一步按钮
    lastStep() {
      switch (this.step) {
        case 4:
          this.step = 3
          this.stepName = '上传附件'
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = true
          this.isShow5 = false
          this.before = false
          this.after = false
          break
        case 3:
          this.step = 2
          this.stepName = '验收信息'
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = true
          this.isShow4 = false
          this.isShow5 = false
          this.before = false
          this.after = false
          break
        case 1:
          this.step = 0
          this.stepName = '基本信息'
          this.isShow1 = true
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = false
          this.isShow5 = false
          this.before = true
          this.after = false
          break
        case 2:
          this.step = 1
          this.stepName = '生命周期信息'
          this.isShow1 = false
          this.isShow2 = true
          this.isShow3 = false
          this.isShow4 = false
          this.isShow5 = false
          this.before = false
          this.after = false
          break
      }
    },
    //下一步按钮
    nextStep() {
      switch (this.step) {
        case 0:
          this.step = 1
          this.stepName = '生命周期信息'
          this.isShow1 = false
          this.isShow2 = true
          this.isShow3 = false
          this.isShow4 = false
          this.isShow5 = false
          this.before = false
          break
        case 1:
          this.step = 2
          this.stepName = '验收信息'
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = true
          this.isShow4 = false
          this.isShow5 = false
          this.before = false
          break
        case 2:
          this.step = 3
          this.stepName = '上传附件'
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = true
          this.isShow5 = false
          this.before = false
          this.after = false
          break
        case 3:
          this.step = 4
          this.stepName = ''
          this.isShow1 = false
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = false
          this.isShow5 = true
          this.before = false
          this.after = true
          this.setMaintenanceTime();
          this.$refs.picChild.watchFiles()
          this.$refs.directionChild.watchFiles()
          this.$refs.fileChild.watchFiles()
          break
      }
    },
    //设备维保时间格式
    setMaintenanceTime() {
      //到货时间
      if (this.formatDate(this.ruleForm.purchaseDate) == 'NaN-NaN-NaN') {
        this.ruleForm.purchaseDate1 = ''
      } else {
        this.ruleForm.purchaseDate1 = this.formatDate(
          this.ruleForm.purchaseDate
        )
      }
      //验收时间
      if (this.formatDate(this.ruleForm.installData) == 'NaN-NaN-NaN') {
        this.ruleForm.installData1 = ''
      } else {
        this.ruleForm.installData1 = this.formatDate(this.ruleForm.installData)
      }
      //启用时间
      if (this.formatDate(this.ruleForm.startData) == 'NaN-NaN-NaN') {
        this.ruleForm.startData1 = ''
      } else {
        this.ruleForm.startData1 = this.formatDate(this.ruleForm.startData)
      }
      //有效期至
      if (this.formatDate(this.ruleForm.ageLimit) == 'NaN-NaN-NaN') {
        this.ruleForm.ageLimit1 = ''
      } else {
        this.ruleForm.ageLimit1 = this.formatDate(this.ruleForm.ageLimit)
      }
      //维保时间格式
      if (this.ruleForm.repairTime == '间隔时间') {
        this.maintenanceTime = '间隔时间：' + this.ruleForm.repairValue;
      } else if (this.ruleForm.repairTime == '固定时间') {
        var a = ''
        for (var i = 0; i < this.ruleForm.timeValue.length; i++) {
          a = a + this.formatDate(this.ruleForm.timeValue[i]) + ','
        }
        this.maintenanceTime = '固定时间：' + a;
      }
    },
    //设备关联方法
    selectDevTree() {
      listLevelButLeaf().then((response) => {
        this.options = response
        console.log(this.options)
      })
    },
    handleChange(value) {
      this.ruleForm.value = checkedNodes[0].data.label
      console.log(value)
      this.ruleForm.orgId = value[value.length - 1]
      this.selectDevTreeId()
    },
    selectDevTreeId() {
      getDevtable(this.ruleForm.orgId).then((res) => {
        console.log('!' + res.data.devAttrCode)
        switch (res.data.devAttrCode) {
          case '10':
            this.ruleForm.devAttrCode = '1'
            break
        }
      })
    },
    //修改按钮
    submitForm(formName) {
      // console.log()
      // console.log(this.ruleForm.location == '二期高压室');
      //安装位置
      if (this.ruleForm.location == '一期泵房') {
        this.ruleForm.orgId = 2
      } else if (this.ruleForm.location == '二期泵房' || this.ruleForm.location == '二期高压室') {
        this.ruleForm.orgId = 3
      } else if (this.ruleForm.location == '') {
        this.ruleForm.orgId = 0
      }
      this.ruleForm.devAttrCode = '1'
      //设备表录入设备
      //到货时间
      // console.log(this.ruleForm.purchaseDate);
      this.ruleForm.id = this.devId
      this.ruleForm.updateBy = this.updateBy
      if (this.formatDate(this.ruleForm.purchaseDate) == 'NaN-NaN-NaN') {
        this.ruleForm.purchaseData = ''
      } else {
        this.ruleForm.purchaseData = this.formatDate(
          this.ruleForm.purchaseDate
        )
      }
      //验收时间
      if (this.formatDate(this.ruleForm.installData) == 'NaN-NaN-NaN') {
        this.ruleForm.installData = ''
      } else {
        this.ruleForm.installData = this.formatDate(this.ruleForm.installData)
      }
      //启用时间
      if (this.formatDate(this.ruleForm.startData) == 'NaN-NaN-NaN') {
        this.ruleForm.startData = ''
      } else {
        this.ruleForm.startData = this.formatDate(this.ruleForm.startData)
      }
      //有效期至
      if (this.formatDate(this.ruleForm.ageLimit) == 'NaN-NaN-NaN') {
        this.ruleForm.ageLimit = ''
      } else {
        this.ruleForm.ageLimit = this.formatDate(this.ruleForm.ageLimit)
      }
      //维保时间
      console.log(this.timeValue)
      if (this.ruleForm.repairTime == '固定时间') {
        var a = '';
        if(this.timeValue != null){
          for (var i = 0; i < this.timeValue.length; i++) {
            console.log(this.timeValue[i]);
            if(this.timeValue[i] != "") {
              a = a + this.formatDate(this.timeValue[i])
              if (i !== this.timeValue.length - 1) {
                a += ','
              }
            }
          }
        }
        this.ruleForm.lastRepaireTime = a
      } else if (this.ruleForm.repairTime == '间隔时间') {
        this.ruleForm.lastRepaireTime = this.ruleForm.repairValue
      } else {
        this.ruleForm.lastRepaireTime = ''
      }

      //设备编码
      this.ruleForm.devCode = this.ruleForm.dCode
      //状态
      switch (this.ruleForm.status) {
        case '未运行':
          this.ruleForm.useStatus = -1
          break
        case '运行中':
          this.ruleForm.useStatus = 0
          break
        case '维保中':
          this.ruleForm.useStatus = -2
          break
        case '已报废':
          this.ruleForm.useStatus = -3
          break
      }
      //父级节点
      /*if (this.ruleForm.value == '') {
        this.ruleForm.orgId = 0
      }*/
      let aData = new Date()
      let dateValue = this.formatDate(aData)
      this.ruleForm.editTime = dateValue

      // this.ruleForm.equipmentPicture = JSON.stringify(this.picList)
      // this.ruleForm.file = JSON.stringify(this.directionList)

      console.log(this.ruleForm)
      updateDevtable(this.ruleForm).then((response) => {
        this.$modal.msgSuccess('修改成功')
      })
    },
    //日期转换方法
    formatDate(d) {
      var date = new Date(d)
      var YY = date.getFullYear() + '-'
      var MM =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return YY + MM + DD
    },
    //时间戳格式化为yyyy/MM/dd
    // formatDate2(d) {
    //   var date = new Date(d)
    //   var YY = date.getFullYear() + '/'
    //   var MM =
    //     (date.getMonth() + 1 < 10
    //       ? '0' + (date.getMonth() + 1)
    //       : date.getMonth() + 1) + '/'
    //   var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    //   return YY + MM + DD
    // },
    watchForm() {
      // 组件赋值
      // console.log(this.dCode);
      // console.log(this.ruleForm.dCode);
      // this.ruleForm.dCode = this.devCode;
      // this.editValue = this.ruleForm;
      // console.log(this.editValue);
      // this.dialogVisible1 = true;
      // console.log("预览页面");
      this.dialogVisible1 = true
    },
    closeDialog(text) {
      this.dialogVisible1 = text
      this.editValue = null
    },
    closeTable() {
      this.dialogVisible1 = false
    },
    getPic(val) {
      console.log('val', val)
      this.ruleForm.equipmentPicture = JSON.stringify(val)
    },
    getDirectionFile(val) {
      console.log('getApplyFile', val)
      this.ruleForm.file = JSON.stringify(val)
    },
    getOtherFile(val) {
      console.log('getApplyFile', val)
      this.ruleForm.runningTime = JSON.stringify(val)
    },

  }
}
</script>
<style>
.myInput {
  font-size: 12px;
  width: 100%;
  height: 100%;
  border: none;
  float: left;
  zoom: 1;
  outline: medium;
  background: #FAFAFA;
}
</style>
