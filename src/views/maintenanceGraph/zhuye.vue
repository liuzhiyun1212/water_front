<template>
    <div>
      <el-card
        style="
        width: 95%;
        margin-left: 30px;
        margin-top: 10px;
        background: #d2e9ff;
      "
      >
<!--      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" style="margin-top:20px;position:absolute;">
        <el-form-item label="维保计划" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入维保计划名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>-->
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
          @click="findDataMethod()"
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
<!--        <div style="line-height:35px;font-weight:bold;margin-top:-5px;width:99%;height:35px;background: #d2e9ff; border-radius: 5px;box-shadow: 4px 4px 4px #d9d9d9;">维保记录
&lt;!&ndash;          <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:collaborator:add']" style="float: right;"
        >新增</el-button>&ndash;&gt;
        </div>-->
        <div style="width: 100%; margin-top: 10px;height:70px;display: flex;border-radius: 5px; background-color: aliceblue;">
          <i class="iconfont icon-circle" @click="stateQuery('未提交')" style="align-self: center; color: #5B8FF9;float: left; cursor: pointer; font-size: 20px;margin-left: 20px;">&nbsp;&nbsp;{{this.stateName[0]}}</i>
          <div class="未提交"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[0].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('待审核')" style="align-self: center;color:  #be002f;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[1]}}</i>
          <div class="待审核"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[1].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('审核中')" style="align-self: center;color: #FF6347;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[2]}}</i>
          <div class="审核中"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[2].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已审核')" style="align-self: center;color: blue;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[3]}}</i>
          <div class="已审核"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[3].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('维保中')" style="align-self: center;color: #228b22;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[4]}}</i>
          <div class="维保中"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[4].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已维保')" style="align-self: center;color: #da70d6;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[5]}}</i>
          <div class="已维保"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[5].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('待验收')" style="align-self: center;color: #40e0d0;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[6]}}</i>
          <div class="待验收"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[6].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('验收中')" style="align-self: center;color: darkkhaki;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[7]}}</i>
          <div class="验收中"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[7].count}}</p>
          </div>
          <i class="iconfont icon-circle" @click="stateQuery('已验收')" style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;{{this.stateName[8]}}</i>
          <div class="已验收"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[8].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('')" style="align-self: center;color: #808a87;float: left; cursor: pointer; font-size: 20px;margin-left: 5px;">&nbsp;&nbsp;全部</i>
          <div class="全部"
          style="align-self: center;width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.length1}}</p>
          </div>
          <!-- <i class="iconfont icon-circle" @click="stateQuery('未提交')" style="color: #5B8FF9; margin-left: 50px;margin-top: 25px; float: left; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[0]}}</i>
          <div class="未提交"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;float: left;margin-left: 125px;margin-top: 21px;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[0].count}}</p>
          </div> -->
          <!-- <i class="iconfont icon-circle" @click="stateQuery('待审核')" style="color: #be002f; margin-left: 180px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[1]}}</i>
          <div class="待审核"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 255px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[1].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('审核中')" style="color: #FF6347; margin-left: 310px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[2]}}</i>
          <div class="审核中"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 385px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[2].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已审核')" style="color: blue; margin-left: 435px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[3]}}</i>
          <div class="已审核"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 510px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[3].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('维保中')" style="color: #228b22; margin-left: 560px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[4]}}</i>
          <div class="维保中"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 635px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[4].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已维保')" style="color: #da70d6; margin-left: 685px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[5]}}</i>
          <div class="已维保"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 760px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[5].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('待验收')" style="color: #40e0d0; margin-left: 810px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[6]}}</i>
          <div class="待验收"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 885px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[6].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('验收中')" style="color: darkkhaki; margin-left: 930px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[7]}}</i>
          <div class="验收中"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 1005px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[7].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已验收')" style="color: #808a87; margin-left: 1055px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;{{this.stateName[8]}}</i>
          <div class="已验收"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 1130px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.stateList[8].count}}</p>
          </div>

          <i class="iconfont icon-circle" @click="stateQuery('已验收')" style="color: #808a87; margin-left: 1180px;margin-top: 25px; position: absolute; cursor: pointer; ">&nbsp;&nbsp;全部</i>
          <div class="全部"
          style="width:30px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 1240px;margin-top: 21px; position: absolute;">
            <p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{this.length1}}</p>
          </div> -->
          <!-- <i class="iconfont icon-circle"  @click="openflaa()" style=" cursor: pointer; color: #be002f; margin-left: 305px;margin-top: 28px; position: absolute; "><p @click="openflaa()" style=" cursor: pointer; color: #be002f; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;停用设备</p></i>
          <div class="故障设备" style="width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 400px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.flautequ}}</p></div>

          <i class="iconfont icon-circle" @click="openrepp()" style=" cursor: pointer; color: #f2be45; margin-left: 530px;margin-top: 28px; position: absolute; "><p @click="openrepp()" style=" cursor: pointer; color: #f2be45; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;维护设备</p></i>
          <div class="维护设备" style="width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 625px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.repairequ}}</p></div>

          <i class="iconfont icon-circle" @click="openbadd()" style=" cursor: pointer; color: #75878a; margin-left: 755px;margin-top: 28px; position: absolute; "><p @click="openbadd()" style=" cursor: pointer; color: #75878a; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;报废设备</p></i>
          <div class="报废设备" style="width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 850px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.badequ}}</p></div> -->

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
                @selection-change="handleSelectionChange" style="margin-top: 20px;width:100%">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <!-- <el-table-column label="序号" align="center" prop="id" /> -->
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column
          prop="name"
          label="维保计划名称"
          :show-overflow-tooltip="true" align="center"
        >
        <template slot-scope="scope">
            <el-link type="primary" @click="showMore(scope.row.name)">{{
              scope.row.name
            }}</el-link>
        </template>
        </el-table-column>
        <el-table-column label="计划制定时间" align="center" prop="makingTime" width="120">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.makingTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="管理人" align="center" prop="chargePeople" /> -->
          <!-- <el-table-column
        prop="state"
        label="执行阶段"
        :show-overflow-tooltip="true"
      >
      <template slot-scope="scope"><img
              style="width: 100%; height: 100%"
              :src="require('../../assets/' + scope.row.state + '.jpg')"/></template>
      </el-table-column> -->
      <el-table-column label="维保方式" align="center" prop="maintenanceWay" />
      <el-table-column label="维保项目" align="center" prop="maintenanceContent" />
        <el-table-column
        prop="state"
        label="执行阶段"
        :show-overflow-tooltip="true" align="center"
      >
      </el-table-column>
<!--        <el-table-column label="维保开始与结束" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="beginPlan(scope.$index, scope.row)"
              disabled="beginButton">开始</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="endPlan(scope.$index, scope.row)"
              disabled="Button">结束</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row.id)"
              v-hasPermi="['system:plan:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:plan:remove']"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleSubmit(scope.row.id)"
              v-hasPermi="['system:plan:edit']" v-if="scope.row.state === '未提交'"
            >提交</el-button>
          </template>
        </el-table-column>-->
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
<!--      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />-->
      <!-- 详情对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <div>
          {{this.moreId}}
        </div>
      </el-dialog>
      <!-- 添加或修改plan对话框 -->
      <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="维保计划名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入维保计划名称" />
          </el-form-item>
          <el-form-item label="维保计划制定时间" prop="makingTime">
            <el-date-picker clearable
                            v-model="form.makingTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择维保计划制定时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="当前状态" prop="state">
            <el-input v-model="form.state" placeholder="请输入当前状态" />
          </el-form-item>
          <el-form-item label="管理人" prop="chargePeople">
            <el-input v-model="form.chargePeople" placeholder="请输入管理人" />
          </el-form-item>
          <el-form-item label="维保方式" prop="maintenanceWay">
            <el-input v-model="form.maintenanceWay" placeholder="请输入维保方式" />
          </el-form-item>
          <el-form-item label="维保等级" prop="level">
            <el-input v-model="form.level" placeholder="请输入维保等级" />
          </el-form-item>
          <el-form-item label="维保项目">
            <editor v-model="form.maintenanceContent" :min-height="192"/>
          </el-form-item>
          <el-form-item label="维保情况" prop="maintenanceCase">
            <el-input v-model="form.maintenanceCase" placeholder="请输入维保情况" />
          </el-form-item>
          <el-form-item label="维保前照片" prop="previousPic">
            <el-input v-model="form.previousPic" placeholder="请输入维保前照片" />
          </el-form-item>
          <el-form-item label="维保后照片" prop="subsequentPic">
            <el-input v-model="form.subsequentPic" placeholder="请输入维保后照片" />
          </el-form-item>
          <el-form-item label="预算金额" prop="budget">
            <el-input v-model="form.budget" placeholder="请输入预算金额" />
          </el-form-item>
          <el-form-item label="第三方公司" prop="company">
            <el-input v-model="form.company" placeholder="请输入第三方公司" />
          </el-form-item>
          <el-form-item label="申请附件" prop="applyAccessory">
            <el-input v-model="form.applyAccessory" placeholder="请输入申请附件" />
          </el-form-item>
          <el-form-item label="审核附件" prop="auditAccessor">
            <el-input v-model="form.auditAccessor" placeholder="请输入审核附件" />
          </el-form-item>
          <el-form-item label="验收附件" prop="checkAccessor">
            <el-input v-model="form.checkAccessor" placeholder="请输入验收附件" />
          </el-form-item>
          <el-form-item label="实施人" prop="executePeople">
            <el-input v-model="form.executePeople" placeholder="请输入实施人" />
          </el-form-item>
          <el-form-item label="维保时间" prop="fixdate">
            <el-date-picker clearable
                            v-model="form.fixdate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择维保时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog> -->
      </el-card>
    </div>
  </template>

  <script>
  import { getListreverse, getPlan, delPlan, addPlan, state,planMain,listPlanName } from "../../api/system/plan";

  export default {
    name: "Maintenance",
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
      this.state();
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
        /*if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }*/
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
            // console.log(this.planList[x].devCode);
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
          // console.log(this.planList.length);
          this.findData = [];
          i = 0;
        }
        if (this.planPerson != "") {
          for (x = 0; x < this.planData.length; x++) {
            // console.log(this.planList[x].devCode);
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
          // console.log(this.planList.length);
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
        listPlanName(this.queryParams).then(response => {
          this.planData = response.rows;
          this.planList = response.rows;
          this.totalpage = this.planList.length;
          this.planList = this.planList.reverse();
          // this.planList = this.planList.reverse();
          // this.length1 = response.rows.length;
          this.loading = false;
        });
      },
      toNew() {
        this.$router.push({
        path: "/maintenanceGraph/maintenanceGraph/index",
      });
      },

      handleSubmit(row) {
        this.$modal.confirm('是否确认提交?').then(function(){
          getPlan(row).then(response => {
          const submit = response.data;
          console.log("aaaaa",submit);
          //获取审核流程
          let auditPeople = submit.auditProcess.split(/[①②③④⑤⑥⑦⑧⑨⑩]/);
          submit.checkPeople = auditPeople[1]
          submit.state="待审核";
          planMain(submit);
          // this.state()
        })}).then(() => {
          this.getList();
          this.state();
          this.$modal.msgSuccess("提交成功");
          this.state();
          this.getList();
        }).catch(() => {});
        },

      // 新修改统计状态总数
      state() {
          state(this.queryParams).then(response => {
            this.stateList = response;
            this.length1 = 0;
            for(let i=0; i<this.stateList.length; i++) {
              this.length1 += parseInt(this.stateList[i].count)
            }
        });
        },
      // 根据执行阶段搜索
      stateQuery(params){
        this.queryParams.state = params;
        this.handleQuery();
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          name: null,
          makingTime: null,
          state: null,
          maintenanceWay: null,
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
          fixdate: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 开始按钮*/
      beginPlan(row){
        console.log(row);
      },
      /** 结束按钮 */
      endPlan(row){
        console.log(row);
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.$router.push({
        path: "/mainplan/fix/create",
      });
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.$router.push({
        path: "/mainplan/fix/create",
        query: {
          id:row
        },
      });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updatePlan(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addPlan(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除?').then(function() {
          return delPlan(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
          this.state();
          this.getList();
        }).catch(() => {});

      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('system/plan/export', {
          ...this.queryParams
        }, `plan_${new Date().getTime()}.xlsx`)
      },
      // 详情页面
      showMore(row){
        /*this.moreId = row
        this.open = true;
        this.title = "详情";*/
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
    }
  };
  </script>
<style>
.el-table .warning-row {
  /*background: oldlace;*/
  background: #FFCCCC;
}

.el-table .success-row {
  background: #FBD6A4;
}
</style>
