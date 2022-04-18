<template>
	<view class="search_wrap">
		<u-tabs name="name" :list="tabList" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="search"><u-search placeholder="输入员工姓名或手机号搜索" v-model="value" @search="handleSearch"></u-search></view>
		<scroll-view scroll-y="true" class="user_scoll" v-if="userList.length>0">
			<view class="users_wrap" v-for="item in userList" :key="item.id" @click="selectUser(item)">
				<view :class="['user_radio', receiverId == item.id && 'active']"><view class="circle"></view></view>
				<view class="user">
					<view class="avatar"><image :src="$getAvatar(item.userId)" mode=""></image></view>
					<view class="name">{{item.name}}</view>
					<view class="dept_name">{{item.tenantName}}</view>
					
				</view>
			</view>
		</scroll-view>
		<u-empty style="margin-top: 40rpx;" text="请搜索接收线索的员工" mode="search" v-else></u-empty>
	</view>
</template>

<script>
import { getUserEnterprise, getUserGlobal } from '@/api/user/index.js';
export default {
	name: 'ycb-select-user',
	props:{
		receiverId:{
			type:String,
			default:""
		}
	},
	data() {
		return {
			userList:[],
			// 当前tab标签
			current: 0,
			// 搜索关键字
			value: '',
			currentUser: {},
			tabList: [
				{
					name: '本企业'
				},
				{
					name: '全平台'
				}
			]
		};
	},
	created() {
		console.log(this.$attrs)
		this.getList()
	},
	methods: {
		change(index) {
			this.current = index;
			this.getList()
		},
		handleSearch() {
			this.getList();
		},
		selectUser(item){
			this.currentUser = item
			this.$emit('update:receiverId',item.id)
		},
		async getList() {
			try{
				uni.showLoading({
					title:'正在加载...'
				})
				const query = { value: this.value };
				const { data: res } = this.current === 0 ? await getUserEnterprise(query) : await getUserGlobal(query);
				uni.hideLoading()
				this.userList = res
			}catch(e){
				//TODO handle the exception
				uni.hideLoading()
			}
			
		}
	}
};
</script>

<style lang="scss">
.search_wrap {
	height: 100%;
	display: flex;
	flex-direction: column;
	.search {
		padding: 30rpx;
		flex-shrink: 0;
		border-top: 2rpx solid #f6f6f6;
	}
	.user_scoll {
		flex: 1;
		height: 1px;
		padding-bottom: 150rpx;
		.users_wrap {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			.user_radio {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				border: 2rpx solid #cecece;
				background-color: #f6f6f6;
				margin-right: 20rpx;
				flex-shrink: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				.circle {
					width: 50%;
					height: 50%;
					border-radius: 50%;
					background-color: #b1b1b1;
				}
			}
			.active {
				border-color: #007aff;
				background-color: #007aff;
				.circle {
					background-color: #ffffff;
				}
			}
		}
		// 用户姓名部分
		.user {
			display: flex;
			flex: 1;
			border-top: 2rpx solid #f6f6f6;
			padding: 10rpx;
			align-items: center;
			font-size: 30rpx;
			font-weight: 600;
			.avatar {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.dept_name {
				margin-left: auto;
				color: #999;
				font-size: 28rpx;
			}
		}
		&.user:first-child {
			border-top: none;
		}
	}
}
</style>
