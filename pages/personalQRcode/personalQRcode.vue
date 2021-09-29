<template>
	<view class="QRcode">
		<!-- 二维码区域 -->
		<view class="wrap">
			<image src="@/static/image/QRcode/logo.png"></image>
			<view class="person-info">
				<view class="avatar"></view>
				<view class="introduce">
					<view class="name">徐小凯</view>
					<view class="card_desc">技术总监CTO</view>
				</view>
			</view>
			<view class="intro_desc" :style="{ background: 'url(../../static/image/QRcode/intro_desc.png)' }">
				带着问题来 拿着方案走
				<br />
				您身边的创业难题解决专家
			</view>
			<view class="QRcode_content"><image src="https://img0.baidu.com/it/u=1753376826,142580772&fm=253&fmt=auto&app=120&f=JPEG?w=430&h=430" mode="widthFix"></image></view>
			<view class="QR_text">微信长按，识别二维码</view>
			<view class="QR_footer">
				<text>复制专属连接</text>
				<text>保存照片至相册</text>
			</view>
		</view>
		<!-- 底部描述图片 -->
		<view class="footer_desc">
			<image src="../../static/image/QRcode/footer_desc.png" mode="widthFix" ></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(option) {
		console.log(option)
	}
};
</script>

<style lang="scss">
.QRcode {
	width: 100vw;
	height: 100vh;
	background-color: #292b4d;
	padding-top: 30rpx;
	.wrap {
		width: 690rpx;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 16rpx;
		image {
			width: 100%;
			height: 180rpx;
		}
		.person-info {
			margin-top: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.avatar {
				width: 120rpx;
				height: 120rpx;
				background-color: #007aff;
				border-radius: 50%;
			}
			.introduce {
				padding-left: 20rpx;
				.name {
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
				}
			}
		}
		.intro_desc {
			width: 416rpx;
			height: 128rpx;
			font-size: 28rpx;
			margin-top: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #007ac3;
			line-height: 40rpx;
			text-align: center;
			margin: 20rpx auto 50rpx;
			padding: 30rpx 0 18rpx;
		}
		.QRcode_content {
			width: 240rpx;
			height: 240rpx;
			padding: 6rpx;
			background-color: #999;
			margin: 0 auto;
		}
		.QR_text {
			color: #007ac3;
			margin: 30rpx 0 108rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			line-height: 34rpx;
			text-align: center;
		}
		.QR_footer {
			color: #777777;
			height: 104rpx;
			line-height: 104rpx;
			padding: 0 60rpx;
			background: #eceff9;
			border-radius: 0px 0px 16rpx 16rpx;
			display: flex;
			justify-content: space-between;
		}
	}
	.footer_desc{
		width: 690rpx;
		margin: 0 auto;
	}
}
</style>
