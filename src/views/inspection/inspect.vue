<template>
  <div>
    <div style="width:95%;margin-left: 30px;background: #d2e9ff; margin-top: 10px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" style="margin-top:20px;position:absolute;margin-left: 20px">
      <el-form-item label="巡检名称" prop="inspectName">
        <span slot="label">
          <span class="formLabel" style="font-size: 16px;font-family: Arial;font-weight: normal">巡检名称</span>
        </span>
        <el-input
          v-model="queryParams.inspectName"
          placeholder="请输入巡检名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="巡检时间">
        <span slot="label">
          <span class="formLabel" style="font-size: 16px;font-family: Arial;font-weight: normal">巡检时间</span>
        </span>
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
<!--      <el-form-item label="巡检时间" prop="date">
        <el-date-picker clearable
                        v-model="queryParams.date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择巡检时间">
        </el-date-picker>-->
<!--        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>-->

      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
</div>
<!--    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:inspection:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:inspection:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:inspection:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:inspection:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->
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
          设备巡检记录
        </p>
          <el-button
            type="success"
            icon="el-icon-plus"
            size="mini"
            @click="skipto(plan)"
            style="float: right; margin-right: 10px;margin-top: 13px; "
          >生成维保</el-button>     <!--margin-top:50%; transform：translateY(-50%)-->

      </div>
    <el-table
      @row-click="singleElection"
      :header-cell-style="{
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
        }"v-loading="loading" :data="inspectionList" @selection-change="handleSelectionChange" style="height:auto;margin-top: 20px;width:99%">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="序号" :width="80">
        <template  slot-scope="scope" >
         <el-radio  v-model="templateSelection" :label="scope.$index+1" @change="forskip(scope.row)"></el-radio>
        </template>
      </el-table-column>

      <el-table-column label="巡检名称" align="center" prop="inspectName"  >
      <template slot-scope="scope">
        <el-link @click="detail(scope.row);getEquipmentdata(scope.row);" type="primary">{{scope.row.inspectName }}</el-link>
      </template></el-table-column>
      <el-table-column label="故障地点" align="center" prop="dangerAddress" />
      <el-table-column label="巡检时间" align="center" prop="date" />
<!--      <el-table-column label="故障描述" align="center" prop="description" />
      <el-table-column label="故障设备" align="center" prop="equipemnts" />
      <el-table-column label="是否维保" align="center" prop="isMaintain" />
      <el-table-column label="照片" align="center" prop="pic" />
      <el-table-column label="巡检时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="是否维保" align="center" prop="isMaintain" />
      <el-table-column @click="skipto(plan)" label="维保计划名称" align="center" prop="maintenanceName" >
        <template slot-scope="scope">
          <el-link @click="todetail(scope.row);" type="primary">{{scope.row.maintenanceName }}</el-link>
          </template>
          </el-table-column>
<!--      <el-table-column label="是否维保" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-plus"
            size="mini"
            @click="detail(scope.row)"
            v-hasPermi="['']"
          >维保</el-button>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row); getEquipmentdata(scope.row);getEquipmentOption()"

            :disabled="scope.row.maintenanceName!==null&&scope.row.maintenanceName!==''"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"

            :disabled="scope.row.maintenanceName!==null&&scope.row.maintenanceName!==''"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
      style="margin-bottom: 15px;"
    />-->
    </el-card>
    <!-- 添加或修改inspect对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="巡检名称" prop="inspectName">
          <el-input v-model="form.inspectName" placeholder="请输入巡检名称"  />
        </el-form-item>
        <el-form-item label="故障地点" prop="dangerAddress">
          <el-input v-model="form.dangerAddress" placeholder="请输入故障地点" />
        </el-form-item>
        <el-form-item label="故障描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入故障描述"  />
        </el-form-item>
<!--        <el-form-item label="故障设备" prop="equipemnts">
          <el-input v-model="form.equipemnts" placeholder="请输入故障设备" />
        </el-form-item>-->
        <el-form-item label="设备名称">
          <el-cascader
            style="width:80%"
            ref="equipmentCascader"
            placeholder="试试搜索：电机"
            :options="equipmentOptions"
            v-model="equipmentId"
            @change="addEquipment"
            filterable
          >
          </el-cascader>
        </el-form-item>


        <el-form-item label="相关设备">
        <el-table
          :data="equipmentData"
          style="width: 90%"
        >
          <el-table-column
            prop="name"
            label="名称"
            width="180"
          >
          </el-table-column>

          <el-table-column
            label="故障类型"
            width="180"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.state" placeholder="请选择" >
                <el-option
                  v-for="item in faultCauseOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="编号"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="deleteEquipment(scope.$index)">删除</el-link>
            </template>

          </el-table-column>
        </el-table>
        </el-form-item>


<!--        <el-form-item label="是否维保" prop="isMaintain">
          <el-input v-model="form.isMaintain" placeholder="请输入是否维保" />
        </el-form-item>-->
        <el-form-item label="是否维保" > <!--prop="isMaintain"-->
          <!--      <el-input v-model="form.isMaintain" placeholder="请输入是否维保" />-->
          <el-select v-model="form.isMaintain" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="照片" prop="pic">
          <el-input v-model="form.pic" placeholder="请输入照片" />
        </el-form-item>-->
        <el-form-item label="照片" >
          <upload-pic :message="JSON.stringify(beforePic)" @returnData="getBeforePic"></upload-pic>
        </el-form-item>
        <el-form-item label="巡检时间" prop="date">
          <el-date-picker clearable
                          v-model="form.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择巡检时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检人" prop="inspectPeople">
          <el-input v-model="form.inspectPeople" placeholder="请输入巡检人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 展示详细信息 -->
    <el-dialog :title="title" :visible.sync="open2" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="巡检名称" prop="inspectName">
          <el-input readonly v-model="form.inspectName" placeholder="请输入巡检名称" />
        </el-form-item>
        <el-form-item label="故障描述" prop="description">
          <el-input type="textarea" readonly v-model="form.description" placeholder="请输入故障描述" />
        </el-form-item>
        <el-form-item label="故障设备" prop="equipemnts">
<!--         <el-input readonly v-model="form.equipemnts" placeholder="请输入故障设备" />-->
          <el-table
            :data="equipmentData"
            style="width: 80%"
          >
            <el-table-column
              prop="name"
              label="名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              label="故障模式"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="code"
              label="编号"
              width="180"
            >
            </el-table-column>
          </el-table>
        </el-form-item>
<!--        <el-form-item label="照片" prop="pic">
          <el-input v-model="form.pic" placeholder="请输入照片" />
        </el-form-item>-->
        <el-form-item label="是否维保" prop="isMaintain">
          <el-input v-model="form.isMaintain" placeholder="请输入是否维保" readonly />
        </el-form-item>
        <el-form-item label="巡检时间" prop="date">
          <el-date-picker clearable
                          readonly
                          v-model="form.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择巡检时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="巡检人" prop="inspectPeople">
          <el-input readonly v-model="form.inspectPeople" placeholder="请输入巡检人" />
        </el-form-item>
        <el-form-item label="照片" prop="pic">
        <div class="demo-image__lazy" style="height:0px; overflow-y: auto; padding-top:-50px; "></div>
          <el-image style="margin-top:3px;" v-for="url in urls" :key="url" :src="url" lazy></el-image>
<!--          :src="require('../../assets/images/'+url)"-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getback">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listInspection,
  getInspection,
  delInspection,
  addInspection,
  updateInspection,
  listInspectiononly
} from '../../api/system/inspection'
import { listLevelNode } from '../../api/system/tree'
import uploadPic from '../life/uploadPic'
import { listTrouble } from '../../api/system/trouble'


export default {
  name: "Inspect",
  components:{uploadPic},
  data() {
    return {

      // 日期范围
      dateRange: [],

      //图片上传
      beforePic: [{
        name: "",
        nowDate: ""
      }],
      //跳转数据
      plan:{
        value:'',
        equipments:[],
        pics:[],
      },
      //是否维保下拉框选项
      options: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      //添加照片返回的数据
      backpic:'',
      //单选按钮
      templateSelection: '',
      //所有设备
      equipmentOptions:[],
      //设备故障类型
      faultCauseOption:[],
      //选择设备Id
      equipmentId: '',
      //设备编码
      equipmentCode: '',
      //设备表
      equipmentData: [],
      //设备名称
      name:null,
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
      // inspect表格数据
      inspectionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹详情出层
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        inspectName: null,
        date: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      readonly:true,
      tupian:[],
      urls: [
        ]
      };
      },
  created() {
    this.getList();
    this.getDefaultOption();

  },
  methods: {
    /** 查询inspect列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.dateRange && '' != this.dateRange) {
        this.queryParams.params["beginDate"] = this.dateRange[0];
        this.queryParams.params["endDate"] = this.dateRange[1];
      }
      listInspectiononly(this.queryParams).then(response => {
        this.inspectionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      //this.addDateRange(this.queryParams, this.dateRange)
    },
    //初始化故障模式下拉表格内容
    getDefaultOption() {
      listTrouble().then(response => {

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
    //为跳转赋值
    forskip(value){
      this.plan.equipments=JSON.parse(value.equipemnts);
      this.plan.pics=JSON.parse(value.pic);
      this.plan.value=value;
    },

    //跳转维保计划
    todetail(value){
      this.$router.push({
        path: '/mainplan/fix/details',// graph/fix/details
        query: {
          planname: value.maintenanceName }
      })
    },

    //跳转
    skipto: function (value) {
      /*const content=JSON.stringify(value);*/
      /*console.log(value);*/
      if(value.value!==''){
      if(value.value.maintenanceName===null||value.value.maintenanceName===""){
      this.$router.push({
        path: "/mainplan/fix/create",//
        query: {
         inspection: value,
        },
      });}else{this.$modal.msgError("该记录无法再次生成维保计划！");}}else{this.$modal.msgError("请先选择一条维保记录!");}
    },


    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //单选 按钮
    singleElection (row) {
     /* this.templateSelection = row.id;*/

      /*this.templateRadio = row.id;*/
    },
    //获取所有设备
    getEquipmentOption() {
      listLevelNode().then(response => {
        this.equipmentOptions = response
      })
    },
    //删除设备
    deleteEquipment(index) {
      // alert("删除设备"+index)
      this.$confirm('此操作将删除所选设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.equipmentData.splice(index, index + 1)
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

    //添加设备
    addEquipment() {
      // console.log(this.$refs['equipmentCascader'].getCheckedNodes()[0].label)
      // this.$refs['addNodeCascader']
      let strs = this.$refs['equipmentCascader'].getCheckedNodes()[0].label.split(' ')
      this.equipmentData.push({
        name: strs[0],
        code: strs[1],
        state: ''
      })
    },
  //返回当前行的已选设备
    getEquipmentdata(row){

      this.equipmentData=[];
      this.equipmentData=JSON.parse(row.equipemnts);
    },
    // 返回按钮
    getback() {
      this.open2 = false;
    },
    // 表单重置
    reset() {

      this.form = {
        id: null,
        inspectName: null,
        dangerAddress: null,
        description: null,
        equipemnts: null,
        isMaintain: null,
        pic: null,
        date: null,
        inspectPeople: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
     /* this.queryParams.pageNum = 1;*/
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加inspect";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      if(row.maintenanceName===null||row.maintenanceName===""){
        /*console.log("维保名字"+row.maintenanceName)*/
        this.reset();
       const id = row.id || this.ids
        getInspection(id).then(response => {
          this.form = response.data;
          if(JSON.parse(response.data.pic)!=null){
            this.beforePic=JSON.parse(response.data.pic);//JSON.parse(response.data.pic)
          }
          /*this.beforePic=JSON.parse(response.data.pic);*/
          this.open = true;
          this.title = "修改巡检记录";

        });
     }else{this.$modal.msgError("该记录已生成维保计划，无法更改！");}

      },
    /** 详情查看 */
    detail(row){
      this.reset();
      const id = row.id || this.ids
      getInspection(id).then(response => {
        this.form = response.data;
        const pics=JSON.parse(row.pic);//JSON.parse(row.pic)
        /*this.tupian=pics;*/
        this.urls=[];
        for(let i=0;i<pics.length;i++)
          this.urls.push(process.env.VUE_APP_BASE_API+"/profile/upload/"+pics[i].nowDate+"/"+pics[i].name)
        this.open2 = true;
        this.title = "巡检记录详情";
      });


    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {

            this.form.equipemnts=JSON.stringify(this.equipmentData);
            this.form.pic=this.backpic;//JSON.stringify(this.backpic)
            if(this.backpic===''){
              this.form.pic=JSON.stringify(this.beforePic);
            }
            updateInspection(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
            } else {
            addInspection(this.form).then(response => {
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
      if(row.maintenanceName){
        this.$modal.msgError("该记录已生成维保计划，无法删除！");
      }else{
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除？').then(function() {
        return delInspection(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});}
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/inspection/export', {
        ...this.queryParams
      }, `inspection_${new Date().getTime()}.xlsx`)
    },
    getBeforePic(val) {

      this.backpic=JSON.stringify(val);


    },
  }
};
</script>
