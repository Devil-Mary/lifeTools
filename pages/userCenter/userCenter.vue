<template>
	<view>
		<text  @click="getUserInfo">请登录</text>
		<image :src="userInfo.avatarUrl" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		methods: {
			getUserInfo(){
			    uni.getUserProfile({
			        desc:'Wexin',     // 这个参数是必须的
			        success:res=>{
			            console.log(res)
						const {userInfo} = res;
						this.userInfo = userInfo;
			        },
			        fail:err=>{
			            console.log(err)
			        }
			    })
			}
		}
	}
</script>

<style>

</style>
