<template>
	<!-- 登陆 -->
	<view class="wrap">
		<button open-type="getPhoneNumber" class="button" @getphonenumber="getPhoneNumber">授权登陆</button>
	</view>
</template>

<script>
	import {
		checkCode,
	} from '@/api/login/index.js';
import { mapActions } from "vuex"
export default {
	data() {
		return {
			show: false,
			code: '',
			session_key: '',
			openid: '',
			unionid: ''
		};
	},
	created() {
		this.login();
	},
	methods: {
		...mapActions(['GetUserInfo','Login']),
		// 登陆
		login() {
			wx.login({
				success: res => {
					this.code = res.code;
				}
			});
		},
		// 获取用户手机号
		getPhoneNumber(e) {
			console.log(e);
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				const loginParams = {
					code: this.code,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				};
				console.log(e, '获取手机号成功');
				this.checkCode(loginParams);
			} else {
				console.log(e, '获取手机号失败');
			}
		},
		// 校准code
		checkCode(loginParams) {
			const _this = this;
			const code = loginParams.code;
			checkCode({
				code
			}).then(async (res)=>{
					const {data:result} = await this.GetUserInfo(loginParams)
					this.postLogin({
						code,
						...result[0]
					})
				})
				.catch(err => {
					wx.login({
						success: async res => {
							loginParams.code = res.code;
							_this.checkCode(loginParams);
							_this.code = res.code;
						}
					});
				});
		},
		userAgreement() {
			console.log('跳转用户协议');
			wx.navigateTo({
				// url: '/pages/order-check/index?addtype=1'
			});
		},
		postLogin(loginParams) {
			// console.log(loginParams)
			const _this = this;
			this.Login(loginParams).then(function(res) {
				console.log(res)
				const userInfo = JSON.stringify(res)
			}).catch(err=>{
				console.log(err)
			});
		},
		handleClose() {
			this.show = false;
		}
		// getPhoneNumber(e) {
		// 	wx.showLoading({
		// 		title: '授权中'
		// 	});
		// 	let iv = e.detail.iv;
		// 	let encryptedData = e.detail.encryptedData;
		// 	this.login(encryptedData, iv);
		// }
	}
};
</script>

<style lang="scss">
.wrap {
	width: 100%;
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
		color: #ffffff;
		border-radius: 36rpx;
		margin-top: 50rpx;
	}
}
</style>
