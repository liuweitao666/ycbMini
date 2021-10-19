<template>
	<view class="mine">
		<!-- 名片 -->
		<view class="business_card">
			<view class="mine_card">
				<image src="../../static/image/personalCenter/card_back.png" class="background" mode=""></image>
				<view class="content">
					<u-avatar src="" size="120"></u-avatar>
					<view class="name">
						{{personData.realName}}
					</view>
					<view class="intro">
						{{personData.name}}<br/>
					</view>
					<view class="company" v-if="tenantList.length>1">
						<text>{{personData.tenantName}}</text>
						<view class="switch" type="default" @click="transfer"> <image src="../../static/image/mine/switch.png" mode=""></image> 切换组织</view>
					</view>
					<u-icon name="zhuanfa" class="zhuanfa" size="50"></u-icon>
				</view>
			</view>
		</view>
		<view class="Kanban">
			<performance ref="performance" />
		</view>
		<!-- 组合列表 -->
		<tenant-popup ref="tenant" @selectTenant="selectTenant" />
		<!-- 提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import performance from './components/performance.vue';
	import tenantPopup from "@/components/tenantPopup/index.vue"
	import { getUserInfo,getTenantInfo } from "@/api/personalCenter/index.js"
	import { mapGetters,mapActions } from 'vuex';
	export default {
		components:{
			performance,
			tenantPopup
		},
		data() {
			return {
				personData:{}
			};
		},
		computed:{
			...mapGetters(['userInfo','tenantId','tenantList'])
		},
		watch:{
			tenantId(){
				this.getUserInfo()
				this.$refs['performance'].Refresh()
			}
		},
		onPullDownRefresh() {
			 this.$refs['performance'].Refresh()
			  setTimeout(function () {
			      uni.stopPullDownRefresh();
			  }, 1000);
		},
		created() {
			this.getUserInfo()
		},
		methods:{
			...mapActions(['Login']),
			// 获取用户信息
			async getUserInfo(){
				const {user_id} = this.userInfo
				const {data:res} = await getUserInfo(user_id)
				this.personData = res
				console.log(this.personData)
			},
			// 展示租户列表
			transfer(){
				this.$refs['tenant'].show = true
			},
			selectTenant(tenantInfo){
				return this.$refs.uToast.show({
								title: '暂未开放',
								type: 'warning'
							});
				wx.login({
					success: res => {
						const code = res.code;
						this.postLogin({
							code,
							...tenantInfo
						})
					}
				})
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
								title: '切换成功',
								type: 'success'
							});
						}
					})
					.catch(err => {
						console.log(err);
						this.$refs.uToast.show({
							title: '切换失败，请重试!',
							type: 'error'
						});
						// 重新获取code
						uni.hideLoading();
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 26rpx;
	}
	.mine{
		background-color: #FFFFFF;
		min-height: 100vh;
		.business_card{
			padding:48rpx 30rpx 128rpx;
			background-color: #292B4D;
			border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
			.mine_card{
				padding: 44rpx 48rpx;
				background-color: #ccc;
				border-radius: 26rpx;
				position: relative;
				.content{
					position: relative;
					z-index: 9;
					.name{
						font-size: 54rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #9EE8FF;
						line-height: 74rpx;
					}
					.intro{
						color: #FFFFFF;
						line-height: 46rpx;
						font-size: 24rpx;
						height: 44rpx;
						line-height: 44rpx;
					}
					.company{
						color: #FFFFFF;
						height: 44rpx;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						.switch{
							background-color: #7065A5;
							color: #FFFFFF;
							border: 1px solid #A299C8;
							border-radius: 60rpx;
							padding: 6rpx 18rpx;
							font-size: 24rpx;
							display: flex;
							align-items: center;
							margin-left: 16rpx;
							image{
								width: 24rpx;
								height: 24rpx;
							}
						}
					}
					.zhuanfa{
						position: absolute;
						right: 0rpx;
						top: 0rpx;
						color: #FFFFFF;
					}
				}
				
			}
			
		}
		.Kanban{
			margin-top: -80rpx;
		}
	}
</style>
