<template>
	<u-popup v-model="show" mode="center" border-radius="16" width="690rpx">
		<view class="pop_wrap">
			<view class="title">选择您的组织</view>
			<view class="desc">你在以下组织中担任成员</view>
			<view class="userList">
				<view :class="['user_item', 'align-items', { selected: item.tenantId === tenantId }]" v-for="(item, index) in tenantList" :key="item.tenantId" @click="selectTenant(item)">
					<text>{{ item.tenantName }}</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		</u-popup>
</template>

<script>
	import { mapActions,mapGetters } from 'vuex';
	export default {
		name:"tenantPopup",
		props:{
		},
		data() {
			return {
				show:false,
			};
		},
		computed:{
			...mapGetters(['tenantList','tenantId'])
		},
		created() {
			console.log(this.tenantList,this.tenantId)
		},
		methods:{
			selectTenant(tenantInfo){
				this.$emit('selectTenant',tenantInfo)
			}
		}
	}
</script>

<style lang="scss">
	.pop_wrap {
		padding: 30rpx;
		.title {
			font-size: 42rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 48rpx;
		}
		// 用户列表样式
		.userList {
			// height: 460rpx;
			.user_item {
				justify-content: space-between;
				background-color: #1683c5;
				color: #ffffff;
				padding: 40rpx;
				font-size: 28rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
			}
			.selected {
				border: 4rpx solid #ffffff;
			}
		}
	}
</style>
