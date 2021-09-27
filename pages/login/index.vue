<template>
	<!-- 登陆 -->
	<view class="wrap">
		<view class="logo">
			<image src="../../static/image/login/logo.png" ></image>
		</view>
		<button open-type="getPhoneNumber" class="button" @getphonenumber="getPhoneNumber">微信一键登录</button>
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
	}
};
</script>

<style lang="scss">
.wrap {
	width: 100%;
	opacity: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 120rpx;
	.logo{
		width: 200rpx;
		height: 270rpx;
		background: url(../../static/image/login/logo_back.png);
		image {
			width: 100%;
			height: 100%;
		}
	}
	.button {
		width: 480rpx;
		// height: 80rpx;
		background: #007AC3;
		box-shadow: 0px 0px 14px 0px rgba(132, 131, 169, 0.12);
		border-radius: 12rpx;
		color: #fff;
		margin-top: 246rpx;
		font-size: 32rpx;
	}
}
</style>
