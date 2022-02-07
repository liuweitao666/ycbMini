<template>
	<!-- 登陆 -->
	<view class="wrap">
		<view class="back_logo"><image src="../../static/image/login/logo_back.png" mode=""></image></view>
		<view class="logo"><image src="../../static/image/login/logo.png"></image></view>
		<button open-type="getPhoneNumber" class="button" @getphonenumber="getPhoneNumber">微信一键登录</button>
		<tenant-popup ref="tenant"  @selectTenant="selectTenant" :isLogin="true" />
		<!-- toast提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { checkCode } from '@/api/login/index.js';
import { mapActions } from 'vuex';
import tenantPopup from "@/components/tenantPopup/index.vue"
export default {
	components:{
		tenantPopup
	},
	data() {
		return {
			show: false,
			code: '',
			session_key: '',
			openid: '',
			unionid: '',
			loginParams: null,
			// 当前选中用户
			selected: 0
		};
	},

	created() {
		this.login();
	},
	methods: {
		...mapActions(['GetUserInfo', 'Login']),
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
			// 判断是否获取成功
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				this.loginParams = {
					code: this.code,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				};
				this.checkCode(this.loginParams);
			} else {
				console.log(e, '获取手机号失败');
			}
		},
		// 校准code
		checkCode(loginParams) {
			const _this = this;
			const code = loginParams.code;
			checkCode({
				app: uni.getStorageSync('appId'),
				code
			})
				.then(async res => {
					try{
						// 获取当前用户组
						const { data: result } = await this.GetUserInfo(loginParams);
						if (result.length === 0)
							return this.$refs.uToast.show({
								title: '您还未注册，请联系管理员！',
								type: 'warning'
							});
						if (result.length > 1) {
							this.userList = result
							return (this.$refs['tenant'].show = true)
						};
						this.postLogin({
							code,
							...result[0]
						});
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
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
		// 选择用户
		selectTenant(tenantInfo) {
			this.postLogin({
				code:this.code,
				...tenantInfo
			});
		},
		// 用户登录
		postLogin(loginParams) {
			const _this = this;
			uni.showLoading({
				title: '正在登录...'
			});
			this.Login(loginParams)
				.then(res => {
					if (res.code) {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: '登录成功',
							type: 'success'
						});
						setTimeout(_ => {
							uni.navigateBack({
								delta: 1,
							});
						}, 500);
					}
				})
				.catch(err => {
					console.log(err);
					this.$refs.uToast.show({
						title: '登录失败，请重试!',
						type: 'error'
					});
					// 重新获取code
					this.login();
					uni.hideLoading();
				});
		},
		handleClose() {
			this.show = false;
		}
	}
};
</script>

<style lang="scss" scoped>
image {
	width: 100%;
	height: 100%;
}
.wrap {
	width: 100%;
	opacity: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 120rpx;
	position: relative;
	.back_logo {
		width: 400rpx;
		height: 374rpx;
		position: absolute;
		top: 8rpx;
		left: 0;
	}
	.logo {
		width: 200rpx;
		height: 270rpx;
	}
	.button {
		width: 480rpx;
		// height: 80rpx;
		background: #007ac3;
		box-shadow: 0px 0px 14px 0px rgba(132, 131, 169, 0.12);
		border-radius: 12rpx;
		color: #fff;
		margin-top: 246rpx;
		font-size: 32rpx;
	}
}
</style>
