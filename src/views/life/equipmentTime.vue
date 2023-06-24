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
<template>
  <div id="app" style="width: 450px;">
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(img,index) in imgList" :key="index">
      <img v-bind:src="img.url">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
export default {
  name: 'App',
  data(){
    return{
      imgList:[
        {url:require('../../assets/map.jpg')},
        {url:require('../../assets/dev.png')},
        {url:require('../../assets/tree.png')}
      ]
    }
  }
}
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
