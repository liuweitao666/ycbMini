<template>
	<view class="footer">
		<view class="logo">
			<image src="../../../static/image/personalCenter/logo.png" mode=""></image>
		</view>
		<view class="content">
			<view class="main">
				<view class="left">
					<view class="wechat">
						<view >
							<u-icon name="chat" size="60"></u-icon>
						</view>
						<text>微信</text>
					</view>
					<view class="email">
						<view >
							<u-icon name="email" size="60"></u-icon>
						</view>
						<text>邮箱</text>
					</view>
				</view>
				<u-button type="warning" :custom-style="customStyle">拨打电话</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				customStyle:{
					width:"260rpx"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		margin-top: 40rpx;
		.logo{
			width: 192rpx;
			height: 60rpx;
			margin:0 auto 40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.content{
			height: 218rpx;
			background: #075BB8;
			border-radius: 60rpx 60rpx 0px 0px;
			.main{
				display: flex;
				padding: 44rpx 60rpx 0;
				justify-content: space-between;
				align-items: center;
				.left{
					color: #FFFFFF;
					display: flex;
					.wechat{
						padding-left: 20rpx;
						text-align: center;
					}
					.email{
						padding-left: 72rpx;
						text-align: center;
					}
				}
			}
		}
		
	}
</style>
