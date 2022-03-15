<template>
	<!-- 业绩看板 -->
	<view class="swiper_wrap">
		<!-- <swiper class="swiper" @change="change">
			<swiper-item v-for="item in performanceList" :key="item">
			</swiper-item>
		</swiper> -->
		<view class="swiper-item">
			<!-- 标题 -->
			<view class="header">
				<view :class="['tab_title', { active: Active === index + 1 }]" v-for="(item, index) in performanceList" @click="handleClick(index)" :key="item">{{ item }}</view>
			</view>
			<!-- 内容 -->
			<view class="content">
				<view class="con_item">
					<view class="title add_bg">新增</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.clueNum }}</view>
						<view class="item_block_desc">线索</view>
					</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.customerNum }}</view>
						<view class="item_block_desc">客户</view>
					</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.nicheNum }}</view>
						<view class="item_block_desc">商机</view>
					</view>
				</view>
				<view class="con_item">
					<view class="title genjin_bg">跟进</view>
					<view class="item_block">
						<view class="item_block_label">{{ `${performance.followManNum || 0}/${performance.followFrequency || 0}` }}</view>
						<view class="item_block_desc">人 / 次</view>
					</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.followDuration }}</view>
						<view class="item_block_desc">通时</view>
					</view>
				</view>
				<view class="con_item">
					<view class="title deal">成交</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.orderNum }}</view>
						<view class="item_block_desc">订单</view>
					</view>
					<view class="item_block">
						<view class="item_block_label">{{ performance.orderAmount }}</view>
						<view class="item_block_desc">金额</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="dot"><view v-for="(item, index) in dots" :key="index" :class="['item', { dot_active: index === swiperActive }]"></view></view> -->
		<view class="intro">
			个人业绩仅支持当月
			<br />
			更多业绩请查看后台报表
		</view>
	</view>
</template>

<script>
// 线索相关接口导入
import { getCluePerformance } from '@/api/clue/clue.js';
export default {
	data() {
		return {
			dots: ['', '', ''],
			performanceList: ['今天', '本周', '当月'],
			// 当前看板
			performance: null,
			performanceDay: null,
			performanceWeek: null,
			performanceMouth: null,
			// 轮播数据
			Active: 1,
			// title
			title: '今天'
		};
	},
	created() {
		// 获取业绩看板
		this.getCluePerformance(this.Active);
	},
	methods: {
		// 获取线索业绩看板
		getCluePerformance(timeType) {
			switch (timeType) {
				case 1:
					this.title = '今天';
					if (this.performanceDay) return (this.performance = this.performanceDay);
					this.setPerformance(1, 'performanceDay');
					break;
				case 2:
					this.title = '本周';
					if (this.performanceWeek) return (this.performance = this.performanceWeek);
					this.setPerformance(2, 'performanceWeek');
					break;
				case 3:
					this.title = '本月';
					if (this.performanceMouth) return (this.performance = this.performanceMouth);
					this.setPerformance(3, 'performanceMouth');
					break;
			}
		},
		// 设置看板数据
		async setPerformance(timeType, performanceKey) {
			console.log(timeType, performanceKey);
			const { data: performance } = await getCluePerformance({
				timeType
			});
			this[performanceKey] = performance;
			this.performance = this[performanceKey];
		},
		async Refresh() {
			const { data: performance } = await getCluePerformance({
				timeType: this.Active
			});
			this.performanceDay = null;
			this.performanceWeek = null;
			this.performanceMouth = null;
			this.performance = performance;
		},
		// 轮播图变化
		change(data) {
			console.log(data);
			let { current } = data.detail;
			this.swiperActive = current;
			const timeType = current + 1;
			this.getCluePerformance(timeType);
		},
		handleClick(index) {
			this.Active = ++index;
			this.getCluePerformance(this.Active);
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper_wrap {
	background-color: #ffffff;
	border-radius: 80rpx 80rpx 0 0;
	padding-top: 60rpx;
	.swiper-item {
		height: 100%;
		// box-shadow: 0px 0px 10px 0px rgba(104, 103, 139, 0.08);
		border-radius: 16rpx;
		.header {
			width: 574rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 44rpx;
			margin: 0 auto 50rpx;
			border-bottom: 2px solid rgba($color: #ececec, $alpha: 1);
			.tab_title {
				width: 120rpx;
				height: 60rpx;
				font-size: 28rpx;
				background: #edf1f7;
				border-radius: 34rpx;
				line-height: 60rpx;
				color: #000;
				text-align: center;
			}
			.active {
				background: #007ac3;
				color: #fff;
			}
		}
		.content {
			display: flex;
			.con_item {
				width: 33.33%;
				color: #000;
				border-right: 4rpx solid #edf1f7;
				text-align: center;
				&:last-child {
					border-right: none;
				}
				.title {
					width: 132rpx;
					height: 44rpx;
					margin: 20rpx auto 0;
					color: #ffffff;
					border-radius: 8rpx;
				}
				.add_bg {
					background: #fc961e;
				}
				.genjin_bg {
					background: #54c3f1;
				}
				.deal {
					background: #66cd4c;
				}
				padding: 0 30rpx;
				.item_block {
					width: 166rpx;
					height: 80rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 8rpx;
					border: 2rpx solid rgba(255, 255, 255, 0.2);
					text-align: center;
					margin: 20rpx auto;
					.item_block_label {
						font-size: 28rpx;
						font-family: Impact;
						line-height: 26rpx;
					}
					.item_block_desc {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						line-height: 32rpx;
						padding-top: 5rpx;
					}
				}
			}
		}
	}
	.intro {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #c0bbb6;
		line-height: 34rpx;
		text-align: center;
		padding: 34rpx 0;
	}
}
.dot {
	margin: 20rpx auto 0rpx;
	display: flex;
	justify-content: center;

	.item {
		width: 14rpx;
		height: 14rpx;
		background: #2d4ef5;
		opacity: 0.2;
		border-radius: 50%;
		margin: 0 8rpx;
	}
	.dot_active {
		opacity: 1;
	}
}
</style>
