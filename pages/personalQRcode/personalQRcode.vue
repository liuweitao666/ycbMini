<template>
	<view class="QRcode">
		<!-- 底部描述图片 -->
		<view class="footer_desc" ><image src="../../static/image/QRcode/footer_desc.png" mode="widthFix"></image></view>
		<!-- 二维码区域 -->
		<view class="wrap">
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
				<text @click="shareEvn">生成个人名片</text>
			</view>
		</view>
		<hch-poster ref="poster" :posterData="posterData" />
	</view>
</template>

<script>
import { createCardCode, getUserInfo } from '@/api/personalCenter/index.js';
import { getfetchUrl } from '@/utils/getFileUrls.js';
import hchPoster from "@/components/hch-poster/index.vue"
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
			// 海报模板数据
			posterData: {
			  poster: {
			    //根据屏幕大小自动生成海报背景大小
			    r: 10, //圆角半径
			    w: 300, //海报宽度
			    h: 480, //海报高度
			    p: 20 //海报内边距padding
			  },
			  mainImg: {
			    //海报主商品图
			    url: 'https://ycbfiles.oss-cn-shenzhen.aliyuncs.com/public/wxmini/qrcode_back.png', //图片地址
			    r: 6, //圆角半径
			    w: 280, //宽度
			    h: 180 //高度
			  },
			  title: {
			    //商品标题
			    text: '带着问题来 拿着方案走 您身边的创业难题备份', //文本
			    fontSize: 15, //字体大小
			    color: '#333333', //颜色
			    lineHeight: 25, //行高
					align: 'center', //对齐方式
			    mt: 30 //margin-top
			  },
			  codeImg: {
			    //小程序码
			    url: 'https://huangchunhongzz.gitee.io/imgs/poster/code.png', //图片地址
			    w: 100, //宽度
			    h: 100, //高度
			    mt: 20, //margin-top
			    r: 50 //圆角半径
			  },
			  tips: [
			    //提示信息
			    {
			      text: '徐小凯', //文本
			      fontSize: 17, //字体大小
			      color: '#333333', //字体颜色
			      align: 'center', //对齐方式
			      lineHeight: 25, //行高
			      mt: 20 //margin-top
			    },
			    {
			      text: '技术总监CTO', //文本
			      fontSize: 12, //字体大小
			      color: '#999999', //字体颜色
			      align: 'center', //对齐方式
			      lineHeight: 25, //行高
			      mt: 20 //margin-top
			    }
			  ]
			}
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
			this.posterData.tips[0].name=res.name
			this.posterData.tips[1].name=res.realName
			console.log(this.userInfo);
		},
		shareEvn(){
			this.$refs['poster'].handleShowPoster()
		}
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
		z-index: 2;
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
