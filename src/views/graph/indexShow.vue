<template>
  <div>
<!--    <div style="margin:10px;padding:20px;border-radius: 4px;border:2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">-->
<!--      <span>请选择展示图谱&nbsp</span>-->
<!--      <el-select v-model="graphOptionValue" placeholder="请选择"  >-->
<!--        <el-option-->
<!--          @click.native="showGraph($event)"-->
<!--          v-for="item in graphOptions"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      &lt;!&ndash;      <div style="margin: 15px 0;"></div>&ndash;&gt;-->

<!--      <span style="margin-left: 20px">展示节点关联&nbsp</span>-->
<!--      <el-select v-model="relationOptionValue" placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in relationOptions"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
    <div style="border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <!--    /* 图的画布容器 */-->
      <div
        id="container"
        style="width : 100%;height : 100%;"
      ></div>
    </div>
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
import G6 from "@antv/g6";
import { listAllTree } from "@/api/system/tree";
import { listGraph, getGraph} from "@/api/system/graph";
import { listDevtable } from '@/api/system/devtable'

import equipmentTime from "../life/equipmentTime.vue";
import nodeDetail from "../graph/nodeDetail.vue";
import Equimenttree from "../tree/equ_tree/equimenttree.vue";
export default {
  data() {
    return {
      //所有图谱列表
      graphList: [],

      dialogVisible: false,

      //图谱对象
      graph: {},

      //图谱渲染数据
      graphData: {
        nodes: [],
        edges: [],
      },

      originalGraphData: [],

      //当前节点
      currentNode: {},

      //旋转动画要进行收缩的节点
      preNode: {},

      //选择图谱下拉框选项
      graphOptions: [],
      relationOptions: [],
      graphOptionValue : "设备图谱",
      relationOptionValue : "所有关系",


      //设备树节点列表
      treeList:[],
      //颜色数组
      colorList : [
        "#c2e690",
        "#e062ae",
        "#32c5e9",
        "#e690d1",
        "#fb7293",
        "#369fd5",
        "#f7d459",
        "#9adfb3",
        "#bbfb72",
      ],
      //名称长度处理
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
    };
  },
  components: {
    equipmentTime,nodeDetail,
  },
  methods: {
    // 点击查看完整图谱， 父子组件传值，关闭dialog
    closeDialog(text) {
      this.dialogVisible = text;
    },

    //获取graph图谱表 中的图谱数据
    // 只要id 和名称 之后优化?
    getGraphList() {
      listGraph().then((res) => {
        // console.log(res.rows)
        this.graphList = res.rows
        this.graphOptions.push({
          value: -1,
          label: "设备图谱"
        })
        this.graphList.forEach(graph => {
          this.graphOptions.push({
            value: graph.graphId,
            label: graph.graphName
          })
        })
      })
    },

    //通过下拉列表调用
    showGraph(event) {
      // console.log(event)
      // console.log(this.graphOptionValue)
      //清空当前图谱
      this.graph.clear()
      const that = this
      //如果选择的是主设备图谱
      if (this.graphOptionValue===-1){
        // listAllTree({}).then((response) => {
        listDevtable({}).then((response) => {
          // alert('aaa')
          // console.log(response);
          let treeList = []
          that.treeList = response.rows;

          //将前三层的节点过滤出来
          that.treeList.forEach(tree=>{
            // if(tree.type!==6&&tree.type!==1){
            // if(tree.devAttrCode!==6&&tree.devAttrCode!==1){
              treeList.push(tree)
            // }
          })
          // console.log(treeList)
          // debugger
          that.convertDataToNode(treeList)
          that.graph.data(this.graphData)
          that.graph.render()


        });
      }else{
        //如果选择的是其他图谱

        getGraph(this.graphOptionValue).then((response)=>{
          // that.treeList = []
          console.log(response)
          const data = response.data
          that.graphData.nodes = JSON.parse(data.graphNodes)
          that.graphData.edges = JSON.parse(data.graphEdges)
          G6.Util.processParallelEdges(this.graphData.edges);
          // console.log(that.graphData)
          that.graph.read(that.graphData)
        })
      }
    },


    //处理设备树数据 添加节点样式
    convertDataToNode(treeList){
      let parentIds = [];
      //将图谱数据置空
      this.graphData.nodes = []
      this.graphData.edges = []
      // console.log(treeList)

      for (let i = 0; i < treeList.length; i++) {
        //当parentId为 -1 时 该节点为最初的根节点
        // if (treeList[i].parentId === -1)
        if (treeList[i].orgId === -1)
          this.graphData.rootId = treeList[i].id;
        //对不同类型的节点 配置不同的样式
        let size;
        let fill;
        let type;
        let stroke = "#fff";
        switch (treeList[i].devAttrCode) {
          case '11':
            size = 120;
            type = "customNode0";
            break;
          case '10':
            size = 110;
            type = "customNode1";
            break;
          case '9':
            size = 100;
            type = "customNode2";
            break;
          case '6':
            size = 90;
            type = "customNode3";
            break;
          case '1':
            size = 80;
            type = "customNode4";
            break;
        }

        let findIndex = parentIds.findIndex(
          // (item) => item === treeList[i].parentId
          (item) => item === treeList[i].orgId
        );
        let colorIndex;
        //判断当前数组中是否存在该父节点id
        if (findIndex === -1) {
          //不存在 则将当前id 压入数组中
          // parentIds.push(treeList[i].parentId);
          parentIds.push(treeList[i].orgId);
          let length = parentIds.length - 1;
          colorIndex = length % this.colorList.length;
          fill = this.colorList[colorIndex];
          stroke = "#fff";
        } else {
          colorIndex = findIndex % this.colorList.length;
          fill = this.colorList[colorIndex];
        }

        if (treeList[i].orgId !== 0) {
          //放入所有的节点
          this.graphData.nodes.push({
            id: treeList[i].id + "",
            // label: this.fittingString(treeList[i].name,size,12),
            label: this.fittingString(treeList[i].devName,size,12),
            type: type,
            size: size,
            // data: treeList[i].name,
            data: treeList[i].devName,
            style: {
              stroke: "#fff",
              fill: fill,
              opacity: 1,
            },
          });
        }


        //放入所有的关系
        //关系为属于关系 从当前节点id指向父节点id
        // if (treeList[i].parentId !== -1) {
        if (treeList[i].orgId !== -1) {
          this.graphData.edges.push({
            source: treeList[i].id + "",
            // target: treeList[i].parentId + "",
            target: treeList[i].orgId + "",
            label: "属于",
            style: {
              endArrow: true,
              startArrow: false,
            },
            // color: "rgb(177,176,176)",
            // fontColor: "rgb(0,0,0)"
          });
        }
      console.log(this.graphData)

      }
    },
    //获取该节点的所有上层节点
    getHighLevelNode(item){
      let nodeList = [item]
      let index = 0
      while(index!==nodeList.length){
        for(let i=index;i<nodeList.length;i++){
          nodeList[i].getNeighbors('target').forEach(node=>{
            nodeList.push(node)
          })
          index++
        }
      }
      return nodeList

    },

    //获取图谱数据
    getGraphDataAndCreate() {
      // listAllTree({}).then((response) => {
      listDevtable({}).then((response) => {
        // console.log(response);
        let treeList = []
        this.treeList = response.rows;

        //将前三层的节点过滤出来
        // this.treeList.forEach(tree=>{
        //   if(tree.type!==6&&tree.type!==1){
        //     treeList.push(tree)
        //   }
        // })
        treeList=this.treeList

        this.convertDataToNode(treeList)
        this.createGraph();
      });
    },

    createGraph: function () {
      // 注册自定义节点
      let that = this;
      const imgList = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA4LTA5VDE1OjA1OjE4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOVQxNTowNzowOCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOVQxNTowNzowOCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2ZTQyZmVmZi1mZmFkLWEy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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABDCAYAAAAh43M3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA4LTA5VDE1OjA1OjQ4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOVQxNToxMToxNiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOVQxNToxMToxNiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NDNjYmVhNS1kZTRhLTU4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",
        "data:image/png;base64,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",
        // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABCCAYAAADqv6CSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA4LTA5VDE1OjA1OjU4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0wOVQxNToxMDo1MSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wOC0wOVQxNToxMDo1MSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2ZmM0Y2Y4MS0zYWY4LTU2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'
      ];
      const configList = [
        { r: 60 },
        { r: 55 },
        { r: 50 },
        { r: 45 },
        { r: 40 },
      ];
      const colorList = [
        "#fda5ba",
        "rgba(123,217,240,0.66)",
        "rgba(191,226,204,0.67)",
        "#eda6d1",
        "#fbebaf",
        "#aed8ed",
        "#f3cae9",
        "#fdbbcb",
      ];
      for (let i = 0; i < 5; i++) {
        G6.registerNode(
          "customNode" + i,
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
                name: "key-shape",
              });
              for (let j = 0; j < 3; j++) {
                // 添加图片
                const image = group.addShape("image", {
                  attrs: {
                    x: -10,
                    y: -10,
                    width: 40,
                    height: 40,
                    img: imgList[j],
                    cursor: "pointer",
                    opacity: 0.8,
                  },
                  name: "image-shape" + j,
                });
                image.toBack();
                // image.hide();
              }

              return shape;
            },
          },
          "circle"
        );
      }

      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height =
        container.scrollHeight || document.body.clientHeight * 0.75;

      //超长文本格式过滤器
      const fittingString = (str, maxWidth, fontSize) => {
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
      };

      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        // fitView: true,
        layout: {
          type: "force",
          preventOverlap: true,
          // linkDistance: 50,
          linkDistance: (d) => {
            if (d.source.size < 100) {
              return 200;
            }
            return 150;
          },
          nodeStrength: -200,
          edgeStrength: 1,
        },
        defaultNode: {
          // color: '#0956ef',
        },
        // defaultEdge: {
        //   type: 'quadratic',
        //   labelCfg: {
        //     autoRotate: true,
        //   },
        // },
        nodeStateStyles: {
          // highlight: {
          //   opacity: 1,
          // },
          dark: {
            fill: "#e6e6e6",
          },
          originalText: {},
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        // plugins: [menu], // 配置 Menu 插件
      });

      const nodes = this.graphData.nodes;

      // Modify the label in the data
      //调用文本长度过滤器  对节点中的文字进行过滤 过长的文字使用省略号
      nodes.forEach(function (node) {
        node.label = fittingString(node.label, node.size, 12);
      });

      graph.data({
        nodes,
        edges: this.graphData.edges.map(function (edge, i) {
          edge.id = "edge" + i;
          return Object.assign({}, edge);
        }),
      });

      //对多边显示进行处理
      // G6.Util.processParallelEdges(this.graphData.edges);

      graph.render();
      //根据当前窗口比例缩放
      // graph.fitView([100,100,100,100])
      graph.zoom(0.6)

      // let hideList = []
      // graph.getNodes().forEach(node=>{
      //   console.log(node)
      //
      //   if (node._cfg.model.size <= 90) {
      //     node.hide()
      //     hideList.push(node)
      //     node.getEdges().forEach(edge=>{
      //       edge.hide()
      //     })
      //   }
      // })
      //将最初的图谱对象保存起来, 供图谱筛选使用
      // this.originalGraphData = graph.save();
      // this.graph = graph
      //鼠标移动到节点
      graph.on("node:mouseenter", (event) => {
        const { item } = event;
        const model = item._cfg.model
        item._cfg.model.label = item._cfg.model.data;
        graph.refresh();
      });

      //鼠标离开节点
      graph.on("node:mouseleave", (event) => {
        // graph.setItemState(e.item, 'highlight', false);
        const { item } = event;
        // for (let node of graph.getNodes()) {
        //   if (node._cfg.id!==item._cfg.id){
        //     graph.setItemState(node, 'dark', false);
        //   }
        // }
        item._cfg.model.label = fittingString(
          item._cfg.model.label,
          item._cfg.model.size,
          12
        );
        graph.refresh();
      });
      //当点击到节点时
      graph.on('node:click', (event) => {
        //获取事件中的对应节点
        const { item } = event;
        const model = item._cfg.model
        this.currentNode = model
        //获取前置节点的字段数组
        let arr = Object.keys(that.preNode);
        // console.log("preNode",that.preNode);
        // console.log("item",item);
        //js中空对象也有系统默认属性
        if (arr.length >= 1)
          //如果前置节点不等于当前节点 且不存在当前图谱中 则清空前置节点
          if (that.preNode._cfg.id !== item._cfg.id) {
            if (typeof (graph.findById(that.preNode._cfg.id)) == "undefined") {
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
        if (arr.length > 1 ) {
          //如果有前置节点   判断 当前节点是否为 上次显示菜单的节点
          //当前节点只有一个 可能是进行重新选择根节点 不需要进行收回动画
          if (item._cfg.id !== that.preNode._cfg.id && !that.preNode._cfg.group.cfg.destroyed) {
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
          //如果上次的节点对象还没有来得及销毁  只修改了状态
          if (that.preNode._cfg.group.cfg.destroyed) {
            unfold()
          }

        } else {
          unfold();
        }

        // item._cfg.model.label = item._cfg.model.data;
        // graph.refresh();
      });

      // 当点击到

      // graph.on("image-shape1:click", (evt) => {
      //   console.log("evt", evt);
      //   // alert("000");
      //   const { item } = evt;
      //   //将所有的节点和边都隐藏
      //   for (let item of Object.values(graph.cfg.itemMap)) {
      //     item.hide();
      //     // console.log(item);
      //   }
      //   //创建一个节点数组
      //   let nodes = [];
      //   //最后的可以渲染的节点数据
      //   let nodesData = [];
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
      //   while (nodes.length !== preIndex) {
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
      //       for (let edge of nodes[i].getInEdges()) {
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
      //   // neighbors = that.originalGraph.getNeighbors(currentNode,"target");
      //   for (let neighbor of neighbors) {
      //     neighbor.show();
      //   }
      //   for (let edge of item.getOutEdges()) {
      //     edge.show();
      //   }
      //   nodes = nodes.concat(neighbors);
      //   //将连向上一层的边压入边数组
      //   edges = edges.concat(item.getOutEdges());
      //
      //   while (nodes.length !== preIndex) {
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
      //       for (let edge of nodes[i].getOutEdges()) {
      //         edge.show();
      //       }
      //       //将查找到的下层节点存入数组
      //       nodes = nodes.concat(neighbors);
      //       //查找出边 压入边数组 箭头是从下级指向上级
      //       edges = edges.concat(nodes[i].getOutEdges());
      //     }
      //   }
      // });

      graph.on('image-shape1:click', (evt) => {
        const { item } = evt;
        // console.log(item)
        const size = item._cfg.model.size
        const id = item._cfg.model.id
        //进行渲染的经过筛选的节点数据集合
        let treeList = []
        //经过筛选的节点id集合
        let targetIds = []
        //当前节点的所有上层集合
        let highLevelNodes = []
        //当前节点的邻居下层集合

        //如果是在总设备图谱下进行节点过滤
        if(that.graphOptionValue===-1||that.graphOptionValue==="设备图谱"){
          switch(size){
            case 120:
              //当第一层节点点击 展示第一层 第二层 第三层
              //将前三层的节点过滤出来
              that.treeList.forEach(tree => {
                if (tree.type !== 6 && tree.type !== 1) {
                  treeList.push(tree)
                }
              })
              break;
            default :
              //获取上层节点
              highLevelNodes = this.getHighLevelNode(item)
              // sourceNodes = item.getNeighbors('source')
              // highLevelNodes = highLevelNodes.concat(sourceNodes)
              highLevelNodes.forEach(node=>{
                targetIds.push(node._cfg.model.id)
              })
              that.treeList.forEach(tree=>{
                // if (targetIds.includes(tree.id+"")||tree.parentId+''===id) {
                if (targetIds.includes(tree.id+"")||tree.orgId+''===id) {
                  treeList.push(tree)
                }
              })
              break;
            // case 100:
            //   //获取上层节点
            //   highLevelNodes = this.getHighLevelNode(item)
            //
            //   // sourceNodes = item.getNeighbors('source')
            //   // highLevelNodes = highLevelNodes.concat(sourceNodes)
            //   highLevelNodes.forEach(node=>{
            //     targetIds.push(node._cfg.model.id)
            //   })
            //   //直接从that.treeList中获取下层数据
            //   that.treeList.forEach(tree=>{
            //     if (targetIds.includes(tree.id+"")||tree.parentId+''===id) {
            //       treeList.push(tree)
            //     }
            //   })
            //   break;
            // case 90:
            //   //获取上层节点
            //   highLevelNodes = this.getHighLevelNode(item)
            //
            //   // sourceNodes = item.getNeighbors('source')
            //   // highLevelNodes = highLevelNodes.concat(sourceNodes)
            //   highLevelNodes.forEach(node=>{
            //     targetIds.push(node._cfg.model.id)
            //   })
            //   //直接从that.treeList中获取下层数据
            //   that.treeList.forEach(tree=>{
            //     if (targetIds.includes(tree.id+"")||tree.parentId+''===id) {
            //       treeList.push(tree)
            //     }
            //   })
            //   break;
            // case 80:
            //   //获取上层节点
            //   highLevelNodes = this.getHighLevelNode(item)
            //   // sourceNodes = item.getNeighbors('source')
            //   // highLevelNodes = highLevelNodes.concat(sourceNodes)
            //   highLevelNodes.forEach(node=>{
            //     targetIds.push(node._cfg.model.id)
            //   })
            //   //直接从that.treeList中获取下层数据
            //   that.treeList.forEach(tree=>{
            //     if (targetIds.includes(tree.id+"")||tree.parentId+''===id) {
            //       treeList.push(tree)
            //     }
            //   })
            //   break;
          }
          this.convertDataToNode(treeList)
        }else{
          //在其他新建图谱中使用过滤
          alert("暂不支持自定义图谱过滤")
          // console.log('evt', evt)
          //
          // //将所有的节点和边都隐藏
          // for (let item of Object.values(graph.cfg.itemMap)) {
          //   item.hide()
          //   // console.log(item);
          // }
          // //创建一个节点数组
          // let nodes = []
          // //最后的可以渲染的节点数据
          // let nodesData = []
          // //创建一个边数组
          // let edges = []
          // //最后的可以渲染的边数据
          // let edgesData = []
          // //保存上次压入数组的下标
          // let preIndex = 0
          // //创建相邻节点数组 接受搜索到的相邻节点
          // let neighbors
          // //将当前节点压入数组
          // nodes.push(item)
          // item.show()
          // setTimeout(() => {
          //   graph.updateLayout({
          //     linkDistance: 50,
          //     preventOverlap: true
          //   })
          // }, 0)
          // setTimeout(() => {
          //   graph.updateLayout({
          //     linkDistance: (d) => {
          //       if (d.source.size > 60) {
          //         return 200
          //       }
          //       return 100
          //     },
          //     preventOverlap: true
          //   })
          // }, 200)
          // // that.focusNode(item,graph);
          //
          // //当没有新节点存入时停止循环
          // while (nodes.length !== preIndex) {
          //   //从还没有查找的下标开始  到查找完同一批次的节点结束
          //   for (let i = preIndex; i < nodes.length; i++) {
          //     //将起始坐标移动到数组最后+1 正好指向新加入的第一个
          //     preIndex = nodes.length
          //     //查找节点
          //     neighbors = nodes[i].getNeighbors('source')
          //
          //     for (let neighbor of neighbors) {
          //       neighbor.show()
          //     }
          //     for (let edge of nodes[i].getInEdges()) {
          //       edge.show()
          //     }
          //
          //     //将查找到的下层节点存入数组
          //     nodes = nodes.concat(neighbors)
          //     //查找入边 压入边数组 箭头是从下级指向上级
          //     edges = edges.concat(nodes[i].getInEdges())
          //   }
          // }
          //
          // //获得上一层的节点
          // neighbors = item.getNeighbors('target')
          // // neighbors = that.originalGraph.getNeighbors(currentNode,"target");
          // for (let neighbor of neighbors) {
          //   neighbor.show()
          // }
          // for (let edge of item.getOutEdges()) {
          //   edge.show()
          // }
          // nodes = nodes.concat(neighbors)
          // //将连向上一层的边压入边数组
          // edges = edges.concat(item.getOutEdges())
          //
          // while (nodes.length !== preIndex) {
          //   for (let i = preIndex; i < nodes.length; i++) {
          //     //将起始坐标移动到数组最后+1 正好指向新加入的第一个
          //     preIndex = nodes.length
          //     //查找节点
          //     neighbors = nodes[i].getNeighbors('target')
          //     // neighbors = that.originalGraph.getNeighbors(nodes[i],"target");
          //
          //     for (let neighbor of neighbors) {
          //       neighbor.show()
          //     }
          //     for (let edge of nodes[i].getOutEdges()) {
          //       edge.show()
          //     }
          //     //将查找到的下层节点存入数组
          //     nodes = nodes.concat(neighbors)
          //     //查找出边 压入边数组 箭头是从下级指向上级
          //     edges = edges.concat(nodes[i].getOutEdges())
          //   }
          // }

        }


        graph.clear()
        graph.read(this.graphData)
        // this.graph.render()
        // console.log(this.graph.getNodes())


      })

      graph.on("image-shape2:click", (e) => {
        console.log("列表页：显示所有相关节点", e);
      });
      graph.on("image-shape0:click", (e) => {
        this.dialogVisible = true;
        // 用于计算卡片高度，在equipmentTime页面init有调用
        localStorage.setItem("dialogHeight", 110);
        console.log("设备详情页", e);
      });

      graph.on("node:dragstart", function (e) {
        graph.layout();
        refreshDragedNodePosition(e);
      });

      graph.on("node:drag", function (e) {
        refreshDragedNodePosition(e);
      });

      graph.on("node:dragend", function (e) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };

      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");
        model.fx = e.x;
        model.fy = e.y;
      }
      this.graph = graph

    },

    //画布移动到以当前节点为中心
    focusNode(item, graph) {
      // animately move the graph to focus on the item.
      // the second parameter controlls whether move with animation, the third parameter is the animate configuration
      graph.focusItem(item, true, {
        easing: "easeCubic",
        duration: 500,
      });
    },

    layoutConfigTranslation() {},
  },
  mounted() {
    this.getGraphDataAndCreate();
    this.getGraphList()

  },
};
</script>
<style scoped>
/deep/ .el-dialog {
  height: 90vh;
  overflow: auto;
  margin-top: 10px;
}

/deep/ .el-dialog__header {
  padding: 0;
}

/deep/ .el-dialog__body {
  padding: 0;
}
</style>
