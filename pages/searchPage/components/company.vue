<template>
	<view class="search_page">
		<!-- 公司列表 -->
		<view v-if="data.length > 0">
			<view class="list-cell" v-for="company in data" :key="company.id" @click="selectCompany(company)">
				<view :class="['icon']">公</view>
				<view class="info">
					<view class="name">{{ company.companyName }}</view>
					<view class="desc">法人：{{ company.legalPerson || '暂无' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['data'],
		methods:{
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
	}
</script>

<style>
</style>
