<template>
	<view class="mine">
		<!-- 名片 -->
		<view class="business_card">
			<view class="mine_card">
				<image src="../../static/image/personalCenter/card_back.png" class="background" mode=""></image>
				<view class="content">
					<u-avatar @click="jumpTo" :src="userInfo.avatar || wxUserInfo.avatarUrl" size="120"></u-avatar>
					<view class="name">{{ userInfo.realName }}</view>
					<view class="intro">
						{{ userInfo.postName ||'普通员工' }}
						<br />
					</view>
					<view class="company" v-if="tenantList.length > 1">
						<text>{{ userInfo.tenantName }}</text>
						<view class="switch" type="default" @click="transfer">
							<image src="../../static/image/mine/switch.png" mode=""></image>
							切换组织
						</view>
					</view>
					<u-icon name="zhuanfa" class="zhuanfa" size="50"></u-icon>
					<button class="zhuanfa btn-share" open-type="share"></button>
				</view>
			</view>
		</view>
		<view class="Kanban"><performance ref="performance" /></view>
		<!-- 组合列表 -->
		<tenant-popup ref="tenant" @selectTenant="selectTenant" />
		<!-- 提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import performance from './components/performance.vue';
import tenantPopup from '@/components/tenantPopup/index.vue';
import { getUserInfo, getTenantInfo } from '@/api/personalCenter/index.js';
import { mapGetters, mapActions } from 'vuex';
export default {
	components: {
		performance,
		tenantPopup
	},
	data() {
		return {
			wxUserInfo: uni.getStorageSync('wxUserInfo'),
		};
	},
	computed: {
		...mapGetters(['userInfo', 'tenantId', 'tenantList'])
	},
	watch: {
		tenantId() {
			this.$refs['performance'].Refresh();
		}
	},
	onShareAppMessage: function(res) {
		// if (res.from === 'button') {
		// 	// 来自页面内转发按钮
		// 	console.log(res)
		// 	return
		// }
		return {
			title: `易创宝-${this.userInfo.name}的名片`,
			path: `/pages/personalCenter/index?userId=${encodeURIComponent(this.userInfo.id)}&tenantId=${encodeURIComponent(this.userInfo.tenantId)}`
			// imageUrl: 'https://img0.baidu.com/it/u=3491437104,2750624836&fm=26&fmt=auto'
		};
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.$refs['performance'].Refresh();
		this.GetUserDetail(this.userInfo.id);
		setTimeout(function() {
			uni.showToast({
				title: '页面已刷新',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, 1000);
	},
	created() {},
	methods: {
		...mapActions(['Login', 'GetUserDetail']),
		// 展示租户列表
		transfer() {
			this.$refs['tenant'].show = true;
		},
		jumpTo() {
			const token = uni.getStorageSync('token');
			if (!token) {
				return uni.navigateTo({
					url: '/pages/login/index'
				});
			}
			uni.navigateTo({
				url: '/pages/personalCenter/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 26rpx;
}
.mine {
	background-color: #ffffff;
	min-height: 100vh;
	.business_card {
		padding: 48rpx 30rpx 128rpx;
		background-color: #292b4d;
		border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
		.mine_card {
			padding: 44rpx 48rpx;
			background-color: #ccc;
			border-radius: 26rpx;
			position: relative;
			.content {
				position: relative;
				z-index: 9;
				.name {
					font-size: 54rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #9ee8ff;
					line-height: 74rpx;
				}
				.intro {
					color: #ffffff;
					line-height: 46rpx;
					font-size: 24rpx;
					height: 44rpx;
					line-height: 44rpx;
					padding-top: 10rpx;
				}
				.company {
					color: #ffffff;
					height: 44rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					padding-top: 28rpx;
					justify-content: space-between;
					.switch {
						background-color: #7065a5;
						color: #ffffff;
						border: 1px solid #a299c8;
						border-radius: 60rpx;
						padding: 6rpx 18rpx;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						margin-left: 16rpx;
						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
				.zhuanfa {
					position: absolute;
					right: 0rpx;
					top: 0rpx;
					color: #ffffff;
				}
				.btn-share {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
	.Kanban {
		margin-top: -80rpx;
	}
}
</style>
