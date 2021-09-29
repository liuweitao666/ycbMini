<template>
	<view class="clue_wrap">
		<!--自定义导航 -->
		<nav-bar @change="changeNav" :title="dataType === '0' ? '线索详情' : '客户详情'"></nav-bar>
		<view class="clue_header">
			<!-- 商标部分 -->
			<view class="trademark">
				<view class="trade_left">商标</view>
				<view class="trade_right">
					<view class="trade_right_title">
						<view class="title">{{ detailData.name }}</view>
						<text class="date">{{ $dateFormat(detailData.createTime,'yyyy-mm-dd') }}</text>
					</view>
					<view class="card_desc">{{detailData.remark||detailData.provinceName}}</view>
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
		<u-sticky :offset-top="navbarHeight" @fixed="isFixed(true)" @unfixed="isFixed(false)">
			<view :class="['custom_tabs', 'clue_tabs', { isFix }]">
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
		</u-sticky>
		<!-- 展示对应记录页面 -->
		<followup-log v-if="currentTab === 0" :data="data" :total="total" />
		<circulation-log v-if="currentTab === 1" :data="data" :total="total" />
		<operation-log v-if="currentTab === 2" :data="data" :total="total" />
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
				@click="JumpTo('/pages/generateCustomer/index')"
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
					@click="JumpTo(`/pages/addFollowup/index?id=${dataType==='0'?clueId:customerId}&dataType=${dataType}`)"
				>
					添加跟进
				</u-button>
			</view>
		</log-footer>
	</view>
</template>
<script>
// 组件
import followupLog from './components/followupLog.vue';
import circulationLog from './components/circulationLog.vue';
import operationLog from './components/operationLog.vue';
import logFooter from '@/components/footer/footer.vue';
// 导入接口
import { getCustomerDetail, getFollowRecord, getTransferRecord, getOperationRecord } from '@/api/customer/customer.js';
import { getClueDetail, getClueFollowList, getCluetransferRecord } from '@/api/clue/clue.js';
// vuex
import { mapGetters } from 'vuex';
export default {
	components: {
		followupLog,
		circulationLog,
		operationLog,
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
			// 全部条数
			total: null,
			isFix: false
		};
	},
	computed: {
		// 数据是否加载完成
		isComplete() {
			return this.total === this.data.length && this.total !== 0;
		},
		// 距离上边的高度
		...mapGetters(['navbarHeight'])
	},
	async onReachBottom() {
		// 触底函数
		if (this.isComplete) return;
		this.current++;
		await this.handleInitData();
	},
	onLoad({ type, id }) {
		console.log(type, id);
		this.dataType = type;
		this.dataType === '0' ? (this.clueId = id) : (this.customerId = id);
		// 获取详情数据
		this.dataType === '0' ? this.getClueDetail() : this.getCustomerDetail();
		this.handleInitData();
	},
	methods: {
		// tabs 改变
		changeTab(value) {
			this.currentTab = value;
			this.data = [];
			this.total=null;
			this.current = 1;
			// 改变记录数据
			this.handleInitData();
		},
		// 跳转对于页面
		JumpTo(url) {
			uni.navigateTo({
				url
			});
		},
		handleInitData() {
			this.isLoading = true;
			console.log(this.dataType);
			setTimeout(async _ => {
				if (this.dataType === '0') {
					// 线索记录
					await this.initClueLogData();
					this.isLoading = false;
				} else {
					// 客户记录
					await this.initCustomerLogData();
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
		// 初始线索详情 记录数据
		async initCustomerLogData() {
			// 0获取客户跟进记录 1获取客户转让记录  2获取客户操作记录
			const queryInfo = {
				size: this.size,
				current: this.current,
				customerId: this.customerId
			};
			switch (this.currentTab) {
				case 0:
					const { data: followRecord } = await getFollowRecord(queryInfo);
					this.total = followRecord.total;
					this.data = [...this.data, ...followRecord.records];
					break;
				case 1:
					const { data: transferRecord } = await getTransferRecord(queryInfo);
					this.total = transferRecord.total;
					this.data = [...this.data, ...transferRecord.records];
					break;
				case 2:
					const { data: operationRecord } = await getOperationRecord(queryInfo);
					this.total = operationRecord.total;
					this.data = [...this.data, ...operationRecord.records];
					break;
			}
		},
		// 初始线索详情 记录数据
		async initClueLogData() {
			// 0获取线索跟进记录 1获取线索转让记录  2获取线索操作记录
			const queryInfo = {
				size: this.size,
				current: this.current,
				clueId: this.clueId
			};
			console.log(queryInfo);
			switch (this.currentTab) {
				case 0:
					const { data: followRecord } = await getClueFollowList(queryInfo);
					this.total = followRecord.total;
					(this.data = [...this.data, ...followRecord.records]);
					break
				case 1:
					const { data: transferRecord } = await getCluetransferRecord(queryInfo);
					this.total = transferRecord.total;
					(this.data = [...this.data, ...transferRecord.records]);
					break
				case 2:
					const { data: operationRecord } = await getOperationRecord(queryInfo);
					this.total = operationRecord.total;
					return (this.data = [...this.data, ...operationRecord.records]);
			}
		},
		isFixed(isFix) {
			console.log(isFix);
			this.isFix = isFix;
		}
	}
};
</script>
<style lang="scss">
.clue_wrap {
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
					}
					.date {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 17px;
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
