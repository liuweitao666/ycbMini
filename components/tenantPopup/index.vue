<template>
	<u-popup v-model="show" mode="center" border-radius="16" width="690rpx">
		<view class="pop_wrap">
			<view class="title">选择您的组织</view>
			<view class="desc">你在以下组织中担任成员</view>
			<view class="userList">
				<view :class="['user_item', 'align-items', { selected: item.tenantId === tenantId }]" v-for="(item, index) in tenantList" :key="index" @click="selectTenant(item)">
					<text>{{ item.tenantName }}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		</u-popup>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';
	import { checkCode } from '@/api/login/index.js';
	export default {
		name:"tenantPopup",
		props:{
			isLogin:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				show:false,
			};
		},
		computed:{
			...mapGetters(['tenantList','tenantId'])
		},
		created() {
			console.log(this.tenantList,this.tenantId)
		},
		methods:{
			...mapActions(['Login']),
			selectTenant(tenantInfo){
				console.log(this.isLogin)
				if(this.tenantId === tenantInfo.tenantId) return 
				uni.showLoading({
					title: '正在切换...'
				});
				if(this.isLogin) return this.$emit('selectTenant',tenantInfo)
				wx.login({
					success: res => {
						const code = res.code;
						checkCode({
							app: uni.getStorageSync('appId'),
							code
						}).then(res=>{
							this.postLogin({
								code,
								...tenantInfo
							})
						}).catch(err=>{
							console.log(err)
						})
					}
				});
			},
			// 用户登录
			postLogin(loginParams) {
				const _this = this;
				this.Login(loginParams)
					.then(res => {
						if (res.code) {
							uni.showToast({
								title: '切换成功',
								icon:'none'
							})
							setTimeout(()=>{
								this.show = false
							},500)
						}
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: '切换失败，请重试!',
							icon:'none'
						})
						// 重新获取code
					});
			},
		}
	}
</script>

<style lang="scss">
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
				border: 4rpx solid #1683c5;
				color: #ffffff;
				padding: 40rpx;
				font-size: 28rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
			}
			.selected {
				border: 4rpx solid #015ABC;
			}
		}
	}
</style>
