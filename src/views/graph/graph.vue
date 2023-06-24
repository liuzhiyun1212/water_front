<template>
  <div>
    <el-empty v-if="isShowGraph" :image-size="180" :style="{height:height,width:width}"></el-empty>
      <div id="container"  v-else
           :style="{height:height,width:width}"
      ></div>
  </div>
</template>


<script>
import G6 from "@antv/g6";
import { listAllTree, getTree } from '@/api/system/tree'
import { listSensor } from "@/api/system/sensor";

export default {
  props: {
    searchValue: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    devCode: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      isShowGraph: false,
      nodeData:[],
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
      graphData: {
        nodes: [],
        edges: [],
      },
      originalGraphData: [],
      currentNode: {},
      options: [],
      graph: {},
    };
  },
  methods: {
    //获取图谱数据


    createGraph: function () {
      // 注册自定义节点
      let that = this;
      let container;
      let width;
      let height;
      container = document.getElementById("container");

      // console.log("container",container);
      width = container.scrollWidth;
      // width = this.width;
      height = container.scrollHeight || 500;
      // height = this.height;

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
        container,
        width,
        height,
        layout: {
          type: "force",

          preventOverlap: true,

          linkDistance: 200,
          nodeStrength: -10,
          edgeStrength: 0.7,
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
      });
      const nodes = this.graphData.nodes;
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
      graph.render();
      //将图谱对象传递出去 以供获得id时  进行图谱筛选
      this.graph = graph;



      //鼠标移动到节点
      graph.on("node:mouseenter", (event) => {
        const { item } = event;
        const model = item._cfg.model
        item._cfg.model.label = item._cfg.model.data;
        graph.refresh();
      })

          //鼠标离开节点
      graph.on("node:mouseleave", (event) => {
        // graph.setItemState(e.item, 'highlight', false);
        const { item } = event;

        item._cfg.model.label = fittingString(
          item._cfg.model.label,
          item._cfg.model.size,
          12
        );
        graph.refresh();
      });

      //当点击到
      graph.on("node:click", (e) => {
        alert("点击节点!!")
        that.$emit('nodeData', this.nodeData)
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



    //获取相应编码的传感器对象
    getGraphDataAndCreateGraph(devCode) {
      let nodeData = []
      listSensor({ code: devCode }).then(response => {
        // console.log("response",response)
        // console.log("devCode",devCode)
        //找到节点在设备树上的相应记录  isShowGraph
        if (response.rows.length === 0) {
          this.isShowGraph = true;
          return
        }
        const devTreeId = response.rows[0].devTreeId
        //传感器表dev_tree_id  找到设备树表中的对应的设备
        getTree(devTreeId).then(res => {
          const parentId = res.data.parentId
          //在设备树中找到 所有兄弟节点id
          listAllTree({ parentId: parentId }).then(response => {
            nodeData = nodeData.concat(response)
            // console.log('response11', response)
            //在设备树中找到 父节点
            getTree(parentId).then(res => {
              nodeData.push(res.data)
              this.nodeData = nodeData
              this.convertDataToNode(nodeData)
              this.createGraph()
              // console.log("graphData",this.graphData)
            })
          })

        })

        //设备树表parent_id   查找同parent_id兄弟节点  查找parent_id 父节点

        //构造图谱
      })

    },
    //获取相应编码的传感器对象

    convertDataToNode(treeList,parentId){
      let parentIds = []
      let nodeIds = []
      for (let i = 0; i < treeList.length; i++) {
        nodeIds.push(treeList[i].id)
      }
      //将图谱数据置空
      this.graphData.nodes = []
      this.graphData.edges = []
      for (let i = 0; i < treeList.length; i++) {
        //当parentId为 -1 时 该节点为最初的根节点
        if (treeList[i].parentId === -1)
          this.graphData.rootId = treeList[i].id;
        //对不同类型的节点 配置不同的样式
        let size;
        let fill;
        let type;
        let stroke = "#fff";
        switch (treeList[i].type) {
          case 11:
            size = 120;
            type = "customNode0";
            break;
          case 10:
            size = 110;
            type = "customNode1";
            break;
          case 9:
            size = 100;
            type = "customNode2";
            break;
          case 6:
            size = 90;
            type = "customNode3";
            break;
          case 1:
            size = 80;
            type = "customNode4";
            break;
        }

        let findIndex = parentIds.findIndex(
          (item) => item === treeList[i].parentId
        );
        let colorIndex;
        //判断当前数组中是否存在该父节点id
        if (findIndex === -1) {
          //不存在 则将当前id 压入数组中
          parentIds.push(treeList[i].parentId);
          let length = parentIds.length - 1;
          colorIndex = length % this.colorList.length;
          fill = this.colorList[colorIndex];
          stroke = "#fff";
        } else {
          colorIndex = findIndex % this.colorList.length;
          fill = this.colorList[colorIndex];
        }



        //放入所有的节点
        this.graphData.nodes.push({
          id: treeList[i].id + "",
          label: this.fittingString(treeList[i].name,size,12),
          // type: type,
          size: size,
          data: treeList[i].name,
          style: {
            stroke: "#fff",
            fill: fill,
            opacity: 1,
          },
        });
        //放入所有的关系
        //关系为属于关系 从当前节点id指向父节点id
        if (nodeIds.includes(treeList[i].parentId)) {
          this.graphData.edges.push({
            source: treeList[i].id + "",
            target: treeList[i].parentId + "",
            label: "属于",
            style: {
              endArrow: true,
              startArrow: false,
            },
            // color: "rgb(177,176,176)",
            // fontColor: "rgb(0,0,0)"
          });
        }


      }
    },

  },
  created() {
    // console.log(111111111111111111);
    // this.getGraphDataAndCreate("12");
    //根据传过来的设备编码 进行搜索  只有传感器的设备编码
    this.getGraphDataAndCreateGraph(this.devCode)

  },

};
</script>
