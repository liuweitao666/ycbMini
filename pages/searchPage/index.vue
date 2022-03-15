<template>
	<scroll-view  scroll-y="true" class="company_wrap" :show-scrollbar="true" @scrolltoupper="upper" @scroll="scroll" @scrolltolower="touchBottom">
		<view id="companyWrap">
			<u-sticky>
				<view class="search">
					<input v-model="name" class="s_input" :placeholder="type === '1' ? '请输入公司名称' : '输入客户名称搜索'" />
					<text class="search_text" @click="handleSearch">搜索</text>
					<u-icon name="search" class="search_icon" size="30" />
				</view>
			</u-sticky>
			<!-- 公司列表 -->
			<company :data="data" v-if="type === '1'" :emptyText="emptyText" />
			<!-- 客户列表 -->
			<customers :data="data" v-else :emptyText="emptyText" />
			<!-- 空状态 -->
			<view class="" v-if="data.length === 0 || complete">
				<view class="no_more" v-if="complete">没有更多了~</view>
				<u-empty :text="emptyText" mode="search" margin-top="100" v-else></u-empty>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import { searchCompany, getCustomerList } from '@/api/customer/customer.js';
import company from './components/company.vue';
import customers from './components/customers.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		company,
		customers
	},
	data() {
		return {
			total: null,
			name: '',
			queryInfo: {
				size: 20,
				current: 1
			},
			data: [],
			emptyText: '输入公司名称搜索',
			// 页面可滚动的高度
			type: '',
			complete: false
		};
	},
	computed: {
		...mapGetters(['navbarHeight'])
	},
	onLoad({ type }) {
		// type 1 公司 2 客户
		this.type = type;
		uni.setNavigationBarTitle({
			title: type === '1' ? '搜索公司' : '搜索客户' //此处写页面的title
		});
		type === '1' ? (this.emptyText = '输入公司名称搜索') : (this.emptyText = '输入客户名称搜索');
	},
	methods: {
		async handleSearch() {
			if (!this.name)
				return uni.showToast({
					title: '名称不能为空',
					icon: 'none'
				});
			this.queryInfo.current = 1;
			this.data = [];
			await this.getList();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: '200'
			});
		},
		upper() {},
		// 获取公司列表
		async getList(istouchBottom) {
			try {
				uni.showLoading({
					title: '正在加载...'
				});
				if (this.type === '2') {
					this.queryInfo.name = this.name;
				} else {
					this.queryInfo.name = this.name;
				}
				const { data: res } = this.type === '1' ? await searchCompany(this.queryInfo) : await getCustomerList(this.queryInfo);
				console.log(res);
				setTimeout(() => {
					const data = this.handleData(res, istouchBottom);
					uni.hideLoading();
					this.data = [...this.data, ...data];
				}, 500);
			} catch (e) {
				console.log(e);
				//TODO handle the exception
				uni.hideLoading();
			}
		},
		//
		touchBottom() {
			if (this.complete) return;
			this.queryInfo.current++;
			this.getList(true);
		},
		handleData(data, istouchBottom) {
			if (data.length === 0) {
				this.emptyText = '搜索结果为空';
			}
			if (istouchBottom) {
				this.complete = true;
			}
			return this.type === '1' ? data : data;
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
.no_more {
	text-align: center;
	padding: 30rpx 0;
	color: #666;
}
</style>
