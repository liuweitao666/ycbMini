<template>
	<!-- 登陆 -->
	<view class="wrap">
		<view class="back_logo"><image src="../../static/image/login/logo_back.png" mode=""></image></view>
		<view class="logo"><image src="../../static/image/login/logo.png"></image></view>
		<button open-type="getPhoneNumber" class="button" @getphonenumber="getPhoneNumber">微信一键登录</button>
		<u-popup v-model="show" mode="center" border-radius="16" width="690rpx">
			<view class="pop_wrap">
				<view class="title">选择您的组织</view>
				<view class="desc">你在以下组织中担任成员</view>
				<view class="userList">
					<view :class="['user_item', 'align-items', { selected: selected === index }]" v-for="(item, index) in userList" :key="item.id" @click="selectUser(item)">
						<text>{{ item.name }}</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- toast提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { checkCode } from '@/api/login/index.js';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			show: false,
			code: '',
			session_key: '',
			openid: '',
			unionid: '',
			loginParams: null,
			userList: [
				{
					name: '金米财税',
					id: 1
				},
				{
					name: '深圳金信恒',
					id: 2
				},
				{
					name: '海边大楼',
					id: 3
				}
			],
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
				code
			})
				.then(async res => {
					// 获取当前用户组
					const { data: result } = await this.GetUserInfo(loginParams);
					if (result.length === 0)
						return this.$refs.uToast.show({
							title: '您还未注册，请联系管理员！',
							type: 'warning'
						});
					if (result.length > 1) return (this.show = true);
					this.postLogin({
						code,
						grant_type:'wxmini',
						username:result[0].account,
						...result[0]
					});
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
		selectUser(user) {
			this.postLogin({
				code,
				...user
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
						let pages = getCurrentPages()	
						// 获取上一页栈
						let prevPage = pages[ pages.length - 2 ]
						console.log(prevPage)
						// 触发上一页 upData 函数(并携带参数)
						prevPage.$vm.upData()
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
	.pop_wrap {
		padding: 30rpx;
		.title {
			font-size: 42rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 48rpx;
		}
		// 用户列表样式
		.userList {
			// height: 460rpx;
			.user_item {
				justify-content: space-between;
				background-color: #1683c5;
				color: #ffffff;
				padding: 40rpx;
				font-size: 28rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
			}
			.selected {
				border: 4rpx solid #ffffff;
			}
		}
	}
}
</style>
