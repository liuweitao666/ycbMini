<template>
	<view class="logs_card">
		<view class="circulation_log" v-if="data.length>0">
			<view class="follow_item" v-for="item in data" :key="item.id">
				<view class="custom_title">操作人：{{item.createUserName}}</view>
				<view class="desc">{{item.createTime}}</view>
				<view class="desc">
					<text style="color: #FC961E;padding-right: 10rpx;">#{{typeFlag[item.type]}}#</text>
					{{item.followContent}}
				</view>
				<view class="desc">
					流转前负责人：{{item.beforePrincipalName}}
				</view>
				<view class="desc">
					流转后负责人：{{item.afterPrincipalName}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default{
		props:['data'],
		data(){
			return{
				typeFlag:[
					'',
					'新增',
					'系统分配',
					'系统回收',
					'人工分配',
					'主动放弃',
					'转让',
					'公海领取',
					'离职交接',
					'其他',
					'导入',
					'无效'
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
	.circulation_log{
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
