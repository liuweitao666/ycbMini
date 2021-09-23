<template>
	<!-- 提示登陆弹窗 -->
	<u-popup v-model="show" :mask-close-able="!isLogin" border-radius="14" width="600rpx" mode="center" :closeable="false">
		<view class="wrap">
			<!-- <image src="../../static/report.png" class="image" mode=""></image> -->
			<view class="text">
				{{title}}
			</view>
			<button open-type="getPhoneNumber" class="button" @getphonenumber="getPhoneNumber" v-if="isLogin">授权登陆</button>
			<button type="default" class="button" @click="handleClose" v-else>确认</button>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			title: '',
			isLogin: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				session_key: '',
				openid: '',
				unionid: ''
			};
		},
		methods: {
			// 登陆
			login(encryptedData, iv) {
				wx.login({
					success: (res) => {
						if (res.code) { //微信登录成功 已拿到code 
							this.$api.Login({
								code: res.code,
								secretId: 'edyrK0tFtKM'
							}).then((res) => {
								// 判断是否登陆成功
								if (res.code !== 0) {
									return uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									})
								}
								// 登陆成功后获取token值
								var openId = res.data.openId;
								var sessionKey = res.data.sessionKey;
								
								this.$api.analysisMobile({
									encryptedData,
									iv,
									openId,
									sessionKey
								}).then((res) => {
									if (res.code !== 0) {
										return wx.showToast({
											title: res.msg,
											icon: 'none',
											duration: 2000
										});
									}
									uni.setStorage({
										key: 'token',
										data: res.data.token,
										success: ()=>{
											console.log('success');
											this.$store.commit('setToken',res.data.token)
										}
									});
									wx.showToast({
										title: '授权成功',
										icon: 'none',
										duration: 2000
									});
									this.show = false
									uni.setStorage({
										key: 'userInfo',
										data: res.data,
										success: ()=>{
											console.log('success');
											this.$store.commit('setUserinfo',res.data)
										}
									});
								})
							}).catch(err => {
								uni.showToast({
									title: '登陆失败，请稍后再试！',
									icon: 'none',
									duration: 2000,
								})
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			handleClose() {
				this.show = false
			},
			getPhoneNumber(e) {
				wx.showLoading({
					title: '授权中',
				});
				let iv = e.detail.iv;
				let encryptedData = e.detail.encryptedData;
				this.login(encryptedData, iv)
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 600rpx;
		height: 734rpx;
		opacity: 1;
		background: #ffffff;
		border-radius: 14rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 25rpx;

		.image {
			width: 410rpx;
			height: 410rpx;
			opacity: 1;
		}

		.text {
			width: 480rpx;
			height: 93rpx;
			opacity: 1;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: center;
			color: #333333;
			line-height: 48rpx;
		}

		.button {
			width: 300rpx;
			height: 72rpx;
			line-height: 72rpx;
			opacity: 1;
			background: #dbb985;
			color: #FFFFFF;
			border-radius: 36rpx;
			margin-top: 50rpx;
		}
	}
</style>
