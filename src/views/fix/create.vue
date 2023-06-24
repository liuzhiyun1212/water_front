<template>
  <div class="app-container home">
    <el-dialog
      title="设备信息"
      :visible.sync="dialogVisible1"
      width="80%"
      :show-close="false"
    >
      <!--      <preview :editValue="editValue" @dialogClose="closeDialog" />-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeTable()">关 闭</el-button>
      </span>
    </el-dialog>

    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple">

          <el-steps :active="stepActiveIndex">
            <el-step title="故障信息" style="cursor: pointer;" @click.native="jumpStep(0)" icon="el-icon-edit"
            ></el-step>
            <el-step title="图片和附件" style="cursor: pointer;" @click.native="jumpStep(1)" icon="el-icon-upload"
            ></el-step>
            <el-step title="检修" style="cursor: pointer;" @click.native="jumpStep(2)" icon="el-icon-setting"
            ></el-step>
            <el-step title="维保金额" style="cursor: pointer;" @click.native="jumpStep(3)" icon="el-icon-first-aid-kit"
            ></el-step>
            <el-step title="维保方式" style="cursor: pointer;" @click.native="jumpStep(4)" icon="el-icon-set-up"
            ></el-step>
            <el-step title="派工单" style="cursor: pointer;" @click.native="jumpStep(5)" icon="el-icon-tickets"
            ></el-step>
            <el-step title="验收与审核 " style="cursor: pointer;" @click.native="jumpStep(6)" icon="el-icon-aim"
            ></el-step>
            <el-step title="总览 " style="cursor: pointer;" @click.native="jumpStep(7)" icon="el-icon-view"
            ></el-step>
            <!--            <el-step title="查看" style="cursor: pointer;"  icon="el-icon-picture"></el-step>-->
            <!--            <el-step title="查看" style="cursor: pointer;" @click.native="jumpStep(6)" icon="el-icon-picture"></el-step>-->
            <!--            <el-step title="附件上传" style="cursor: pointer;" @click.native="jumpStep(6)" icon="el-icon-picture"></el-step>-->
            <!--            <el-step title="维修审核" style="cursor: pointer;" @click.native="jumpStep(7)" icon="el-icon-picture"></el-step>-->
          </el-steps>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>


    <div>

      <div v-show="shows[0].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-page-header @back="goBack()" title="返回" content="维保 > 故障信息">
                </el-page-header>

                <div style="margin: 20px;"></div>


                <el-form ref="basicInfoForm" label-position="right" :rules="basicRules" label-width="110px"
                         :model="basicInfoForm"
                >
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="维保名称" prop="name">
                          <el-input v-model="basicInfoForm.name" placeholder="请输入" :disabled="mainflag"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="维保等级">
                          <el-select
                            v-model="basicInfoForm.level"
                            collapse-tags
                            placeholder="请选择"
                            style="width:100%"
                            :disabled="mainflag"
                          >
                            <el-option
                              label="一级"
                              value="一级"
                            >
                            </el-option>
                            <el-option
                              label="二级"
                              value="二级"
                            >
                            </el-option>
                            <el-option
                              label="三级"
                              value="三级"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>


                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <!--                        {{ basicInfoForm.chargePeople }}-->
                        <el-form-item label="负责人" prop="chargePeople">

                          <el-cascader
                            style="width:100%"
                            ref="chargePeopleCascader"
                            :show-all-levels="false"
                            placeholder="选择部门"
                            :options="departmentOptions"
                            v-model="basicInfoForm.chargePeople"
                            filterable
                            @change="showWorkPeople"
                            :disabled="mainflag"
                          >
                          </el-cascader>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="实施人"
                                      :disabled="mainflag"
                        >
                          <!--                          <el-select-->
                          <!--                            v-model="basicInfoForm.executePeople"-->
                          <!--                            multiple-->
                          <!--                            placeholder="请选择"-->
                          <!--                            style="width:100%"-->
                          <!--                          >-->
                          <!--                            <el-option-->
                          <!--                              v-for="item in peopleOption"-->
                          <!--                              :key="item.value"-->
                          <!--                              :label="item.label"-->
                          <!--                              :value="item.value"-->
                          <!--                            >-->
                          <!--                            </el-option>-->
                          <!--                          </el-select>-->
                          <!--                          <el-cascader-->
                          <!--                            style="width:100%"-->
                          <!--                            ref="executePeopleCascader"-->
                          <!--                            :show-all-levels="false"-->
                          <!--                            placeholder="选择部门"-->
                          <!--                            :options="departmentOptions"-->
                          <!--                            v-model="basicInfoForm.executePeople"-->
                          <!--                            filterable-->
                          <!--                          >-->
                          <!--                          </el-cascader>-->
                          <el-input v-model="basicInfoForm.executePeople" placeholder="请输入"
                                    :disabled="mainflag"
                          ></el-input>

                        </el-form-item>

                      </div>
                    </el-col>
                  </el-row>


                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="检修时间" prop="fixDate">
                          <el-date-picker
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            style="width:100%"
                            v-model="basicInfoForm.fixDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :disabled="mainflag"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="维保计划类型">
                          <el-select
                            v-model="basicInfoForm.planType"
                            collapse-tags
                            placeholder="请选择"
                            style="width:100%"
                            :disabled="mainflag"
                          >
                            <el-option
                              label="临时计划"
                              value="临时计划"
                            >
                            </el-option>
                            <el-option
                              label="常规计划"
                              value="常规计划"
                            >
                            </el-option>
                            <el-option
                              label="特殊计划"
                              value="特殊计划"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>


                  <el-row :gutter="20">
                    <el-col :span="13" :offset="1">
                      <div class="grid-content bg-purple">
                        <el-form-item label="设备名称和编码">
                          <el-cascader
                            style="width:100%"
                            ref="equipmentCascader"
                            placeholder="试试搜索：电机"
                            :options="equipmentOptions"
                            v-model="equipmentId"
                            @change="addEquipment"
                            filterable
                            :disabled="mainflag"
                          >
                          </el-cascader>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                </el-form>

                <el-form :model="equipmentForm"  :status-icon="true" :rules="equipmentRules" ref="equipmentForm"  class="demo-ruleForm">
                  <el-row :gutter="20">
                    <el-col :span="22" :offset="1" style="border-width: 2px;border-radius: 4px">
                      <div class="grid-content bg-purple">
                        <!--                        {{equipmentForm.equipmentData}}-->
                        <el-table
                          :data="equipmentForm.equipmentData"
                          style="width: 100%"
                        >
                          <el-table-column
                            prop="name"
                            label="名称"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column
                            prop="code"
                            label="编号"
                            width="180"
                          >
                          </el-table-column>
                          <el-table-column
                            label="故障类型"
                          >
                            <template slot="header" slot-scope="scope">
                              <p style="color: red;font-size: 15px;display: inline">*</p>故障类型

                            </template>
                            <template slot-scope="scope">
                              <el-form-item style="margin: 0px;padding: 0px" :prop="'equipmentData.' + scope.$index + '.state'" :rules="equipmentRules.state">
                                <el-select v-model="scope.row.state" placeholder="请选择" :disabled="mainflag">
                                  <el-option
                                    v-for="item in faultCauseOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="操作"
                          >
                            <template slot-scope="scope">
                              <el-link type="primary" @click="deleteEquipment(scope.$index)" :disabled="mainflag">删除
                              </el-link>
                            </template>

                          </el-table-column>
                        </el-table>

                      </div>
                    </el-col>
                  </el-row>


                  <div class="grid-content bg-purple" style="float: right;margin: 10px 0px">
                    <!--                    <el-button type="success" @click="validateEquipmentState('equipmentForm')">校验</el-button>-->


                    <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                    <el-button type="primary" @click="nextStep(0)">下一步</el-button>
                    <!--                        <el-button type="primary" @click="submitForm('basicInfoForm',0)">下一步</el-button>-->
                  </div>


                </el-form>



              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-show="shows[1].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">


                <el-page-header @back="goBack()" content="维保 > 图片和附件 ">
                </el-page-header>
                <div style="margin: 20px;"></div>
                <el-form>
                  <el-row :gutter="15">
                    <el-col :span="12">
                      <el-form-item label="上传照片(维修前)">
                        <!--                        <upload-pic :message="plan.previousPic" @returnData="getBeforePic"></upload-pic>-->
                        <upload-pic :message="plan.previousPic" @returnData="getBeforePic"></upload-pic>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="上传照片(维修后)">
                        <upload-pic :message="plan.subsequentPic" @returnData="getAfterPic"></upload-pic>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row :gutter="15">
                    <el-col :span="24">
                      <el-form-item label="附件">
                        <UploadFile :message2="plan.applyAccessory" @returnData="getApplyFile"></UploadFile>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="15">
                    <!--                    <el-col :span="24">-->
                    <!--                      <el-form-item label="审核附件" >-->
                    <!--                        <UploadFile :message2="plan.auditAccessor" @returnData="getAuditFile"></UploadFile>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                  </el-row>
                  <el-row :gutter="15">
                    <!--                    <el-col :span="24">-->
                    <!--                      <el-form-item label="验收附件" >-->
                    <!--                        <UploadFile :message2="plan.checkAccessor" @returnData="getCheckFile"></UploadFile>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                  </el-row>
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item label="审核附件">-->
                  <!--                        <UploadFile :message2="JSON.stringify(applyFile)" @returnData="getApplyFile"></UploadFile>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item label="验收附件">-->
                  <!--                        <UploadFile :message2="JSON.stringify(applyFile)" @returnData="getApplyFile"></UploadFile>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->


                  <el-form-item style="float: right">
                    <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                    <el-button type="primary" @click="preStep(1)">上一步</el-button>
                    <el-button type="primary" @click="nextStep(1)">下一步</el-button>
                    <!--                    <el-button type="primary" @click="preStep(5)">上一步</el-button>-->
                    <!--                    <el-button type="primary" @click="nextStep(5)">下一步</el-button>-->
                  </el-form-item>
                </el-form>


              </el-card>
            </div>
          </el-col>
        </el-row>

      </div>

      <div v-show="shows[2].value" v-if="isShowMaintainStyle">
        <!--        <maintenanceMode :preStep="preStep" :nextStep="nextStep"-->
        <!--                         :company="plan.company"-->
        <!--                         @maintenanceMode="getmaintenanceMode"-->
        <!--                         @save="submitForm('basicInfoForm') "-->
        <!--        />-->
        <el-row>
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">

                <el-page-header @back="goBack()" title="返回" content="维保 > 检修">
                </el-page-header>
                <div style="margin: 20px;"></div>
                <el-form ref="partForm" :model="partForm" :rules="basicRules" label-position="right"
                         label-width="110px"
                >
                  <el-form-item label="检修项目">
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="请输入内容"
                      v-model="maintenanceContent"
                      style="width:95%"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="维保情况">
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="请输入内容"
                      v-model="maintenanceCase"
                      style="width:95%"
                    >
                    </el-input>
                  </el-form-item>

                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <el-form-item label="备件名称">
                          <el-select
                            v-model="partObject"
                            placeholder="请选择"
                            style="width:100%"
                            @change="selectPartMax"
                          >
                            <el-option
                              v-for="item in partOption"
                              :key="item.id"
                              :label="item.name+'/'+item.code+'/库存数:'+item.num"
                              :value="JSON.stringify({
                                id: item.id,
                                name:item.name,
                                code:item.code,
                                maxNum:item.num,
                                associatedDevices:item.associatedDevices
                              })"
                            >
                              <span style="float: left">{{ item.name + ' ' + item.code }}</span>
                              <span style="float: right; color: #8492a6; font-size: 13px">{{ '库存数量' + item.num }}</span>

                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                        <el-form-item label="调拨数量" prop="partNum">
                          <el-input-number v-model="partNum" :disabled="numDisabled" :min="1" :max="partMaxNum"
                                           label="数量" style="width:150px"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <el-form-item label="单价" prop="partPrice">
                          <el-input v-model="partForm.partPrice" :disabled="numDisabled" oninput="value=value.replace(/[^\d.]/g, '')" :min="1"
                                    placeholder="请输入金额"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="1" style="margin-top: 10px;">元</el-col>
                    <el-col :span="2">
                      <el-button style="margin-left: 10px" type="success" @click="addPart('partForm')">添加</el-button>
                    </el-col>
                    <!--                    <el-col :span="4">-->
                    <!--                      <el-button type="success" @click="addPart('partForm')" >添加</el-button>-->
                    <!--                    </el-col>-->
                  </el-row>
                </el-form>


                <el-row :gutter="20">
                  <el-col :span="22" :offset="1" style="border-width: 2px;border-radius: 4px">
                    <div class="grid-content bg-purple">

                      <el-table
                        :data="partData"
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="name"
                          label="备件名称"
                          width="180"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="code"
                          label="备件编号"
                          width="180"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="num"
                          label="调拨数量"
                        >
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                          prop="singleAmount"-->
                        <!--                          label="单价"-->
                        <!--                        >-->
                        <!--                        </el-table-column>-->
                        <el-table-column
                          prop="amount"
                          label="金额"
                        >
                        </el-table-column>
                        <el-table-column
                          label="操作"
                        >
                          <template slot-scope="scope">
                            <el-link type="primary" @click="deletePart(scope.$index,scope.row)">删除</el-link>
                          </template>
                        </el-table-column>
                      </el-table>

                    </div>
                  </el-col>
                </el-row>
                <div class="grid-content bg-purple" style="float: right;margin: 10px 0px">
                  <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                  <el-button type="primary" @click="preStep(2)">上一步</el-button>
                  <el-button type="primary" @click="nextStep(2)">下一步</el-button>
                </div>


              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-show="shows[3].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">

                <el-page-header @back="goBack()" content="维保 > 维保金额"/>
                <el-form>
                  <el-row>
                    <el-col :span="2" :offset="20">
                      <el-button style="margin: 10px" type="success" @click="addAmountDetailFormVisible=true">添加明细
                      </el-button>
                    </el-col>
                  </el-row>


                  <el-dialog title="添加明细" :visible.sync="addAmountDetailFormVisible">
                    <el-form :model="addAmountDetailForm" ref="addAmountDetailForm" :rules="basicRules"
                             :label-position="'right'" label-width="100px"
                    >
                      <el-form-item label="明细名称" prop="amountName">
                        <!--                      <el-form-item label="明细名称" required>-->
                        <el-input style="text-align: center" v-model="addAmountDetailForm.amountName"
                                  placeholder="请输入明细名称"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="明细金额" prop="amount">
                        <!--                      <el-form-item label="明细金额" required>-->
                        <!--                        <el-input v-model="addAmountDetailForm.amount"  oninput="value=value.replace(/[^\d.]/g, '')" :min="1"-->
                        <!--                                  placeholder="请输入金额"></el-input>-->

                        <el-input-number style="width:95%;text-align:left" :precision="2"
                                         v-model="addAmountDetailForm.amount" placeholder="请输入明细金额"
                                         controls-position="right" :min="0"
                        ></el-input-number>元
                      </el-form-item>
                      <el-form-item label="备注" prop="amountRemark">
                        <!--                      <el-form-item label="备注"  required>-->
                        <el-input type="textarea" :autosize="{minRows:4}" v-model="addAmountDetailForm.amountRemark"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cleanAmountDetailForm">取 消</el-button>
                      <el-button type="primary" @click="addAmountDetail('addAmountDetailForm')">添加</el-button>
                    </div>
                  </el-dialog>

                  <el-row>

                    <el-col :span="22" :offset="1">
                      <el-table
                        :data="amountData"
                        style="width: 100%"
                      >
                        <el-table-column
                          type="index"
                          label="序号"
                          width="180"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="expenseName"
                          label="明细名称"
                          width="180"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="expenseAmount"
                          label="明细金额"
                          width="180"
                        >
                        </el-table-column>
                        <el-table-column
                          label="备注"
                          width="180"
                        >
                          <template slot-scope="scope">
                            <el-popover
                              placement="top-start"
                              width="200"
                              trigger="hover"
                              :content="scope.row.expenseRemark">
                              <p slot="reference">{{scope.row.expenseRemark.substring(0,10)}}</p>

                            </el-popover>
                            <!--                              <el-select v-model="scope.row.state" placeholder="请选择" :disabled="mainflag">-->
                            <!--                                <el-option-->
                            <!--                                  v-for="item in faultCauseOption"-->
                            <!--                                  :key="item.value"-->
                            <!--                                  :label="item.label"-->
                            <!--                                  :value="item.value"-->
                            <!--                                >-->
                            <!--                                </el-option>-->
                            <!--                              </el-select>-->
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                        >
                          <template slot-scope="scope">
                            <el-link type="primary" @click="deleteAmountDetail(scope.$index)">删除
                            </el-link>
                          </template>

                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8.5" :offset="1">
                      <p
                        style="
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  display: inline-block;
                  margin-left: 20px;
                "
                      >
                        总金额为
                      </p>

                      <div style="display:inline-block;margin-left: 20px;">
                        <el-input v-model="sumAmount" disabled oninput="value=value.replace(/[^\d]/g, '')" :min="1"
                                  placeholder="总金额"
                        />
                      </div>
                    </el-col>
                    <el-col :span="0.5" style="margin-top: 20px">元</el-col>
                  </el-row>
                  <div class="grid-content bg-purple" style="float: right;margin: 40px 0px">
                    <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                    <el-button type="primary" @click="preStep(3)">上一步</el-button>
                    <el-button type="primary" @click="nextStep(3)">下一步</el-button>
                  </div>
                </el-form>


              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>


      <div v-show="shows[4].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-page-header @back="goBack()" content="维保 > 维保方式 ">
                </el-page-header>
                <div style="margin: 20px;"></div>
                <el-form label-position="right" label-width="110px">
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <!--                    {{selectedMode}}-->
                      <el-form-item label="选择维修方式">
                        <el-select v-model="selectedMode" class="m-2">
                          <el-option v-for="item in modes" :key="item.value" :label="item.label"
                                     :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <!--                    {{selectedMode}}-->
                      <!--                      <el-form-item label="预估金额">-->
                      <!--                        <el-input v-model="basicInfoForm.budget" oninput="value=value.replace(/[^\d]/g, '')" :min="1"-->
                      <!--                                  placeholder="请输入金额"-->
                      <!--                        />-->
                      <!--                      </el-form-item>-->
                    </el-col>
                    <!--                    <el-col :span="1"><p style="font-family: Arial; display: inline-block">元</p></el-col>-->

                  </el-row>
                  <!--                {{companyId}}-->
                  <el-row :gutter="20">
                    <el-col :span="22" :offset="1" style="border-width: 2px;border-radius: 4px">
                      <el-table :data="collaboratorList" style="width: 100%" v-show="showThirdParty"
                                @row-click="clickRow"
                      >
                        <el-table-column label="选择" width="100%">
                          <template slot-scope="scope">
                            <el-radio @click.native.prevent="chooesCompany(scope.row)" :label="scope.row.companyId"
                                      v-model="companyId"
                            >{{ ' ' }}
                            </el-radio>
                          </template>
                        </el-table-column>
                        <!-- <el-table-column label="序号">
                          <template slot-scope="scope">{{ tableIndex(scope) }}</template>
                        </el-table-column> -->
                        <el-table-column prop="companyId" label="公司id" v-if="false">
                        </el-table-column>
                        <el-table-column prop="companyName" label="公司名称">
                          <!--                          <template slot-scope="scope">-->
                          <!--                            <el-link type="primary" size="small" @click="getDetail(scope.row.companyName)">-->
                          <!--                              {{ scope.row.companyName }}-->
                          <!--                            </el-link>-->
                          <!--                          </template>-->
                        </el-table-column>
                        <el-table-column prop="linkName" label="联系人">
                        </el-table-column>
                        <el-table-column prop="tel" label="联系方式">
                        </el-table-column>
                        <el-table-column label="合作记录" width="90" fixed="right">
                          <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="getDetail(scope.row.companyName)">
                              查看
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <!-- 分页 -->
                      <pagination v-show="showPagination>0" :total="total" :page.sync="queryParams.pageNum"
                                  :limit.sync="queryParams.pageSize" :page-sizes="[5, 10, 15, 20]" :page-size="5"
                                  @pagination="getList"
                      />
                    </el-col>
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
                        <el-table-column
                          prop="name"
                          label="维保名称"
                          width="180"
                        >
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                          prop="company"-->
                        <!--                          label="维保单位"-->
                        <!--                          width="180"-->
                        <!--                        >-->
                        <!--                        </el-table-column>-->
                        <!--                        <el-table-column-->
                        <!--                          prop="maintenanceCase"-->
                        <!--                          label="维保情况"-->
                        <!--                        >-->
                        <!--                        </el-table-column>-->
                        <el-table-column
                          prop="fixdate"
                          label="维保时间"
                        >
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                          prop="chargePeople"-->
                        <!--                          label="负责人"-->
                        <!--                        >-->
                        <!--                        </el-table-column>-->
                        <el-table-column label="维保记录" width="130px">
                          <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="showPlanDetail(scope.row.name)">查看</el-button>
                          </template>
                        </el-table-column>
                      </el-table>

                      <el-dialog title="维保计划详情"  width="900px" :visible.sync="isShowPlanDetail" append-to-body>
                        <table class="table"
                               style="margin-left:10%;width:20%;height:100%;border:1px solid;align:center;font-size:20px;"
                               border cellspacing="0" cellpadding="9"
                        >
                          <caption style="font-size:20px;font-weight:bold;">维保单</caption>
                          <tr class="tableFont">
                            <td style="border-left:0px;font-size:12px">维保名称</td>
                            <td colspan="2"><input readonly v-model="detailData.name" class="myInput"/></td>
                            <td style="width:120px;font-size:12px">维保等级</td>
                            <td colspan="2"><input readonly v-model="detailData.level" class="myInput"/></td>
                          </tr>
                          <tr class="tableFont">
                            <td style="border-left:0px;font-size:12px">负责人</td>
                            <td colspan="2"><input readonly v-model="detailData.chargePeople" class="myInput"/></td>
                            <td style="width:120px;font-size:12px">实施人</td>
                            <td colspan="2"><input readonly v-model="detailData.executePeople" class="myInput"/></td>
                          </tr>
                          <tr class="tableFont">
                            <td style="border-left:0px;font-size:12px">检修时间</td>
                            <td colspan="2"><input readonly v-model="detailData.fixdate" class="myInput"/></td>
                            <td style="width:120px;font-size:12px">维保计划类型</td>
                            <td colspan="2"><input readonly v-model="detailData.planType" class="myInput"/></td>
                          </tr>
                          <tr class="tableFont">
                            <td colspan="7" style="border-left:0px;border-bottom: 0px;">
                              <div readonly align="left" style="margin-right:10px;font-size:12px">设备列表:</div>
                              <el-table
                                ref="singleTable"
                                :data="planList"
                                highlight-current-row
                                style="width: 100%;border:0px;font-size: 12px"
                                :header-cell-style="{
                      fontSize: '12px',
                      }">
                                <el-table-column
                                  property="name"
                                  label="名称"
                                  width="200"

                                >
                                </el-table-column>
                                <el-table-column
                                  property="code"
                                  label="编号"
                                  width="200"
                                >
                                </el-table-column>
                                <el-table-column
                                  property="state"
                                  label="故障类型"
                                  width="200"
                                >
                                </el-table-column>
                              </el-table>
                            </td>
                          </tr>
                          <tr class="tableFont"   float="left">
                            <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">检修项目：
                              <input  readonly v-model="detailData.maintenanceContent" style="margin-bottom:10px;margin-top:8px;font-size:12px" class="myInput"/>
                            </div>
                            </td>
                          </tr>
                          <tr class="tableFont"   float="left">
                            <td colspan="6" style="border-left:0px;"><div readonly style="margin-left:10px;margin-top:5px;font-size:12px">维保情况：
                              <input  readonly v-model="detailData.maintenanceCase" style="margin-bottom:10px;margin-top:8px;font-size:12px" class="myInput"/>
                            </div>
                            </td>
                          </tr>
                          <tr class="tableFont"   float="left">
                            <td colspan="7"  style="border-left:0px;font-size:12px">
                              <div  readonly align="left" style="font-size:12px;margin-left: 10px;">备件:</div>
                              <el-table
                                ref="singleTable"
                                :data="planLis"
                                highlight-current-row
                                style="width: 100%;font-size: 12px"
                                :header-cell-style="{
                      fontSize: '12px',
                      }">
                                <el-table-column
                                  property="name"
                                  label="备件名称"
                                  width="200"
                                >
                                </el-table-column>
                                <el-table-column
                                  property="code"
                                  label="备件编号"
                                  width="200"
                                >
                                </el-table-column>
                                <el-table-column
                                  property="num"
                                  label="调拨数量"
                                  width="200"
                                >
                                </el-table-column>
                              </el-table></td>
                          </tr>
                          <tr class="tableFont" float="left">
                            <td colspan="7" style="border-left:0px;font-size:12px">
                              <div readonly align="left" style="margin-right:10px;font-size:12px">金额明细:</div>
                              <el-table
                                ref="singleTable"
                                :data="amountData"
                                highlight-current-row
                                style="width: 100%;font-size: 12px"
                                :header-cell-style="{
                      fontSize: '12px',
                      }"
                              >
                                <el-table-column
                                  type="index"
                                  label="序号"
                                  width="100"
                                >
                                </el-table-column>
                                <el-table-column
                                  prop="expenseName"
                                  label="明细名称"
                                  width="200"
                                >
                                </el-table-column>
                                <el-table-column
                                  prop="expenseAmount"
                                  label="明细金额"
                                  width="200"
                                >
                                </el-table-column>
                                <el-table-column
                                  prop="expenseRemark"
                                  label="备注"
                                  width="200"
                                >
                                </el-table-column>
                              </el-table>
                            </td>
                          </tr>
                          <tr class="tableFont">
                            <td colspan="2" style="border-left:0px;font-size:12px">维修方式</td>
                            <td><input readonly v-model="detailData.company" class="myInput"/></td>
                            <td style="font-size:12px">预估金额</td>
                            <td colspan="2" >
                              <div style="font-size: 12px;float: left; border: none;zoom: 1;outline: medium;">{{detailData.budget}}元</div>
                            </td>
                          </tr>
                          <tr class="tableFont">
                            <td colspan="6" style="border-left:0px;">
                              <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修前）：
                                <!--          <input  readonly v-model="detailData.previousPic" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
                                <!--          <input  readonly v-model="detailData.previousPic" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->

                                <look-pic :message="detailData.previousPic" ref="beforePicChild"></look-pic>
                                <!-- <upload-pic :message="detailData.previousPic" ></upload-pic> -->
                              </div>
                            </td>
                          </tr>
                          <tr class="tableFont" >
                            <td colspan="6" style="border-left:0px;">
                              <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修后）：
                                <!--          <input  readonly v-model="detailData.subsequentPic" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
                                <!--          <input  readonly v-model="detailData.subsequentPic" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
                                <!-- <upload-pic  :message="detailData.subsequentPic" ></upload-pic> -->

                                <look-pic :message="detailData.subsequentPic" ref="afterPicChild"></look-pic>

                              </div>
                            </td>
                          </tr>
                          <tr class="tableFont" >
                            <td colspan="6" style="border-left:0px;">
                              <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">附件：
                                <!--          <input  readonly v-model="detailData.applyAccessory" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
                                <look-file :message="detailData.applyAccessory" ref="fileChild"></look-file>
                              </div>
                            </td>
                          </tr>
                          <tr class="tableFont,processTable" align="center">
                            <td colspan="2" style="border-left:0px;font-size:15px">审核流程</td>
                            <td colspan="6">
                              <el-table
                                ref="singleTable"
                                :cell-class-name="auditClass"
                                :data="auditList"
                                highlight-current-row
                                style="width: 100%;border:0px;"
                                :header-cell-style="{
                      fontSize: '12px',
                      }">
                                <el-table-column
                                  property="name"
                                  label="姓名"
                                  width="200"
                                >
                                  <template slot-scope="scope">
                                    <i class="el-icon-document"></i>
                                    <span style="margin-left: 10px">{{ scope.row.name }} </span>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  property="suggestion"
                                  label="意见"
                                  width="200"
                                >
                                </el-table-column>
                              </el-table>
                            </td>
                          </tr>
                          <tr class="tableFont" >
                            <td colspan="6" style="border-left:0px;">
                              <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">备注：
                                <input readonly v-model="detailData.remark" style="margin-bottom:10px;margin-top:8px"
                                       class="myInput"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr class="tableFont,processTable" align="center">
                            <td colspan="2" style="border-left:0px;font-size:15px">验收流程</td>
                            <td colspan="6">
                              <el-table
                                ref="singleTable"
                                :cell-class-name="acceptClass"
                                :data="acceptList"
                                highlight-current-row
                                style="width: 100%;border:0px;"
                                :header-cell-style="{
                      fontSize: '12px',
                      }"
                              >
                                <el-table-column
                                  property="name"
                                  label="姓名"
                                  width="200"
                                >
                                  <template slot-scope="scope">
                                    <i class="el-icon-document"></i>
                                    <span style="margin-left: 10px">{{ scope.row.name }} </span>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  property="suggestion"
                                  label="意见"
                                  width="200"
                                >
                                </el-table-column>
                              </el-table>
                            </td>
                          </tr>
                          <tr class="tableFont">
                            <td colspan="6" style="border-left:0px;">
                              <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">备注：
                                <input readonly v-model="detailData.acceptRemark"
                                       style="margin-bottom:10px;margin-top:8px" class="myInput"
                                />
                              </div>
                            </td>
                          </tr>
                        </table>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="isShowPlanDetail = false">取 消</el-button>
                          <el-button type="primary" @click="isShowPlanDetail = false">确 定</el-button>
                        </div>
                      </el-dialog>

                      <div slot="footer" class="dialog-footer">
                        <el-button @click="open = false">取 消</el-button>
                        <el-button type="primary" @click="open = false">确 定</el-button>
                      </div>
                    </el-dialog>


                  </el-row>
                  <div class="grid-content bg-purple" style="float: right;margin: 40px 0px">
                    <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                    <el-button type="primary" @click="preStep(4)">上一步</el-button>
                    <el-button type="primary" @click="nextStep(4)">下一步</el-button>
                  </div>
                </el-form>


              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 审核流程 -->
      <div v-show="shows[5].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-page-header @back="goBack()" content="维保 > 派工单 ">
                </el-page-header>
                <div style="margin: 20px;"></div>

                <!--                <el-empty description="描述文字" v-if="selectedMode!==2"></el-empty>-->
                <el-empty description="无派工单" v-if="companyId===''||selectedMode!==2"></el-empty>
                <el-form label-position="right" v-else label-width="110px">
                  <el-row :gutter="20">
                    <table class="table"
                           style="margin-left:10%;width:80%;height:100%;border:1px solid;align:center;font-size:20px;"
                           border cellspacing="0" cellpadding="9"
                    >
                      <caption style="font-size:20px;">项目派工单</caption>
                      <tr align="center">
                        <td style="width:100px;font-size:12px;">项目名称</td>
                        <td style="" colspan="7"><input disabled
                                                        v-model="basicInfoForm.name"
                                                        class="myInput"
                        /></td>
                      </tr>

                      <tr align="center">
                        <td style="font-size:12px;">项目类别</td>
                        <td style=""><input disabled
                                            v-model="basicInfoForm.planType"
                                            class="myInput"
                        /></td>
                        <td style="width:100px;font-size:12px;">项目负责人</td>
                        <td style=""><input disabled
                                            v-model="form.leader"
                                            class="myInput" style="width:120px;"
                        /></td>
                        <td style="width:80px;font-size:12px;">编号</td>
                        <td><input v-model="form.numberid" class="myInput" placeholder="请输入编号"/></td>
                      </tr>

                      <tr align="center">
                        <td style="font-size:12px;">发出单位</td>
                        <td style="" colspan="2"><input disabled
                                                        v-model="form.sendunit"
                                                        class="myInput"
                        /></td>
                        <td style="width:100px;font-size:12px;">发出部门</td>
                        <td style="" colspan="2"><input disabled
                                                        v-model="form.senddepartment"
                                                        class="myInput"
                        /></td>
                      </tr>
                      <tr align="center" float="left">
                        <td style="font-size:12px;">接收单位</td>
                        <td style="" colspan="7"><input disabled
                                                        v-model="this.company"
                                                        class="myInput"
                        /></td>
                      </tr>
                      <tr align="center">
                        <td style="font-size:12px;">发出人</td>
                        <td style="" colspan="2"><input disabled
                                                        v-model="form.sendpeople"
                                                        class="myInput"
                                                        placeholder=""
                        /></td>
                        <td style="width:100px;font-size:12px;">接收人</td>
                        <td style="" colspan="2"><input disabled
                                                        v-model="form.receiptpeople"
                                                        class="myInput"
                                                        placeholder=""
                        /></td>
                      </tr>
                      <tr align="center">
                        <td style="font-size:12px;">发出时间</td>
                        <td style="font-size:13px;" colspan="2">{{
                            dateTime
                          }}
                        </td>

                        <td style="width:100px;font-size:12px;">接收时间</td>
                        <td colspan="2">
                          <input type="date" v-model="form.receipttime" class="myInput" placeholder="请输入"/></td>
                      </tr>

                      <tr>
                        <td colspan="6">
                          <div style="margin-left:10px;margin-top:5px;font-size:12px;">具体工作内容：
                            <input v-model="form.jobcontent" style="margin-bottom:10px;margin-top:8px" class="myInput"
                                   placeholder="请输入"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <div style="margin-left:10px;margin-top:5px;font-size:12px;">施工验收要求：
                            <input v-model="form.acceptrequire" style="margin-bottom:10px;margin-top:8px"
                                   class="myInput" placeholder="请输入"
                            /></div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <div style="margin-left:10px;margin-top:5px;font-size:12px;">备注：
                            <input v-model="form.remark" style="margin-bottom:10px;margin-top:8px" class="myInput"
                                   placeholder="请输入"
                            /></div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6">
                          <!--                          {{form.attachment}}-->
                          <div style="margin-left:10px;margin-top:5px;font-size:12px;">附件：
                            <UploadFile disabled :message2="form.attachment" @returnData="getWorkApplyFile" placeholder="请上传"></UploadFile>
                            <!-- <input  v-model="form.remark" style="margin-bottom:10px;margin-top:8px" class="myInput" placeholder="请上传"/> -->
                          </div>
                        </td>
                      </tr>
                    </table>
                  </el-row>

                </el-form>
                <div class="grid-content bg-purple" style="float: right;margin: 40px 0px">
                  <!--                  <el-button type="success" @click="sendWorkTicket">发送派工单</el-button>-->
                  <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                  <el-button type="primary" @click="preStep(5)">上一步</el-button>
                  <el-button type="primary" @click="nextStep(5)">下一步</el-button>
                </div>

              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-show="shows[6].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">

                <el-page-header
                  @back="goBack()"
                  content="维保 > 审核与验收"
                >
                </el-page-header>
                <div style="margin: 20px"></div>

                <p
                  style="
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  display: inline-block;
                  margin-left: 20px;
                "
                >
                  验证是否延用申请流程
                </p>

                <div style="display:inline-block;margin-left: 20px;">
                  <el-radio v-model="processRadio" label="1" border @change="acceptButton(processRadio)">是</el-radio>
                  <el-radio v-model="processRadio" label="2" border @change="acceptButton(processRadio)">否</el-radio>
                </div>

                <div v-show="acceptShow">
                  <p
                    style="
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  display: block;
                  margin-left: 20px;
                "
                  >
                    维保申请审核
                  </p>
                  <el-form label-position="right" ref="processForm" :model="basicInfoForm" label-width="110px">
                    <el-row :gutter="20">
                      <el-col :span="20">
                        <el-form-item label="审核流程">
                          <el-select
                            v-model="basicInfoForm.auditProcess"
                            clearable
                            placeholder="请选择"
                            style="width:100%"
                            @change="auditChange()"
                          >
                            <el-option
                              v-for="item in processOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-form-item label="备注">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="plan.remark"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                  </el-form>
                  <p
                    style="
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  display: inline-block;
                  margin-left: 20px;
                "
                  >
                    维保验收审核
                  </p>
                  <el-form label-position="right" ref="processForm" :model="basicInfoForm" label-width="110px">
                    <el-row :gutter="20">
                      <el-col :span="20">
                        <el-form-item label="验收流程">
                          <el-select
                            v-model="basicInfoForm.checkProcess"
                            clearable
                            placeholder="请选择"
                            style="width:100%"
                          >
                            <el-option
                              v-for="item in processOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-form-item label="备注">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="plan.acceptRemark"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                  </el-form>
                </div>



                <!--                <div style="display: inline-block;margin-left: 30px">-->
                <!--                  &lt;!&ndash;                  <el-button type="success" size="mini">延用</el-button>&ndash;&gt;-->
                <!--                  <el-button type="success" @click="chooseSameProcess" >延用</el-button>-->

                <!--                </div>-->

                <!--                <div class="grid-content bg-purple" style="float: right;margin: 10px 0px">-->
                <!--                  <el-button type="primary" @click="preStep(6)">上一步</el-button>-->
                <!--                  <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>-->
                <!--                  &lt;!&ndash;                  <el-button type="success" @click="submitFormAudit('basicInfoForm')">提交</el-button>&ndash;&gt;-->
                <!--                </div>-->
                <!--                <div style="height: 1px;width: 100%;background:#C0C4CC;margin-top: 70px;"></div>-->

                <div v-show="acceptShow1">
                  <p
                    style="
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  display: block;
                  margin-left: 20px;
                "
                  >
                    选择流程
                  </p>
                  <el-form label-position="right" ref="processForm" :model="basicInfoForm" label-width="110px">
                    <el-row :gutter="20">
                      <el-col :span="20">
                        <el-form-item label="流程选择">
                          <el-select
                            v-model="basicInfoForm.auditProcess"
                            clearable
                            placeholder="请选择"
                            style="width:100%"
                            @change="auditChange()"
                          >
                            <el-option
                              v-for="item in processOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-form-item label="申请审核备注">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="plan.remark"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-form-item label="验收审核备注">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="plan.acceptRemark"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>


                <div class="grid-content bg-purple" style="float: right;margin: 10px 0px">
                  <el-button type="primary" @click="preStep(6)">上一步</el-button>
                  <el-button type="primary" @click="nextStep(6)">下一步</el-button>
                  <!--                  <el-button type="primary" @click="showPlanALl">查看</el-button>-->
                  <!--                  <el-button type="primary" @click="nextStep(5)">查看</el-button>-->
                  <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>
                  <!--                  <el-button type="success" @click="submitFormAccept('basicInfoForm')">提交</el-button>-->
                  <!--                  <el-button type="primary" @click="nextStep(5);">下一步</el-button>-->

                  <!--                  <el-button type="primary" @click="showAll">查看</el-button>-->
                  <!--                  <el-button type="primary" @click="nextStep(4)">下一步</el-button>-->
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div v-show="shows[7].value">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-page-header
                  @back="goBack()"
                  content="维保 > 总览"
                >
                </el-page-header>
                <div style="margin: 20px"></div>

                <el-row :gutter="20">
                  <el-col :span="18" :offset="3">
                    <table class="table" style="width:50%;height:100%;border:1px solid;align:center;font-size:20px;"
                           border cellspacing="0" cellpadding="9"
                    >
                      <caption style="font-size:20px;font-weight:bold;">维保单</caption>
                      <tr class="tableFont" align="center" float="left">
                        <td style="border-left:0px;font-size:12px">维保名称</td>
                        <td colspan="2" style="font-size:12px"><input readonly v-model="basicInfoForm.name"
                                                                      class="myInput"
                        /></td>
                        <td style="width:120px;font-size:12px">维保等级</td>
                        <td colspan="2" style="font-size:12px"><input readonly v-model="basicInfoForm.level"
                                                                      class="myInput"/></td>
                      </tr>
                      <tr class="tableFont" align="center" float="left">
                        <td style="border-left:0px;font-size:12px">负责人</td>
                        <td colspan="2" style="font-size:12px"><input readonly v-model="showChargePeople"
                                                                      class="myInput"
                        /></td>
                        <td style="width:120px;font-size:12px">实施人</td>
                        <td colspan="2" style="font-size:12px"><input readonly v-model="basicInfoForm.executePeople"
                                                                      class="myInput"/></td>
                      </tr>
                      <tr class="tableFont" align="center" float="left">
                        <td style="border-left:0px;font-size:12px">检修时间</td>
                        <td colspan="2"><input readonly v-model="basicInfoForm.fixDate" class="myInput"/></td>
                        <td style="width:120px;font-size:12px">维保计划类型</td>
                        <td colspan="2"><input readonly v-model="basicInfoForm.planType" class="myInput"/></td>
                      </tr>
                      <tr class="tableFont"  >
                        <td colspan="7" style="border-left:0px;border-bottom: none;margin-inline: 0px">
                          <div readonly  align="left" style="margin-right:10px;font-size:12px">设备列表:</div>
                          <el-table
                            ref="singleTable"
                            :data="equipmentForm.equipmentData"
                            highlight-current-row
                            style="width: 100%;border:0px;font-size: 12px"
                            :header-cell-style="{
                      fontSize: '12px',
                      }">
                            <el-table-column
                              property="name"
                              label="名称"
                              width="200"

                            >
                            </el-table-column>
                            <el-table-column
                              property="code"
                              label="编号"
                              width="200"
                            >
                            </el-table-column>
                            <el-table-column
                              property="state"
                              label="故障类型"
                              width="200"
                            >
                            </el-table-column>
                          </el-table>
                        </td>
                      </tr>
                      <!--                      <hr colspan="9" class="hrStyle"/>-->
                      <tr class="tableFont" float="left">
                        <td colspan="6" style="border-left:0px;">
                          <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">检修项目：
                            <input readonly v-model="maintenanceContent" style="margin-bottom:10px;margin-top:8px"
                                   class="myInput"/>
                          </div>
                        </td>
                      </tr>
                      <tr class="tableFont" float="left">
                        <td colspan="6" style="border-left:0px;">
                          <div readonly style="margin-left:10px;margin-top:5px;font-size:12px">维保情况：
                            <input readonly v-model="maintenanceCase" style="margin-bottom:10px;margin-top:8px"
                                   class="myInput"/>
                          </div>
                        </td>
                      </tr>
                      <tr class="tableFont" float="left">
                        <td colspan="7" style="border-left:0px;font-size:12px">
                          <div readonly align="left" style="margin-right:10px;">备件:</div>
                          <el-table
                            ref="singleTable"
                            :data="partData"
                            highlight-current-row
                            style="width: 100%;font-size: 12px"
                            :header-cell-style="{
                      fontSize: '12px',
                      }">
                            <el-table-column
                              property="name"
                              label="备件名称"
                              width="200"
                            >
                            </el-table-column>
                            <el-table-column
                              property="code"
                              label="备件编号"
                              width="200"
                            >
                            </el-table-column>
                            <el-table-column
                              property="num"
                              label="调拨数量"
                              width="200"
                            >
                            </el-table-column>
                          </el-table>
                        </td>
                      </tr>
                      <tr class="tableFont" float="left">
                        <td colspan="7" style="border-left:0px;font-size:12px">
                          <div readonly align="left" style="margin-right:10px;font-size:12px">金额明细:</div>
                          <el-table
                            ref="singleTable"
                            :data="amountData"
                            highlight-current-row
                            style="width: 100%;font-size: 12px"
                            :header-cell-style="{
                      fontSize: '12px',
                      }">
                            <el-table-column
                              type="index"
                              label="序号"
                              width="100"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="expenseName"
                              label="明细名称"
                              width="200"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="expenseAmount"
                              label="明细金额"
                              width="200"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="expenseRemark"
                              label="备注"
                              width="200"
                            >
                            </el-table-column>
                          </el-table>
                        </td>
                      </tr>
                      <tr class="tableFont" align="center" float="left">
                        <td colspan="2" style="border-left:0px;font-size:12px">维修方式</td>
                        <td><input readonly v-model="plan.company" class="myInput"/></td>
                        <td style="font-size:12px">预估金额</td>
                        <td colspan="2" >
                          <div style="font-size: 12px;float: left;border: none;zoom: 1;outline: medium;">{{plan.budget}}元</div>
                        </td>
                      </tr>
                      <tr class="tableFont">
                        <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修前）：
                          <look-pic :message="plan.previousPic" ref="beforePicChild"></look-pic>
                        </div>
                        </td>
                      </tr>
                      <tr class="tableFont">
                        <td colspan="6" style="border-left:0px;"><div  readonly style="margin-left:10px;margin-top:5px;font-size:12px">照片（维修后）：
                          <look-pic :message="plan.subsequentPic" ref="afterPicChild"></look-pic>
                        </div>
                        </td>
                      </tr>
                      <tr class="tableFont">
                        <td colspan="6" style="border-left:0px;">
                          <div readonly style="margin-left:10px;margin-top:5px;font-size: 12px">附件：
                            <!--          <input  readonly v-model="detailData.applyAccessory" style="margin-bottom:10px;margin-top:8px" class="myInput"/>-->
                            <look-file :message="plan.applyAccessory" ref="fileChild"></look-file>
                          </div>
                        </td>
                      </tr>
                      <tr class="tableFont,processTable"  align="center" float="left">
                        <td colspan="2"  style="border-left:0px;font-size: 15px;">审核流程</td>
                        <td colspan="6">
                          <el-table
                            ref="singleTable"
                            :cell-class-name="auditClass"
                            :data="auditList"
                            highlight-current-row
                            style="width: 100%;border:0px;font-size: 12px;"
                            :header-cell-style="{
                      fontSize: '12px',
                      }">
                            <el-table-column
                              property="name"
                              label="姓名"
                              width="200"
                              style="font-size: 12px;"
                            >
                              <template slot-scope="scope">
                                <i class="el-icon-document"></i>
                                <span  style="margin-left: 10px">{{ scope.row.name }} </span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="suggestion"
                              label="意见"
                              width="200"
                              style="font-size: 12px;"
                            >
                            </el-table-column>

                          </el-table>
                        </td>
                      </tr>
                      <tr class="tableFont">
                        <td colspan="6" style="border-left:0px;font-size:12px">
                          <div readonly style="margin-left:10px;margin-top:5px">备注：
                            <input readonly v-model="plan.remark" style="margin-bottom:10px;margin-top:8px"
                                   class="myInput"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr class="tableFont,processTable" align="center" float="left">
                        <td colspan="2"  style="border-left:0px;font-size:15px">验收流程</td>
                        <td colspan="6">
                          <el-table
                            ref="singleTable"
                            :cell-class-name="acceptClass"
                            :data="acceptList"
                            highlight-current-row
                            style="width: 100%;border:0px;font-size: 12px;"
                            :header-cell-style="{
                      fontSize: '12px',
                      }">
                            <el-table-column
                              property="name"
                              label="姓名"
                              width="200"
                              style="font-size: 12px;"
                            >
                              <template slot-scope="scope">
                                <i class="el-icon-document"></i>
                                <span  style="margin-left: 10px">{{ scope.row.name }} </span>
                                <!--                <span v-if="scope.row.name===this.acceptPeople" style="margin-left: 10px;color:red">{{ scope.row.name }}</span>-->
                                <!--                <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>-->
                              </template>
                            </el-table-column>
                            <el-table-column
                              property="suggestion"
                              label="意见"
                              width="200"
                              style="font-size: 12px;"
                            >
                            </el-table-column>
                          </el-table>
                        </td>
                      </tr>
                      <tr class="tableFont">
                        <td colspan="6" style="border-left:0px;font-size:12px">
                          <div readonly style="margin-left:10px;margin-top:5px">备注：
                            <input readonly v-model="plan.acceptRemark" style="margin-bottom:10px;margin-top:8px"
                                   class="myInput"
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </el-col>
                </el-row>
                <div class="grid-content bg-purple" style="float: right;margin: 10px 0px">

                  <el-button type="primary" @click="preStep(7)">上一步</el-button>
                  <el-button type="primary" :disabled="applyFlag" @click="submitFormAudit('basicInfoForm')">维保提交</el-button>
                  <el-button type="primary" :disabled="auditFlag" @click="handleUpdate1">维保审核</el-button>
                  <el-button type="primary" :disabled="checkFlag" @click="handleUpdate2">维保验收</el-button>
                  <!--                  <el-button type="primary" @click="nextStep(6)">下一步</el-button>-->

                  <!--                  <el-button type="primary" @click="submitForm('basicInfoForm')">保存</el-button>-->

                  <!--                  <el-button type="primary" @click="showAll">查看</el-button>-->
                  <!--                  <el-button type="primary" @click="nextStep(4)">下一步</el-button>-->
                </div>

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

              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--查看所有信息弹窗-->
    <!--        <el-dialog title="查看填写全部信息" :visible.sync="showAllDialogVisible" append-to-body>-->

    <!--        </el-dialog>-->

  </div>
</template>

<script>
import maintenanceMode from './maintenanceMode.vue'
import { getToken } from '@/utils/auth'

import { listLevelNode } from '@/api/system/tree'
import { listLevelButLeaf, getDevtable, listDevtable } from '@/api/system/devtable'
import { listPlan, getPlan, updatePlan, addPlanAndSaveOther, planMain } from '@/api/system/plan'
import { listUser } from '@/api/system/user'
import { listPart, getPart,listAllPart } from '@/api/system/part'
import { listTrouble } from '@/api/system/trouble'
import { getCollaborator, listCollaborator, getListByCompany ,listCollaboratorAnyone} from '@/api/system/collaborator'
import { listAllProcess } from '@/api/system/process'
import preview from '../fix/preview.vue'
import { showdeptAndUser, getDept } from '@/api/system/dept'
import { getUserProfile } from '@/api/system/user'
//引入附件和图片
// src/views/life/uploadFile.vue
// import { UploadFile } from '@/views/life/uploadFile.vue'
import UploadFile from '../life/uploadFile2.vue'
import UploadPic from '@/views/life/uploadPic2.vue'
import { listWork, getWork, delWork, addWork, updateWork,getWorkListNowDay} from '@/api/system/work'
import { updateInspection } from '@/api/system/inspection'
import { listDetails } from '@/api/system/details'
import Details from '@/views/fix/details.vue'
import lookFile from '../life/lookFile'
import lookPic from '../life/lookPic'

export default {
  name: 'Index',
  components: {
    maintenanceMode, preview,
    UploadFile, UploadPic,
    Details, lookFile, lookPic
  },
  data() {
    //自定义校验规则
    var checkName = (rule, value, callback) => {
      let checked = true
      if (!value) {
        return callback(new Error('名称不能为空'))
      } else {
        listPlan().then(response => {
          // console.log(response)
          var list = response.rows
          for (var i = 0; i < list.length; i++) {
            if (list[i].name === value) {
              // console.log(value)
              // console.log(list[i].name)
              checked = false
            }
          }
          if (checked) {
            return callback()
          } else {
            if(typeof (this.planId)=='undefined'){
              return callback(new Error('名称重复'))
            }else{
              return callback()
            }
          }
        })
      }

    }
    //定义设备 库存少于所填数量 校验
    var checkPartNum = (rule, value, callback) => {
      let checked = true
      const part = JSON.parse(this.partObject)

      getPart(part.id).then(response => {
        // console.log('part', response)
        // console.log('this.partNum', this.partNum)
        // console.log('number', response.data.number)
        // console.log('this.partNum<=response.data.number', value <= response.data.number)
        if (typeof (this.partNum) === 'undefined') {
          return callback()
        } else if (this.partNum <= response.data.number) {
          return callback()
        } else {
          this.partOption = []
          this.getPartOption()
          return callback(new Error('库存数量不足'))
        }
      })

    }

    return {
      myRow: 0,
      myRow1: 0,
      acceptShow: true,
      acceptShow1: false,
      //设备数据表单
      equipmentForm: {
        equipmentData: []
      },
      //设备数据校验规则
      equipmentRules: {
        state: [{ required: true, message: '请选择故障类型', trigger: 'change' }]
      },

      auditList: [],
      acceptList: [],
      InspectionValue: {},
      // plan: {
      //   equipments: [
      //     { name: '风机', code: 'FJ1-1-1-2' },
      //     { name: '水泵', code: 'SB1-1-1-2' }
      //   ],
      //   pics: ['图片名称1', '图片名称2']
      // },
      mainflag: false,
      //维保申请按钮 使用标志
      applyFlag: false,
      auditFlag: true,
      checkFlag: true,
      planId: '',
      dialogVisible1: false,
      editValue: {},
      myStyle: {
        background: 'pink',
        dateTime: '',
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],// 总条数
        total: 0,
        // work表格数据
        workList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false
      },
      // 表单参数
      form: {
        id: '',
        projectname: '',
        category: '',
        leader: '',
        numberid: '',
        sendunit: '河润科技',
        senddepartment: '',
        receiptunit: '',
        sendpeople: '',
        receiptpeople: '',
        sendtime: '',
        receipttime: '',
        jobcontent: '',
        acceptrequire: '',
        drawpeople: '',
        drawtime: '',
        remark: '',
        attachment: '[]'

      },
// 表单校验
      rules: {
        projectname: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        }]
      },
      //维保计划对象
      plan: {
        //第一步
        name: '',
        level: '',
        chargePeople: '',
        executePeople: '',
        fixdate: '',
        planType: '',
        equipmentData: '{}',
        //第二步
        maintenanceContent: '',
        maintenanceCase: '',
        parts: '{}',
        //第三步
        maintenanceWay: '',
        company: '河润科技',

        //第五步
        previousPic: '[]',
        subsequentPic: '[]',
        applyAccessory: '[]',
        auditAccessor: '[]',
        checkAccessor: '[]',

        //第六步
        budget: '',
        remark: '',
        acceptRemark: '',
        auditProcess: '',
        checkProcess: '',
        makingTime: '',
        state: '未提交',
        checkPeople: '',
        acceptPeople: ''
      },

      //上方步骤条 active坐标
      stepActiveIndex: 0,

      //布尔值数组对象
      shows: [
        { value: true },
        { value: false },
        { value: false },
        { value: false },
        { value: false },
        { value: false },
        { value: false },
        { value: false }
      ],
      //基础信息表单
      basicInfoForm: {
        //第一步属性
        name: '',
        level: '',
        chargePeople: '',
        executePeople: '',
        fixDate: [],
        planType: '',

        //第五步骤属性
        budget: '',
        remark: '',
        acceptRemark: '',
        auditProcess: '',
        checkProcess: '',
        auditMessage: '',
        acceptMessage: ''
      },
      chargePeople: '',
      executePeople: '',
      departmentOptions: [],
      //基础信息表单验证
      basicRules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        partNum: [
          { validator: checkPartNum, trigger: 'blur' }
        ],
        partPrice: [
          { required: true, message: '请填写单价', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择维保等级', trigger: 'change' }
        ],
        chargePeople: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        executePeople: [
          { required: true, message: '请选择实施人', trigger: 'change' }
        ],
        fixDate: [
          { required: true, message: '请选择维保日期', trigger: 'change' }
        ],
        amountName: [
          { required: true, message: '请填写明细名称', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请填写明细金额', trigger: 'blur' }
        ],
        amountRemark: [
          { required: true, message: '请填写明细备注', trigger: 'blur' }
        ]
      },
      //人员列表项
      peopleOption: [],
      //设备级联选择框选项
      equipmentOptions: [],
      //选择设备Id
      equipmentId: '',
      //设备编码
      equipmentCode: '',
      //设备表
      equipmentData: [],
      //设备故障类型选项
      faultCauseOption: [
        // { value: '设备磨损', label: '设备磨损' }
      ],

      //维保项目
      maintenanceContent: '',
      //维保情况
      maintenanceCase: '',
      //备件选项
      partOption: [],
      //备件对象
      partObject: '',
      //备件名称
      partName: '',
      //备件数量最大值
      partMaxNum: 65535,
      //备件数量框 是否可用
      numDisabled: true,
      //备件数量
      partNum: 1,

      //备件表单
      partForm: {
        //备件单价
        // singleAmount:'',
        partPrice: ''

      },
      //备件表数据
      partData: [],

      //金额明细弹窗控制
      addAmountDetailFormVisible: false,
      //添加金额明细表单
      addAmountDetailForm: {
        amountName: '',
        amount: undefined,
        amountRemark: ''
      },
      //金额名字表数据
      amountData: [],

      //维保方式 ID
      maintainStyleId: '',
      //维保公司 ID
      maintainCompanyId: '',
      //维保方式
      maintenanceWay: '',
      //维保公司名称
      company: '河润科技',
      //刷新维保方式组件标志位
      isShowMaintainStyle: true,

      //显示弹窗维保单的图片
      planList: '',
      planLis: '',
      afterList: '',
      picList: '',

      //审批流程选项
      processOption: [],
      //是否沿用审核流程
      processRadio: '2',
//选择维保计划方式  数据
      tableData: [],
      modes: [{
        value: 1,
        label: '公司内部维保'
      },
        {
          value: 2,
          label: '第三方维保'
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
      title: '',
      //是否弹出维保计划详情弹窗
      isShowPlanDetail: false,
      detailData: {},
      // //图片上传
      beforePic: [{
        name: '删除_20220925182328A018.png',
        nowDate: '2022/09/25'
      }],
      // //附件上传
      // applyFile: [{
      //   name: '火车票购买记录_司成玉_20220925154320A006.doc',
      //   nowDate: '2022/09/25',
      //   trueName: '火车票购买记录_司成玉.doc'
      // }],
      showChargePeople: '',

      title1: '',
      title2: '',
      open1: false,
      open2: false,
      username:null,
      isPass:null,
      message:null,
    }
  },
  methods: {
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
    },
    //点击审核按钮
    handleUpdate1() {
      if(this.username!="admin"){
        getPlan(this.plan.id).then(response => {
          this.form = response.data;
          this.open1 = true;
          this.title1 = "维保审核";
        });
      }
    },
    //点击验收按钮
    handleUpdate2() {
      if(this.username!="admin"){
        getPlan(this.plan.id).then(response => {
          this.form = response.data;
          this.open2 = true;
          this.title2 = "维保验收";
        });
      }
    },

    //审核提交按钮
    submitForm1() {
      this.$refs["form1"].validate(valid => {
        if (valid) {
          if(this.plan.state == "待审核"&&(this.plan.firstAuditTime ==null||this.plan.firstAuditTime =="")){
            this.plan.firstAuditTime = this.getCurrentTime()
          }
          if(this.isPass==0){
            if(this.message==null){
              this.message="无"
            }
            if(this.plan.auditMessage==null||this.plan.state == "待审核"){
              this.plan.auditMessage = this.message+"|"
            }else{
              this.plan.auditMessage += this.message+"|"
            }
            let i = this.plan.auditProcess;
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
              this.plan.lastAuditTime = this.getCurrentTime()
              this.plan.state = "已审核"
              this.plan.checkPeople = "审核完毕"
            }else{
              this.plan.state = "审核中"
              this.plan.checkPeople = h[h.indexOf(this.username)+1]
            }
            planMain(this.plan).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.setmessage(this.auditList,this.message)
              this.auditFlag = true
              this.open1 = false
              this.message = null
              this.isPass = null
            });
          }else if(this.isPass==1&&this.message != null&&this.message != ""){
            if(this.plan.auditMessage==null||this.plan.state == "待审核"){
              this.plan.auditMessage = this.message+"|"
            }else{
              this.plan.auditMessage += this.message+"|"
            }
            this.plan.state = "未提交"
            planMain(this.plan).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.setmessage(this.auditList,this.message)
              this.auditFlag = true
              this.open1 = false;
              this.message = null
              this.isPass = null
            });
          }else if(this.isPass==1&&(this.message == null||this.message == "")){
            this.$modal.msgError("审核意见不能为空");
          }
        }
      });
    },
    //验收提交按钮
    submitForm2() {
      this.$refs["form2"].validate(valid => {
        if (valid) {
          if(this.plan.state == "待验收"&&(this.plan.firstAcceptTime ==null||this.plan.firstAcceptTime =="")){
            this.plan.firstAcceptTime = this.getCurrentTime()
          }
          if(this.isPass==0){
            if(this.message==null){
              this.message="无"
            }
            if(this.plan.acceptMessage==null||this.plan.state == "待验收"){
              this.plan.acceptMessage = this.message+"|"
            }else{
              this.plan.acceptMessage += this.message+"|"
            }
            let i = this.plan.checkProcess;
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
              this.plan.lastAcceptTime = this.getCurrentTime()
              this.plan.state = "已验收"
              this.plan.acceptPeople = "验收完毕"
            }else{
              this.plan.state = "验收中"
              this.plan.acceptPeople = h[h.indexOf(this.username)+1]
            }
            planMain(this.plan).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.setmessage(this.acceptList,this.message)
              this.checkFlag = true
              this.open2 = false;
              this.message = null
              this.isPass = null
            });
          }else if(this.isPass==1&&this.message != null&&this.message != ""){
            if(this.plan.acceptMessage==null||this.plan.state == "待验收"){
              this.plan.acceptMessage = this.message+"|"
            }else{
              this.plan.acceptMessage += this.message+"|"
            }
            this.plan.state = "维保中"
            planMain(this.plan).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.setmessage(this.acceptList,this.message)
              this.checkFlag = true
              this.open2 = false;
              this.message = null
              this.isPass = null
            });
          }else if(this.isPass==1&&(this.message == null||this.message == "")){
            this.$modal.msgError("验收意见不能为空");
          }
        }
      });
    },

    setmessage(list,m){
      for(let i =0;i<list.length;i++){
        if(this.username==list[i].name){
          list[i].suggestion = m
        }
      }
    },

    //新增设备类型校验函数
    validateEquipmentState(form) {
      // console.log("aaaaaaa")
      let result = true;
      for (let item of this.$refs[form].fields) {
        this.$refs[form].validateField(item.prop, err => {
          if (err != "") {
            result = false;
          }
        });
        // if (!result) break;
      }
      return result;
    },

    //选择是否共用审核流程
    acceptButton(processRadio) {
      // console.log(processRadio);
      if (processRadio == 1) {
        this.acceptShow = false
        this.acceptShow1 = true
        if(this.basicInfoForm.auditProcess!==''){
          this.basicInfoForm.checkProcess=this.basicInfoForm.auditProcess;
        }

      } else if (processRadio == 2) {
        this.acceptShow = true
        this.acceptShow1 = false
      }
    },
    auditChange() {
      if (this.processRadio == 1) {
        this.basicInfoForm.checkProcess = this.basicInfoForm.auditProcess
        // console.log('this.basicInfoForm.checkProcess',this.basicInfoForm.checkProcess)
      }
    },

    //发送派工单函数??
    sendWorkTicket() {
      if (this.selectedMode === 2) {
        this.plan.state = '维保中'
        submitForm('basicInfoForm')
      } else {
        alert('只有选择第三方公司后才能发送派工单')
      }

    },
    //修改单元格样式的方法
    //指定行颜色
    auditClass: function({ row, rowIndex }) {
      // debugger
      // console.log(rowIndex, 'rowIndex');
      if (row.name == this.plan.checkPeople&&this.plan.checkPeople!=''&&this.plan.checkPeople!=null&&this.plan.checkPeople!='审核完毕') {
        this.myRow = rowIndex
        return 'setclass2'
      }
      else if(rowIndex<this.myRow||this.plan.checkPeople=='审核完毕'){
        // this.detailData.auditProcess.slice(0,myRow-1)
        return 'setclass1'
      }
      else{
        return 'setclass3'
      }
    },
    acceptClass: function({ row, rowIndex }) {
      // console.log(row, 'row');
      if (row.name == this.plan.acceptPeople&&this.plan.acceptPeople!=''&&this.plan.acceptPeople!=null&&this.plan.acceptPeople!='验收完毕') {
        this.myRow1 = rowIndex
        return 'setclass2';
      }
      else if(rowIndex<this.myRow1||this.plan.acceptPeople=='验收完毕'){
        return 'setclass1'
      }
      else{
        return 'setclass3'
      }
    },
    showWorkPeople() {
      if(typeof(this.form)!='undefined'){
        this.form.leader = this.$refs['chargePeopleCascader'].getCheckedNodes()[0].label
      }
    },
    /** 查询work列表 */
    getList1() {
      this.loading = true
      this.name = this.$route.query.planname
      listPlan({ name: this.name }).then(response => {
        // this.form=response.data;
        // console.log(response)
        this.detailData = response.rows[0]

        let peopleList = JSON.parse(response.rows[0].chargePeople)
        this.detailData.chargePeople = peopleList.name
      })

    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        category: null,
        leader: null,
        numberid: null,
        sendunit: null,
        senddepartment: null,
        receiptunit: null,
        sendpeople: null,
        receiptpeople: null,
        sendtime: null,
        receipttime: null,
        jobcontent: null,
        acceptrequire: null,
        drawpeople: null,
        drawtime: null,
        remark: null,
        projectname: null,
        attachment: '[]',
        company: null,
        level: null
      }
      this.resetForm('form')
    },
    /** 新增成功 */
    handleAdd() {
      listWork({ name: this.basicInfoForm.name }).then((res) => {
        // console.log(res.total)
        if (res.total != 0) {
          this.$modal.msgSuccess('项目名重复，增加失败')
        } else {
          listWork({ numberid: this.form.numberid }).then((res) => {
            // console.log(res.total)
            if (res.total != 0) {
              this.$modal.msgSuccess('编号重复，增加失败')

            } else {
              addWork(this.form).then(response => {
                this.$modal.msgSuccess('新增成功')
                this.open = false
                this.getList1()
                this.$router.replace('/graph/work')
              })
            }
          })
        }
      })
    },
    //调用日期
    getTime() {
      let aDate = new Date()
      // console.log(aDate)
      this.dateTime = this.formatDd(aDate)
    },
//格式化日期
    formatDd(date) {
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')//获取月要+1
      let day = date.getDate().toString().padStart(2, '0')//获取天是getDate
      let createTime = year + '-' + month + '-' + day
      return createTime
    },
    handleClick() {
      if (this.myStyle.background === 'pink') {
        this.myStyle.background = 'green'
      } else {
        this.myStyle.background = 'pink'
      }
    },

    showPlanALl() {
      listPlan({ name: this.plan.name }).then(response => {
        if (response.rows.length !== 0 && this.plan.name !== '') {
          // this.plan.name=response.rows[0].name
          // this.nextStep(5)

          this.$router.push({
            path: '/graph/fix/details',
            query: {
              planname: this.plan.name
            }
          })
        } else {
          alert('请保存后查看')
        }

      })
    },
    showPlanDetail(name) {
      this.isShowPlanDetail = true
      // alert(name)
      // this.$router.push({
      //   path: '/graph/fix/details',
      //   query: {
      //     planname: name
      //   }
      // })
      //   this.loading = true
      //   console.log(this.$route.query.planname)
      //   if (typeof (this.$route.query.planname) !== 'undefined') {
      //     this.name = this.$route.query.planname
      //   } else {
      //     this.name = this.planName
      //   }

      listPlan({ name }).then(response => {
        // this.form=response.data;
        // console.log(response)
        this.detailData = response.rows[0]
        if(this.detailData.previousPic==''){
          this.detailData.previousPic = '[]'
        }else if(this.detailData.applyAccessory==''){
          this.detailData.applyAccessory = '[]'
        }else if(this.detailData.subsequentPic==''){
          this.detailData.subsequentPic = '[]'
        }
        if(response.rows[0].chargePeople!=""){
          let peopleList = JSON.parse(response.rows[0].chargePeople)
          this.detailData.chargePeople = peopleList.name
        }

        // if(response.rows[0].executePeople!=""){
        //   let peopleName = JSON.parse(response.rows[0].executePeople)
        //   this.detailData.executePeople = peopleName.name
        // }

        if (response.rows[0].equipmentData != '') {
          this.planList = JSON.parse(response.rows[0].equipmentData)
        }

        if (response.rows[0].parts != '') {
          this.planLis = JSON.parse(response.rows[0].parts)
        }

        if(response.rows[0].auditProcess!==""){
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = response.rows[0].auditProcess.split(/[①②③④⑤⑥⑦⑧⑨]/);
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          // console.log('auditMessage',response.rows[0].auditMessage)
          if(response.rows[0].auditMessage!==""&&typeof(response.rows[0].auditMessage)!=='undefined'&&response.rows[0].auditMessage!==null){
            const suggest = response.rows[0].auditMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.auditList = []

          for (var i = 0; i < processlist.length - 1; i++) {
            var arr = {}
            arr.name = processlist[i + 1]
            arr.suggestion = messageList[i]
            this.auditList.push(arr)
          }
        }

        if (response.rows[0].checkProcess !== '') {
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = response.rows[0].checkProcess.split(/[①②③④⑤⑥⑦⑧⑨]/)
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          if (response.rows[0].acceptMessage !== '' && typeof (response.rows[0].acceptMessage) !== 'undefined' && response.rows[0].acceptMessage !== null) {
            const suggest = response.rows[0].acceptMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.acceptList = []
          for (var i = 0; i < processlist.length - 1; i++) {
            var arr = {}
            arr.name = processlist[i + 1]
            arr.suggestion = messageList[i]
            this.acceptList.push(arr)
          }
        }

        // if (response.rows[0].checkPeople !== '') {
        //   this.checkPeople = response.rows[0].checkPeople
        // }
        // if (response.rows[0].acceptPeople !== '') {
        //   this.acceptPeople = response.rows[0].acceptPeople
        // }

        this.loading = false

      })

    },

    //返回路由的上一级
    goBack() {
      //返回上一步的路由地址
      this.$router.back()
    },

    //将时间对象转换为标准格式字符串
    timeToString(timeObj) {
      var str = ''
      var year = timeObj.getFullYear()
      var month = timeObj.getMonth() + 1
      var date = timeObj.getDate()
      var time = timeObj.toTimeString().split(' ')[0]
      var rex = new RegExp(/:/g)
      str = year + '-' + month + '-' + date + ' ' + time.replace(rex, '-')
      // console.log('------当前日期：' + str)
      return str
    },
    //保存后清空所有表单内容
    cleanPlan() {
      this.basicInfoForm.name = ''
      this.basicInfoForm.level = ''
      this.basicInfoForm.chargePeople = ''
      this.plan.chargePeople = ''
      this.plan.executePeople = ''
      this.plan.fixdate = ''
      this.basicInfoForm.executePeople = ''
      this.basicInfoForm.fixDate = []
      this.basicInfoForm.planType = ''
      this.equipmentId = ''

      this.selectedMode = ''
      this.companyId = ''

      this.equipmentForm.equipmentData = []
      this.maintenanceContent = ''
      this.maintenanceCase = ''
      this.partData = []

      this.maintenanceWay = ''
      this.company = ''
      this.isShowMaintainStyle = false
      setTimeout(() => {
        this.isShowMaintainStyle = true
      }, 50)
      this.editValue = {}
      /* this.plan.previousPic = this.previousPic
       this.plan.subsequentPic = this.subsequentPic
       this.plan.applyAccessory = this.applyAccessory
       this.plan.auditAccessor = this.auditAccessor
       this.plan.checkAccessor = this.checkAccessor*/
      this.basicInfoForm.budget = ''
      this.basicInfoForm.remark = ''
      this.basicInfoForm.auditProcess = ''
      this.basicInfoForm.checkProcess = ''

      //清空派工单
      this.reset()

    },
    //转化数据
    beforeSavePlan() {
      //将第一步的数据放入
      // console.log('plan', this.plan)

      this.plan.name = this.basicInfoForm.name
      this.plan.level = this.basicInfoForm.level

      if (this.basicInfoForm.chargePeople !== '') {
        // this.plan.chargePeople = this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label + ',' + this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label
        this.plan.chargePeople = JSON.stringify({
          id: this.basicInfoForm.chargePeople[1],
          name: this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label,
          department: this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label,
          departmentId: this.basicInfoForm.chargePeople[0]
        })
      }
      // if (this.basicInfoForm.executePeople !== '') {
      //   // this.plan.executePeople = this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label + ',' + this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label
      //   this.plan.executePeople = JSON.stringify({
      //     id: this.basicInfoForm.executePeople[1],
      //     name: this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label,
      //     department: this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label,
      //     departmentId: this.basicInfoForm.executePeople[0]
      //   })
      // }
      this.plan.executePeople = this.basicInfoForm.executePeople

      // console.log(this.basicInfoForm.fixDate)
      if (this.basicInfoForm.fixDate.length > 2) {
        this.plan.fixdate = this.basicInfoForm.fixDate
      } else {
        this.plan.fixdate = this.basicInfoForm.fixDate[0] + '至' + this.basicInfoForm.fixDate[1]
      }
      this.plan.planType = this.basicInfoForm.planType
      this.plan.equipmentData = JSON.stringify(this.equipmentForm.equipmentData)

      this.plan.maintenanceContent = this.maintenanceContent
      this.plan.maintenanceCase = this.maintenanceCase
      this.plan.parts = JSON.stringify(this.partData)

      //录入附件总数金额
      this.plan.budget = this.sumAmount

      if (this.selectedMode == 1) {
        this.plan.maintenanceWay = '内部维保'
        this.plan.company = '河润科技'
      } else if (this.selectedMode == 2) {
        this.plan.maintenanceWay = '第三方维保'
        this.plan.company = this.company
      }
      // this.plan.maintenanceWay = this.maintenanceWay

      /* this.plan.previousPic = this.previousPic
       this.plan.subsequentPic = this.subsequentPic
       this.plan.applyAccessory = this.applyAccessory
       this.plan.auditAccessor = this.auditAccessor
       this.plan.checkAccessor = this.checkAccessor*/

      // this.plan.remark = this.basicInfoForm.remark
      this.plan.auditProcess = this.basicInfoForm.auditProcess
      this.plan.checkProcess = this.basicInfoForm.checkProcess

      this.plan.makingTime = this.timeToString(new Date())

      getUserProfile().then(response => {
        this.username = response.data.userName
        this.getList()
      })

      //处理派工单
      this.form.id = ''
      this.form.projectname = this.basicInfoForm.name
      this.form.category = this.basicInfoForm.planType
      // this.form.leader = this.form.chargePeople
      // this.form.numberid
      // this.form.sendunit = '河润科技'
      // this.form.senddepartment = ''
      this.form.receiptunit = this.company
      // this.form.sendpeople = ''
      // this.form.receiptpeople = ''
      this.form.sendtime = this.dateTime

      // this.form.receipttime = ''
      // this.form.jobcontent = ''
      // this.form.acceptrequire = ''
      this.form.drawpeople = '' //不存在
      this.form.drawtime = '' //不存在
      // this.form.remark = ''
      // this.form.attachment = ''

    },
    //保存维保计划
    savePlan() {
      this.beforeSavePlan()
      // console.log('detailsList', this.amountData)
      addPlanAndSaveOther({ plan: this.plan, work: this.form, details: this.amountData}).then(response => {
        //保存之后 获得自增的id  以后提交都是修改
        // console.log('saveresponse', response)

        this.plan = response
        this.planId = response.id
        //将维保名称传递给巡航记录
        this.InspectionValue.maintenanceName = this.plan.name
        // console.log('this.InspectionValue.id', this.InspectionValue.id)
        if (typeof (this.InspectionValue.id) !== 'undefined') {
          updateInspection(this.InspectionValue).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            // setTimeout(()=>{
            //   this.goBack()
            // },200)
          })
        } else {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          // setTimeout(()=>{
          //   this.goBack()
          // },200)
        }


      })
      //刷新当前 页面
      // this.cleanPlan()
      // setTimeout(() => {
      //   this.$router.go(0)
      // }, 500);
    },

    //添加设备
    addEquipment() {
      // console.log(this.$refs['equipmentCascader'].getCheckedNodes()[0].label)
      // this.$refs['addNodeCascader']
      let strs = this.$refs['equipmentCascader'].getCheckedNodes()[0].label.split(' ')
      this.equipmentForm.equipmentData.push({
        name: strs[0],
        code: strs[1],
        state: ''
      })
      setTimeout(() => {
        this.equipmentId = ''
      }, 100)
    },

    //删除设备
    deleteEquipment(index) {
      // alert("删除设备"+index)
      this.$confirm('此操作将删除所选设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.equipmentForm.equipmentData.splice(index, index + 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 保存维保计划验证函数
    submitForm(firstStepformName, secondStepformName) {
      // 修改调用函数
      // console.log('this.plan',this.plan)
      //进行设备故障类型校验
      if (!this.validateEquipmentState('equipmentForm')) {
        this.jumpStep(0);
        this.$message.error('请选择设备故障类型')
        return
      }

      if (typeof (this.planId) !== 'undefined') {
        //修改函数
        this.beforeSavePlan()
        this.plan.id = this.planId
        // console.log('修改数据', this.plan)
        updatePlan({ plan: this.plan, work: this.form, details: this.amountData}).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          // setTimeout(()=>{
          //   this.goBack()
          // },200)
        })
      } else {
        this.$refs[firstStepformName].validate((valid) => {
          if (valid) {
            this.savePlan()
          } else {
            this.jumpStep(0);
            this.$message.error('请填写计划名称或选择检修时间')
            // console.log('error submit!!')
            return false
          }
        })
      }

    },
    //审核流程提交
    submitFormAudit(firstStepformName, secondStepformName) {
      if(this.basicInfoForm.auditProcess===''){
        this.jumpStep(6);
        this.$message.error('请先选择审核流程');
        return;
      }
      this.$confirm('提交后无法进行修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获取审核流程
        let auditPeople = this.basicInfoForm.auditProcess.split(/[①②③④⑤⑥⑦⑧⑨⑩]/)
        this.plan.checkPeople = auditPeople[1]
        this.plan.state = '待审核'
        this.submitForm(firstStepformName)
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });

    },
    //验收流程提交
    submitFormAccept(firstStepformName, secondStepformName) {
      //获取验收流程
      let checkPeople = this.basicInfoForm.checkProcess.split(/[①②③④⑤⑥⑦⑧⑨⑩]/)
      this.plan.acceptPeople = checkPeople[1]
      this.plan.state = '待验收'
      this.submitForm(firstStepformName)
    },
    //选择备件后加载备件库存量 作为最大值
    selectPartMax() {
      //设置最大值
      const part = JSON.parse(this.partObject)

      // let num = parseInt(this.partObject.split(':')[1])
      // this.partMaxNum = part.maxNum
      this.partMaxNum = 65535
      // console.log(this.partObject)
      //设置数字框 是否可用
      this.numDisabled = false
    },
    //添加备件
    addPart(formName) {
      if (this.partObject === '') {
        this.$message({
          message: '请先选择备件',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const part = JSON.parse(this.partObject)
          this.partData.push({
            ...part,
            num: this.partNum,
            amount: this.partNum * this.partForm.partPrice,
            location: ''
          })
          this.amountData.push({
            expenseName: part.name,
            expenseAmount: this.partNum * this.partForm.partPrice,
            expenseRemark: this.partNum+'件',
            flag: part.name

          })
          this.clearAddPartForm()
          // this.partOption = []
          // this.getPartOption()
        } else {
          if(this.partForm.partPrice!==''){
            this.$message.error('备件库存不足')
          }else{
            this.$message.error('请填写单价')
          }

          // console.log('error submit!!')
          return false
        }
      })

    },
    //清空备件添加表单
    clearAddPartForm() {
      this.partObject = ''
      this.partNum = 1
      this.partForm.partPrice = '';
      this.numDisabled = true
    },

    deletePart(index, row) {
      this.$confirm('此操作将删除所选设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除备件列表
        this.partData.splice(index, index + 1)
        //查找金额明细列表  如果 明细的flag等于备件的名称 就加入坐标列表
        let indexList = []
        for (let i = 0; i < this.amountData.length; i++) {
          if (this.amountData[i].flag === row.name) {
            indexList.push(i)
          }
        }
        //将坐标列表中的相应的明细删除
        indexList.forEach(i => {
          this.amountData.splice(i, i + 1)
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    //添加金额明细
    addAmountDetail(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.amountData.push({
            expenseName: this.addAmountDetailForm.amountName,
            expenseAmount: this.addAmountDetailForm.amount,
            expenseRemark: this.addAmountDetailForm.amountRemark,
          })
          this.cleanAmountDetailForm()
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //清空金额明细表单
    cleanAmountDetailForm() {
      this.addAmountDetailForm = {
        expenseName: '',
        expenseAmount: '',
        expenseRemark: ''
      }
      this.addAmountDetailFormVisible = false
    },
    //删除金额明细
    deleteAmountDetail(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.amountData.splice(index, index + 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    //获取第三方公司信息
    // getmaintenanceMode(val) {
    //   console.log('val', val)
    //   this.maintainStyleId = val.selectedMode
    //   this.maintainCompanyId = val.companyId
    //   if (this.maintainStyleId === 1) {
    //     this.maintenanceWay = '内部维保'
    //     this.company = '无'
    //     // this.submitForm('basicInfoForm')
    //   } else if (this.maintainStyleId === 2) {
    //     getCollaborator(val.companyId).then(response => {
    //       console.log('val.companyId', val.companyId)
    //       console.log(response)
    //       this.maintenanceWay = '第三方维保'
    //       this.company = response.data.companyName
    //       // this.submitForm('basicInfoForm')
    //     })
    //   } else {
    //     // this.submitForm('basicInfoForm')
    //   }
    //
    // },

    //点击步骤 跳转到相应步骤
    jumpStep(step) {
      // console.log(this.shows)
      this.stepActiveIndex = step
      // this.shows.fill(new Object({value:false}))
      // this.shows[step].value = true
      for (let i = 0; i < this.shows.length; i++) {
        if (i === step) {
          this.shows[i].value = true
        } else {
          this.shows[i].value = false
        }
      }
    },
    //下一步窗口切换
    nextStep(step) {
      this.stepActiveIndex = step + 1
      this.shows[step].value = false
      this.shows[step + 1].value = true

    },
    //上一步窗口切换
    preStep(step) {
      this.stepActiveIndex = step - 1
      this.shows[step].value = false
      this.shows[step - 1].value = true

    },
    //点击查看所填信息
    // showAll() {
    //   this.plan.name = this.basicInfoForm.name
    //   this.plan.level = this.basicInfoForm.level
    //   if (this.basicInfoForm.chargePeople !== '') {
    //     this.plan.chargePeople = this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label + ',' + this.$refs['chargePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label
    //   }
    //   if (this.basicInfoForm.executePeople !== '') {
    //     this.plan.executePeople = this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[0].label + ',' + this.$refs['executePeopleCascader'].getCheckedNodes()[0].pathNodes[1].label
    //   }
    //   if (typeof (this.basicInfoForm.fixDate[0]) !== 'undefined') {
    //     this.plan.fixdate = this.basicInfoForm.fixDate[0] + '至' + this.basicInfoForm.fixDate[1]
    //   }
    //   this.plan.planType = this.basicInfoForm.planType
    //   this.plan.equipmentData = JSON.stringify(this.equipmentData)
    //   this.plan.maintenanceContent = this.maintenanceContent
    //   this.plan.maintenanceCase = this.maintenanceCase
    //   this.plan.parts = JSON.stringify(this.partData)
    //
    //   this.plan.maintenanceWay = this.maintenanceWay
    //   this.plan.company = this.company
    //   this.plan.budget = this.basicInfoForm.budget
    //   this.plan.remark = this.basicInfoForm.remark
    //   this.plan.auditProcess = this.basicInfoForm.auditProcess
    //   this.plan.makingTime = this.timeToString(new Date())
    //   // 组件赋值
    //   this.editValue = this.plan
    //   console.log(this.editValue)
    //   // this.dialogVisible1 = true
    //   // console.log('预览页面')
    // },

//当选择第三方公司后 将数据传回
    chooesCompany(row) {
      // alert('aaaaa')
      // console.log('bbbbb')
      // setTimeout(() => {
      //   getCollaborator(this.companyId).then(response => {
      //     this.company = response.data.companyName
      //   })
      // }, 50)
      this.company = row.companyName
      this.plan.company = row.companyName
      if (typeof (this.form) != 'undefined') {
        this.form.receiptpeople = row.linkName
      }
    },
    //查看第三方详情
    getDetail(companyName) {
      getListByCompany(companyName).then(response => {
        this.tableData = response

        for (let i = 0; i < this.tableData.length; i++) {
          if (typeof (this.tableData[i].chargePeople) !== 'undefined' && this.tableData[i].chargePeople !== '') {
            let chargePeople = JSON.parse(this.tableData[i].chargePeople)
            this.tableData[i].chargePeople = chargePeople.name
          }
        }
        // .forEach(rowData=>{
        //   console.log('rowData', rowData.name)
        //
        // })
        this.open = true
      })
    },

    /** 查询collaborator列表 */
    getList() {
      listCollaboratorAnyone(this.queryParams).then(response => {
        this.collaboratorList = response.rows
        // console.log(response.rows);
        this.total = response.total
      })
    },
    clickRow(row) {
      this.companyId = row.companyId
      // console.log('getCurrentRow中的companyId:', this.companyId);
    },
    nextPage() {
      this.nextStep(2)
    },
    prepage() {
      this.preStep(2)
    },

    onSubmit() {
      // console.log('submit!')
    },

    //将审核流程赋值给验收流程
    chooseSameProcess() {
      if (this.processRadio === '1') {
        setTimeout(() => {
          this.basicInfoForm.checkProcess = this.basicInfoForm.auditProcess
        }, 50)
      }
    },
    getBeforePic(val) {
      // console.log('val', val)
      this.plan.previousPic = JSON.stringify(val)
    },

    getAfterPic(val) {
      // console.log('val', val)
      this.plan.subsequentPic = JSON.stringify(val)
    },

    getApplyFile(val) {
      // console.log('getApplyFile', val)
      this.plan.applyAccessory = JSON.stringify(val)
    },
    // getAuditFile() {
    //   this.plan.auditAccessor = JSON.stringify(val)
    // },
    // getCheckFile() {
    //   this.plan.checkAccessor = JSON.stringify(val)
    // },
    getWorkApplyFile(val) {
      this.form.attachment = JSON.stringify(val)
    },
    getEquipmentOption() {
      listLevelNode().then(response => {
        this.equipmentOptions = response
      })
    },

    getUserOption() {
      listUser().then(response => {
        // console.log(response)
        let list = response.rows
        for (let i = 0; i < list.length; i++) {
          this.peopleOption.push({
            value: list[i].userName,
            label: list[i].userName
          })

        }
      })
    },

    getDepartmentOption() {
      showdeptAndUser().then(response => {

        this.departmentOptions = response
        // console.log('aaaaaaaaaaaaaa', this.departmentOptions)
      })
    },

    getDefaultOption() {
      listTrouble().then(response => {
        // console.log(response)

        const list = response.rows
        for (let i = 0; i < list.length; i++) {
          this.faultCauseOption.push({
            id: list[i].troubleId,
            value: list[i].troubleName,
            label: list[i].troubleName,
            introduction: list[i].troubleIntroduction
          })

        }
      })
    },

    getPartOption() {
      listAllPart().then(response => {
        // console.log(response)

        const list = response.rows
        for (let i = 0; i < list.length; i++) {
          this.partOption.push({
            id: list[i].sparepartId,
            name: list[i].sparepartName,
            num: list[i].number,
            code: list[i].sparepartNode,
            associatedDevices: list[i].associatedDevices
          })

        }
      })
    },

    getProcessOption() {
      listAllProcess().then((response) => {
        // console.log(response.rows[0].auditMan)
        for (var i = 0; i < response.rows.length; i++) {
          var array = {}
          array.label = response.rows[i].auditName + ': ' + response.rows[i].auditMan
          array.value = response.rows[i].auditMan
          this.processOption.push(array)
        }
      })
    },

    getPlanMessage() {
      //接受路由传过来的参数
      this.planId = this.$route.query.id
      // console.log('id',id)
      // this.planId = 78
      if (typeof (this.planId) !== 'undefined') {

        //根据维保计划ID 查询出明细列表
        listDetails({ planId: this.planId}).then(response=>{
          // console.log('listDetails',response)
          this.amountData = response.rows
        })

        let plan
        // let that = this
        //通过数据id  查出对应的维保计划
        getPlan(this.planId).then(response => {
          // console.log('查询到的plan', response)

          this.plan = response.data
          plan = response.data

          //进行权限验证
          this.authorityLimit(plan)


          //如果查询到的计划状态是 未提交
          if (plan.state !== '未提交') {
            this.mainflag = true
          }

          //将获得的参数赋值给所有的绑定数据
          this.basicInfoForm.name = plan.name
          this.basicInfoForm.level = plan.level
          // this.basicInfoForm.chargePeople = plan.chargePeople

          this.basicInfoForm.fixDate = plan.fixdate
          this.basicInfoForm.planType = plan.planType

          // this.equipmentData = plan.equipmentData
          this.maintenanceContent = plan.maintenanceContent
          this.maintenanceCase = plan.maintenanceCase
          // this.partData = plan.partData
          //
          //对第三方维修框架传入初始值
          if ('第三方维保' === plan.maintenanceWay) {
            this.selectedMode = 2
          } else if ('内部维保' === plan.maintenanceWay) {
            this.selectedMode = 1
          }
          this.company = plan.company
          if (plan.company !== '' && plan.company !== '河润科技') {
            listCollaboratorAnyone({ companyName: plan.company }).then(response => {
              // console.log('company',response)
              if (typeof (response.rows[0]) != 'undefined') {
                this.companyId = response.rows[0].companyId
              }
            })
          }
          // this.company = plan.company
          this.basicInfoForm.remark = plan.remark

          //只有第三方维保时  才有派工单
          if (plan.maintenanceWay === '第三方维保') {
            if (plan.company !== '河润科技') {
              //获取相应的派工单
              getWork(plan.workCard).then(response => {
                if (typeof (response.data) != 'undefined') {
                  this.form = response.data
                }
              })
            }
          }

          this.basicInfoForm.auditProcess = plan.auditProcess
          this.basicInfoForm.checkProcess = plan.checkProcess
          this.basicInfoForm.auditMessage = plan.auditMessage
          this.basicInfoForm.acceptMessage = plan.acceptMessage
          if(plan.auditProcess===plan.checkProcess){
            this.processRadio="1";
            this.acceptShow = false
            this.acceptShow1 = true
          }
        }).then(
          () => {
            // let executeObj = JSON.parse(plan.executePeople)
            // let executeIndex = [executeObj.departmentId, executeObj.id]
            // this.basicInfoForm.executePeople = executeIndex
            this.basicInfoForm.executePeople = plan.executePeople

            if (plan.chargePeople !== '') {
              let chargeObj = JSON.parse(plan.chargePeople)
              let chargeIndex = [chargeObj.departmentId, chargeObj.id]
              this.basicInfoForm.chargePeople = chargeIndex

              // console.log('chargeObj',chargeObj)
              // this.form.leader = chargeObj.name
              this.showChargePeople = chargeObj.name

              if(this.form.leader===''){
                this.form.leader = chargeObj.name
              }
              if (this.form.sendpeople === '') {
                this.form.sendpeople = chargeObj.name
              }
            }


            // console.log("inputValue",this.$refs['chargePeopleCascader'].inputValue)
            // this.form.chargePeople = this.$refs['chargePeopleCascader'].inputValue

            this.equipmentForm.equipmentData = JSON.parse(plan.equipmentData)
            this.partData = JSON.parse(plan.parts)
          }
        )

      } else {
        //没有维保计划id 说明是新增页面
        //将项目负责人设置为当前用户
        getUserProfile().then(response => {
          console.log('user', response.data)
          let user = response.data
          // let department = response.data.dept
          this.basicInfoForm.chargePeople = [user.deptId.toString(),user.userId.toString()]
          this.showChargePeople = user.userName
          // this.basicInfoForm.chargePeople.push()
          // this.basicInfoForm.chargePeople.push()

          this.form.sendpeople = response.data.userName
          getDept(response.data.deptId).then(res => {
            if (typeof (this.form) != 'undefined') {
              this.form.senddepartment = res.data.deptName
            }
          })
          this.form.leader = response.data.userName
        })
        // getUserProfile().then(response => {
        //   this.form.sendpeople = response.data.userName
        //   getDept(response.data.deptId).then(res => {
        //     if (typeof (this.form) != 'undefined') {
        //       this.form.senddepartment = res.data.deptName
        //     }
        //   })
        // })
        //如果从巡检计划 接入
        const inspection = this.$route.query.inspection
        if (typeof (inspection) !== 'undefined') {
          if (typeof (inspection.equipments) !== 'undefined') {
            this.equipmentForm.equipmentData = inspection.equipments
          }
          if (typeof (inspection.pics) !== 'undefined') {
            this.plan.previousPic = JSON.stringify(inspection.pics)
          }
          this.InspectionValue = inspection.value
        }

      }


    },

    authorityLimit(plan) {
      var username
      getUserProfile().then(response => {
        username = response.data.userName
        console.log('user',response.data)
        //
        let chargeObj = JSON.parse(plan.chargePeople)
        let chargeIndex = [chargeObj.departmentId, chargeObj.id]
        this.basicInfoForm.chargePeople = chargeIndex

        console.log('chargeObj',chargeObj);
        if (username === 'admin') {
          //管理员拥有全部权限
          //权限全开放

          if(plan.state === '未提交'){
            this.applyFlag = false
            this.checkFlag = true
            this.auditFlag = true
          }
          if (plan.state === '审核中'||plan.state === '待审核') {
            this.applyFlag = true
            this.checkFlag = true
            this.auditFlag = false
          }
          if (plan.state === '验收中'||plan.state === '待验收') {
            this.applyFlag = true
            this.checkFlag = false
            this.auditFlag = true
          }
        } else if (username === chargeObj.name && username !== plan.checkPeople && username !== plan.acceptPeople) {
          //如果当前负责人 只有维保单处于未提交,已审核,维保中时才可以更改
          if (plan.state === '未提交'||plan.state === '已维保'||plan.state === '维保中') {
            if (plan.firstAuditTime !== null && plan.firstAuditTime !== '' && typeof (plan.firstAuditTime) != 'undefined') {
              this.mainflag = true
              //当前维保单 状态为 未提交  但是 是被审核驳回的维保单  基本信息和设备信息不可以改
            }else{
              //当前维保单 状态为 未提交  没有第一次审核时间  是新建的 什么都可以改
            }
          }else{
            //当前维保单 状态不是未提交 提交后不可以改 直接跳回
            this.$router.back()
          }
        } else if (username === plan.checkPeople) {
          //如果当前用户是当前审核人 则基础信息和设备信息不可改 其他都可改
          this.mainflag = true
          this.applyFlag = true
          this.checkFlag = true
          this.auditFlag = false

        } else if (username === plan.acceptPeople) {
          //如果当前用户是当前验收人 则基础信息和设备信息不可改 其他都可改
          this.mainflag = true
          this.applyFlag = true
          this.checkFlag = false
          this.auditFlag = true


        } else {
          //其他人无权限 强制 跳出
          this.$router.back()
        }











      })

    }

  },

  mounted() {
    //进行用户权限校验
    // getUserProfile().then(response => {
    //   this.username = response.data.userName
    //   this.getList();
    // })
    // this.authorityLimit()

    this.getPlanMessage()
    this.getUserOption()
    this.getEquipmentOption()
    this.getDepartmentOption()
    this.getPartOption()
    this.getDefaultOption()
    this.getProcessOption()

  },
  // watch:{
  //   'this.shows[5].value'(newVal,oldVal){
  //     console.log("对象属性对象监听")
  //     console.log(newVal)
  //     console.log(oldVal)
  //   }
  // }

  // created() {
  //   this.$watch(
  //     () => this.shows[5].value,
  //     function(val, old) {
  //       console.log('对象属性对象监听')
  //       console.log(val)
  //       console.log(old)
  //     }
  //   )
  // }

  //第二种方法：
  computed: {
    //获得选择的负责人 名称
    // showChargePeople() {
    //   return this.$refs['chargePeopleCascader'].getCheckedNodes()[0].label
    // },

    sumAmount() {
      let sumAmount = 0
      this.amountData.forEach(element => {
        sumAmount += parseInt(element.expenseAmount)
      })
      return sumAmount
    },

    watchInputData() {
      return this.shows[5].value
    },
    //列表序号
    tableIndex() {
      return function(scope) {
        return scope.$index + 1
      }
    },
    //是否展示分页
    showPagination() {
      return this.total && this.showThirdParty
    },
    watchPicShow() {
      return this.shows[2].value
    },
    watchWorkShow() {
      return this.shows[5].value
    },
    watchAllMessageShow(){
      return this.shows[7].value
    },

  },
  watch: {
    // 'watchInputData'(newVal, oldVal) {
    //   this.showAll()
    // },
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
    // companyCompute: {
    //   handler(newVal, oldVal) {
    //     // console.log('company1', oldVal)
    //     // console.log('company2', newVal)
    //     if ('第三方维保' === newVal) {
    //       //将下拉框的值  转换为第三方维保
    //     }
    //   }
    // },

    watchPicShow: {
      handler(newVal, oldVal) {
        // console.log("this.planId",this.planId)
        if (typeof (this.planId) !== 'undefined' && this.planId !== '') {
          // alert("444")
          if (this.plan.previousPic === '[]' && this.plan.subsequentPic === '[]' && this.plan.applyAccessory === '[]' && this.plan.auditAccessor === '[]' && this.plan.checkAccessor === '[]') {
            getPlan(this.planId).then(response => {
              let plan = response.data
              this.plan.previousPic = plan.previousPic
              this.plan.subsequentPic = plan.subsequentPic
              this.plan.applyAccessory = plan.applyAccessory
              this.plan.auditAccessor = plan.auditAccessor
              this.plan.checkAccessor = plan.checkAccessor
              // console.log('this.plan.checkAccessor = plan.checkAccessor', this.plan.previousPic)
              // console.log('this.plan.checkAccessor = plan.checkAccessor', this.plan.applyAccessory)
            })
          }
        }
      }
    },
    watchWorkShow: {
      handler(newVal, oldVal) {
        if(typeof(this.form)=='undefined') return

        // console.log("this.form.id",this.form.id)
        if (typeof (this.form.id) !== 'undefined' && this.form.id !== '') {
          // alert("555")

          getWork(this.form.id).then(response => {
            let work = response.data
            this.form.attachment = work.attachment
          })
        }else {
          //通过数据库查找 当天创建的派工单 当前创建的派工单末尾编号为  当天创建的派工单+1
          // this.form.numberid = 'pg-' + this.timeToString(new Date()).split(' ')[0] + '-' + this.basicInfoForm.name
          // let startDate = new Date()
          // startDate.setHours(0, 0, 0, 0)
          // let endData = new Date(startDate.getTime() + 24*60*60*1000);
          // console.log('startDate', startDate)
          // console.log('endData',endData)
          getWorkListNowDay({ }).then(response => {
            console.log('getWorkListNowDay', response)
            this.form.numberid = 'pg-' + this.timeToString(new Date()).split(' ')[0] + '-' + (response.length+1)
          })
        }
        // this.work.leader = this.plan.chargePeople
      }
    },
    watchAllMessageShow:{
      handler(newVal, oldVal) {
        this.plan.budget = this.sumAmount;
        if(this.basicInfoForm.auditProcess!==""){
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = this.basicInfoForm.auditProcess.split(/[①②③④⑤⑥⑦⑧⑨]/);
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          // console.log('auditMessage',this.basicInfoForm.auditProcess)
          if(this.basicInfoForm.auditMessage!==""&&typeof(this.basicInfoForm.auditMessage)!=='undefined'&&this.basicInfoForm.auditMessage!==null){
            const suggest = this.basicInfoForm.auditMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.auditList = []

          for (var i = 0; i < processlist.length - 1; i++) {
            var arr = {}
            arr.name = processlist[i + 1]
            arr.suggestion = messageList[i]
            this.auditList.push(arr)
          }
        }

        if (this.basicInfoForm.checkProcess !== '') {
          // let testData = "①张三②李四③王五④赵四"
          // let testData2 = "很好很好|审核通过|准许通过|很好很好"
          const processlist = this.basicInfoForm.checkProcess.split(/[①②③④⑤⑥⑦⑧⑨]/)
          let messageList = []
          messageList.length = processlist.length
          messageList.fill('')
          //如果评论不为空
          if (this.basicInfoForm.acceptMessage !== '' && typeof (this.basicInfoForm.acceptMessage) !== 'undefined' && this.basicInfoForm.acceptMessage !== null) {
            const suggest = this.basicInfoForm.acceptMessage.split('|')
            for (let i = 0; i < suggest.length; i++) {
              messageList[i] = suggest[i]
            }
          }
          this.acceptList = []
          for (var i = 0; i < processlist.length - 1; i++) {
            var arr = {}
            arr.name = processlist[i + 1]
            arr.suggestion = messageList[i]
            this.acceptList.push(arr)
          }
        }
      }
    }
  },
  created() {
    getUserProfile().then(response => {
      this.username = response.data.userName
      this.getList();
      this.getTime();
    })
  }

}
</script>


<style scoped>
@keyframes move {

  0% {
    transform: translateX(100px);
  }
  50% {
    transform: translate(150px, 200px);
  }
  100% {
    transform: translateX(200px);
  }
}

.animation {
  animation: move 3s infinite;
}

.pink {
  background-color: pink;
}

.green {
  background-color: lightgreen;
}

.transition {
  /*transition: 2s linear;*/
  transition: 2s ease;
}

.myInput {
  font-size: 12px;
  width: 100%;
  height: 100%;
  border: none;
  float: left;
  zoom: 1;
  outline: medium;
}
.processTable{
  pointer-events: none;
}
</style>
<style >
.setclass1{
  background: lime;
}
.setclass2{
  background: rgba(255, 76, 0, 0.76);
}
.setclass3{
  background: 	#C0C0C0;
}
</style>
