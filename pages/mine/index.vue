<template>
	<view class="mine">
		<!-- 名片 -->
		<view class="business_card">
			<view class="mine_card">
				<image src="../../static/image/personalCenter/card_back.png" class="background" mode=""></image>
				<view class="content">
					<u-avatar :src="userInfo.avatar || wxUserInfo.avatarUrl" size="120"></u-avatar>
					<view class="name">{{ userInfo.realName }}</view>
					<view class="intro">
						{{ userInfo.name }}
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
			wxUserInfo:uni.getStorageSync('wxUserInfo'),
			personData: {}
		};
	},
	computed: {
		...mapGetters(['userInfo', 'tenantId', 'tenantList'])
	},
	watch: {
		tenantId() {
			this.GetUserDetail();
			this.$refs['performance'].Refresh();
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.$refs['performance'].Refresh();
		this.GetUserDetail()
		setTimeout(function() {
			uni.showToast({
				title: '页面已刷新',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, 1000);
	},
	created() {
	},
	methods: {
		...mapActions(['Login','GetUserDetail']),
		// 展示租户列表
		transfer() {
			this.$refs['tenant'].show = true;
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
				}
				.company {
					color: #ffffff;
					height: 44rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
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
			}
		}
	}
	.Kanban {
		margin-top: -80rpx;
	}
}
</style>
