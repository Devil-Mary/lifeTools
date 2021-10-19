<template>
	<view class="main-wrapper">
		<view class="list-wrapper" v-for="(item,index) in list" :key="index" @click="go(item)">
			<view class="title">
				<image :src="item.logo" mode="widthFix"></image>
				{{item.title}}
			</view>
			<image :src="item.image" mode="widthFix"></image>
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
				this.$api.get_fuli({
					name:"get_fuli"
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
		}
	}
</script>

<style lang="scss">
	page{
		background: #F8F8F8;
	}
	.main-wrapper{		
		border-radius: 20rpx 20rpx 0 0;
		padding: 5vw 5vw 180rpx;
		min-height: 70vh;
	}
	.list-wrapper{
		// height: 220rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 50rpx;
		overflow: hidden;
		padding: 20rpx;
		.title{
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			align-items: center;
			image{
				width: 50rpx;
				height: auto;
				border-radius: 50%;
			}
		}
		image{
			width: 100%;
			border-radius: 20rpx;
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
	@keyframes breathe{
	  0%{ transform: scale(.99); }
	  50%{ transform: scale(1.03); }
	  100%{ transform: scale(.99); }
	}
</style>
