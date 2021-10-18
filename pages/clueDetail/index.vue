<template>
	<view class="clue_wrap">
		<!--自定义导航 -->
		<nav-bar @change="changeNav" :title="dataType === '0' ? '线索详情' : '客户详情'"></nav-bar>
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
				<view class="trade_left">商标</view>
				<view class="trade_right">
					<view class="trade_right_title">
						<view class="title">{{ detailData.name }}</view>
						<text class="date">{{ detailData.createTime }}</text>
					</view>
					<view class="card_desc">{{ detailData.remark || detailData.provinceName }}</view>
				</view>
			</view>
			<!-- 联系方式 -->
			<view class="contact_info">
				<view class="phone">
					<u-icon name="phone" color="#8F9BB3" size="40"></u-icon>
					<text class="icon_text">{{ detailData.phone }}</text>
				</view>
				<view class="weixin">
					<u-icon name="weixin-fill" color="#8F9BB3" size="40"></u-icon>
					<text class="icon_text">{{ detailData.wechat }}</text>
				</view>
			</view>
			<!-- 沟通记录 -->
			<view class="work_record">
				<view class="item_record">
					<image src="/static/image/clueDetail/Filled.png" mode=""></image>
					<text>回收：{{ detailData.recoveryTime || '0秒' }}</text>
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
		<logs :data="data" :total="total" />
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
					width: '260rpx',
					height: '84rpx',
					background: '#FC961E',
					'border-radius': '8px'
				}"
				@click="JumpTo(`/pages/generateCustomer/index?id=${clueId}`)"
				v-if="dataType === '0'"
			>
				生成客户
			</u-button>
			<view :style="{ margin: dataType === '0' ? '0' : '0 auto' }">
				<u-button
					type="primary"
					:custom-style="{
						width: dataType === '0' ? '260rpx' : '420rpx',
						height: '84rpx',
						background: '#00A4FF',
						'border-radius': '8px'
					}"
					@click="JumpTo(`/pages/addFollowup/index?id=${dataType === '0' ? clueId : customerId}&dataType=${dataType}`)"
				>
					添加跟进
				</u-button>
			</view>
		</log-footer>
	</view>
</template>
<script>
// 组件
import logs from './components/logs.vue';
// import circulationLog from './components/circulationLog.vue';
// import operationLog from './components/operationLog.vue';
import logFooter from '@/components/footer/footer.vue';
// 导入接口
import { getCustomerDetail, getCustomFollowRecord, getCustomTransferRecord, getCustomOperationRecord } from '@/api/customer/customer.js';
import { getClueDetail, getClueFollowList, getCluetransferRecord } from '@/api/clue/clue.js';
// vuex
import { mapGetters } from 'vuex';
export default {
	components: {
		logs,
		logFooter
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
			size: 3,
			current: 1,
			// 客户customerID
			customerId: '',
			// clue线索id
			clueId: '',
			// 展示正在加载
			isLoading: false,
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
		// 获取详情数据
		this.dataType === '0' ? this.getClueDetail() : this.getCustomerDetail();
		this.handleInitData();
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
			this.recordData.forEach(item => {
				item.data = [];
				item.total = null;
				item.current = 1;
				item.scrollTop = 0;
			});
			this.handleInitData();
		},
		// 设置数据
		setData(index) {
			this.data = this.recordData[index].data;
			this.total = this.recordData[index].total;
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
			this.detailData = res;
			console.log(res);
		},
		// 获取线索详情
		async getClueDetail() {
			console.log(this.clueId + 'clue');
			const { data: res } = await getClueDetail({
				id: this.clueId
			});
			this.detailData = res;
			console.log(res);
		},
		// 初始化对应记录数据
		async initLogsData(getFollowRecord, getTransferRecord, getOperationRecord) {
			// 0获取客户跟进记录 1获取客户转让记录  2获取客户操作记录
			const queryInfo = {
				size: this.size,
				current: this.current
				// customerId: this.customerId
			};
			this.dataType === '0' ? (queryInfo.clueId = this.clueId) : (queryInfo.customerId = this.customerId);
			switch (this.currentTab) {
				case 0:
					const { data: followRecord } = await getFollowRecord(queryInfo);
					this.recordData[0].total = followRecord.total;
					this.recordData[0].current = this.current;
					this.recordData[0].data = [...this.recordData[0].data, ...followRecord.records];
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
					this.tabsTop = data.top - this.navbarHeight / 2;
				})
				.exec();
		}
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
				.trade_right_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title {
						color: #ffffff;
						font-size: 48rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						letter-spacing: 2rpx;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}
					.date {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 17px;
						min-width: 216rpx;
						margin-left: 20rpx;
					}
				}
				.card_desc {
					margin-top: 14rpx;
					line-height: 43rpx;
					color: #ffffff;
				}
			}
		}
		.contact_info {
			color: #ffffff;
			margin: 44rpx 0;
			font-size: 26rpx;
			display: flex;
			.icon_text {
				padding-left: 16rpx;
				line-height: 40rpx;
			}
			.phone {
				margin-right: 42rpx;
				display: flex;
				align-items: center;
			}
			.weixin {
				display: flex;
				align-items: center;
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
