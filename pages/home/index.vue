<template>
	<view>
		<nav-bar :navList="navList" @change="changeTab" :isSearch="true" :isLine="true" :isAvatar="true"></nav-bar>
		<!-- 首页业绩看板 -->
		<view class="swiper_wrap">
			<swiper class="swiper" @change="change">
				<swiper-item v-for="item in performanceList" :key="item">
					<view class="swiper-item"
					style="
					background: url(../../static/image/home/performance.png);
					background-size: 100% 100%;"
					>
						<!-- 标题 -->
						<view class="header">
							<view class="title">个人业绩看板</view>
							<view class="date">今天</view>
						</view>
						<!-- 内容 -->
						<view class="content">
							<view class="con_item">
								<view class="title add_bg">新增</view>
								<view class="item_block" v-for="(item, index) in content" :key="index">
									<view class="item_block_label">{{ item.label }}</view>
									<view class="item_block_desc">{{ item.desc }}</view>
								</view>
							</view>
							<view class="con_item">
								<view class="title genjin_bg">跟进</view>
								<view class="item_block" v-for="(item, index) in content" :key="index">
									<view class="item_block_label">{{ item.label }}</view>
									<view class="item_block_desc">{{ item.desc }}</view>
								</view>
							</view>
							<view class="con_item">
								<view class="title deal">成交</view>
								<view class="item_block" v-for="(item, index) in content" :key="index">
									<view class="item_block_label">{{ item.label }}</view>
									<view class="item_block_desc">{{ item.desc }}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="dot"><view v-for="(item, index) in dots" :key="index" :class="['item', { dot_active: index === swiperActive }]"></view></view>
		</view>
		<view class="main">
			<view class="section">
				<u-sticky>
					<view class="screen section_content">
						<u-dropdown>
							<u-dropdown-item v-model="value1" title="排序方式" menu-icon="arrow-down-fill" :options="createTimeOptions"></u-dropdown-item>
							<u-dropdown-item v-model="value2" title="范围" :options="options2"></u-dropdown-item>
							<u-dropdown-item v-model="value1" title="创建时间" :options="createTimeOptions"></u-dropdown-item>
							<u-dropdown-item v-model="value2" title="状态" :options="options2"></u-dropdown-item>
						</u-dropdown>
					</view>
				</u-sticky>
				<!-- 列表 -->
				<view class="section_content" v-for="item in dataList" :key="item.id" @click="jumpTo(item.id)">
					<view class="left">
						<view class="title">{{ item.name }}</view>
						<view class="text_desc">{{ $dateFormat(item.createTime) }}</view>
						<view class="text_desc">{{ item.provinceName + '/' + item.cityName }}</view>
					</view>
					<view class="right" v-show="item.phone"><image src="@/static/image/home/phone.png" mode=""></image></view>
				</view>
				<!-- 加载完成 -->
				<view :class="['loading_wrap', { hidden: !isComplete }]">我是有底线的~~</view>
				<!-- 加载动画 -->
				<view :class="['loading_wrap', { hidden: isComplete }]"><u-loading :show="isLoading">正在加载……</u-loading></view>
			</view>
			<view class="footer"></view>
		</view>
	</view>
</template>

<script>
	// 客户相关接口导入
import { getCustomerPage } from '@/api/customer/customer.js';
// 线索相关接口导入
import { getCluePage,getCluePerformance } from '@/api/clue/clue.js';
export default {
	data() {
		return {
			// 0线索 1 客户
			dataType: 0,
			navList: [
				{
					cate_name: '线索'
				},
				{
					cate_name: '客户'
				}
			],
			queryInfo: {
				current: 1,
				size: 10
			},
			total:null,
			// 轮播数据
			swiperActive: 0,
			// 数据列表
			dataList: [],
			// 是否展示加载动画
			isLoading: false,
			dots: ['', '', ''],
			performanceList: ['1','2','3'],
			content: [
				{
					label: '98',
					desc: '线索'
				},
				{
					label: '98',
					desc: '线索'
				},
				{
					label: '98',
					desc: '线索'
				}
			],
			value1: '',
			value2: '',
			createTimeOptions: [
				{
					label: '默认排序',
					value: 1
				},
				{
					label: '距离优先',
					value: 2
				},
				{
					label: '价格优先',
					value: 3
				}
			],
			options2: [
				{
					label: '去冰',
					value: 1
				},
				{
					label: '加冰',
					value: 2
				}
			]
		};
	},
	computed:{
		// 数据是否加载完成
		isComplete(){
			return this.total === this.dataList.length && this.total!==0
		}
	},
	created() {
		this.initData();
	},
	async onReachBottom() {
		// 触底函数
		if (this.isComplete) return;
		this.queryInfo.current++;
		await this.initData();
	},
	methods: {
		changeTab(value) {
			this.dataType = value
			this.dataList = [];
			this.queryInfo.current = 1
			this.initData();
		},
		// 初始化数据
		initData() {
			this.isLoading = true;
			setTimeout(async _=>{
				this.dataType === 0 ? await this.getCluePage() : await this.getCustomerPage();
				this.isLoading = false;
			},500)
		},
		// 获取客户分页列表
		async getCustomerPage() {
			const { data: res } = await getCustomerPage(this.queryInfo);
			this.dataList = [...this.dataList, ...res.records];
			console.log(res.total)
			this.total = res.total
		},
		// 获取线索分页列表
		async getCluePage() {
			const { data: res } = await getCluePage(this.queryInfo);
			this.dataList = [...this.dataList, ...res.records];
			this.total = res.total
		},
		// 获取线索业绩看板
		async getCluePerformance(){
			const data = await getCluePerformance({
			timeType:1
		})
			console.log(data)
		},
		// 轮播图变化
		change(data) {
			const { current } = data.detail;
			this.swiperActive = current;
		},
		// 跳转对应的线索详情
		jumpTo(id) {
			uni.navigateTo({
				url: `/pages/clueDetail/index?id=${id}&type=${this.dataType}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
	.section {
		.section_content {
			width: 100%;
			background: #ffffff;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			margin-bottom: 30rpx;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				font-family: PingFangSC-Regular, PingFang SC;
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #333333;
					line-height: 32rpx;
				}
				.text_desc {
					font-size: 24rpx;
					font-weight: 400;
					color: #a4b0be;
					line-height: 26rpx;
					padding-top: 12rpx;
				}
			}
			.right {
				width: 48rpx;
				height: 48rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.screen {
			padding: 0;
		}
	}
}
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
