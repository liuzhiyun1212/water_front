<template>

  <div>
    <vc-calendar is-expanded is-dark :attributes='attributes'></vc-calendar>
<!--    <el-button type="success" @click="lifeGet()"
    >获取</el-button
    >-->
  </div>

</template>
<script>
import VCalendar from 'v-calendar';
import Vue from 'vue' // 引入日历插件
import moment from 'moment';
import { listLifeCycle } from "@/api/system/equipment";
import { listAllPlan } from '../../api/system/plan';
import { listDevtable} from '../../api/system/devtable';
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

export default {
  data() {
    /*const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();*/
    /*const todos = [
      {
        description: 'Take Noah to basketball practice.',
        isComplete: false,
        dates: { weekdays: 6 }, // Every Friday
        color: 'red',
      },
    ];*/
    return {
      data:"",
      year:'',
      month:'',
      a:'09-27',
      b:'猪',
      c:'喵',
      /*incId: todos.length,
      todos,*/
      attributes:[],
      makingTime:[],
      beginTime:[],
      acceptTime:[],
    };
  },
  created() {
    this.getParam();
    // this.setCalendar();
  },
  methods:{
    getParam(){
      this.date = new Date();
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      //某月第一天
      let startTime = moment(this.date).month(this.month).date(1).startOf("month").format("YYYY-MM-DD");
      //某月最后一天
      let endTime = moment(this.date).month(this.month).date(1).endOf("month").format("YYYY-MM-DD");
      console.log(startTime,endTime);
      var a = startTime.split('-');
      console.log(a[a.length-1]);
      /*console.log(this.compareDate('2022-09-01',startTime));
      console.log(this.compareDate(endTime,'2022-09-30'));*/
      listDevtable().then((res)=>{
        for (var i = 0;i<res.rows.length;i++){
          if (res.rows[i].ageLimit != null &&
            this.compareDate(res.rows[i].ageLimit, startTime) &&
            this.compareDate(endTime, res.rows[i].ageLimit)){
            var a = res.rows[i].ageLimit.split('-');
            var day = a[a.length-1];
            var array = {};
            var popover = {};
            var arraytwo = {};
            var highlight = {};
            //点
            array.dot = 'red';
            array.dates = new Date(this.year,this.month,day);
            popover.label = '设备报废时间:'+res.rows[i].devName;
            array.popover = popover;
            //圈
            highlight.color = 'red';
            highlight.fillMode = 'solid';
            highlight.contentClass = 'italic';
            arraytwo.highlight = highlight;
            arraytwo.dates = new Date(this.year,this.month,day);
            this.attributes.push(array);
            this.attributes.push(arraytwo);
          }
        }
      })
      listAllPlan().then((res) => {
        console.log(res.rows);
        for (var i = 0;i<res.rows.length;i++){
          if (
            this.compareDate(res.rows[i].makingTime, startTime) &&
            this.compareDate(endTime, res.rows[i].makingTime)
          ) {
            var a = res.rows[i].makingTime.split('-');
            var day = a[a.length-1];
            var array = {};
            var popover = {};
            var arraytwo = {};
            var highlight = {};
            //点
            array.dot = 'yellow';
            array.dates = new Date(this.year,this.month,day);
            popover.label = '维保指定计划:'+res.rows[i].name;
            array.popover = popover;
            //圈
            highlight.color = 'yellow';
            highlight.fillMode = 'solid';
            highlight.contentClass = 'italic';
            arraytwo.highlight = highlight;
            arraytwo.dates = new Date(this.year,this.month,day);
            this.attributes.push(array);
            this.attributes.push(arraytwo);
            // this.makingTime.push(new Date(this.year,this.month,day))
          }
        }
        // console.log(this.makingTime)
        for (var i = 0;i<res.rows.length;i++){
          var begin = res.rows[i].fixdate.split('至')[0];
          console.log("欧耶",begin);
          if (
            this.compareDate(begin, startTime) &&
            this.compareDate(endTime, begin)
          ) {
            var a = begin.split('-');
            var day = a[a.length-1];
            // console.log("欧耶",day);
            var array = {};
            var popover = {};
            var arraytwo = {};
            var highlight = {};
            //点
            array.dot = 'green';
            array.dates = new Date(this.year,this.month,day);
            popover.label = '维保维修开始时间:'+res.rows[i].name;
            array.popover = popover;
            //圈
            highlight.color = 'green';
            highlight.fillMode = 'solid';
            highlight.contentClass = 'italic';
            arraytwo.highlight = highlight;
            arraytwo.dates = new Date(this.year,this.month,day);
            this.attributes.push(array);
            this.attributes.push(arraytwo);
            // this.beginTime.push(new Date(this.year,this.month,day));
          }
        }
        // console.log(this.beginTime);
        for (var i = 0;i<res.rows.length;i++){
          if (
            res.rows[i].lastAcceptTime != null &&
            this.compareDate(res.rows[i].lastAcceptTime, startTime) &&
            this.compareDate(endTime, res.rows[i].lastAcceptTime)
          ) {
            var a = res.rows[i].lastAcceptTime.split('-');
            var day = a[a.length-1];
            var array = {};
            var popover = {};
            var arraytwo = {};
            var highlight = {};
            //点
            array.dot = 'purple';
            array.dates = new Date(this.year,this.month,day);
            popover.label = '维保验收时间:'+res.rows[i].name;
            array.popover = popover;
            //圈
            highlight.color = 'purple';
            highlight.fillMode = 'solid';
            highlight.contentClass = 'italic';
            arraytwo.highlight = highlight;
            arraytwo.dates = new Date(this.year,this.month,day);
            this.attributes.push(array);
            this.attributes.push(arraytwo);
            // this.acceptTime.push(new Date(this.year,this.month,day));
          }
        }
        // console.log(this.acceptTime);
        // this.setCalendar();
      })
    },
    setCalendar(){
      const date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      this.attributes = [
        /*{
          dot: 'yellow',
          dates: [
            new Date(year, month, 25), // Jan 1st
            new Date(year, month, 26), // Jan 10th
            new Date(year, month, 27), // Jan 22nd

          ],
          popover: {
            label: '维保制定时间',
          },
        },
        {
          dot: 'yellow',
          dates: [
            new Date(year, month, 25), // Jan 1st
            new Date(year, month, 26), // Jan 10th
            new Date(year, month, 28), // Jan 22nd
          ],
          popover: {
            label: '维保制定时间',
          },
        },*/
        {
          dot: 'yellow',
          dates: this.makingTime,
          popover: {
            label: '维保制定时间',
          },
        },
        {
          dot: 'green',
          dates: this.beginTime,
          popover: {
            label: '维保维修开始时间',
          },
        },
        {
          dot: 'purple',
          dates: this.acceptTime,
          popover: {
            label: '维保验收时间',
          },
        },
        {
          dot: 'red',
          dates: [
            new Date(year, month, 13), // Jan 1st
            new Date(year, month, 14), // Jan 10th
            new Date(year, month, 27), // Jan 22nd
          ],
          popover: {
            label: '美好的一天！要开心呦！',
          },
        },
        {
          // key: 'today',
          highlight: {
            color: 'green',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: this.beginTime,
        },
        {
          // key: 'today',
          highlight: {
            color: 'yellow',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: this.makingTime,
        },
        {
          // key: 'today',
          highlight: {
            color: 'purple',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: this.acceptTime,
        },
       /* {
          dot: 'red',
          dates: [
            new Date(year, month, 13), // Jan 1st
            new Date(year, month, 14), // Jan 10th
            new Date(year, month, 22), // Jan 22nd
          ],
          popover: {
            label: '美好的一天！要开心呦！'+this.b,
          },
        },
        {
          // key: 'today',
          highlight: {
            color: 'red',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: new Date(year, month, 12),
        },
        {
          // key: 'today',
          highlight: {
            color: 'yellow',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: new Date(year, month, 13),
        },
        {
          // key: 'today',
          highlight: {
            color: 'green',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: new Date(year, month, 14),
        },
        {
          // key: 'today',
          highlight: {
            color: 'indigo',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: new Date(year, month, 15),
          popover: {
            label: '美好的一天！要开心呦！'+this.c,
          },
        },*/
      ];
    },
    //判断两个日期大小
    compareDate(d1, d2) {
      //判断两个日期的大小
      let reg = new RegExp("-", "g");
      if (new Date(d1.replace(reg, "/")) >= new Date(d2.replace(reg, "/"))) {
        console.log("第一个大");
        return true;
      } else {
        console.log("第二个大");
        return false;
      }
    },
    lifeGet(){
      var a = {id:1,devName:"1",devCode:"362236",startData:"2021-01-02",ageLimit:"2025-01-02"}
      listLifeCycle(a).then((res)=>{
        console.log(res);
      })
    }
  }
}
</script>
