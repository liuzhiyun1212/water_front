<template>
  <div class="app-container">
    <el-card>
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
          首页轮播图片管理
        </p>
<!--        <h3>首页轮播图片管理</h3>-->
      </div>

      <el-row :gutter="20">
        <el-card style="width: 97%;margin:auto">
          <uploadImg
            :height="'200px'"
            :width="'100%'"
            :url="baseImgUrl + fileName1 + '.png'"
            :fileName="fileName1"
          >
          </uploadImg>
        </el-card>
        <el-card style="width: 97%;margin:auto">
          <uploadImg
            :height="'200px'"
            :width="'100%'"
            :url="baseImgUrl + fileName2 + '.png'"
            :fileName="fileName2"
          >
          </uploadImg>
        </el-card>
        <el-card style="width: 97%;margin:auto">
          <uploadImg
            :height="'200px'"
            :width="'100%'"
            :url="baseImgUrl + fileName3 + '.png'"
            :fileName="fileName3"
          >
          </uploadImg>
        </el-card>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import request from "@/utils/request";
import uploadImg from "./single/index.vue";

export default {
  name: "index",
  components: {
    uploadImg,
  },
  data() {
    return {
      // baseImgUrl: "http://localhost:8200/profile/imgWithoutTime/",
      baseImgUrl: "http://47.99.65.198:8200/profile/imgWithoutTime/",
      fileName1: "p1",

      fileName2: "p2",

      fileName3: "p3",
    };
  },
  methods: {},
};
</script>

<style scoped></style>
