<template>
	<view class="logs_card">
		<view class="followUp_log" v-if="data.length>0">
			<view class="follow_item" v-for="item in data" :key="item.id">
				<view class="custom_title">{{item.createUserName}}</view>
				<view class="desc">{{item.createTime}}</view>
				<view class="desc">
					<text style="color: #FC961E;padding-right: 10rpx">#{{followType[item.type] || item.operationType}}#</text>
					{{item.followContent || item.operationType}}
				</view>
				<view class="image_cneg">
					<image src="https://img1.baidu.com/it/u=3517333914,639949515&fm=26&fmt=auto" mode="widthFix"></image>
					<image src="https://img1.baidu.com/it/u=3517333914,639949515&fm=26&fmt=auto" mode=""></image>
					<image src="https://img1.baidu.com/it/u=3517333914,639949515&fm=26&fmt=auto" mode=""></image>
					<image src="https://img1.baidu.com/it/u=3517333914,639949515&fm=26&fmt=auto" mode=""></image>
				</view>
			</view>
		</view>
		<view class="empty_view" v-if="total===0">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
	</view>

</template>

<script>
	export default{
		props:['data','total'],
		data(){
			return{
				followType:[
					'',
					'电话',
					'微信',
					'旺旺',
					'线下',
					'其他',
				]
			}
		},
		created(){
			console.log(this.data)
		}
	}
</script>

<style lang="scss" scoped>
.logs_card {
	padding:10rpx 0;
	.followUp_log{
		.follow_item {
			padding: 0rpx 30rpx 20rpx;
			border-bottom: 2rpx solid #EAEAEA;
			.custom_title {
				padding-top:30rpx;
				padding-bottom: 10rpx;
				
			}
			.desc{
				line-height: 45rpx;
			}
			.image_cneg {
				padding-top: 20rpx;
				image{
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
				}
			}
		}
	}

}
</style>
