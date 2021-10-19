<template>
	<view class="content">
		<view class="top-tip">添加至我的小程序，每天领红包更方便哦!</view>
		<view class="tip">
			<view>领取的红包仅限当日使用</view>
			<view>可每天来此领取</view>
		</view>
		<view class="main-wrapper">
			<view class="category-wrapper">
				<view class="item" @click="goTo(1)">
					<image src="../../static/images/what-to-eat.png" mode="widthFix"></image>
					<view>
						今天吃什么？
						<text>选择困难症首选</text>
					</view>
				</view>
				<view class="item" @click="goTo(2)">
					<image src="../../static/images/star.png" mode="widthFix"></image>
					<view>
						换新颜！
						<text>打发时间首选</text>
					</view>
				</view>
				<view class="item" @click="goTo(3)">
					<image src="../../static/images/heard.png" mode="widthFix"></image>
					<view>
						心语签！
						<text>每日一句正能量</text>
					</view>
				</view>				
				<!-- <view class="item" @click="goTo(5)">
					<image src="../../static/images/game-play.png" mode="widthFix"></image>
					<view>
						无聊来玩！
						<text>打发时间首选</text>
					</view>
				</view> -->
				<view class="item" @click="goTo(4)">
					<image src="../../static/images/more.png" mode="widthFix"></image>
					<view>
						帮您省钱！
						<text>更多羊毛</text>
					</view>
				</view>
			</view>
			<view class="list-wrapper" v-for="(item,index) in list" :key="index" @click="go(item)">
				<image :src="item.image" mode="widthFix"></image>
			</view>
		</view>
		<button open-type="share" class="share-btn">分享给好友一起薅羊毛</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getList();
		},
		onShareAppMessage() {
			return {
				title: "海量红包任你选！",
				path: 'pages/index/index',
				imageUrl:"../../static/images/share.png"
			}
		},
		methods: {
			getList(){
				this.$api.get_list({
					name:"get_list"
				}).then((res)=>{
					console.log(res);
					if(res.code==200){
						this.list = res.data;
					}
				})
			},
			go(i){
				wx.navigateToMiniProgram({
				  appId: i.appid,
				  path: i.url,
				  success(res) {
				    // 打开成功
				  }
				})
			},
			goTo(idx){
				switch (idx){
					case 1:
						uni.navigateTo({
							url:"../whatToEat/whatToEat"
						})
						break;
					case 2:
						uni.navigateTo({
							url:"../changeFace/changeFace"
						})
						break;
					case 3:
						uni.navigateTo({
							url:"../goodMorning/goodMorning"
						})
						break;
					case 4:
						// uni.showToast({
						// 	icon:"none",
						// 	title:"敬请期待！"
						// })
						uni.navigateTo({
							url:"../moreFuli/moreFuli"
						})
						break;
					case 5:
						uni.navigateTo({
							url:"../"
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
	  background: #F54C45;
	}
	.content{
		display: flex;
		flex-direction: column;
		flex: 1;
		.main-wrapper{
			background: #F8F8F8;
			border-radius: 20rpx 20rpx 0 0;
			padding: 5vw 5vw 180rpx;
			margin-top: 50rpx;
			min-height: 70vh;
			.category-wrapper{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: space-between;
				.item{
					width: 49%;
					min-height: 100rpx;
					display: flex;
					align-items: center;
					background: #fff;
					padding: 18rpx;
					margin-bottom: 30rpx;
					border-radius: 10rpx;
					box-sizing: border-box;
					text-align: center;
					image{
						width: 80rpx;
						// height: 60rpx;
						margin-right: 18rpx;
					}
					view{
						text-align: left;
						font-size: 29rpx;
						font-weight: 700;
						text{
							display: block;
							font-size: 24rpx;
							margin-top: 10rpx;
							font-weight: 400;
						}
					}
				}
			}
			.list-wrapper{
				height: 300rpx;
				background: #d6d5d5;
				border-radius: 20rpx;
				margin-bottom: 50rpx;
				overflow: hidden;
				image{
					width: 100%;
				}
			}
		}
		.share-btn{
			width: 80%;
			height: 100rpx;
			background: red;
			position: fixed;
			bottom: 30rpx;
			left: 10%;
			border-radius: 100rpx;
			text-align: center;
			line-height: 100rpx;
			color: #fff;
			animation: breathe 1.1s infinite;
			background: rgb(248,80,50);
			background: -moz-linear-gradient(-45deg,  rgba(248,80,50,1) 0%, rgba(241,111,92,1) 36%, rgba(241,111,92,1) 36%, rgba(246,41,12,1) 52%, rgba(240,47,23,1) 74%, rgba(231,56,39,1) 100%);
			background: -webkit-linear-gradient(-45deg,  rgba(248,80,50,1) 0%,rgba(241,111,92,1) 36%,rgba(241,111,92,1) 36%,rgba(246,41,12,1) 52%,rgba(240,47,23,1) 74%,rgba(231,56,39,1) 100%);
			background: linear-gradient(135deg,  rgba(248,80,50,1) 0%,rgba(241,111,92,1) 36%,rgba(241,111,92,1) 36%,rgba(246,41,12,1) 52%,rgba(240,47,23,1) 74%,rgba(231,56,39,1) 100%);
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f85032', endColorstr='#e73827',GradientType=1 );

		}
		
	}
	.top-tip{
	  width: 90%;
	  margin: 25rpx auto 0;
	  background: rgba(0,0,0, 1);
	  text-align: center;
	  font-size: 28rpx;
	  color: #fff;
	  border-radius: 100rpx;
	  padding: 10rpx 0;
	  position: relative;
	  z-index: 2;
	}
	.top-tip::before{
	  content: "";
	  width: 25rpx;
	  height: 25rpx;
	  background: rgba(0,0,0, 1);
	  position: absolute;
	  right: 14%;
	  top: -11rpx;
	  transform: rotate(45deg);
	  z-index: 1;	  
	}
	@keyframes breathe{
	  0%{ transform: scale(.99); }
	  50%{ transform: scale(1.03); }
	  100%{ transform: scale(.99); }
	}
	.tip{
		font-size: 32rpx;
		margin: 30rpx 0 10rpx;
		text-align: center;
		color: #fff;
		animation: breathe 1.1s infinite;
	}
</style>
