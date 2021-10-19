<template>
	<view>
		<view class="list-wrapper" v-for="(item,index) in list" :key="index" @click="go(item)">
			<image :src="item.image" mode="widthFix"></image>
		</view>
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
		}
	}
</script>

<style lang="scss">
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
</style>
