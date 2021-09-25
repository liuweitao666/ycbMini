<template>
	<view class="enterprise_intro introduce">
		<view class="content">
			<view class="item">
				<text>公司：</text>
				<text class="name">深圳金信恒企业管理有限公司</text>
			</view>
			<view class="item">
				<text>官网：</text>
				<text style="color:#00A4FF">www.tianya.cn</text>
			</view>
			<view class="item">
				<text>地址：</text>
				<text class="name">广东省深圳市宝安区友爱胡同292号</text>
			</view>
			<view class="item_card">
				<view class="card_title" style="padding-left: 0;">
					公司简介
				</view>
				<view class="card_desc">
						金信恒企业管理有限公司，是一家全国性的企业商务服务平台。正式成立于2015年，注册资金5000万，总部位于深圳，在广州、珠海、东莞、佛山、长沙、成都、重庆、西安等全国各大城市都设有分支机构。主营业务涵盖工商服务、财税服务、知识产权、法律服务、高新认证、网站建设等。以让企业经营无难事为公司使命。
				</view>
			</view>
			
		</view>
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
		.content{
			.item{
				font-size: 28rpx;
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #EDEDED;
				.name{
					color: #999;
				}
			}
			.item_card{
				padding: 30rpx;
			}
		}
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
