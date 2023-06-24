

<template xmlns:el-input="http://www.w3.org/1999/html">
  <div>
    <div style="background: #d2e9ff;width: 95%;
        margin-left: 30px;
        margin-top: 10px;padding:20px;border-radius: 4px;border:2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <span >请选择根节点&nbsp</span>
<!--      <el-cascader-->
<!--        ref="rootCascader"-->
<!--        v-model="rootNode"-->
<!--        placeholder="搜索"-->
<!--        :show-all-levels="false"-->
<!--        :props="props"-->
<!--        filterable-->
<!--      ></el-cascader>-->
<!--      style="width: 500px;"-->
        <el-cascader
          ref="rootCascader"
          placeholder="试试搜索：电机"
          :options="options"
          :props="{ checkStrictly: true }"
          v-model="rootNode"
          filterable>
        </el-cascader>
      <el-button @click="confirmRootNode" type="success" style="margin-left: 50px">确认根节点</el-button>

    </div>



    <!--图谱展示-->
    <div style="width: 95%;
        margin-left: 30px;
        margin-top: 10px;padding:20px;border-radius: 4px;border:2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-card style="width: 100%; background: #d2e9ff; border-radius: 10px">
        <span >请点击节点操作</span>
        <el-button @click="doSave" type="success"  style="margin-left: 50px">保存图谱</el-button>
      </el-card>
      <el-empty v-if="graphData.nodes.length===0" :image-size="260"></el-empty>
      <div v-else v-loading="loading">
        <div   id="container"></div>
      </div>
    </div>


    <!--节点新增弹窗-->
    <el-dialog title="新增节点"   :visible.sync="dialogFormVisible">
      <el-form  :rules="rules" :model="form" ref="addForm">
        <el-form-item label="当前选中节点" :label-width="formLabelWidth">
          <el-input
            style="width:221.4px"
            v-model="currentNode.label"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="选择下级节点" :label-width="formLabelWidth" prop="nextNode">
<!--          <el-cascader-->
<!--            ref="nodeCascader"-->
<!--            v-model=form.nextNode-->
<!--            placeholder="搜索"-->
<!--            :show-all-levels="false"-->
<!--            :props="props"-->
<!--            filterable-->
<!--          ></el-cascader>-->
          <el-cascader
            ref="addNodeCascader"
            placeholder="试试搜索：水泵"
            :options="options"
            :props="{ checkStrictly: true }"
            v-model=form.nextNode
            :show-all-levels="false"
            filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="选择关系" :label-width="formLabelWidth" prop="relation">
          <el-cascader
            ref="relationCascader"
            v-model=form.relation
            placeholder="搜索"
            :show-all-levels="false"
            :style="width='150px'"
            :props="relationProps"
            filterable
          ></el-cascader>
<!--          <el-select v-model="relationValue" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in relationOptions"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        <!--        <el-button type="primary" @click="addNewNode">确 定</el-button>-->
        <el-button type="primary" @click="submitValidate('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改弹窗-->
    <el-dialog title="修改节点" :visible.sync="updateDialogVisible">
      <el-form  :rules="rules" :model="updateForm" ref="updateForm">
        <el-form-item label="当前选中节点" :label-width="formLabelWidth">
          <el-input
            style="width:221.4px"
            v-model="currentNode.label"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="修改节点为" :label-width="formLabelWidth" prop="node">
<!--          <el-cascader-->

<!--            ref="updateNodeCascader"-->
<!--            v-model="updateForm.node"-->
<!--            placeholder="搜索"-->
<!--            :show-all-levels="false"-->
<!--            :props="props"-->
<!--            filterable-->
<!--          ></el-cascader>-->
          <el-cascader
            ref="updateNodeCascader"
            placeholder="试试搜索：电机"
            :options="options"
            :props="{ checkStrictly: true }"
            v-model="updateForm.node"
            :show-all-levels="false"
            filterable>
          </el-cascader>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitValidate('updateForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--  保存图谱弹窗  -->
    <el-dialog title="保存图谱" :visible.sync="saveDialogVisible">
      <el-form  :rules="rules" :model="saveForm" ref="saveForm">
        <el-form-item label="请输入图谱名称" :label-width="formLabelWidth" prop="graphName">
          <el-input
            style="width:221.4px"
            v-model="saveForm.graphName"
            placeholder="请输入内容"
            :disabled="false">
          </el-input>
        </el-form-item>

        <el-form-item label="请选择图谱类别" :label-width="formLabelWidth" prop="graphType">
          <el-cascader

            ref="saveGraphCascader"
            v-model="saveForm.graphType"
            placeholder="搜索"
            :show-all-levels="false"
            :props="saveProps"
            filterable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="请输入图谱说明" :label-width="formLabelWidth" prop="graphInfo">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="saveForm.graphInfo">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitValidate('saveForm')">确 定</el-button>
        <!--        <el-button type="primary" @click="saveGraph">确 定</el-button>-->
      </div>
    </el-dialog>

      <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :show-close=false
    >
      <nodeDetail @dialogClose='closeDialog' />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >关 闭</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
// import log from "../../monitor/job/log";

// let id = 1;

// import RelationGraph from 'relation-graph'
// import { listAllDict,} from "@/api/system/dict";
// import { listAllAttr, } from "@/api/system/attr";
// import { listAllType,} from "@/api/system/type";
// import { listAllNode, getNode } from "@/api/system/node";
// import { listAllRelationType, } from "@/api/system/relationType";
import { addGraph, } from "@/api/system/graph";
import {listAllTree,listLevelNode,listLevelButLeaf} from "@/api/system/tree";
import G6 from "@antv/g6";
import equipmentTime from "../life/equipmentTime.vue";
import nodeDetail from "../graph/nodeDetail.vue";

export default {
  name: 'default',
  components: {
    equipmentTime,nodeDetail
  },
  data() {
    return {
      //详情弹窗 是否展示
      dialogVisible: false,


      graph: {},
      loading: false,

      options: [],
      //根节点下拉框动态加载
      // props: {
      //   lazy: true,
      //   checkStrictly: true,
      //   lazyLoad(node, resolve) {
      //     // console.log(this);
      //     const {level} = node;
      //     //当层级为零进行初始化时
      //     let list = [];
      //     let id;
      //     let name;
      //     if (node.level === 0) {
      //       listAllTree({parentId: -1}).then(response => {
      //         list = response;
      //       });
      //
      //     } else{
      //       listAllTree({parentId: node.value}).then(response => {
      //         list = response;
      //       });
      //     }
      //     setTimeout(() => {
      //       const nodes = list
      //         .map(item => ({
      //           // value: item[id],
      //           value: item.id,
      //           // label: item[name],
      //           label: item.name,
      //           leaf: level >= 4,
      //           // disabled: id===4,
      //         }));
      //       // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      //       resolve(nodes);
      //     }, 500);
      //   }
      // },

      //新增节点关系下拉框动态加载
      relationProps: {
        lazy: true,
        checkStrictly: false,

        lazyLoad (node, resolve) {
          // console.log(this);
          const { level } = node;
          let list = [];
          let id;
          let name;
          // if(node.level===0){
          //   listAllRelationType().then(response => {
          //     list = response.rows;
          //     // console.log("list",list);
          //   });
          //   id = 'typeId';
          //   name = 'typeName';
          // }

          //先写死 等到添加字典 从字典中获取
          list=[
              {
                typeId: '1',
                typeName: '属于'
              }, {
                typeId: '2',
                typeName: '协同'
              }, {
                typeId: '3',
                typeName: '包含'
              }
            ]
          setTimeout(() => {
            const nodes = list
              .map(item => ({
                value: item['typeId'],
                label: item['typeName'],
                leaf: level >= 0,
                // disabled: id===4,
              }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 500);
        }
      },

      //保存图谱  选择图谱关系下拉框 动态加载
      saveProps: {
        lazy: true,
        checkStrictly: false,

        lazyLoad (node, resolve) {
          // console.log(this);
          const { level } = node;
          let list = [];
          let id;
          let name;

          //调用js 向后台动态请求 图谱种类列表
          // listAllRelationType().then(response => {
          //   list = response.rows;
          //   // console.log("list",list);
          // });

          //死数据
          list=[
            {
              typeId: '1',
              typeName: '关系图谱'
            }, {
              typeId: '2',
              typeName: '时间图谱'
            }, {
              typeId: '3',
              typeName: '自定义图谱'
            }
          ]



          id = 'typeId';
          name = 'typeName';

          setTimeout(() => {
            const nodes = list
              .map(item => ({
                value: item[id],
                label: item[name],
                leaf: level >= 0,
                // disabled: id===4,
              }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 500);
        }
      },

      //表单验证规则
      rules: {
        nextNode: [
          { required: true, message: '请选择下一个节点', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '请选择节点关系', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        graphName: [
          { required: true, message: '请输入图谱名称', trigger: 'blur' },
        ],
        graphType: [
          { required: true, message: '请选择图谱种类', trigger: 'blur' },
        ],
        graphInfo: [
          { required: true, message: '请输入图谱信息', trigger: 'blur' },
        ],
      },



      //添加节点弹窗中 表单元素绑定数据

      rootNode:"",
      preNode:{},
      currentNode: {},
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      graphData : {
        nodes:[],
        edges:[]
      },

      // relationOptions: [{
      //   value: '1',
      //   label: '属于'
      // }, {
      //   value: '2',
      //   label: '协同'
      // }, {
      //   value: '3',
      //   label: '包含'
      // }],
      // relationValue: '',

      //新增节点弹窗配置
      dialogFormVisible: false,
      updateDialogVisible: false,
      saveDialogVisible: false,
      //新增节点表单
      form: {
        nextNode: "",
        relation: ""
      },
      //新增节点表单
      updateForm:{
        node: ""
      },
      saveForm: {
        graphName: "",
        graphType: "",
        graphInfo: "",
        creator: "",
      },
      formLabelWidth: '120px',
      colorList: ['#fda5ba', 'rgb(123,217,240)', 'rgb(191,226,204)', '#eda6d1', '#fbebaf', '#aed8ed', '#f3cae9', '#fdbbcb'],
      fittingString : (str, maxWidth, fontSize) => {
        const ellipsis = "...";
        const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
        let currentWidth = 0;
        let res = str;
        const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
        str.split("").forEach((letter, i) => {
          if (currentWidth > maxWidth - ellipsisLength) return;
          if (pattern.test(letter)) {
            // Chinese charactors
            currentWidth += fontSize;
          } else {
            // get the width of single letter according to the fontSize
            currentWidth += G6.Util.getLetterWidth(letter, fontSize);
          }
          if (currentWidth > maxWidth - ellipsisLength) {
            res = `${str.substr(0, i)}${ellipsis}`;
          }
        });
        return res;
      },
    }
  },
  mounted() {
    // this.showSeeksGraph()
    // this.createGraph();
    listLevelNode().then(response => {
      // console.log(response)
      this.options = response;
    });
    // listLevelButLeaf().then(response=>{
    //   console.log(response)
    // });
  },
  methods: {
    //级联下拉框点击事件
    // handleChange(value) {
    //   console.log(value);
    //   let node = this.$refs['rootCascader'].getCheckedNodes();
    //   console.log(node);
    //
    // },

    //详细信息点击 父传子
    closeDialog(text) {
      this.dialogVisible = text;
    },

    //根据节点层级 配置节点样式
    addNodeStyle(name, level,id) {
      let size;
      let type;
      switch (level) {
        case 1:
          size = 120;
          type = "customNode0"
          break;
        case 2:
          size = 110;
          type = "customNode1"
          break;
        case 3:
          size = 100;
          type = "customNode2"
          break;
        case 4:
          size = 90;
          type = "customNode3"
          break;
        case 5:
          size = 80;
          type = "customNode4"
          break;
      }

      let nodeObject = {
        id: id + "",
        label: name,
        type: type,
        size: size,
        data: name,
        style: {
          stroke: "#fff",
          fill: this.colorList[level],
          opacity: 1,
        }
      };
      return nodeObject
    },

    //确认根节点
    confirmRootNode(){
      let that = this;
      //如果没有选中值
      if(this.rootNode===""){
        // alert("请选择根节点");
        this.$message({
          message: '请选择根节点',
          type: 'warning'
        });
        return;
      }

      //获得节点信息
      // this.loading = true;
      //通过级联列表 获得选中的根节点值
      let node = this.$refs['rootCascader'].getCheckedNodes();

      //当前节点选中的标签
      let name = node[0].data.label;
      //当前节点选中的值
      let id = node[0].data.value;
      //当前节点选中的层级
      let level = node[0].level;
      // console.log('node1',node);

      let nodeObject = this.addNodeStyle(name, level,id)




      //如果当图谱数据中存在根节点
      //将根节点替换为当前选中的节点
      //增加加载效果
      if(this.graphData.nodes.length>=1){
        // console.log("graph", this.graph);
        // console.log(this.graphData.nodes[0].id);
        // console.log("node2",this.graphData.nodes);
        //如果当前节点  和 要替换的节点 是同一节点 直接返回
        if(this.graphData.nodes.length===1&&this.graphData.nodes[0].id===nodeObject.id){
          return;
        }else{
          const newArray = [nodeObject]
          // this.graphData.nodes[0] = nodeObject;
          this.graphData.nodes = newArray
          this.graphData.edges = []
        }
      }else{
        this.graphData.nodes.push(nodeObject);
      }


      //初始状态下loading遮罩框 状态为false不显示
      this.loading = true;

      setTimeout(() => {
        this.loading = false;

          this.createGraph();


      }, 300);

    },


    // showSeeksGraph(query) {
    //   // let stringify = JSON.parse(this.graphData);
    //   this.$refs.seeksRelationGraph.setJsonData(this.graphData, (seeksRGGraph) => {
    //     // 这些写上当图谱初始化完成后需要执行的代码
    //     // this.graphs = init_graph_data
    //   })
    // },



    // showNodeMenus(nodeObject, $event) {
    //   this.currentNode = nodeObject
    //   // console.log(nodeObject);
    //   var _base_position = this.$refs.myPage.getBoundingClientRect()
    //   // console.log('showNodeMenus:', $event, _base_position)
    //   this.isShowNodeMenuPanel = true
    //
    //
    //   //$event.clientX 为鼠标点击在浏览器上的坐标?
    //   //_base_position.x 不变 不知道代表什么
    //   //通过实际对照进行了 节点窗口弹出的位置校正
    //   // console.log("$event.clientX", $event.clientX);
    //   // console.log("$event.clientY", $event.clientY);
    //   // console.log("$_base_position.x", _base_position.x);
    //   // console.log("$_base_position.y", _base_position.y);
    //
    //   this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 50;
    //   if($event.clientX>1369){
    //     //如果鼠标已经靠近浏览器窗口的  右侧边框   那么 将弹窗在鼠标左侧展示
    //     this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x -100;
    //   }
    //   this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 90;
    //   // console.log(this.$refs.seeksRelationGraph);
    //   // console.log(this.$refs.seeksRelationGraph.getNodes());
    // },

    // 表单验证
    submitValidate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName==="addForm") this.addNewNode();
          if (formName==="updateForm") this.updateNode();
          if(formName==="saveForm") this.saveGraph();
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    //点击新增节点按钮  显示弹窗
    doAction() {
      this.dialogFormVisible = true;
      // this.$notify({
      //   title: '提示',
      //   message: '对节点【' + this.currentNode.text + '】进行了：' + actionName,
      //   type: 'success'
      // })
      // this.isShowNodeMenuPanel = false
    },

    //点击修改节点按钮 显示弹窗
    doUpdate(){

      let nodeId = this.currentNode.id;

      // if (this.currentNode.targetTo.length !== 0) {
      //   // alert("只有最外层节点可以修改");
      //   this.$alert('该节点存在指向其他节点的关系', '提示', {confirmButtonText: '确定',});
      //   return;
      // };
      // if(nodeId===this.graphData.root){
      //   this.$alert('修改请重新选择根节点', '提示', {confirmButtonText: '确定',});
      //   return;
      // }
      // console.log(this.currentNode.targetTo.length);
      this.updateDialogVisible = true;
      // this.isShowNodeMenuPanel = false
    },

    //点击删除节点按钮
    doDelete(){
      let nodeId = this.currentNode.id;
      //如果删除节点为根节点
      // console.log(this.currentNode)
      // if (this.currentNode.targetTo.length !== 0) {
      //   // alert("只有最外层节点可以修改");
      //   this.$alert('该节点存在指向其他节点的关系', '提示', {confirmButtonText: '确定',});
      //   return;
      // };

      // if(nodeId===this.graphData.root){
      //   this.$alert('删除请重新选择根节点', '提示', {confirmButtonText: '确定',});
      //   return;
      // }
      this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNode();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch((err) => {
        // console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    //点击 保存图谱 按键
    doSave(){
      //如果没有根节点
      //提示请选择根节点构成图谱
      if(this.rootNode===""){
        this.$alert('当前不存在图谱,请选择根节点初始化图谱', '提示', {confirmButtonText: '确定',});
        return;
      }
      //弹出 保存图谱弹窗
      this.saveDialogVisible = true;
    },

    cleanForm(){
      this.form = {
        nextNode: '',
        relation: ''
      }
    },

    addNewNode() {

      let node = this.$refs['addNodeCascader'].getCheckedNodes();
      let relationNode = this.$refs['relationCascader'].getCheckedNodes();
      let name = node[0].data.label;
      let level = node[0].level;
      let id = node[0].data.value+'';
      let state = 0;

      //检查父节点和子节点是否是同一个节点
      if(this.currentNode.id===id){
        // alert("不能连接自身");
        this.$alert('不能连接自身', '提示', {
          confirmButtonText: '确定',
        });
        this.cleanForm();
        this.dialogFormVisible = false;
        return
      }



      // alert(this.form.nextNode);
      let that = this;

      this.dialogFormVisible = false;


      this.loading = false;

      let haveNode = this.graph.findById(id)
      if (typeof (haveNode) === 'undefined') {
        let nodeObject = this.addNodeStyle(name, level, id)
        this.graphData.nodes.push(nodeObject)
      }
      //发现添加的节点不嫩应用到布局中 尝试使用清除画布  并重新渲染整体
      // this.graph.addItem('node', nodeObject)
      // console.log(nodeObject)
      // this.graph.addItem('edge', edgeObject)
      // this.graph.refresh()
      let edgeObject = {
        source: this.currentNode.id,
        target: id,
        label:relationNode[0].data.label,
        style: {
          endArrow: true,
          startArrow: false
        },
        type: 'quadratic',
        labelCfg: {
          autoRotate: true,
        },
      }
      this.graphData.edges.push(edgeObject)
      G6.Util.processParallelEdges(this.graphData.edges);

      this.graph.clear()
      this.graph.read(this.graphData)
      this.preNode = {}

      this.cleanForm();
      // console.log("getEdges",this.graph.getEdges())
      // console.log("this.graphData.nodes:" ,this.$refs.seeksRelationGraph.getNodes());

    },

    updateNode(){
      let updateNode = this.$refs['updateNodeCascader'].getCheckedNodes();
      const name = updateNode[0].data.label;
      const level = updateNode[0].level;
      const id = updateNode[0].data.value+'';
      // const updateId = level+"_"+id;

      //如果新节点 和被修改节点相同
      if (this.currentNode.id===id) {
        this.$alert('新节点和被修改节点相同', '提示', {confirmButtonText: '确定',});
        return;
      }

      //如果选择了已经存在的节点 则弹出提示并返回
      let haveNode = this.graph.findById(id)
      if (typeof (haveNode) !== 'undefined') {
        this.$alert('该节点已经存在', '提示', {confirmButtonText: '确定',});
        return;
      }
      //1, 获取当前选中节点的边
      const currentNode = this.graph.findById(this.currentNode.id)
      let inEdges = currentNode.getInEdges()
      let outEdges = currentNode.getOutEdges()
        //新节点
      let nodeObject = this.addNodeStyle(name, level, id)
      //2.获取所有的边和节点
      let nodes = this.graph.getNodes()
      let edges = this.graph.getEdges()
      // console.log("nodes",nodes)
      // console.log("edges",edges)

      //3.将当前节点修改 边修改
      let newNodes = []
      let newEdges = []
      nodes.forEach(node=>{
        if(this.currentNode.id===node._cfg.model.id){
          newNodes.push(nodeObject)
        }else{
          newNodes.push({
            id: node._cfg.model.id,
            label: node._cfg.model.label,
            type: node._cfg.model.type,
            size: node._cfg.model.size,
            data: node._cfg.model.data,
            style: {
              stroke: "#fff",
              fill: node._cfg.model.style.fill,
              opacity: 1,
            }
          })
        }
      })
      edges.forEach(edge=>{
        let newEdge = {
          id: edge._cfg.model.id,
          source: edge._cfg.source._cfg.id,
          target: edge._cfg.target._cfg.id,
          label:edge._cfg.model.label,
          style: {
            endArrow: true,
            startArrow: false
          }
        }
        if (this.currentNode.id===newEdge.source){
          newEdge.source = id
        }
        if(this.currentNode.id===newEdge.target){
          newEdge.target = id
        }
        newEdges.push(newEdge)
      })
      //4.重新渲染
      // console.log("newNodes",newNodes)
      // console.log("newEdges",newEdges)

      this.graphData.nodes = newNodes
      this.graphData.edges = newEdges
      G6.Util.processParallelEdges(this.graphData.edges);

      this.graph.clear()
      this.graph.read(this.graphData)
      this.preNode = {}
      // console.log("getNodes",this.graph.getNodes())


      this.updateDialogVisible = false;
      // let nodes = this.$refs.seeksRelationGraph.getNodes();
      // console.log("nodes",nodes);
      this.updateForm={
        node: ""
      };

    },

    deleteNode() {
      // const deleteId = this.currentNode.id;

      //找到该节点
      const currentNode = this.graph.findById(this.currentNode.id)
      //在渲染数据中 删除边和节点
      let nodes = this.graph.getNodes()
      let edges = this.graph.getEdges()
      let newNodes = []
      let newEdges = []
      nodes.forEach(node=>{
        if(this.currentNode.id===node._cfg.model.id){
          // newNodes.push(nodeObject)
        }else{
          newNodes.push({
            id: node._cfg.model.id,
            label: node._cfg.model.label,
            type: node._cfg.model.type,
            size: node._cfg.model.size,
            data: node._cfg.model.data,
            style: {
              stroke: "#fff",
              fill: node._cfg.model.style.fill,
              opacity: 1,
            }
          })
        }
      })
      edges.forEach(edge=>{
        let newEdge = {
          id: edge._cfg.model.id,
          source: edge._cfg.source._cfg.id,
          target: edge._cfg.target._cfg.id,
          label:edge._cfg.model.label,
          style: {
            endArrow: true,
            startArrow: false
          }
        }
        if (this.currentNode.id===newEdge.source||this.currentNode.id===newEdge.target){
          // newEdge.source = id
        }else{
          newEdges.push(newEdge)
        }
      })
      //清除画布 重新渲染节点
      this.graphData.nodes = newNodes
      this.graphData.edges = newEdges
      G6.Util.processParallelEdges(this.graphData.edges);

      this.graph.clear()
      this.graph.read(this.graphData)
      this.preNode = {}

    },

    saveGraph() {
      //创建图谱数据对象 最后存储到数据库中
      let graphData = {};
      let nodes = this.graph.getNodes()
      let edges = this.graph.getEdges()
      let newNodes = []
      let newEdges = []
      //将不需要存储的数据过滤出去
      nodes.forEach(node => {
        newNodes.push({
          id: node._cfg.model.id,
          label: node._cfg.model.label,
          type: node._cfg.model.type,
          size: node._cfg.model.size,
          data: node._cfg.model.data,
          style: {
            stroke: "#fff",
            fill: node._cfg.model.style.fill,
            opacity: 1,
          }
        })
      })
      edges.forEach(edge => {
        let newEdge = {
          id: edge._cfg.model.id,
          source: edge._cfg.source._cfg.id,
          target: edge._cfg.target._cfg.id,
          label: edge._cfg.model.label,
          type: edge._cfg.model.type,
          style: {
            endArrow: true,
            startArrow: false
          },
          labelCfg: {
            autoRotate: edge._cfg.model.labelCfg.autoRotate
          }
        }
        newEdges.push(newEdge)
      })

      //获取saveForm表单中 填入的数据
      graphData.graphName = this.saveForm.graphName;
      graphData.graphInfo = this.saveForm.graphInfo;
      graphData.graphType = this.saveForm.graphType[0];
      // graphData.graphParam = {
      //   nodes: newNodes,
      //   edges: newEdges
      // }
      graphData.graphNodes = JSON.stringify(newNodes)
      graphData.graphEdges = JSON.stringify(newEdges)

      // graphData.graphType = 7;
      //获取当前登录的账户id
      graphData.graphCreator = "佚名";

      // console.log(this.graph)
      // console.log("nodes", this.graph.getNodes())
      // console.log("edges", this.graph.getEdges())

      //调用js方法 将图谱数据存入数据库
      addGraph(graphData).then(response => {
        this.$modal.msgSuccess("新增成功");
      });
      this.saveDialogVisible = false;

      //将新增图谱窗口数据清空
      this.saveForm = {
        graphName: '',
        graphType: '',
        graphInfo: '',
        creator: ''
      }
    },

    //加载图谱
    createGraph: function () {
  //获取当前图谱对象的属性字段
  var graphArr = Object.keys(this.graph);
  //如果对象不为空
  if (graphArr.length !== 0) {
    this.graph.destroy();
  }
  // 注册自定义节点
  let that = this;
  const imgList = [
    'data:image/png;base64,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',
    'data:image/png;base64,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',
    'data:image/png;base64,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',
    'data:image/png;base64,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'
  ]
  const configList = [
    { r: 60 },
    { r: 55 },
    { r: 50 },
    { r: 45 },
    { r: 40 }
  ];
  const colorList = ['#fda5ba', 'rgba(123,217,240,0.66)', 'rgba(191,226,204,0.67)', '#eda6d1', '#fbebaf', '#aed8ed', '#f3cae9', '#fdbbcb'];
  for (let i = 0; i < 5; i++) {
    G6.registerNode(
      'customNode' + i,
      {
        // 绘制节点
        drawShape: function drawShape(cfg, group) {
          const shapeType = this.shapeType;
          const style = Object.assign({}, this.getShapeStyle(cfg), {
            x: 0,
            y: 0,
            r: configList[i].r,
            // fill: fill,
            // opacity: 0.8,

          });
          const shape = group.addShape(shapeType, {
            attrs: style,
            name: 'key-shape',
          });
          for (let j = 0; j < 3; j++) {
            // 添加图片
            const image = group.addShape('image', {
              attrs: {
                x: -10,
                y: -10,
                width: 40,
                height: 40,
                img: imgList[j],
                cursor: 'pointer',
                opacity: 0.8,
              },
              name: 'image-shape' + j,
            });
            image.toBack();
            // image.hide();
          }

          return shape;
        },
      },
      'circle',
    );
  }
  G6.Util.processParallelEdges(this.graphData.edges);

  const container = document.getElementById('container');
  const width = container.scrollWidth;
  const height = container.scrollHeight ||  document.body.clientHeight * 0.6;
  // const height = Window.innerHeight;
  // const that = this;

  //超长文本格式过滤器
  const fittingString = (str, maxWidth, fontSize) => {
    const ellipsis = "...";
    const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters
    if(str.split("").length!==0){
      str.split("").forEach((letter, i) => {
        if (currentWidth > maxWidth - ellipsisLength) return;
        if (pattern.test(letter)) {
          // Chinese charactors
          currentWidth += fontSize;
        } else {
          // get the width of single letter according to the fontSize
          currentWidth += G6.Util.getLetterWidth(letter, fontSize);
        }
        if (currentWidth > maxWidth - ellipsisLength) {
          res = `${str.substr(0, i)}${ellipsis}`;
        }
      });
    }
    return res;
  };

  //新建图谱实例
  const graph = new G6.Graph({
    container: 'container',
    width,
    height,

    layout: {
      type: 'force',
      preventOverlap: true,
      // linkDistance: 50,
      linkDistance: (d) => {
        if (d.source.size < 100) {
          return 300;
        }
        return 150;
      },
      nodeStrength: -100,
      edgeStrength: 0.7,
    },
    defaultNode: {
      // color: '#0956ef',

    },
    defaultEdge: {
      type: 'quadratic',
      labelCfg: {
        autoRotate: true,
      },
    },
    nodeStateStyles: {
      // highlight: {
      //   opacity: 1,
      // },
      dark: {
        fill: '#e6e6e6'
      },
      originalText: {}
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
    // plugins: [menu], // 配置 Menu 插件
  });

  const nodes = this.graphData.nodes;

  //调用文本长度过滤器  对节点中的文字进行过滤 过长的文字使用省略号
  nodes.forEach(function(node) {
    node.label = fittingString(node.label, node.size, 12);
  });

  //加载数据
  graph.data({
    nodes,
    edges: this.graphData.edges.map(function(edge, i) {
      edge.id = 'edge' + i;
      return Object.assign({}, edge);
    }),
  });
  //进行数据渲染
  graph.render();
  this.graph = graph;
  //将最初的图谱对象保存起来, 供图谱筛选使用
  // this.originalGraphData = graph.save();

  //鼠标移动到节点
  graph.on('node:mouseenter', (event) => {
    //获取事件中的对应节点
    const { item } = event;
    const model = item._cfg.model
    this.currentNode = model
    //获取前置节点的字段数组
    let arr = Object.keys(that.preNode);
    // console.log("preNode",that.preNode);
    // console.log("item",item);
    //js中空对象也有系统默认属性
    if (arr.length > 1)
      //如果前置节点不等于当前节点 且不存在当前图谱中 则清空前置节点
      if (that.preNode._cfg.id !== item._cfg.id) {
        if (typeof (graph.findById(that.preNode._cfg.id)) == "undefined" ) {
          that.preNode = {};
        }
      }
    // debugger;

    // graph.setItemState(event.item, 'highlight', true);
    //遍历图谱中的所有节点
    // for (let node of graph.getNodes()) {
    //   if (node._cfg.id !== item._cfg.id) {
    //     // console.log("node",node);
    //     // console.log("item",item);
    //     graph.setItemState(node, 'dark', true);
    //   }
    // }

    //创建菜单图标列表
    let circleList = [];

    //找到中心大圆的半径  根据大圆的半径 调整动画移动距离
    let centerCircleRadius = 40;
    item._cfg.group.cfg.children.forEach((child, i) => {
      if (child.cfg.name === "key-shape" && child.cfg.name !== "text-shape") {
        centerCircleRadius = child.cfg.attrs.r;
      }
    });

    //定义菜单按钮展出方法  进行复用
    let unfold = function() {
      //将当前节点设置为顶层
      item.toFront();
      //遍历当前节点的group 将所有菜单节点加入数组
      circleList = [];
      item._cfg.group.cfg.children.forEach((child, i) => {
        if (child.cfg.name !== "key-shape" && child.cfg.name !== "text-shape") {
          // if (child.cfg.type === "circle" && child.cfg.name !== "key-shape") {
          circleList.push(child);
        }
      });
      //遍历菜单节点 添加菜单节点显示动画
      circleList.forEach((circle, i) => {
        // circle.show();
        // circle.toBack();
        // circle.
        circle.animate(
          (ratio) => {
            // if(circle.cfg.name=="circle-shape0"){
            return {
              // x: 40 * Math.cos(Math.PI * 2 * i / circleList.length - 1),
              x: -20 + centerCircleRadius * Math.cos(Math.PI * 2 * i / circleList.length - 1) - (40 * Math.cos(ratio * Math.PI + (i / circleList.length - 1) * Math.PI * 2)),
              // y: 40 * Math.sin(Math.PI * 2 * i / circleList.length - 1),
              y: -20 + centerCircleRadius * Math.sin(Math.PI * 2 * i / circleList.length - 1) - (40 * Math.sin(ratio * Math.PI + (i / circleList.length - 1) * Math.PI * 2))
            };
          },
          {
            duration: 300,
            repeat: false,
          }
        );

      });
      that.preNode = item;
      // console.log("item", item);
    }
    arr = Object.keys(that.preNode);
    //并且当前节点不是最初的节点
    if (arr.length >= 1) {
      //如果有前置节点   判断 当前节点是否为 上次显示菜单的节点
      //当前节点只有一个 可能是进行重新选择根节点 不需要进行收回动画
      if (item._cfg.id !== that.preNode._cfg.id) {
        //将前置节点的菜单节点 压入circleList
        that.preNode._cfg.group.cfg.children.forEach((child, i) => {
          if (child.cfg.name !== "key-shape" && child.cfg.name !== "text-shape") {
            // if (child.cfg.type === "circle" && child.cfg.name !== "key-shape") {
            circleList.push(child);
          }
        });
        //将前置节点的菜单收回
        circleList.forEach((circle, i) => {
          circle.animate(
            (ratio) => {
              // if(circle.cfg.name=="circle-shape0"){
              return {
                // x: 40 * Math.cos(Math.PI * 2 * i / circleList.length - 1),
                x: -20 + centerCircleRadius * Math.cos(Math.PI * 2 * i / circleList.length - 1) + (40 * Math.cos(ratio * Math.PI * 2 / 3 + (i / circleList.length - 1) * Math.PI * 2)),
                // y: 40 * Math.sin(Math.PI * 2 * i / circleList.length - 1),
                y: -20 + centerCircleRadius * Math.sin(Math.PI * 2 * i / circleList.length - 1) + (40 * Math.sin(ratio * Math.PI * 2 / 3 + (i / circleList.length - 1) * Math.PI * 2))
              };
            },
            {
              duration: 500,
              repeat: false,
            }
          );
          // circleList[i].hide();
        });
        unfold();
      }

    } else {
      unfold();
    }

    item._cfg.model.label = item._cfg.model.data;
    graph.refresh();
  });

  //鼠标离开节点
  graph.on('node:mouseleave', (event) => {
    const { item } = event;
    // for (let node of graph.getNodes()) {
    //   if (node._cfg.id !== item._cfg.id) {
    //     graph.setItemState(node, 'dark', false);
    //   }
    // }
    // let node = graph.findById(item._cfg.id)
    // item._cfg.model.label = fittingString(item._cfg.model.label, item._cfg.model.size, 12);
    item._cfg.model.label = fittingString(item._cfg.model.label, item._cfg.model.size, 12);
    graph.refresh();

  });

  //当点击到菜单小节点
  // graph.on('image-shape1:click', (evt) => {
  //   console.log("evt", evt);
  //   const {item} = evt;
  //   //将所有的节点和边都隐藏
  //   for (let item of Object.values(graph.cfg.itemMap)) {
  //     item.hide();
  //     // console.log(item);
  //   }
  //   //创建一个节点数组
  //   let nodes = [];
  //   //最后的可以渲染的节点数据
  //   let nodesData=[];
  //   //创建一个边数组
  //   let edges = [];
  //   //最后的可以渲染的边数据
  //   let edgesData = [];
  //   //保存上次压入数组的下标
  //   let preIndex = 0;
  //   //创建相邻节点数组 接受搜索到的相邻节点
  //   let neighbors;
  //   //将当前节点压入数组
  //   nodes.push(item);
  //   item.show();
  //   setTimeout(() => {
  //     graph.updateLayout({
  //       linkDistance: 50,
  //       preventOverlap: true,
  //     });
  //   }, 0);
  //   setTimeout(() => {
  //     graph.updateLayout({
  //       linkDistance: (d) => {
  //         if (d.source.size > 60) {
  //           return 200;
  //         }
  //         return 100;
  //       },
  //       preventOverlap: true,
  //     });
  //   }, 200);
  //   // that.focusNode(item,graph);
  //
  //   //当没有新节点存入时停止循环
  //   while(nodes.length!==preIndex){
  //     //从还没有查找的下标开始  到查找完同一批次的节点结束
  //     for (let i = preIndex; i < nodes.length; i++) {
  //       //将起始坐标移动到数组最后+1 正好指向新加入的第一个
  //       preIndex = nodes.length;
  //       //查找节点
  //       neighbors = nodes[i].getNeighbors("source");
  //
  //       for (let neighbor of neighbors) {
  //         neighbor.show();
  //       }
  //       for( let edge of nodes[i].getInEdges() ){
  //         edge.show();
  //       }
  //
  //       //将查找到的下层节点存入数组
  //       nodes = nodes.concat(neighbors);
  //       //查找入边 压入边数组 箭头是从下级指向上级
  //       edges = edges.concat(nodes[i].getInEdges());
  //     }
  //   }
  //
  //   //获得上一层的节点
  //   neighbors = item.getNeighbors("target");
  //   // neighbors = that.originalGraph.getNeighbors(preNode,"target");
  //   for (let neighbor of neighbors) {
  //     neighbor.show();
  //   }
  //   for( let edge of item.getOutEdges() ){
  //     edge.show();
  //   }
  //   nodes = nodes.concat(neighbors);
  //   //将连向上一层的边压入边数组
  //   edges = edges.concat(item.getOutEdges());
  //
  //   while(nodes.length!==preIndex){
  //     for (let i = preIndex; i < nodes.length; i++) {
  //       //将起始坐标移动到数组最后+1 正好指向新加入的第一个
  //       preIndex = nodes.length;
  //       //查找节点
  //       neighbors = nodes[i].getNeighbors("target");
  //       // neighbors = that.originalGraph.getNeighbors(nodes[i],"target");
  //
  //       for (let neighbor of neighbors) {
  //         neighbor.show();
  //       }
  //       for( let edge of nodes[i].getOutEdges() ){
  //         edge.show();
  //       }
  //       //将查找到的下层节点存入数组
  //       nodes = nodes.concat(neighbors);
  //       //查找出边 压入边数组 箭头是从下级指向上级
  //       edges = edges.concat(nodes[i].getOutEdges());
  //     }
  //   }
  //
  //
  //
  // });
  graph.on('image-shape0:click', (evt) => {
    const model = evt.item._cfg.model
    // console.log(model)
    this.currentNode = model
    this.doAction()
  })
  graph.on('image-shape1:click', (evt) => {
    const model = evt.item._cfg.model
    // console.log(model)
    this.currentNode = model
    this.doDelete()
  })
  graph.on('image-shape2:click', (evt) => {
    const model = evt.item._cfg.model
    // console.log(model)
    this.currentNode = model
    this.doUpdate()
  })
      // graph.on('image-shape3:click', (evt) => {
      //   // const model = evt.item._cfg.model
      //   // // console.log(model)
      //   // this.currentNode = model
      //   // // this.doAction()
      //   //
      //   this.dialogVisible = true;
      //   // 用于计算卡片高度，在equipmentTime页面init有调用
      //   localStorage.setItem("dialogHeight", 90);
      //   console.log("设备详情页", e);
      // })

  graph.on('node:dragstart', function(e) {
    graph.layout();
    refreshDragedNodePosition(e);
  })
  graph.on('node:drag', function(e) {
    refreshDragedNodePosition(e);
  })
  graph.on('node:dragend', function(e) {
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  })

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight) return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    }

  function refreshDragedNodePosition(e) {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }

}
  }


}


</script>
