<template>
	<view class="eat-wrapper">
		<view class="title">解决世纪难题 专治选择困难症</view>
		<view class="value">{{currantFood}}</view>
		<view class="start" @click="start" v-if="starttStatus">开始</view>
		<view class="end" @click="end" v-if="!starttStatus">停止</view>
		<view class="box" @click="setFoods">（自定义候选菜单）</view>
		
		<view class="bg-dialog" v-if="showBox" @click="showBox=false"></view>
		<view class="set-box" v-if="showBox">
			<form @submit="formSubmit">
				<textarea :value="foods" name="foods" maxlength="-1"/>
				<text class="box">想吃什么已空格分隔符输入，例如：重庆小面 米线 酸辣粉</text>
				<button class="set-btn" form-type="submit">确定</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foods:'馄饨 拉面 烩面 热干面 刀削面 油泼面 炸酱面 炒面 重庆小面 米线 酸辣粉 土豆粉 螺狮粉 凉皮儿 麻辣烫肉夹馍 羊肉汤 炒饭 盖浇饭 卤肉饭 烤肉饭 黄焖鸡米饭 驴肉火烧 川菜 麻辣香锅 火锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 蟹黄包 粽子 煎饼果子 生煎 炒年糕',
				currantFood:'今天吃什么？',
				interval:null,
				starttStatus:true,
				showBox:false
			}
		},
		onLoad() {
			uni.getStorage({
				key:"foods",
				success:(res)=>{					
					console.log(res);
					this.foods = res.data;
				}
			})
		},
		methods: {
			formSubmit(e){
				let value = e.detail.value.foods;
				if(value){
					uni.setStorage({
						key:"foods",
						data:value,
						success: () => {
							uni.showToast({
								icon:"none",
								title:"设置成功！"
							})
							this.showBox=false;
							this.foods = value;
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"未设置内容！"
					})
				}
				
			},
			setFoods(){
				this.showBox=true;
			},
			start(){
				this.randfood(this.foods);
				this.starttStatus=false;
			},
			end(){
				clearInterval(this.interval);
				this.starttStatus=true;
			},
			randfood(foods) {
				foods = foods.split(' ');
				let data = [];
				for (let i=0;i<foods.length;i++) {
					let t = foods[i];
					if (t !== "" && t != undefined) {
						data.push(t);
					}
				}
				if (data.length < 1) {
					uni.showToast({
						icon:'none',
						title:'请设置待选食物!'
					})
				} else if (data.length === 1) {
					uni.showToast({
						icon:'none',
						title:'就一个食物还选什么?'
					})
				}else{
					this.interval = setInterval(()=>{
						let resid = Math.floor(Math.random() * data.length);
						this.currantFood = data[resid];
					},100)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.eat-wrapper{
		width: 100vw;
		height: 100vh;
		background: #E9E9E9 url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-eeafae45-4b9a-4241-bb6b-d2426bade67a/712a57b7-33cb-4191-9349-39bc4e807024.jpg) 50% 0;
		text-align: center;
		animation: whattoeat-flow 16s linear infinite;
		padding: 20% 0 0;
		box-sizing: border-box;
		.title{
			font-size: 35rpx;
			// font-weight: 700;
		}
		.value{
			margin: 200rpx 0 120rpx;
			font-size: 46rpx;
			font-weight: 800;
		}
		.start{
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
			text-align: center;
			color: #fff;
			background: #FF824A;
			border-radius: 90rpx;
		}
		.end{
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0 auto;
			text-align: center;
			color: #fff;
			background: #343434;
			border-radius: 90rpx;
		}
		.box{
			width: 50%;
			margin: 20rpx auto;
			font-size: 24rpx;
		}
		.bg-dialog{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.7);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
		}
		.set-box{
			width: 90%;
			margin: 0 5%;
			background: #fff;
			text-align: left;
			padding: 20rpx;
			box-sizing: border-box;
			position: fixed;
			z-index: 11;
			top: 20%;
			border-radius: 10rpx;
			.set-btn{
				width: 70%;
				margin: 30rpx auto;
				border: none;
				background: #FF824A;
				color: #fff;
			}
			textarea{
				width: 100%;
				height: 400rpx;
				border: 1px #9e9e9e solid;
			}
		}
	}
	@keyframes whattoeat-flow {
	    0% {
	        background-position: 50% 0
	    }
	
	    100% {
	        background-position: 50% -250px
	    }
	}
</style>
