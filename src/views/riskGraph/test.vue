<template>
  <div>
    <data-chart :height="'320px'"></data-chart>
  </div>
</template>

<script>
import DataChart from "@/views/dashboard/DataChart.vue";
export default {
  data() {
    return {
      data: "",
    };
  },
  components: {
    DataChart,
  },
  methods: {},
};
</script>