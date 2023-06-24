
<template>
  <div>
   <div style="width: 96%; margin-left:2%;background: #d2e9ff; margin-top: 10px; height:70px;outline: #d9d9d9 solid 1px;border-radius: 5px;box-shadow: 4px 4px 4px #d9d9d9;">
<!--      <el-button @click="qiehuan()" type="success" size="small" style="margin-top: 20px; float: right; margin-right: 25px" icon="el-icon-refresh">切换</el-button>-->
      <el-button @click="refresh()" type="primary" size="small" style="margin-top: 20px; float: right; margin-right: 10px" icon="el-icon-refresh-left">刷新</el-button>
     <i class="iconfont icon-circle"   style="color: #75878a; margin-left:  80px;margin-top: 28px; position: absolute; "><p @click="" style="  color: #75878a; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;未运行</p></i>
     <div class="停运设备" style="background: white;width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 155px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.flautequ}}</p></div>

     <i class="iconfont icon-circle" style="color: #5B8FF9; margin-left:305px;margin-top: 25px; position: absolute; ">&nbsp;&nbsp;运行中</i>
      <div class="运行中" style="background: white;width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 380px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 4px; margin-top: 4px;">{{equ.normalequ}}</p></div>

      <i class="iconfont icon-circle"  style="color: #be002f; margin-left: 530px;margin-top: 28px; position: absolute; "><p @click="" style=" color: #be002f; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;维保中</p></i>
      <div class="维护设备" style="background: white;width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 605px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.repairequ}}</p></div>

      <i class="iconfont icon-circle"  style=" color: #f2be45; margin-left: 755px;margin-top: 28px; position: absolute; "><p @click="" style=" color: #f2be45; margin-left: 20px;margin-top: -20px; ">&nbsp;&nbsp;已报废</p></i>
      <div class="报废设备" style="background: white;width:40px; height:30px; outline: #d9d9d9 solid 1px;border-radius: 2px;box-shadow: 4px 4px 4px #d9d9d9;margin-left: 830px;margin-top: 21px; position: absolute;"><p style=" font-size:20px; margin-left: 8px; margin-top: 4px;">{{equ.badequ}}</p></div>

    </div>
    <!-- 创建容器 -->
    <div id="mountnode"></div>
  </div>
</template>

<script>



import G6 from "@antv/g6";
import { getlistTree, getTreecode, getEqus, getAncfla,getAncrep,getAncbad } from '../../../api/system/tree'
import { getDevtable } from '../../../api/system/devtable'


export default {
  name: "tree",

  data() {
    return {
      data: {},
      graph:{},
      nodes:[],
      edges:[],
      equ:{
        normalequ:"",
        flautequ:"",
        repairequ:"",
        badequ:"",
      }

    };
  },

  mounted() {
    this.getListT();
    this.getEqussum();


  },

  methods: {
    getListT() {
      getlistTree().then((response) => {

        this.data = response;

        this.paintGraph(this.data);
        /*setTimeout( this.openfla(),5000);
        setTimeout( this.openfla(),10000);
        setTimeout( this.paint_fla_edge(),30000);*/
        /*setTimeout( () => {
          this.openfla();
        },1000);
        setTimeout( () => {
          this.openfla();
        },2000);
        setTimeout( () => {
          this.paint_fla_edge();
        },3000);*/
        this.paint_rep_edge();
      });

    },

    refresh(){
      getlistTree().then((response) => {
          this.data = response;
          this.graph.changeData(this.data);
          this.graph.fitView();
          this.graph.zoom(0.8);
          this.nodes=this.graph.getNodes();
          this.edges=this.graph.getEdges();
          this.paint_rep_edge();
      });
    },


    getEqussum(){
      getEqus().then((response) => {
        let list=[];
        list=response;
        this.equ.normalequ=list[0];
        this.equ.flautequ=list[1];
        this.equ.repairequ=list[2];
        this.equ.badequ=list[3];

      })
    },








    warn() {
      this.$message.error('该节点不是设备，无详细信息！');
    },

    qiehuan() {
      this.$router.push({
        path: "/life/life/equipmentTable",
      });
    },

    toDetailInformation: function (devname) {
      this.$router.push({
        path: "/life/life/equipmentTotally",
        query: {
          devCode: devname,
        },
      });
    },





    paintGraph(value) {
      const _this = this;

      G6.registerNode("card-node", {
        draw: function drawShape(cfg, group) {
          const r = 2;
          const color = "#5B8FF9";
          const w = cfg.size[0];
          const h = cfg.size[1];
          const shape = group.addShape("rect", {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w + 100, //200,
              height: h + 40, // 60
              stroke: color,
              radius: r,
              fill: "#fff",
              shadowOffsetX: 0, // 模板阴影的X轴偏移量
              shadowOffsetY: 0, // 模板阴影的Y轴偏移量
              shadowColor: "#999",
              shadowBlur: 10,
            },
            name: "main-box",
            sate: "1",
            draggable: true,
          });

          group.addShape("rect", {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: 100 + 180, //200,
              height: 40 / 2 + 40, // 60
              fill: cfg.color,
              radius: [r, r, 0, 0],
            },
            name: "title-box",
            draggable: true,
          });
          group.addShape("text", {
            //描述
            attrs: {
              textBaseline: "top",
              x: -w / 2 + 8,
              y: -h / 2 + 25,
              lineHeight: 20,
              fontSize: 22,
              text: cfg.name,
              fill: "#fff",
            },
            name: `description`,
          });
          /*group.addShape("rect", {
            //左边的线
            attrs: {
              x: w / 2 ,
              y: -10 ,
              width: 1,
              height: 60,
              fill: "#333",
              opacity: 0.35,
            },
          });*/
          group.addShape("rect", {
            //右边的线
            attrs: {
              x: w / 2 +30,
              y: -10 ,
              width: 1,
              height: 60,
              fill: "#333",
              opacity: 0.35,
            },
          });
         /* group.addShape("text", {
            //展开节点按钮
            attrs: {
              textBaseline: "top",
              x: w / 2 + 65,
              y: h / 2 ,
              lineHeight: 20,
              fontSize: 20,
              fontFamily: "iconfont",
              text: "\ue648",
              fill: 'rgba(0,0,0, 1)',
              cursor: "pointer",
            },
            name: "collapse-icon",
          });*/
        if(cfg.children.length!==0){
          group.addShape('marker', {
            attrs: {
              x: 225,
              y: h / 2+10 ,
              r: 14,
              cursor: 'pointer',
              symbol: G6.Marker.collapse,
              stroke: '#5B8FF9',
              lineWidth: 2,
              fill: '#fff',
            },
            name: 'collapse-icon',
          });};
          /*group.addShape("text", {
            //状态图标
            attrs: {
              textBaseline: "top",
              x: 85,
              y: h / 2 ,
              lineHeight: 20,
              fontFamily: "iconfont",
              fontSize: 25,
              text: cfg.icon,
              fill: cfg.color,
            },
            name: "nodesum",
          });*/
          group.addShape("text", {
            //查看按钮
            attrs: {
              textBaseline: "top",
              x: 175 ,
              y: h / 2 ,
              lineHeight: 20,
              fontSize: 25,
              fontFamily: "iconfont",
              text: "\ue610",
              fill: color,
              cursor: "pointer",
              // fill: 'rgba(0,0,0, 1)',
            },
            name: `checknode`,
            id: "checknode",
          });

          return shape;
        },

        setState(name, value, item) {
          if (name === 'collapsed') {
            const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
            const icon = value ? G6.Marker.expand : G6.Marker.collapse;
            marker.attr('symbol', icon);
          }
        },




       /* setState(name, value, item) {
          if (name === "collapsed") {
            const marker = item
              .get("group")
              .find((ele) => ele.get("name") === "collapse-icon");
            const icon = value ? G6.Marker.expand : G6.Marker.collapse;
            marker.attr("symbol", icon);
          }
        },*/

        /*getAnchorPoints() {
          //添加锚点 控制连接线的交点//
          return [
           //  [0, 0.5], // 左侧中间
           // [1, 0.5], // 右侧中间

            [0.5, 1],
            [0.5, 0], // 上侧中间
            // 下侧中间
          ];
        },*/
      });

      /*const data = {
        id,
        children,
      };*/

      // const data = { ...this.data };



      const container = document.getElementById("mountnode");


      //------------------渲染------------------------------------------------


      const graph = new G6.TreeGraph({
        container: "mountnode",
        width: window.innerWidth,
        height: window.innerHeight,
        fitViewPadding: 20,
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        animate: true,
        defaultNode: {
          type: "card-node",
          size: [250, 20],
        },
        defaultEdge: {
          type: "cubic-horizontal",//  polyline cubic-horizontal line

          style: {
            endArrow: true,
            lineWidth: 3,
          },
        },
        layout: {
          type: "compactBox",
          direction: "LR",//LR TB
          dropCap: false,
          indent: 500,
          getHeight: () => {
            return 30;
          },
          getHGap: () => {
            return 250;
          },
          getVGap: () => {
            return 30;
          },
        },
      });

      graph.data(value);
      graph.render();
     /* this.donghua(graph);*/
     graph.fitView();
      graph.zoom(0.8);


      this.graph=graph;
      this.nodes=graph.getNodes();
      this.edges=graph.getEdges();


      graph.on("node:click", (e) => {
        if (e.target.get("name") === "collapse-icon") {
          e.item.getModel().collapsed = !e.item.getModel().collapsed;
          graph.setItemState(e.item, "collapsed", e.item.getModel().collapsed);
          graph.layout();
        }
        this.paint_rep_edge();
      });




      graph.on("node:click", (e) => {
        //删除节点
        if (e.target.get("name") === "deletenode") {
          const item = e.item.getID();
          graph.remove(item);
          graph.execute();
        }
      });


    /*  graph.on("node:click", (e) => {
          if (e.target.get("name") === "nodesum") {

        const node2 =graph.findById('1');
            node2.getModel().collapsed = false;

      /!*graph.setItemState(node2, "collapsed", false);*!/
      graph.layout();}});*/











      graph.on("node:click", (e) => {
        //查看节点
        if (e.target.get("name") === "checknode") {
          const id=e.item.getID();
          getDevtable(id).then((response) => {
            if(response.data.devCode==null)
              this.warn();
            else
              this.toDetailInformation(response.data);
          });

        }
      });






      //鼠标移入
      /*graph.on("node:dblclick", (e) => {
        // const child = e.item.getShapeCfg()group.findById('testword');
        const group = e.item.getContainer();
        /!*const child = group.findById('testword');*!/
        const name = e.item.getID();
        const cfg = e.item._cfg;
        console.log(e.item);

        const model = {
          id: name,
          size: [100, 110],
        };
        e.item.update(model);
        e.item.refresh();
        group.addShape("text", {
          //描述
          attrs: {
            textBaseline: "top",
            x: -35,
            y: 78,
            lineHeight: 20,
            fontSize: 18,
            text: cfg.id,
            fill: "rgba(0,0,0, 1)",
          },
          name: `description`,
        });
        group.addShape("text", {
          //描述
          attrs: {
            textBaseline: "top",
            x: -40,
            y: 56,
            lineHeight: 20,
            fontSize: 18,
            text: "采集通道号:"+e.item.tunnelnum,
            fill: "rgba(0,0,0, 1)",
          },
          name: `description`,
        });
        group.addShape("text", {
          //描述
          attrs: {
            textBaseline: "top",
            x: -40,
            y: 32,
            lineHeight: 20,
            fontSize: 18,
            text: "设备编码:"+cfg.devcode,
            fill: "rgba(0,0,0, 1)",
          },
          name: `description`,
        });
      });

      //鼠标移出
      graph.on("node:mouseleave", (e) => {
        const name = e.item.getID();
        const model = {
          id: name,
          size: [100, 50],
        };
        e.item.update(model);
        e.item.refresh();
      });*/

      /*const huige =document.getElementById('hui');*/

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },



    openflaa(){
      this.openfla();
      this.openfla();
      this.paint_fla_edge();
    },
    openrepp(){
      this.openrep();
      this.openrep();
      this.paint_rep_edge();
    },
    openbadd(){
      this.openbad();
      this.openbad();
      this.paint_bad_edge();
    },

    openfla()
    {
      getAncfla().then((response) => {
        let list = [];
        list=response;

        for(let i=0;i<list.length;i++){
          for(let j=0;j<this.nodes.length;j++){
            if(this.nodes[j].getID()===list[i]){
              this.nodes[j].getModel().collapsed = false;
            }
          }
        }
        this.graph.layout();
        this.graph.fitView();
      });
    },


    paint_fla_edge(){
      getAncfla().then((response) => {
        let list = [];
        list = response;
        const stroke = '#be002f';
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < this.nodes.length; j++) {
            if (this.nodes[j].getID() === list[i]) {
              const edgs = this.nodes[j].getInEdges();
              for(let i=0;i<this.edges.length;i++){
                if(this.edges[i].getID()===edgs[0].getID()){
                  this.edges[i].update({
                    style: {
                      stroke,
                    },
                  });
                }
              }
            }
          }
        }
        this.graph.paint();

      });
    },



    openrep()
    {
      getAncrep().then((response) => {
        let list = [];
        list=response;
        for(let i=0;i<list.length;i++){
          for(let j=0;j<this.nodes.length;j++){
            if(this.nodes[j].getID()===list[i]){
              this.nodes[j].getModel().collapsed = false;
            }
          }
        }
        this.graph.layout();
        this.graph.fitView();
      });
    },

    paint_rep_edge(){
      getAncrep().then((response) => {
        let list = [];
        list = response;
        const stroke = '#be002f';
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < this.nodes.length; j++) {
            if (this.nodes[j].getID() === list[i]) {
              const edgs = this.nodes[j].getInEdges();
              for(let i=0;i<this.edges.length;i++){
                if(this.edges[i].getID()===edgs[0].getID()){
                  this.edges[i].update({
                    style: {
                      stroke,
                    },
                  });
                }
              }
            }
          }
        }
        this.graph.paint();
      });
    },




    openbad()
    {
      getAncbad().then((response) => {
        let list = [];
        list=response;
        for(let i=0;i<list.length;i++){
          for(let j=0;j<this.nodes.length;j++){
            if(this.nodes[j].getID()===list[i]){
              this.nodes[j].getModel().collapsed = false;
            }
          }
        }
        this.graph.layout();
        this.graph.fitView();
      });
    },



    paint_bad_edge(){
      getAncbad().then((response) => {
        let list = [];
        list = response;
        const stroke = '#75878a';
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < this.nodes.length; j++) {
            if (this.nodes[j].getID() === list[i]) {
              const edgs = this.nodes[j].getInEdges();
              for(let i=0;i<this.edges.length;i++){
                if(this.edges[i].getID()===edgs[0].getID()){
                  this.edges[i].update({
                    style: {
                      stroke,
                    },
                  });
                }
              }
            }
          }
        }
        this.graph.paint();
      });
    },


    donghua(graph){
      const rootnode = graph.findById('175');

      graph.focusItem(rootnode);

// 动画地移动
     /* graph.focusItem(rootnode, true);

// 动画地移动，并配置动画
      graph.focusItem(rootnode, true, {
        easing: 'easeCubic',
        duration: 400,
      });*/
    },


  },
};
</script>

<style scoped>
</style>

