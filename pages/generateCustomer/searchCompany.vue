<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="company_wrap" :show-scrollbar="true" @scrolltoupper="upper" @scroll="scroll" @scrolltolower="touchBottom">
		<view id="companyWrap">
			<u-sticky>
				<view class="search">
					<input v-model="queryInfo.name" class="s_input" placeholder="请输入公司名称" />
					<text class="search_text" @click="handleSearch">搜索</text>
					<u-icon name="search" class="search_icon" size="30" />
				</view>
			</u-sticky>
			<!-- 公司列表 -->
			<view v-if="companyList.length > 0">
				<view class="list-cell" v-for="company in companyList" :key="company.id" @click="selectCompany(company)">
					<view :class="['icon']">公</view>
					<view class="info">
						<view class="name">{{ company.companyName }}</view>
						<view class="desc">法人：{{ company.legalPerson || '暂无' }}</view>
					</view>
				</view>
			</view>
			<!-- 空状态 -->
			<u-empty :text="emptyText" mode="search" margin-top="100" v-else></u-empty>
		</view>
	</scroll-view>
</template>

<script>
import { searchCompany } from '@/api/customer/customer.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			queryInfo: {
				name: '',
				size: 20,
				current: 1
			},
			companyList: [
				// {
				// 	name:'湖南科技有限公司',
				// 	desc:'哈哈哈哈哈'
				// },
				// {
				// 	name:'长沙金兴哼有限公司',
				// 	desc:'哈哈哈哈哈'
				// },
			],
			emptyText: '输入公司名称搜索',
			// 页面可滚动的高度
			scrollTop: 0
		};
	},
	computed: {
		...mapGetters(['navbarHeight'])
	},
	methods: {
		async handleSearch() {
			if (!this.queryInfo.name)
				return uni.showToast({
					title: '名称不能为空',
					icon: 'none'
				});
			this.queryInfo.current = 1;
			this.companyList = [];
			await this.getList();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: '200'
			});
		},
		scroll(data) {
			// let {scrollTop} = detail
			this.scrollTop = data.detail.scrollTop;
		},
		// 获取公司列表
		async getList() {
			try {
				uni.showLoading({
					title: '正在加载...'
				});
				const { data: res } = await searchCompany(this.queryInfo);
				setTimeout(() => {
					uni.hideLoading();
					this.companyList = [...this.companyList, ...res];
				}, 500);
			} catch (e) {
				//TODO handle the exception
				uni.hideLoading();
			}
		},
		//
		touchBottom() {
			this.queryInfo.current++;
			this.getList();
		},
		// 选择公司时
		selectCompany(companyInfo) {
			let pages = getCurrentPages();
			// 获取上一页栈
			let prevPage = pages[pages.length - 2];
			// 设置添加页面公司数据
			prevPage.$vm.setCompany(companyInfo)
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.company_wrap {
	background-color: #ffffff;
	height: 100vh;
	padding-bottom: 30rpx;
	.search {
		padding: 20rpx 30rpx 0;
		position: relative;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #f8f8f8;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		.s_input {
			padding: 12rpx 0 12rpx 70rpx;
			background-color: #f6f6f6;
			flex: 1;
		}
		.search_text {
			color: #007aff;
			min-width: 100rpx;
			padding-left: 20rpx;
		}
		.search_icon {
			position: absolute;
			top: 50%;
			left: 60rpx;
			transform: translateY(-50%);
		}
	}
}
.list-cell {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 30rpx;
	overflow: hidden;
	color: #323233;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
	border-bottom: 2rpx solid #f8f8f8;
	.icon {
		min-width: 96rpx;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		font-size: 42rpx;
		color: #ffffff;
		border-radius: 10rpx;
		background-color: #d2e4f8;
	}
	.info {
		margin-left: 40rpx;
		.name {
			width: 500rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.desc {
			font-size: 28rpx;
		}
	}
}
</style>
