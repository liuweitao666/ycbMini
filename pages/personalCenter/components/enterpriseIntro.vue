<template>
	<view class="enterprise_intro">
		<view class="card">
			<view class="card_title">
				公司相册
			</view>
			<view class="photo">
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
				<view class="company_img">
					<image src="https://img1.baidu.com/it/u=201680160,1037879666&fm=26&fmt=auto" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['data']
	}
</script>

<style lang="scss" scoped>
		.enterprise_intro{
			.card_title{
				padding:0 0 30rpx 20rpx;
			}
			.card{
				padding: 30rpx 0 10rpx;
			}
		}
	.photo{
		display: flex;
		flex-wrap: wrap;
		padding-left: 8rpx;
	}
	.company_img{
		width: 200rpx;
		height: 200rpx;
		margin-left: 18rpx;
		margin-bottom: 18rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	
</style>
