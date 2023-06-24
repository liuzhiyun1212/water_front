<template>
    <div ref="barChart" :style="{width: '100%', height: '279px'}"></div>
</template>

<script>
import echarts from "echarts";

export default {
    name: "faultChart",
    data() {
        return {
            option: {},
            selectedDataIndex: null,

            //如果有数据则展示这个图形
            existDataOption: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: '',
                    bottom: '0%'
                },
                //调整图表上下左右位置
                grid: {
                    top: '10%',
                    left: '3%',
                    right: '8%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value',
                    //分割刻度最小为1
                    minInterval: 1,
                },
                series: [
                    {
                        data: [],
                        type: 'bar',
                        // 柱形的宽度
                        barWidth: 20,
                        // 柱形的间距
                        barCategoryGap: '20%',
                        // 图形的形状
                        itemStyle: {
                            barBorderRadius: [0, 0, 0, 0],
                            color: (params) => {
                                let colorList = []
                                if (params.dataIndex == this.selectedDataIndex) {
                                    colorList[params.dataIndex] = 'red'
                                } else {
                                    colorList[params.dataIndex] = 'blue'

                                }
                                return colorList[params.dataIndex]
                            }
                        },
                    }
                ]
            },
            //第一次绘制图形
            firstDraw: true,

            //暂无数据时展示
            noDataOption: {
                title: {
                    text: '暂无数据',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'normal',
                    }
                }
            }
        }
    },
    methods: {
        initChart() {
            this.selectedDataIndex=null
            let getchart = echarts.init(this.$refs.barChart);
            getchart.clear()
            getchart.setOption(this.option);
            if (this.firstDraw) {
                //随着屏幕大小调节图表
                window.addEventListener("resize", () => {
                    getchart.resize();
                });
                //设置点击事件，并将参数传给父组件
                getchart.on('click', (params) => {
                    this.selectedDataIndex = params.dataIndex;
                    this.$emit("getClickedBarName", { clickedBarVal: params.name });
                    getchart.setOption(this.option);
                });
                this.firstDraw = false;
            }
        },
        //给option重新赋值
        setData(val) {
            //有数据时
            if (val.hasData) {
                this.existDataOption.xAxis.data = val.xData
                this.existDataOption.series[0].data = val.yData
                this.existDataOption.legend.data = val.legendName
                this.option = this.existDataOption
            }
            //没有数据时
            else {
                this.option = this.noDataOption
            }
        }
    }
}
</script>
