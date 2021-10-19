<template>
	<view class="container">
		<image class="bg-content" src="../../static/images/face/20190829-bg.png"></image>
		<view class="operation-box">
			<view class="operation-img">
			  <view class="cropper-content">
			    <image class="frame-image" :src="imagesArr[imgIndex].url"></image>
			    <view class="user-avatarurl">
			      <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
			    </view>
			  </view>
			</view>
			<view class="scroll-view_H">
			    <view class="item-img" v-for="(item,index) in imagesArr" @click="imgIndex=index" :key="index">
					<image :src="item.url" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="operation-btns" @click="savePic" v-if="userInfo.avatarUrl">
		  <image src="../../static/images/face/btn2.png" mode="widthFix"></image>
		</view>
		<view class="operation-btns get-userinfo" v-if="!userInfo.avatarUrl" @click="getUserInfo">
			<image  src="../../static/images/face/btn3.png" mode="widthFix"></image>
		</view>
		<view class="result-box" v-if="saveBox">
		  <view class="result-bg" @click="hideResultBox"></view>  
		  <view @click="saveToAlbum">
		    <view class="result-cont">
		      <image :src="shareImage"></image>
		    </view>
		    <view class="btn-savepic">保存图片到相册</view>     
		  </view>      
		</view>
		<canvas canvas-id="shareCanvas" style="width:1600px;height:1600px;position: fixed;top: -20000px;left: -20000px;"></canvas>
		<button open-type="share" class="share-btn">分享给好友</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				imagesArr:[],
				imgIndex:0,
				saveBox:false,
				shareImage:""
			}
		},
		onLoad() {
			this.getImgList();
			this.getUserInfo();
		},
		onShareAppMessage() {
			return {
				title: "我要换新颜！",
				path: 'pages/changeFace/changeFace'
			}
		},
		methods: {
			getImgList(){
				this.$api.get_imglist({
					name:"get_imglist"
				}).then((res)=>{
					console.log(res);
					if(res.code==200){
						this.imagesArr = res.data;
					}
				})
			},
			getUserInfo(){
			    uni.getUserProfile({
			        desc:'Wexin',     // 这个参数是必须的
			        success:res=>{
			            console.log(res)
						const {userInfo} = res;
						userInfo.avatarUrl = this.headimgHD(userInfo.avatarUrl)
						this.userInfo = userInfo;
			        },
			        fail:err=>{
			            console.log(err)
			        }
			    })
			},
			savePic(){
			  var userImg = this.userInfo.avatarUrl;
			  var topImg=this.imagesArr[this.imgIndex].url;
			  this.drawSharePic(userImg,topImg);
			  console.log(userImg)
			  console.log(topImg);
			},
			hideResultBox(){
			  this.saveBox=false;
			},
			drawSharePic(qrCodePath,url) {
			  uni.showLoading({
			    title: '正在生成图片...',
			    mask: true,
			  });
			  //y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
			  let yOffset = 20;
			  const multiple = 4;
			
			  const canvasCtx = uni.createCanvasContext('shareCanvas');
			  //绘制背景
			  canvasCtx.setFillStyle('white');
			  canvasCtx.fillRect(0, 0, 400 * multiple, 400 * multiple);
			  //绘制头像图片
			  // canvasCtx.drawImage(qrCodePath, 120, 90, 150, 150);
			  uni.getImageInfo({
			    src: qrCodePath,
			    success: function (res) {
			      canvasCtx.drawImage(res.path, 1 * multiple, 1 * multiple, 398 * multiple, 398 * multiple);
			      canvasCtx.drawImage(url, 0, 0, 400 * multiple, 400 * multiple);
			      canvasCtx.draw();
			    }
			  })
			  // canvasCtx.draw();
			  //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
			  setTimeout(()=> {
			    uni.canvasToTempFilePath({
			      x: 0,
			      y: 0,
			      width: 400 * multiple,
			      height: 400 * multiple,
			      destWidth: 400 * multiple,
			      destHeight: 400 * multiple,
			      canvasId: 'shareCanvas',
			      success: (res)=> {
					this.shareImage=res.tempFilePath;
					this.qrCode=true;
			        uni.hideLoading();
					this.saveBox=true;
			      },
			      fail: (res)=> {
			        console.log(res)
			        uni.hideLoading();
			      }
			    })
			  }, 2000);
			
			},
			saveToAlbum() {
			  uni.saveImageToPhotosAlbum({
			    filePath: this.shareImage,
			    success:(data)=> {
			      uni.showToast({
			        title: '图片保存成功',
			        icon: 'success',
			        duration: 2000
			      })
			      this.hideResultBox();
			    },
			    fail:(err)=>{
			      if (err.errMsg) {//重新授权弹框确认
			        uni.showModal({
			          title: '提示',
			          content: '您好,请先授权，在保存此图片。',
			          showCancel: false,
			          success(res) {
			            if (res.confirm) {//重新授权弹框用户点击了确定
			              uni.openSetting({//进入小程序授权设置页面
			                success(settingdata) {
			                  console.log(settingdata)
			                  if (settingdata.authSetting['scope.writePhotosAlbum']) {//用户打开了保存图片授权开关
			                    uni.saveImageToPhotosAlbum({
			                      filePath: benUrl,
			                      success: (data)=> {
			                        uni.showToast({
			                          title: '保存成功',
			                          icon: 'success',
			                          duration: 2000
			                        })
			                        this.hideResultBox();
			                      },
			                    })
			                  } else {//用户未打开保存图片到相册的授权开关
			                    uni.showModal({
			                      title: '温馨提示',
			                      content: '授权失败，请稍后重新获取',
			                      showCancel: false,
			                    })
			                  }
			                }
			              })
			            }
			          }
			        })
			      }
			    }
			  })
			},
			headimgHD:function(imageUrl){
				console.log('原来的头像', imageUrl);
				imageUrl = imageUrl.split('/');        //把头像的路径切成数组
				//把大小数值为 46 || 64 || 96 || 132 的转换为0
				if(imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
				  imageUrl[imageUrl.length - 1] = 0;
				}
			
				imageUrl = imageUrl.join('/');   //重新拼接为字符串
			
				console.log('高清的头像', imageUrl);
			
				return imageUrl;
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view_H{
		width: 90%;
		display: flex;
		flex-wrap: nowrap;
		margin: 80rpx auto;
		overflow-x: scroll;
		.item-img{
			width: 120rpx;
			min-width: 120rpx;
			height: 120rpx;
			border: 6rpx solid #fbe6b5;
			border-radius: 30rpx;
			overflow: hidden;
			background: rgba(0,0,0,.6);			
			margin-right: 50rpx;
			// box-sizing: border-box;
			image{
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
	image{
	  width: 100%;
	  height: 100%;
	}
	.bg-content{
	  width: 100vw;
	  height: 100vh;
	  position: fixed;
	  top: 0;
	  left: 0;
	  z-index: -1;
	}
	.operation-box{
	  width: 100%;
	  position: relative;
	  margin-top: 15vh;
	  z-index: 2;
	  text-align: center;
	}
	.operation-box .operation-img{
	  width: 320rpx;
	  height: 320rpx;
	  margin: 0 auto;
	  background: #fbe6b5;
	  border: 17rpx solid #fbe6b5;
	  border-radius: 30rpx;
	  font-size: 0;
	  overflow: hidden;
	}
	.cropper-content{
	  width: 100%;
	  height: 100%;
	  position: relative;
	  border-radius: 30rpx;
	  overflow: hidden;
	}
	.cropper-content .frame-image{
	  width: 100%;
	  height: 100%;
	  position: relative;
	  z-index: 3;
	  /* background: #aaa; */
	}
	.cropper-content .user-avatarurl{
	  width: 99%;
	  height: 99%;
	  position: absolute;
	  top: .1%;
	  left: .1%;
	  background: #aaa;
	  border-radius: 30rpx;
	  overflow: hidden;
	}
	.operation-btns{
	  width: 58vw;
	  /* height: 30vh; */
	  position: relative;
	  z-index: 2;
	  margin: 50rpx auto 0;
	}
	.result-box{
	  width: 100%;
	  height: 100%;
	  /* background: rgba(0, 0, 0, .4); */
	  position: fixed; 
	  top: 0;
	  left: 0;
	  z-index: 3; 
	}
	.result-bg{
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, .4);
	  position: fixed;
	  top: 0;
	  left: 0;
	  z-index: 4; 
	}
	.result-cont{
	  width: 500rpx;
	  height: 500rpx;
	  margin: 0 auto;
	  background: #fff;
	  position: relative;
	  z-index: 5;
	  margin-top: 25vh;
	  border-top-left-radius: 30rpx;
	  border-top-right-radius: 30rpx;
	}
	.btn-savepic{
	  width: 500rpx;
	  height: 100rpx;
	  margin: 0 auto;
	  line-height: 100rpx;
	  background: #fff;
	  text-align: center;
	  z-index: 7;
	  position: relative;
	  top: -7rpx;
	  /* border-top: 1px #aaa dashed ; */
	  background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
	  background-size: 8px 1px;
	  background-repeat: repeat-x;
	  border-bottom-left-radius: 30rpx;
	  border-bottom-right-radius: 30rpx;
	  font-size: 35rpx;
	}
	.result-cont image{
	  width: 400rpx;
	  height: 400rpx;
	  margin-top:50rpx; 
	  margin-left: 50rpx;
	}
	.share-btn{
		width: 80%;
		height: 100rpx;
		position: fixed;
		bottom: 30rpx;
		left: 10%;
		border-radius: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		animation: breathe 1.1s infinite;
		background: #1aad19;
	}
	button{
		border: none;
	}
</style>
