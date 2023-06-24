<!--
<template>
  <div id="app" style="width: 500px;">
    <el-carousel :interval="3000" arrow="always" height="300px">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
-->
<!--@mouseenter.native="delHandleMouseEnter" @mouseleave.native="delHandleMouseLeave"-->
<template>
  <div class="block">
    <el-carousel trigger="click" :height="height" :autoplay="flag">
      <el-carousel-item v-for="item in imgList" :key="item.id" name="item.id">
        <div class="pic_item">
          <img class="small" :src="item.url" />
          <h3 v-show="showH3">{{item.title}}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<!--<template>
  <div id="app" style="width: 100%;height: 250px;border-radius: 30px;">
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(img,index) in imgList" :key="index" style="height: 230px;border-radius: 30px;">
      <img v-bind:src="img.url">
      <h3>{{img.title}}}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>-->
<script>
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
export default {
  props:{
    height:''
  },
  name: 'App',
  data(){
    return{
      flag:true,
      showH3:false,
      imgList:[
        {url:'http://47.99.65.198:8200/profile/imgWithoutTime/p1.png',title:"NSC单级双吸中开式离心泵"},
        {url:'http://47.99.65.198:8200/profile/imgWithoutTime/p2.png',title:"单级双吸中开蜗壳式离心泵"},
        {url:'http://47.99.65.198:8200/profile/imgWithoutTime/p3.png',title:"三相异步电动机"}
      ]
    }
  },
  methods:{
    delHandleMouseEnter(){
      this.$nextTick(()=>{
        this.flag = false;
        this.showH3 = true;
      })
    },
    delHandleMouseLeave(){
      this.$nextTick(()=>{
        this.flag = true;
        this.showH3 = false;
      })
    }
  }
}
</script>
<style scoped>
img {
  width: 100%;
  /* max-width: 100%; */
  height:100%;
  border-radius: 30px;
  /* max-height: 100%; */
}
.el-carousel__item h3 {
  color: white;
  font-size: 1rem;
  /*opacity: 0.75;*/
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #0A1863;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #0A1863;
}

.block {
  width: 100%;
}
.small {
  width: 100%;
  height: 100%;
  position: relative;
}

.pic_item {
  position: relative;
  height: 100%;
}
.pic_item:hover{
  cursor: pointer;
}

.pic_item img {
  width: 100%;
  height: 100%;
}

.pic_item h3 {
  position: absolute;
  left: 1rem;
  bottom: 5rem;
}

</style>
<!--<style>
img {
  width: 100%;
  /* max-width: 100%; */
  height:100%;
  border-radius: 30px;
  /* max-height: 100%; */
}

.el-carousel__item h3 {
  color: #0A1863;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #0A1863;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>-->
