<template>
<div>
  <div class="home">
    <!-- 头部信息 -->
		<div class="head-box"  @click="goFunction">
			<div class="layui-row">
				<div class="layui-col-xs3 verticalHorizonCenter">
					<div>
						<img class="layui-circle headImg" :src="webchatUserinfo.headimgurl"  />
						<!-- <div> -->
							<p class="head-span" >{{webchatUserinfo.nicknameName}}</p>
						<!-- </div> -->
					</div>
				</div>
				<div class="layui-col-xs9" style="height: 100px;    align-items: center; display: flex;">
					<span class="head-name" >单位：{{webchatUserinfo.deptIdName}}</span>
					<i class="iconfont icon-right" style=" position: absolute; right: 10px;"></i>
				</div>
				
			</div>
		</div>

    		<!-- 数据统计 -->
		<div class="layui-row layui-col-space2  cout" style="background-color: white;margin: 10px;border-radius: 10px;">
			<div class="layui-col-xs3" @click="goNavigation">
				<div>
					<h3>{{data.coverCount}}</h3>
					<p style="text-align: center;">井盖总数</p>
				</div>
			</div>
			<div class="layui-col-xs3">
				<div>
					<h3>{{data.noopsycheCount}}</h3>
					<p style="text-align: center;">智能井盖</p>
				</div>
			</div>
			<div class="layui-col-xs3">
				<div>
					<h3>{{data.warningCount}}</h3>
					<p style="text-align: center;">告警总数</p>
				</div>
			</div>
			<div class="layui-col-xs3">
				<div>
					<h3>{{data.reportCount}}</h3>
					<p style="text-align: center;">报修总数</p>
				</div>
			</div>
		</div>
		<div class="layui-row layui-col-space2  cout" style="background-color: white;margin: 10px;border-radius: 10px;">
			<div class="layui-col-xs3" @click="goTodayReportCount">
				<div>
					<h3>{{data.todayWarningCount}}</h3>
					<p style="text-align: center;">今日告警</p>
				</div>
			</div>
			<div class="layui-col-xs3" @click="goTodayDisappearReport">
				<div>
					<h3>{{data.todayEliminatingCount}}</h3>
					<p style="text-align: center;">今日消警</p>
				</div>
			</div>
			<div class="layui-col-xs3" @click="goTodayDateRepairs">
				<div>
					<h3>{{data.todayUserReport}}</h3>
					<p style="text-align: center;">今日报修</p>
				</div>
			</div>
			<div class="layui-col-xs3" @click="goTodayMaintain">
				<div>
					<h3>{{data.todayRepairCount}}</h3>
					<p style="text-align: center;">今日维修</p>
				</div>
			</div>
		</div>

    <!-- 走势图 6个月统计数据 -->
		<p style="margin-left: 13px;color: #000000; font-size: 13px; font-weight: bold;">统计走势</p>
		<div id="qs" ref="qs" style="height: 200px;background-color: white; margin: 10px;border-radius:10px"></div>

    <!-- 饼图 告警分类 -->
		<p style="margin-left: 13px;color: #000000; font-size: 13px; font-weight: bold;">告警分类</p>
		<div id="gjfl" ref="gjfl" class="layui-row" style="height: 200px; background-color: white; margin: 10px;border-radius:10px"></div>
	
	<div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
              </div>
          </div>
      </div>

  </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {selectHomePage, selcteMonthly} from '../api/dataCover/dataCover';
import weui from 'weui.js';
import 'weui';

export default {
  name: 'Home',
  data () {
    return {
		data:[],
		webchatUserinfo:{},
		message:''
    }
  },
  components: {
    // HelloWorld
  },
  created(){
   	this.selectHomePage();
	this.selcteMonthly();
	   let token = this.$route.query.token
      console.log(11,window.location.href)
      console.log(12,this.$route.query.token)
    //   this.$store.commit('token',this.token)
    //   console.log(this.$store.state.user.token)
      localStorage.setItem("token", token);
  },
  methods:{
	goNavigation(){
		this.$router.push({
			name:'coverMap'
		})
	},
	goTodayReportCount(){
		
	},
	goTodayDisappearReport(){

	},
	goTodayDateRepairs(){

	},
	goTodayMaintain(){

	},
	goFunction(){
		 this.$router.push({
              name:'function'
          })
	},  
	selectHomePage(){
		selectHomePage().then(res =>{
			if (res.data.code == 200) {
				this.data = res.data.data
				this.webchatUserinfo = res.data.data.webchatUserinfo
				// console.log('data',this.webchatUserinfo.headimgurl)
				this.$nextTick(function() {
					this.initPie(this.data.eventAxis,this.data.eventSeries);
				});
			}else{
				this.message = res.data.message;
				this.$refs.iosDialog2.style.display = 'block';
			}
			
		}).catch(error => {
        });
	},
	selcteMonthly(){
		selcteMonthly().then(res =>{
			this.$nextTick(function() {
				this.initline(res.data.data);
			});
		}).catch(error => {
        });
	},
    initline(data){
		console.log(data)
      /* 统计趋势图 */
		var qs = echarts.init(this.$refs.qs, "light");
		qs.setOption({
				title: {
					text: ''
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					top: 5,
					bottom:5,
					data: ['井盖', '智能', '告警', '报修']
				},
				grid: {
					left: '4%',
					right: '4%',
					// right: '20%',
					bottom: '4%',
					top:'25%',
					containLabel: true
				},
				toolbox: {
						show: false
				},
				xAxis: {
					// name: "2020年",
					type: 'category',
					boundaryGap: true,
					axisLabel:{
						rotate: 20,
						interval: 0
					},
					data: data.xAxisData
					// data: ['1月', '2月', '3月', '4月', '5月', '6月']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '井盖',
						type: 'line',
						data: data.warningMonthlyCount
						// data: [320, 332, 301, 334, 390, 330]
					},
					{
						name: '智能',
						type: 'line',
						// stack: '总量',
						data: data.noopsycheMonthlyCount
						// data: [220, 182, 191, 234, 290, 330]
					},
					{
						name: '告警',
						type: 'line',
						// stack: '总量',
						data: data.eventMonthlyCount
						// data: [120, 132, 101, 134, 90, 230]
					},
					{
						name: '报修',
						type: 'line',
						// stack: '总量',
						data: data.reportMonthlyCount
						// data: [150, 232, 201, 154, 190, 330]
					},
					
				]
			}
		);

		function click({name: legend, selected}) {
				for (let name in selected) {
					if (selected.hasOwnProperty(name)) {
						if (name === legend) {
							qs.dispatchAction({type: 'legendSelect', name});
						} else {
							qs.dispatchAction({type: 'legendUnSelect', name});
						}
					}
				}
		}
    	qs.on("legendselectchanged", click);
    },
    initPie(eventAxis,eventSeries){
      /* 告警分类 */
		var myChart = echarts.init(this.$refs.gjfl);
		myChart.setOption( {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 2,
				top:5,
				data:eventAxis
				// data: ['撬警', '水浸', '高温', '液位', '燃爆']
			},
			series: [{
				name: '告警类型',
				left: 1,
				type: 'pie',
				radius: ['50%', '70%'],
				center: ["60%", "50%"],
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '13',
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data:eventSeries
				// data: [{
				// 		value: 335,
				// 		name: '撬警'
				// 	},
				// 	{
				// 		value: 310,
				// 		name: '水浸'
				// 	},
				// 	{
				// 		value: 234,
				// 		name: '高温'
				// 	},
				// 	{
				// 		value: 135,
				// 		name: '液位'
				// 	},
				// 	{
				// 		value: 1548,
				// 		name: '燃爆'
				// 	}
				// ]
			}]
		});
		
	},
	confirm2(){
		this.$refs.iosDialog2.style.display = 'none';
	}
	
  }
}
</script>
<style scoped >
 @import "../common/css/layui.css";
 /* .home{
	 margin: 20px;
 } */
.weui-dialog{
  width: 70%;
}
.weui-dialog__title{
  font-size: 28px;
}
.weui-dialog__bd{
  font-size: 33px;
  margin-bottom: 30PX;
}
.weui-dialog__ft {
  line-height: 90px;
}
.weui-dialog__hd{
    padding-bottom: 30px;
}
.default{
  font-size: 30px;
}
.primary{
   font-size: 30px;
}

  .iconfont {
	font-size: 30px;
	color: #ccc;
    }
	.head-box{
		border-radius: 10px; 
		background-color: white; 
		height: 200px;
		margin: 20px;
	}
	.verticalHorizonCenter{
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		margin: 40px 0;
	}
	.cout>div{
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
			height: 140px;
	}
	.cout h3{
		text-align: center;
		font-weight: bold;
		font-size:32px;
		margin-bottom: 15px;
		color: #000000;
	}
	.cout p{
		font-size:22px;
	}
	
	.cout:nth-of-type(3) h3{
		color: #FF6347 	
	}

	.headImg{
		height: 100px; 
		width: 100px;
	}
	.head-span{
		text-align: center;
		font-size: 28px;
		margin-top: 2px;
	}
	.head-name{
		font-size: 30px; 
		color: #000;
	}


</style>
