<template>
	<view>
		<nav-bar :navList="navList" @change="changeTab" :isLine="true" :Avatar="userInfo.avatar" isAvatar></nav-bar>
		<!-- 看板 -->
		<!-- <performance ref="performance" /> -->
		<!-- tab菜单 -->
		<view class="tabs">
			<u-dropdown :title-size="24" v-show="dataType === 0">
				<u-dropdown-item v-model="clueQueryInfo.contactTypes" @change="dropChange" title="联系方式" :options="contactTypesOptions"></u-dropdown-item>
				<u-dropdown-item v-model="clueQueryInfo.createDate" @change="dropChange" title="创建时间" :options="createTimeOptions"></u-dropdown-item>
				<u-dropdown-item v-model="clueQueryInfo.range" @change="dropChange" title="范围" :options="rangeOptions"></u-dropdown-item>
				<u-dropdown-item v-model="clueQueryInfo.status" @change="dropChange" title="状态" :options="statusOptions"></u-dropdown-item>
			</u-dropdown>
			<u-dropdown :title-size="24" v-show="dataType === 1">
				<u-dropdown-item v-model="customerQueryInfo.contactTypes" @change="dropChange" title="联系方式" :options="contactTypesOptions"></u-dropdown-item>
				<u-dropdown-item v-model="customerQueryInfo.createDateType" @change="dropChange" title="创建时间" :options="createTimeOptions"></u-dropdown-item>
				<u-dropdown-item v-model="customerQueryInfo.scopeType" @change="dropChange" title="范围" :options="scopeTypeOptions"></u-dropdown-item>
				<u-dropdown-item v-model="customerQueryInfo.status" @change="dropChange" title="状态" :options="statusCustomerOptions"></u-dropdown-item>
			</u-dropdown>
		</view>
		<scroll-view
			:scroll-top="scrollTop"
			scroll-y="true"
			class="main_wrap"
			:style="{ height: contentHeight + 'px' }"
			:show-scrollbar="true"
			@scrolltoupper="upper"
			@scroll="scroll"
			@scrolltolower="touchBottom"
		>
			<view class="main">
				<view class="section">
					<!-- 列表 -->
					<view class="section_content" v-for="item in dataList" :key="item.id" @click="jumpTo(item.id)">
						<view class="left">
							<view class="title">{{ item.name }}</view>
							<view class="text_desc">{{ item.createTime }}</view>
							<view class="text_desc">{{ item.provinceName + '/' + item.cityName }}</view>
						</view>
						<view class="right" v-show="item.phone" @click.stop="phoneCall(item.phone)"><image src="@/static/image/home/phone.png" mode=""></image></view>
					</view>
					<!-- 空列表 -->
					<u-empty type="list" v-if="isComplete && total === 0"></u-empty>
					<view class="" v-else>
						<!-- 加载完成 -->
						<view :class="['loading_wrap', { hidden: !isComplete }]">我是有底线的~~</view>
						<!-- 加载动画 -->
						<view :class="['loading_wrap', { hidden: isComplete }]"><u-loading color="red" :show="isLoading"></u-loading></view>
					</view>
				</view>
				<view class="footer"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
// 导入组件
import dropDown from '@/components/dropDown/index.vue';
import dropDownItem from '@/components/dropdownItem/index.vue';
// 客户相关接口导入
import { getCustomerPage } from '@/api/customer/customer.js';
// 线索相关接口导入
import { getCluePage, getCluePerformance } from '@/api/clue/clue.js';
import { mapGetters } from 'vuex';

import { deepClone } from '@/utils/util.js';
// 导入数据
import { clueQueryInfo, customerQueryInfo, dropData, createTimeOptions, rangeOptions, statusOptions, scopeTypeOptions, statusCustomerOptions,contactTypesOptions } from './index.js';

export default {
	components: {
		dropDown,
		dropDownItem
	},
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
			current: 1,
			size: 20,
			clueQueryInfo: deepClone(clueQueryInfo),
			customerQueryInfo: deepClone(customerQueryInfo),
			total: null,
			// 下拉数据
			dropData: dropData,
			// 数据列表
			dataList: [],
			recordData: [
				{
					data: [],
					total: null,
					current: 1
				},
				{
					data: [],
					total: null,
					current: 1
				}
			],
			// 是否展示加载动画
			isLoading: false,
			value1: '',
			createTimeOptions: createTimeOptions,
			rangeOptions: rangeOptions,
			statusOptions: statusOptions,
			scopeTypeOptions: scopeTypeOptions,
			statusCustomerOptions: statusCustomerOptions,
			contactTypesOptions:contactTypesOptions,
			// 滑动区域的高度
			contentHeight: '',
			isFix: false,
			dropActive: 0,
			tabTop: '80rpx',
			isUpLoading: false
		};
	},
	computed: {
		// 数据是否加载完成
		isComplete() {
			return this.total === this.dataList.length;
		},
		...mapGetters(['navbarHeight','tenantId','userInfo'])
	},
	watch: {
		navbarHeight() {
			this.handleHeight();
		},
		tenantId(){
			this.refreshData();
		}
	},
	created() {
		this.initData();
	},
	mounted() {
		this.handleHeight();
	},
	methods: {
		changeTab(value) {
			this.dataType = value;
			this.setData(value);
		},
		handleHeight() {
			const windowHeight = uni.getStorageSync('windowHeight');
			this.contentHeight = windowHeight - uni.upx2px(this.navbarHeight + 86);
		},
		// 触顶函数
		upper() {
			// this.setSearchData()
		},
		touchBottom() {
			// 触底函数
			if (this.isComplete) return;
			if (!this.isLoading) {
				this.current++;
				this.initData();
			}
		},
		// 更新数据
		upData() {
			this.initData();
		},
		scroll(data) {
			// let {scrollTop} = detail
			this.scrollTop = data.detail.scrollTop;
		},
		// 设置数据
		setData(index) {
			this.current = this.recordData[index].current;
			this.dataList = this.recordData[index].data;
			if (this.recordData[index].total === null) return this.initData();
			this.total = this.recordData[index].total;
		},
		// 刷新页面
		refreshData(){
			this.total = null;
			this.recordData.forEach(item=>{
				item.data = []
				item.total = null
				item.current = 1
			})
			this.setData(this.dataType);
		},
		// 搜索重置数据
		setSearchData() {
			// 显示加载动画
			this.total = null;
			// 清空当前数据
			this.recordData[this.dataType].data = [];
			this.recordData[this.dataType].total = null;
			this.recordData[this.dataType].current = 1;
			// 搜索数据
			this.setData(this.dataType);
		},
		// 搜索
		handleSearch({ searchType, name }) {
			if (searchType === 'search') {
				if (this.dataType === 0) {
					if (name === this.clueQueryInfo.name) return;
					for (let key in this.clueQueryInfo) {
						this.clueQueryInfo[key] = clueQueryInfo[key];
					}
					this.clueQueryInfo.name = name;
				} else {
					if (name === this.customerQueryInfo.name) return;
					for (let key in this.customerQueryInfo) {
						this.customerQueryInfo[key] = customerQueryInfo[key];
					}
					this.customerQueryInfo.name = name;
				}
				this.setSearchData();
			} else {
				this.setSearchData();
			}
		},
		// 初始化数据
		initData() {
			this.isLoading = true;
			setTimeout(async _ => {
				try {
					this.dataType === 0 ? await this.getCluePage() : await this.getCustomerPage();
					this.isLoading = false;
				} catch (e) {
					//TODO handle the exception
					// uni.showToast({
					// 	title: '网络错误，请稍后重试！',
					// 	icon: 'none'
					// });
					this.isLoading = false;
				}
			}, 500);
		},
		// 获取线索分页列表
		async getCluePage() {
			const queryInfo = {
				size: this.size,
				current: this.current,
				...this.clueQueryInfo
			};
			const { data: res } = await getCluePage(queryInfo);
			this.recordData[0].data = [...this.recordData[0].data, ...res.records];
			this.recordData[0].total = res.total;
			this.recordData[0].current = this.current;
			this.setData(0);
		},
		// 获取客户分页列表
		async getCustomerPage() {
			const queryInfo = {
				size: this.size,
				current: this.current,
				...this.customerQueryInfo
			};
			const { data: res } = await getCustomerPage(queryInfo);
			this.recordData[1].data = [...this.recordData[1].data, ...res.records];
			this.recordData[1].total = res.total;
			this.recordData[1].current = this.current;
			this.setData(1);
		},
		// 跳转对应的线索详情
		jumpTo(id) {
			console.log(id);
			uni.navigateTo({
				url: `/pages/clueDetail/index?id=${id}&type=${this.dataType}`
			});
		},
		// 导航栏吸顶
		isFixed(isFix) {
			console.log(isFix);
			this.isFix = isFix;
		},
		dropChange(index) {
			console.log(index);
			this.dropActive = index;
			this.handleSearch({ searchType: 'rangeSearch' });
		},
		// 打电话
		phoneCall(phone) {
			uni.makePhoneCall({
				phoneNumber: phone,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	width: 100vw;
	// padding: 0 30rpx;
	background-color: #ffffff;
}
.main_wrap {
	height: 600rpx;
	.main {
		padding: 0rpx 30rpx 30rpx;
		// position: relative;
		// z-index: 99;
		.screen {
			padding: 0;
			height: 80rpx;
			background: #ffffff;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
		}
		.isFix {
			width: 100vw;
			margin-left: -30rpx;
			padding: 0 30rpx;
		}
		.section {
			padding-top: 30rpx;
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
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}
					.text_desc {
						font-size: 24rpx;
						font-weight: 400;
						color: #a4b0be;
						line-height: 26rpx;
						padding-top: 15rpx;
					}
				}
				.right {
					min-width: 48rpx;
					height: 48rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
