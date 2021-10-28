<template>
	<view class="QRcode">
		<!-- 底部描述图片 -->
		<view class="footer_desc" style="display: none;"><image src="../../static/image/QRcode/footer_desc.png" mode="widthFix"></image></view>
		<!-- 二维码区域 -->
		<view class="wrap" style="display: none;">
			<image src="@/static/image/QRcode/logo.png"></image>
			<view class="person-info">
				<view class="avatar"><image :src="userInfo.avatar" mode=""></image></view>
				<view class="introduce">
					<view class="name">{{ userInfo.realName }}</view>
					<view class="card_desc">技术总监CTO</view>
				</view>
			</view>
			<view class="intro_desc" :style="{ background: 'url(https://ycbfiles.oss-cn-shenzhen.aliyuncs.com/public/wxmini/intro_desc.png)' }">
				带着问题来 拿着方案走
				<br />
				您身边的创业难题解决专家
			</view>
			<view class="QRcode_content"><image :src="cardCode" mode="widthFix"></image></view>
			<view class="QR_text">微信长按，识别二维码</view>
			<view class="QR_footer">
				<!-- <text>复制专属连接</text> -->
				<text @click="drawPageImg">保存照片至相册</text>
			</view>
		</view>
		<hch-poster />
	</view>
</template>

<script>
import { createCardCode, getUserInfo } from '@/api/personalCenter/index.js';
import { getfetchUrl } from '@/utils/getFileUrls.js';
import hchPoster from "@/pages/hch-poster/hch-poster.vue"
export default {
	components:{hchPoster},
	data() {
		return {
			queryInfo: {
				tenantId: '',
				url: 'pages/personalCenter/index',
				userId: 0
			},
			cardCode: '',
			userInfo: {},
			wxUserInfo:uni.getStorageSync('wxUserInfo'),
			// 画布width
			canvasWidth: 0,
			ratio: 0,
			canvasHeight: 0,
			imgUrl: require('@/static/image/QRcode/logo.png'),
			avatar:require('@/static/image/mine/switch.png')
		};
	},
	onLoad({ user_id, tenant_id }) {
		console.log(tenant_id, user_id);
		// this.queryInfo.url = `/page/personalCenter/index?id=${encodeURIComponent(user_id)}&tenantId=${encodeURIComponent(tenant_id)}`
		this.queryInfo.tenantId = tenant_id;
		this.queryInfo.userId = user_id;
		this.getUserInfo();
		this.createCardCode();
	},
	methods: {
		// 创建二维码名片
		async createCardCode() {
			const data = await createCardCode(this.queryInfo);
			this.cardCode = data;
		},
		// 获取用户信息
		async getUserInfo() {
			const { data: res } = await getUserInfo(this.queryInfo.userId);
			if (res.avatar) {
				res.avatar = await getfetchUrl(res.avatar);
			}
			if (res.wechatQrCode) {
				res.wechatQrCode = await getfetchUrl(res.wechatQrCode);
			}
			this.userInfo = res;
			console.log(this.userInfo);
		},

	}
};
</script>

<style lang="scss">
	.myCanvas{
		position: absolute;
		z-index: -99;
		opacity: 0;
	}
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
		position: relative;
		z-index: 999;
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
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
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
			text-align: center;
			background: #eceff9;
			border-radius: 0px 0px 16rpx 16rpx;
		}
	}
	.footer_desc {
		width: 100%;
		margin: 0 auto;
		position: fixed;
		bottom: 30rpx;
		image {
			width: 100%;
		}
	}
}
</style>
