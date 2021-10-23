<template>
	<view class="search_page">
		<!-- 公司列表 -->
		<view v-if="data.length > 0">
			<view class="list-cell" v-for="(customer, index) in data" :key="index" @click="selectCustomer(customer)">
				<view :class="['sex', switchClass(customer.sex)]">{{ customer.sex === 0 ? '铭' : customer.sex === 1 ? '男' : '女' }}</view>
				<view class="info">
					<view class="name">{{ customer.name }}</view>
					<view class="desc">{{ customer.companyName || '未加入公司' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['data'],
	methods: {
		switchClass(val){
			switch(val){
				case 0:
				return 'unknown';
				case 1:
				return 'man';
				case 2:
				return 'woman';
			}
		},
		// 选择用户时
		selectCustomer(customerInfo) {
			uni.navigateTo({
				url: `/pages/clueDetail/index?id=${customerInfo.id}&type=1`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.list-cell {
	.sex {
		width: 96rpx;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		font-size: 42rpx;
		color: #ffffff;
		border-radius: 10rpx;
	}
	.unknown{
		background-color: #5f66b3;
	}
	.woman {
		background-color: #f6c0ce;
	}
	.man {
		background-color: #d2e4f8;
	}
	.info {
		margin-left: 40rpx;
		font-size: 28rpx;
	}
}
</style>
