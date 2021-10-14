<template>
		<view class="company_wrap">
			<view class="search">
				<input v-model="queryInfo.name" class="s_input" placeholder="请输入公司名称" />
				<text class="search_text" @click="handleSearch">搜索</text>
				<u-icon name="search" class="search_icon" size="30" />
			</view>
			<view class="list-cell" v-for="company in companyList" v-show="companyList.length>0" :key="customer.id">
				<view :class="['icon']">
					思
				</view>
				<view class="info">
					<view class="name">
						{{company.name}}
					</view>
					<view class="desc">
						{{company.companyName||'未加入公司'}}
					</view>
				</view>
			</view>
			<!-- 空状态 -->
			<u-empty :text="emptyText" mode="search" margin-top="100" v-show="companyList.length===0"></u-empty>
		</view>
</template>

<script>
	import {searchCompany} from "@/api/customer/customer.js"
	export default {
		data(){
			return {
				queryInfo:{
					name:'',
					size:20,
					current:1
				},
				companyList:[
					// {
					// 	name:'湖南科技有限公司',
					// 	desc:'哈哈哈哈哈'
					// },
					// {
					// 	name:'长沙金兴哼有限公司',
					// 	desc:'哈哈哈哈哈'
					// },
				],
				emptyText:'输入公司名称搜索'
			}
		},
		methods:{
			async handleSearch(){
				const {data:res} = await searchCompany(this.queryInfo)
				console.log('search',res)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.company_wrap{
		background-color: #FFFFFF;
		min-height: 100vh;
		.search{
			padding: 20rpx 30rpx 0;
			position: relative;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #F8F8F8;
			display: flex;
			align-items: center;
			.s_input{
				padding:12rpx 0 12rpx 70rpx;
				background-color: #f6f6f6;
				flex: 1;
			}
			.search_text{
				color: #007AFF;
				min-width: 100rpx;
				padding-left: 20rpx;
			}
			.search_icon{
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
		.icon{
			width: 96rpx;
			height: 96rpx;
			text-align: center;
			line-height: 96rpx;
			font-size: 42rpx;
			color: #FFFFFF;
			border-radius: 10rpx;
			background-color: #D2E4F8;
		}
		.info{
			margin-left:40rpx;
			.desc{
				font-size: 28rpx;
			}
		}
	}
	
</style>
