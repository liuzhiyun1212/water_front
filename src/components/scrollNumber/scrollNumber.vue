<template>
  <div class="count-flop" :key="compKey">
    <div :class="item != '.' && item != ',' ?'count-flop-box':'count-flop-point'" v-for="(item, index) in value" :key="index">
      <div v-if="item == ','" class="count-flop-content">,</div>
      <div v-else-if="item == '.'" class="count-flop-content">.</div>
      <div v-else class="count-flop-content" :class="['rolling_' + item]">
        <div v-for="(item2,index2) in numberList" :key="index2" class="count-flop-num">{{item2}}</div>
      </div>
<!--      class="count-flop-num"-->
    </div>
    <div v-if="suffix" class="count-flop-unit">{{suffix}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      compKey: 0
    };
  },
  props: ["val","suffix"],
  watch: {
    val() {
      this.value = this.val.toString().split("");
      this.compKey += 1;
    }
  },
  methods:{
    updateVal(){
      this.compKey += 1;
    }
  },
  created() {
    this.value = this.val.toString().split("");
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(this.updateVal, 10000);
    });
  }
};
</script>
<style scoped>
.count-flop {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-family: Gotham;
  font-size: 20px;
  color: #FFEB7B;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
/*.count-flop-num{*/
/*}*/
.count-flop > div {
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 100%;
}

.count-flop-box {
  margin-right: 6px;
  width: 15px;
  background-color: #0A1863;
  height: 30px;
  line-height: 48px;
  border-radius: 2px;
}

.count-flop-point {
  margin-right: 5px;
  width: 10px;
}

.count-flop-content {
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  animation-fill-mode: forwards !important;
}
.count-flop-unit {
  width: 68px;
  height: 50px;
  line-height: 50px;
  background-color: #20214d;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  align-items: center;
  letter-spacing: 0.1em;
  color: #FFFFFF;
}
.rolling_0 {
  animation: rolling_0 2.1s ease;
}

@keyframes rolling_0 {
  from {
    transform: translateY(-90%);
  }
  to {
    transform: translateY(0);
  }
}

.rolling_1 {
  animation: rolling_1 3s ease;
}

@keyframes rolling_1 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10%);
  }
}

.rolling_2 {
  animation: rolling_2 2.1s ease;
}

@keyframes rolling_2 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20%);
  }
}

.rolling_3 {
  animation: rolling_3 3s ease;
}

@keyframes rolling_3 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-30%);
  }
}

.rolling_4 {
  animation: rolling_4 2.1s ease;
}

@keyframes rolling_4 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-40%);
  }
}

.rolling_5 {
  animation: rolling_5 3s ease;
}

@keyframes rolling_5 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

.rolling_6 {
  animation: rolling_6 2.1s ease;
}

@keyframes rolling_6 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-60%);
  }
}

.rolling_7 {
  animation: rolling_7 3.1s ease;
}

@keyframes rolling_7 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-70%);
  }
}

.rolling_8 {
  animation: rolling_8 2.1s ease;
}

@keyframes rolling_8 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-80%);
  }
}

.rolling_9 {
  animation: rolling_9 3.6s ease;
}

@keyframes rolling_9 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-90%);
  }
}
</style>

