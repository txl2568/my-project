<template>
	<div class="container" v-show="showMask">
		<div class="mask" :style="{'opacity': maskVal}" @click="hide"></div>
		<div class="main" :style="{transform: `translateY(${transY}rpx)`,'transition-timing-function': speed,'height': height+'rpx'}" @transitionend="onTransitionend">
			<slot>
                <div style="width:98%">
                    <p >状态</p>
                    <div class="list">
                        <div class="btn bgColor" ref="bgColor" @click="setAll">全部</div>
                        <div class="btn" v-for="(item,i) in data.reportState" :key="i" @click="selectItem(item)"  :style="{'background':activeindex===item.code?'#1890ff':'','color':activeindex===item.code?'#fff':'#999'}">{{item.name}}</div>
                    </div>
                    <p >类型</p>
                    <div class="list">
                         <div class="btn bgColor"  ref="bgColor2" @click="setAll2">全部</div>
                         <div class="btn" v-for="(item,i) in data.maintenanceTypes" :key="i" @click="selectItem2(item)"  :style="{'background':activeindex2===item.code?'#1890ff':'','color':activeindex2===item.code?'#fff':'#999'}">{{item.name}}</div>
                    </div>
                    <div class="set-btn">
                         <div class="reset" @click="reset">重置</div>
                        <div class="ensure" @click="ensure">确定</div>
                    </div>
                </div>
            </slot>
		</div>
	</div>
</template>

<script>
	export default {
		/**
		 *  @ speed [String] {运动曲线}
		 *  @ height [Number] {弹框高度 单位：rpx}
		 *  @ maskVal [Number] {蒙层透明度}
		 */
		props:{
			speed:{
				type:String,
				default: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
			},
			height: {
				type:Number,
				default: 500
			},
			maskVal:{
				type: Number,
				default: 0.4
            },
            data:{
                type: Object,
                default: function () {
                    return {  }
                }
            }
            
		},
		data () {
			return {
				showMask: false,
                transY: this.height,
                trag:false,
                activeindex:'',
                activeindex2:''
                
			}
		},
		methods: {
			show () {
				this.showMask = true
				setTimeout(() => {
					this.transY = 0
				},17)
				
			},
			hide () {
                this.transY = 500
                this.showMask = false
			},
			onTransitionend () {
				if(!this.transY) return;
				this.showMask = false
            },
            selectItem(item){
                // this.trag = true;
                this.activeindex = item.code;
                this.$refs.bgColor.style.backgroundColor = '#fff';
                this.$refs.bgColor.style.color = '#999'

            },
            selectItem2(item){
                // this.trag = true;
                this.activeindex2 = item.code;
                this.$refs.bgColor2.style.backgroundColor = '#fff';
                this.$refs.bgColor2.style.color = '#999'

            },
            reset(){
                this.activeindex = '';
                this.activeindex2 = '';
            },
            ensure(){
                this.$emit('ensure',this.activeindex, this.activeindex2);
            },
            setAll(){
                if ( this.$refs.bgColor.style.backgroundColor = '#fff') {
                    this.$refs.bgColor.style.backgroundColor = '#1890ff';
                     this.activeindex = '';
                }
                 if ( this.$refs.bgColor.style.color = '#999') {
                    this.$refs.bgColor.style.color = '#fff'
                     this.activeindex = '';
                }
            },
            setAll2(){
                if ( this.$refs.bgColor2.style.backgroundColor = '#fff') {
                    this.$refs.bgColor2.style.backgroundColor = '#1890ff';
                     this.activeindex2 = '';
                }
                 if ( this.$refs.bgColor2.style.color = '#999') {
                    this.$refs.bgColor2.style.color = '#fff'
                     this.activeindex2 = '';
                }
            }
		}
	}
</script>

<style scoped lang="scss">
.mask {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgb(0,0,0);
}

.main {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
    height: 700px;
    // height: 58%;
    //  height: 55vh;
	background-color: #FFFFFF;
	border-radius: 20rpx 20rpx 0 0;
	transition: transform 0.4s;
    padding: 10px;
}
p{
    font-size: 30px;
    // border-bottom: 2px #e5e5e5 solid;
    margin-bottom: 10px;
    // width: 96%;
}
.list{
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    margin: 0  30px;
}
.btn{
    width: 180px;
    height: 60px;
    border-radius: 15px;
    color: #999;
    text-align: center;
    line-height: 60px;
    font-size: 28px;
    border: #e5e5e5 2px solid;
    margin: 0 40px 15px 0 ;
    // &.on{
    //     background-color: #1890ff;
    // }
}
.bgColor{
    background:#1890ff;
    color:#fff;
}
.set-btn{
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
}
.reset{
     width: 300px;
    height: 70px;
    border-radius: 15px;
    color: #999;
    background-color: #fff;
    text-align: center;
    line-height: 70px;
    font-size: 32px;
     border: #e5e5e5 2px solid;
}
.ensure{
    width: 300px;
    height: 70px;
    border-radius: 15px;
    color: #fff;
    background-color: #1890ff;
    text-align: center;
    line-height: 70px;
    font-size: 32px;
    border: #1890ff 2px solid;
}
</style>
