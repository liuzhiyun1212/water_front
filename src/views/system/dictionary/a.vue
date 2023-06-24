<template>
  <div class="app-container">
    <el-row :gutter="30">
      <!-- 卡片1 -->
      <el-col :span="12">
        <el-card class="update-log">
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd1"
                v-hasPermi="['system:dictionary:add']"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple1"
                @click="handleDelete1"
                v-hasPermi="['system:dictionary:remove']"
              >删除</el-button>
            </el-col>
          </el-row>
        <el-table ref="dictionaryList1" v-loading="loading1" :data="dictionaryList1" @selection-change="handleSelectionChange1" height="300">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="名称" align="center" prop="dictName" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="dictdata1(scope.row)"
            >{{scope.row.dictName}}</el-button>
          </template>
          </el-table-column>
        </el-table>

          <smallpagination
            v-show="total1>0"
            :total="total1"
            :page.sync="pageNum1"
            :limit.sync="queryParams.pageSize"
            @pagination="getList1"
          />

    </el-card>
      </el-col>
      <!-- 卡片2 -->
      <el-col :span="12">
      <el-card class="update-log">
      <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd2"
              v-hasPermi="['system:dictionary:add']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple2"
              @click="handleDelete2"
              v-hasPermi="['system:dictionary:remove']"
            >删除</el-button>
          </el-col>
        </el-row>
      <el-table ref="dictionaryList2" v-loading="loading2" :data="dictionaryList2" @selection-change="handleSelectionChange2" height="300">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-bind:label="this.name2" align="center" prop="dictName" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="dictdata2(scope.row)"
            >{{scope.row.dictName}}</el-button>
          </template>
        </el-table-column>
      </el-table>

        <smallpagination
          v-show="total2>0"
          :total="total2"
          :page.sync="pageNum2"
          :limit.sync="queryParams.pageSize"
          @pagination="getList2"
        />

    </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <!-- 卡片3 -->
      <el-col :span="12">
        <el-card class="update-log">
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd3"
                v-hasPermi="['system:dictionary:add']"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple3"
                @click="handleDelete3"
                v-hasPermi="['system:dictionary:remove']"
              >删除</el-button>
            </el-col>
          </el-row>
          <el-table  ref="dictionaryList3"v-loading="loading3" :data="dictionaryList3" @selection-change="handleSelectionChange3" height="300">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column v-bind:label="this.name3" align="center" prop="dictName" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="dictdata3(scope.row)"
                >{{scope.row.dictName}}</el-button>
              </template>
            </el-table-column>
          </el-table>

          <smallpagination
            v-show="total3>0"
            :total="total3"
            :page.sync="pageNum3"
            :limit.sync="queryParams.pageSize"
            @pagination="getList3"
          />

        </el-card>
      </el-col>
      <!-- 卡片4 -->
      <el-col :span="12">
        <el-card class="update-log">
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd4"
                v-hasPermi="['system:dictionary:add']"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple4"
                @click="handleDelete4"
                v-hasPermi="['system:dictionary:remove']"
              >删除</el-button>
            </el-col>
          </el-row>
          <el-table ref="dictionaryList4" v-loading="loading4" :data="dictionaryList4" @selection-change="handleSelectionChange4" height="300">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column v-bind:label="this.name4" align="center" prop="dictName" />
          </el-table>

          <smallpagination
            v-show="total4>0"
            :total="total4"
            :page.sync="pageNum4"
            :limit.sync="queryParams.pageSize"
            @pagination="getList4"
          />

        </el-card>
      </el-col>
    </el-row>
    <!-- 添加对话框1 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框2 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框3 -->
    <el-dialog :title="title" :visible.sync="open3" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框4 -->
    <el-dialog :title="title" :visible.sync="open4" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm4">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDictionary, getDictionary, delDictionary, addDictionary, updateDictionary } from "@/api/system/dictionary";
import smallpagination from "./smallpagination"

export default {
  name: "A",
  components: {smallpagination},
    data() {
    return {
      // 遮罩层
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      // 总条数
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      // 选择框选中数组
      ids1: [],
      ids2: [],
      ids3: [],
      ids4: [],
      // 非多个禁用
      multiple1: true,
      multiple2: true,
      multiple3: true,
      multiple4: true,
      //卡片2、3、4的父ID
      parentId2: null,
      parentId3: null,
      parentId4: null,
      //卡片2、3、4的父节点名字
      name2:"",
      name3:"",
      name4:"",
      // 弹出层标题
      title: "添加",
      // 是否显示弹出层
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      //表格数据
      dictionaryList1: [],
      dictionaryList2: [],
      dictionaryList3: [],
      dictionaryList4: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
      },
      //四张表格页码
      pageNum1:1,
      pageNum2:1,
      pageNum3:1,
      pageNum4:1,
      //点击按钮时选中的行
      row1: null,
      row2: null,
      row3: null,
      //查询条件
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: null,
        parentId: null,
      },
    };
  },
  created() {
    this.getList1();
  },
  methods: {

    /** 查询列表 */
    getList1() {
      this.loading1 = true;
      this.queryParams.parentId = 0;
      this.queryParams.pageNum = this.pageNum1;
      listDictionary(this.queryParams).then(response => {
        this.dictionaryList1 = response.rows;
        this.total1 = response.total;
        this.loading1 = false;
      });
    },
    getList2(){
      this.loading2 = true;
      this.queryParams.parentId = this.parentId2;
      this.queryParams.pageNum = this.pageNum2;
      listDictionary(this.queryParams).then(response => {
        this.dictionaryList2 = response.rows;
        this.total2 = response.total;
        this.loading2 = false;
      });
    },
    getList3(){
      this.queryParams.parentId = this.parentId3;
      this.queryParams.pageNum = this.pageNum3;
      this.loading3 = true;
      listDictionary(this.queryParams).then(response => {
        this.dictionaryList3 = response.rows;
        this.total3 = response.total;
        this.loading3 = false;
      });
    },
    getList4(){
      this.loading4 = true;
      this.queryParams.parentId = this.parentId4;
      this.queryParams.pageNum = this.pageNum4;
      listDictionary(this.queryParams).then(response => {
        this.dictionaryList4 = response.rows;
        this.total4 = response.total;
        this.loading4 = false;
      });
    },

    /** 加载子节点表格 */
    dictdata1(row){
      /** 将所在行的选择框切换为选中状态 */
      this.$refs.dictionaryList1.toggleRowSelection(this.row1, false);
      this.row1 = row;
      this.$refs.dictionaryList1.toggleRowSelection(this.row1, true);
      if(this.parentId2 != row.dictId){
        this.parentId2 = row.dictId;
        this.name2 = row.dictName;
        this.getList2();
        /** 重置卡片3 */
        this.dictionaryList3 = []
        this.parentId3 = null
        this.name3 = "";
        this.total3 = 0
        /** 重置卡片4 */
        this.dictionaryList4 = []
        this.parentId4 = null
        this.name4 = "";
        this.total4 = 0
      }
    },
    dictdata2(row){
      /** 将所在行的选择框切换为选中状态 */
      this.$refs.dictionaryList2.toggleRowSelection(this.row2, false);
      this.row2 = row;
      this.$refs.dictionaryList2.toggleRowSelection(this.row2, true);
      if(this.parentId3 != row.dictId){
        this.parentId3 = row.dictId;
        this.name3 = row.dictName;
        this.getList3()
        /** 重置卡片4 */
        this.dictionaryList4 = []
        this.parentId4 = null
        this.name4 = "";
        this.total4 = 0
      }

    },
    dictdata3(row){
      /** 将所在行的选择框切换为选中状态 */
      this.$refs.dictionaryList3.toggleRowSelection(this.row3, false);
      this.row3 = row;
      this.$refs.dictionaryList3.toggleRowSelection(this.row3, true);
      if(this.parentId4 != row.dictId){
        this.parentId4 = row.dictId;
        this.name4 = row.dictName;
        this.getList4();
      }
    },

    /** 取消按钮 */
    cancel() {
      this.open1 = false;
      this.open2 = false;
      this.open3 = false;
      this.open4 = false;
      this.reset();
    },

    // 表单重置
    reset() {
      this.form = {
        dictId: null,
        dictName: null,
        parentId: null
      };
      this.resetForm("form");
    },

    // 多选框选中数据
    handleSelectionChange1(selection) {
      this.ids1 = selection.map(item => item.dictId)
      this.multiple1 = !selection.length
    },
    handleSelectionChange2(selection) {
      this.ids2 = selection.map(item => item.dictId)
      this.multiple2 = !selection.length
    },
    handleSelectionChange3(selection) {
      this.ids3 = selection.map(item => item.dictId)
      this.multiple3 = !selection.length
    },
    handleSelectionChange4(selection) {
      this.ids4 = selection.map(item => item.dictId)
      this.multiple4 = !selection.length
    },

    /** 新增按钮操作 */
    handleAdd1() {
      this.reset();
      this.open1 = true;
    },
    handleAdd2() {
      if(this.parentId2 === null){
        this.$modal.msgError("请先选择字典项");
      }
      else{
        this.reset();
        this.open2 = true;
      }
    },
    handleAdd3() {
      if(this.parentId3 === null){
        this.$modal.msgError("请先选择字典项");
      }
      else {
        this.reset();
        this.open3 = true;
      }
    },
    handleAdd4() {
      if(this.parentId4 === null){
        this.$modal.msgError("请先选择字典项");
      }
      else {
        this.reset();
        this.open4 = true;
      }
    },

    /** 删除按钮操作 */
    handleDelete1(row) {
      const dictIds = row.dictId || this.ids1;
      this.$modal.confirm('是否确认删除选中的数据项？').then(function() {
        return delDictionary(dictIds);
      }).then(() => {
        this.getList1();
        this.$modal.msgSuccess("删除成功");
        if(dictIds.indexOf(this.parentId2) != -1){
          this.parentId2 = null;
          this.name2 = "";
        }
      }).catch(() => {});
    },
    handleDelete2(row) {
      const dictIds = row.dictId || this.ids2;
      this.$modal.confirm('是否确认删除选中的数据项？').then(function() {
        return delDictionary(dictIds);
      }).then(() => {
        this.getList2();
        this.$modal.msgSuccess("删除成功");
        if(dictIds.indexOf(this.parentId3) != -1){
          this.parentId3 = null;
          this.name3 = "";
        }
      }).catch(() => {});
    },
    handleDelete3(row) {
      const dictIds = row.dictId || this.ids3;
      this.$modal.confirm('是否确认删除选中的数据项？').then(function() {
        return delDictionary(dictIds);
      }).then(() => {
        this.getList3();
        this.$modal.msgSuccess("删除成功");
        if(dictIds.indexOf(this.parentId4) != -1){
          this.parentId4 = null;
          this.name4 = "";
        }
      }).catch(() => {});
    },
    handleDelete4(row) {
      const dictIds = row.dictId || this.ids4;
      this.$modal.confirm('是否确认删除选中的数据项？').then(function() {
        return delDictionary(dictIds);
      }).then(() => {
        this.getList4();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },

    /** 提交按钮 */
    submitForm1() {
      this.form.parentId= 0;
      this.$refs["form"].validate(valid => {
        if (valid) {
            addDictionary(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open1 = false;
              this.getList1();
            });
        }
      });
    },
    submitForm2() {
      this.form.parentId= this.parentId2;
      this.$refs["form"].validate(valid => {
        if (valid) {
          addDictionary(this.form).then(response => {
            this.$modal.msgSuccess("新增成功");
            this.open2 = false;
            this.getList2();
          });

        }
      });
    },
    submitForm3() {
      this.form.parentId= this.parentId3;
      this.$refs["form"].validate(valid => {
        if (valid) {
          addDictionary(this.form).then(response => {
            this.open3 = false;
            this.$modal.msgSuccess("新增成功");
            this.getList3()
          });
        }
      });
    },
    submitForm4() {
      this.form.parentId= this.parentId4;
      this.$refs["form"].validate(valid => {
        if (valid) {
          addDictionary(this.form).then(response => {
            this.$modal.msgSuccess("新增成功");
            this.open4 = false;
            this.getList4();
          });
        }
      });
    },


  }
};
</script>
<style>
.update-log {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 30px;
  margin-inline-end: 30px;
  padding-inline-start: 0;
}
</style>
