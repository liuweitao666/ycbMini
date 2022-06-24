<template>
	<view class="clue_wrap">
		<!--自定义导航 -->
		<!-- <nav-bar @change="changeNav" :title="dataType === '0' ? '线索详情' : '客户详情'" :isBack="true"></nav-bar> -->
		<!-- 吸顶导航栏 -->
		<view :class="['fixTabs', { showFixTabs: isFix }]" v-if="showFixTabs">
			<view :class="['isFix', 'custom_tabs', 'clue_tabs']">
				<view class="line"></view>
				<u-tabs
					name="cate_name"
					count="cate_count"
					:list="list"
					:height="100"
					inactive-color="#999"
					active-color="#333"
					:bar-style="tabStyle"
					bar-width="78"
					:is-scroll="false"
					:current="currentTab"
					@change="changeTab"
				></u-tabs>
			</view>
		</view>
		<view class="clue_header">
			<!-- 商标部分 -->
			<view class="trademark">
				<view class="trade_left">{{ dataType === '0' ? '线索' : '客户' }}</view>
				<view class="trade_right">
					<view class="trade_right_title">{{ detailData.name }}</view>
					<view class="card_desc" v-if="dataType === '0'">线索来源：{{ detailData.sourceName || '-' }}</view>
					<view class="card_desc" v-if="dataType === '0'">获取时间：{{ detailData.happenTime || '-' }}</view>
					<view class="card_desc" v-if="dataType === '1'">客户来源：{{ detailData.sourceName || '-' }}</view>
					<view class="card_desc" v-if="dataType === '1'">创建时间：{{ detailData.createTime || '-' }}</view>
				</view>
			</view>
			<!-- 联系方式 -->
			<Info :detailData="detailData" :dataType="dataType" />
			<!-- 沟通记录 -->
			<view class="work_record">
				<view class="item_record">
					<image src="/static/image/clueDetail/Filled.png" mode=""></image>
					<text>回收：{{ detailData.recycleTime || '不回收' }}</text>
				</view>
				<view class="item_record">
					<image src="/static/image/clueDetail/data.png" mode=""></image>
					<text>跟进：{{ detailData.followCount }}次</text>
				</view>
				<view class="item_record">
					<image src="/static/image/clueDetail/loop.png" mode=""></image>
					<text>流转：{{ detailData.transferCount }}次</text>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view :class="['custom_tabs', 'clue_tabs']" id="tabs_clue_detail">
			<view class="line"></view>
			<u-tabs
				name="cate_name"
				count="cate_count"
				:list="list"
				:height="100"
				inactive-color="#999"
				active-color="#333"
				:bar-style="tabStyle"
				bar-width="78"
				:is-scroll="false"
				:current="currentTab"
				@change="changeTab"
			></u-tabs>
		</view>
		<!-- 展示对应记录页面 -->
		<logs :data="data" :currentTab="currentTab" :total="total" />
		<!-- 加载完成 -->
		<view :class="['loading_wrap', { hidden: !isComplete }]">我是有底线的~~</view>
		<!-- 加载动画 -->
		<view :class="['loading_wrap', { hidden: isComplete }]"><u-loading :show="isLoading">正在加载……</u-loading></view>
		<!-- 加载数据loading 展示区域 -->
		<view class="spacing"></view>
		<!-- 底部 -->
		<log-footer>
			<u-button
				type="primary"
				:custom-style="{
					width: dataType === '0' ? '200rpx' : '420rpx',
					height: '84rpx',
					background: '#FC961E',
					'border-radius': '8px'
				}"
				@click="JumpTo(`/pages/generateCustomer/index?id=${clueId}`)"
				v-if="dataType === '0' && detailData.status != '4'"
			>
				生成客户
			</u-button>
			<view :style="{ margin: dataType === '0' ? '0' : '0 auto' }">
				<u-button
					type="primary"
					:custom-style="{
						width: dataType === '0' && detailData.status != '4' ? '200rpx' : '420rpx',
						height: '84rpx',
						background: '#00A4FF',
						'border-radius': '8px'
					}"
					@click="JumpTo(`/pages/addFollowup/index?id=${dataType === '0' ? clueId : customerId}&dataType=${dataType}`)"
				>
					添加跟进
				</u-button>
			</view>
			<view :style="{ margin: dataType === '0' ? '0' : '0 auto' }" v-if="dataType == 0">
				<u-button
					type="primary"
					:custom-style="{
						width: dataType === '0' ? '130rpx' : '420rpx',
						height: '84rpx',
						background: '#00A4FF',
						'border-radius': '8px'
					}"
					@click="JumpTo(`/pages/clueTransfer/index?id=${clueId}`)"
				>
					转让
				</u-button>
			</view>
			<!-- dataType -->
		</log-footer>
	</view>
</template>
<script>
// 组件
import logs from './components/logs.vue';
import Info from './components/info.vue';
import logFooter from '@/components/footer/footer.vue';
// 导入工具
import { getfetchUrl, getrealUrl } from '@/utils/getFileUrls.js';
// 导入接口
import { getCustomerDetail, getCustomFollowRecord, getCustomTransferRecord, getCustomOperationRecord } from '@/api/customer/customer.js';
import { getClueDetail, getClueFollowList, getCluetransferRecord } from '@/api/clue/clue.js';
// vuex
import { mapGetters } from 'vuex';
export default {
	components: {
		logs,
		logFooter,
		Info
	},
	data() {
		return {
			list: [
				{
					cate_name: '跟进记录'
				},
				{
					cate_name: '流转记录'
				},
				{
					cate_name: '操作记录'
				}
			],
			// tabs底部滑块样式
			tabStyle: {
				background: '#007AC3'
			},
			// 当前tab栏
			currentTab: 0,
			// 线索0 客户1
			dataType: null,
			//详情
			detailData: {},
			// 分页
			size: 20,
			current: 1,
			// 客户customerID
			customerId: '',
			// clue线索id
			clueId: '',
			// 展示正在加载
			isLoading: false,
			codeVisible:false,
			// log记录数据
			data: [],
			// 记录每次点击的记录数据
			recordData: [
				{
					total: null,
					data: [],
					current: 1,
					scrollTop: 0
				},
				{
					total: null,
					data: [],
					current: 1,
					scrollTop: 0
				},
				{
					total: null,
					data: [],
					current: 1,
					scrollTop: 0
				}
			],
			// 全部条数
			total: null,
			tabsTop: 0,
			scrollTop: -1,
			// 刚开始不显示吸顶导航
			showFixTabs: false
		};
	},
	onPullDownRefresh() {
		this.refreshData();
		setTimeout(function() {
			uni.showToast({
				title: '页面已刷新',
				icon: 'none'
			});
			uni.stopPullDownRefresh();
		}, 1000);
	},
	computed: {
		// 数据是否加载完成
		isComplete() {
			return this.total === this.data.length && this.total !== 0;
		},
		isFix() {
			return this.scrollTop >= this.tabsTop;
		},
		// 距离上边的高度
		...mapGetters(['navbarHeight'])
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
		switch (this.currentTab) {
			case 0:
				this.recordData[0].scrollTop = this.scrollTop;
				break;
			case 1:
				this.recordData[1].scrollTop = this.scrollTop;
				break;
			case 2:
				this.recordData[2].scrollTop = this.scrollTop;
				break;
		}
	},
	onReachBottom() {
		// 触底函数
		if (this.isComplete) return;
		if (!this.isLoading) {
			this.current++;
			this.handleInitData();
		}
	},
	onLoad({ type, id }) {
		this.dataType = type;
		this.dataType === '0' ? (this.clueId = id) : (this.customerId = id);
	},
	onShow() {
		// 获取详情数据
		this.refreshData();
		uni.setNavigationBarTitle({
			title: this.dataType === '0' ? '线索详情' : '客户详情'
		});
		setTimeout(_ => {
			this.showFixTabs = true;
		}, 500);
	},
	onHide() {
		this.scrollTop = null;
	},
	mounted() {
		// 获取tabs标签的高度
		this.getDomInfo();
	},
	methods: {
		// tabs 改变
		changeTab(value) {
			this.currentTab = value;
			this.setData(value);
			// 设置对应标签栏的数据
			setTimeout(_ => {
				this.scrollTop = this.recordData[value].scrollTop;
				uni.pageScrollTo({
					scrollTop: this.scrollTop,
					duration: 0
				});
			}, 100);
		},
		// 刷新数据
		refreshData() {
			this.size = 20;
			this.current = 1;
			this.recordData.forEach(item => {
				item.data = [];
				item.total = null;
				item.current = 1;
				item.scrollTop = 0;
			});
			this.dataType === '0' ? this.getClueDetail() : this.getCustomerDetail();
		},
		// 设置数据
		setData(index) {
			this.data = this.recordData[index].data;
			this.total = Number(this.recordData[index].total);
			this.current = this.recordData[index].current;
			if (this.recordData[index].total === null) {
				return this.handleInitData();
			}
		},
		// 跳转对于页面
		JumpTo(url) {
			uni.navigateTo({
				url
			});
		},
		handleInitData() {
			this.isLoading = true;
			setTimeout(async _ => {
				if (this.dataType === '0') {
					// 线索记录
					await this.initLogsData(getClueFollowList, getCluetransferRecord, getCustomOperationRecord);
					this.isLoading = false;
				} else {
					// 客户记录
					await this.initLogsData(getCustomFollowRecord, getCustomTransferRecord, getCustomOperationRecord);
				}
				this.isLoading = false;
			}, 500);
		},
		// 获取客户详情
		async getCustomerDetail() {
			const { data: res } = await getCustomerDetail({
				id: this.customerId
			});
			this.handleInitData();
			if (res.recycleTime) {
				res.recycleTime = res.recycleTime.replace(/-/g, '/');
				const leftTime = new Date(res.recycleTime).getTime() - new Date().getTime();
				console.log(leftTime);
				const recycleTime = leftTime > 0 ? this.getTime(Math.floor(leftTime / 1000)) : '已回收';
				res.recycleTime = recycleTime;
			}
			this.detailData = res;
		},
		// 获取线索详情
		async getClueDetail() {
			const { data: res } = await getClueDetail({
				id: this.clueId
			});
			this.handleInitData();
			if (res.recycleTime) {
				res.recycleTime = res.recycleTime.replace(/-/g, '/');
				const leftTime = new Date(res.recycleTime).getTime() - new Date().getTime();
				const recycleTime = leftTime > 0 ? this.getTime(Math.floor(leftTime / 1000)) : '已回收';
				res.recycleTime = recycleTime;
			}
			this.detailData = res;
		},
		// 初始化对应记录数据
		async initLogsData(getFollowRecord, getTransferRecord, getOperationRecord) {
			// 0获取客户跟进记录 1获取客户转让记录  2获取客户操作记录
			const queryInfo = {
				size: this.size,
				current: this.current
			};
			this.dataType === '0' ? (queryInfo.clueId = this.clueId) : (queryInfo.customerId = this.customerId);
			switch (this.currentTab) {
				case 0:
					const { data: followRecord } = await getFollowRecord(queryInfo);
					this.recordData[0].total = followRecord.total;
					this.recordData[0].current = this.current;
					const records = await this.getfetchUrl(followRecord.records);
					this.recordData[0].data = [...this.recordData[0].data, ...records];
					this.setData(0);
					break;
				case 1:
					const { data: transferRecord } = await getTransferRecord(queryInfo);
					this.recordData[1].total = transferRecord.total;
					this.recordData[1].current = this.current;
					this.recordData[1].data = [...this.recordData[1].data, ...transferRecord.records];
					this.setData(1);
					break;
				case 2:
					queryInfo.dataId = this.customerId || this.clueId;
					queryInfo.descs = 'create_time';
					const { data: operationRecord } = await getOperationRecord(queryInfo);
					this.recordData[2].total = operationRecord.total;
					this.recordData[2].current = this.current;
					this.recordData[2].data = [...this.recordData[2].data, ...operationRecord.records];
					this.setData(2);
					break;
			}
		},
		getDomInfo() {
			// tabs_clue_detail
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#tabs_clue_detail')
				.boundingClientRect(data => {
					console.log(data);
					this.tabsTop = data.top;
				})
				.exec();
		},
		// 转化真实图片地址
		async getfetchUrl(data) {
			let length = data.length - 1;
			return new Promise((resolve, reject) => {
				// 数据为空直接返回
				if (data.length === 0) {
					return resolve(data);
				}
				try {
					data.forEach((item, index) => {
						if (item.files.length === 0) {
							if (index === length) resolve(data);
							return;
						}
						item.files.forEach(item => {
							item.fileName = getrealUrl(item.fileKey);
						});
						if (index === length) resolve(data);
					});
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
			});
		},
		// 倒计时
		getTime(second_time) {
			var time = parseInt(second_time) + '秒';
			if (parseInt(second_time) > 60) {
				var second = parseInt(second_time) % 60;
				var min = parseInt(second_time / 60);
				time = min + '分' + second + '秒';

				if (min > 60) {
					min = parseInt(second_time / 60) % 60;
					var hour = parseInt(parseInt(second_time / 60) / 60);
					time = hour + '小时' + min + '分' + second + '秒';
					if (hour > 24) {
						hour = parseInt(parseInt(second_time / 60) / 60) % 24;
						var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
					}
				}
				if (day > 0) {
					time = day + '天';
				} else if (hour > 0) {
					time = hour + '小时';
				} else if (min > 0) {
					time = min + '分';
				} else {
					time = second + '秒';
				}
			}
			return time;
		},
		
	}
};
</script>
<style lang="scss">
.fixTabs {
	position: fixed;
	border-radius: 0;
	width: 100vw;
	z-index: -2;
	opacity: 0;
	.custom_tabs {
		border-radius: 0;
	}
}
.showFixTabs {
	z-index: 1002;
	opacity: 1;
}
.clue_wrap {
	height: 100vh;
	background-color: #ffffff;
	.clue_header {
		background-color: #292b4d;
		padding: 12rpx 30rpx 30rpx;
		.trademark {
			display: flex;
			.trade_left {
				min-width: 162rpx;
				height: 162rpx;
				background: #d2e4f8;
				color: #ffffff;
				border-radius: 16rpx;
				margin-right: 20rpx;
				font-size: 42rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.trade_right {
				flex: 1;
				margin-top: -10rpx;
				.trade_right_title {
					display: -webkit-box;
					color: #ffffff;
					font-size: 34rpx;
					word-break: break-all;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 500;
					letter-spacing: 2rpx;
					margin-top: 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					.date {
						font-size: 12px;
						margin-top: 10rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 17px;
						min-width: 216rpx;
					}
				}
				.card_desc {
					margin-top: 14rpx;
					line-height: 43rpx;
					color: #ffffff;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
		.work_record {
			display: flex;
			justify-content: space-between;
			.item_record {
				width: 200rpx;
				height: 120rpx;
				background: rgba(255, 255, 255, 0.1);
				box-shadow: 0px 0px 14rpx 0px rgba(0, 0, 0, 0.13);
				border-radius: 10rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				color: #ffffff;
				font-size: 24rpx;
				text-align: center;
				image {
					width: 40rpx;
					height: 40rpx;
					display: block;
					margin: 16rpx auto;
				}
			}
		}
	}
	.clue_tabs {
		margin-top: 0;
		// padding-right: 30rpx;
	}
	.spacing {
		background-color: #ffffff;
	}
}
.loading_wrap {
	background-color: #ffffff;
}
</style>
