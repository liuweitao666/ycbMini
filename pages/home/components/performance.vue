<template>
	<!-- 首页业绩看板 -->
	<view class="swiper_wrap">
		<swiper class="swiper" @change="change">
			<swiper-item v-for="item in performanceList" :key="item">
				<view
					class="swiper-item"
					style="
				background: url(/static/image/home/performance.png);
				background-size: 100% 100%;"
				>
					<!-- 标题 -->
					<view class="header">
						<view class="title">个人业绩看板</view>
						<view class="date">{{ title }}</view>
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
								<view class="item_block_label">{{ performance.followManNum||0 + '/' + performance.followFrequency||0 }}</view>
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
			</swiper-item>
		</swiper>
		<view class="dot"><view v-for="(item, index) in dots" :key="index" :class="['item', { dot_active: index === swiperActive }]"></view></view>
	</view>
</template>

<script>
// 线索相关接口导入
import { getCluePerformance } from '@/api/clue/clue.js';
export default {
	data() {
		return {
			dots: ['', '', ''],
			performanceList: ['1', '2', '3'],
			// 当前看板
			performance: null,
			// 轮播数据
			swiperActive: 0,
			// title
			title: '今天'
		};
	},
	created() {
		// 获取业绩看板
		this.getCluePerformance(1);
	},
	methods: {
		// 获取线索业绩看板
		async getCluePerformance(timeType) {
			const { data: performance } = await getCluePerformance({
				timeType
			});
			this.performance = performance;
		},
		// 轮播图变化
		change(data) {
			console.log(data)
			let { current } = data.detail;
			this.swiperActive = current;
			const timeType = current + 1;
			this.getCluePerformance(timeType);
			switch (timeType) {
				case 1:
					return this.title = '今天';
				case 2:
					return this.title = '本周';
				case 3:
					return this.title = '本月';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper {
	height: 498rpx;
	padding-right: 30rpx;
	margin-top: 30rpx;
	.swiper-item {
		height: 100%;
		margin-left: 30rpx;
		box-shadow: 0px 0px 10px 0px rgba(104, 103, 139, 0.08);
		border-radius: 16rpx;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 2px solid rgba($color: #ededed, $alpha: 0.2);
			.title {
				width: 196rpx;
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 44rpx;
			}
			.date {
				width: 106rpx;
				height: 40rpx;
				line-height: 40rpx;
				background: #fc961e;
				border-radius: 30rpx;
				color: #fff;
				font-size: 24rpx;
				text-align: center;
			}
		}
		.content {
			display: flex;
			.con_item {
				width: 33.33%;
				color: #ffffff;
				border-right: 1px dashed #2b77cb;
				text-align: center;
				&:last-child {
					border-right: none;
				}
				.title {
					width: 132rpx;
					height: 44rpx;
					margin: 20rpx auto 0;
					border-radius: 8rpx;
				}
				.add_bg {
					background: #54c3f1;
				}
				.genjin_bg {
					background: #4ce1a7;
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
					margin-top: 20rpx;
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
