<template>
	<view>
		<view class="content-wrapper">
			<view class="time">
				<view>{{currentDateObj.time.date}}</view>
				<view class="right-txt">{{currentDateObj.time.cnweekday}}</view>
				<view>{{currentDateObj.time.lunarmonth+'/'+currentDateObj.time.lunarday+'/'+currentDateObj.time.lunaryear}}</view>
				<view class="right-txt">{{currentDateObj.time.info}}</view>
			</view>
			<image :src="currentDateObj.img.url" mode="widthFix"></image>
			<view class="text">
				{{currentDateObj.text}}
				<view class="right-txt">--- 优享生活集</view>
			</view>
		</view>
		<button open-type="share" class="share-btn">分享给好友</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentDateObj:{},
				y:"",
				m:"",
				d:""
			}
		},
		onLoad(){
			let date = new Date();
			this.y = date.getFullYear();
			this.m = date.getMonth()+1;
			this.d = date.getDate();
			this.init();
		},
		onShareAppMessage() {
			return {
				title: "[每日心语]悠享生活集给新的一天注入动力",
				path: 'pages/goodMorning/goodMorning'
			}
		},
		methods: {
			init(){
				uni.getStorage({
					key:"currentDateObj_"+this.y+'-'+this.m+'-'+this.d,
					success:(res)=>{
						this.currentDateObj = res.data
					},
					fail: (err) => {
						uni.clearStorage();
						this.getTime();
						
					}
				})
				
			},
			getTime(){				
				// let res = {"code":200,"msg":"success","newslist":[{"date":"2021-10-18","daycode":0,"weekday":1,"cnweekday":"星期一","lunaryear":"辛丑","lunarmonth":"九月","lunarday":"十三","info":"工作日","start":"","now":"","end":"","holiday":"","name":"","enname":"","isnotwork":0,"vacation":"","remark":"","wage":1,"tip":"","rest":""}]}
				uni.request({
				    url: 'https://api.tianapi.com/txapi/jiejiari/index?key=89b676abc8d3ea00040be8101ee9879e&date='+this.y+'-'+this.m+'-'+this.d, 
				    success: (res) => {
				        if(res.data.code == 200){
								this.currentDateObj.time=res.data.newslist[0]
								this.getMorning()
							}
				    },
					fail:()=>{
						
					}
				});
			},
			getMorning(){
				console.log("morning")
				this.$api.get_morningimg({
					name:"get_morningimg"
				}).then((res)=>{
					console.log(res);
					if(res.code==200){
						this.currentDateObj.img = res.data[this.selectFrom(0,res.data.length-1)];
						this.getData();
					}
				})
			},
			getData(){
				// let res = {"code":200,"msg":"success","newslist":[{"content":"只要你心存不甘，就还不到放弃的时候，所以请继续努力，不然永远都不知道结果，早安。"}]}
				uni.request({
				    url: 'https://api.tianapi.com/txapi/zaoan/index?key=89b676abc8d3ea00040be8101ee9879e', 
				    success: (res) => {
				        if(res.data.code == 200){
								this.currentDateObj.text = res.data.newslist[0].content
								uni.setStorage({
									key:"currentDateObj_"+this.y+'-'+this.m+'-'+this.d,
									data:this.currentDateObj,
								})
								this.$forceUpdate()
							}
				    },
					fail:()=>{
						
					}
				});
			},
			selectFrom(lowerValue,upperValue){
			    var choices=upperValue-lowerValue+1;
			    return Math.floor(Math.random()*choices+lowerValue);
			}
		}
	}
</script>

<style lang="scss">
	.content-wrapper{
		width: 90%;
		margin: 40rpx auto;
		// padding: 20rpx 0;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 1rpx 1rpx 30rpx #C8C7CC;
		box-sizing: border-box;
		overflow: hidden;
		font-size: 33rpx;
		.time{
			width: 90%;
			margin: 20rpx auto;
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		image{
			width: 100%;
			height: auto;
		}
		.text{
			width: 90%;
			margin: 20rpx auto;		
			view{
				margin-top: 50rpx;
			}
		}
		.right-txt{
			text-align: right;
			font-size: 26rpx;
		}
	}
	.share-btn{
		width: 80%;
		height: 100rpx;
		margin: 0 auto 40rpx;
		border-radius: 70rpx;
		background: #1aad19;
		color: #fff;
	}
</style>
