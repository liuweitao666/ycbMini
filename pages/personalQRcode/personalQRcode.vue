<template>
	<view class="QRcode">
		<canvas canvas-id="myCanvas" class="myCanvas" :style="{ width: canvasWidth, height: canvasHeight }" v-if="true"></canvas>
		<!-- 底部描述图片 -->
		<view class="footer_desc"><image src="../../static/image/QRcode/footer_desc.png" mode="widthFix"></image></view>
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
				<text @click="drawPageImg">保存照片至相册</text>
			</view>
		</view>
	</view>
</template>

<script>
import { createCardCode, getUserInfo } from '@/api/personalCenter/index.js';
import { getfetchUrl } from '@/utils/getFileUrls.js';
export default {
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
			imgUrl: require('@/static/image/QRcode/logo.png')
		};
	},
	onLoad({ user_id, tenant_id }) {
		// 设置画布宽高
		uni.getSystemInfo({
			success: res => {
				// console.log(res)
				this.canvasWidth = res.screenWidth + 'px';
				this.ratio = 750 / res.screenWidth;
				this.canvasHeight = 1000 / this.ratio + 'px';
			}
		});
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
		// 绘制圆角矩形
		/**
		 *
		 * @param {*} x 起始x坐标
		 * @param {*} y 起始y坐标
		 * @param {*} width 矩形宽度
		 * @param {*} height 矩形高度
		 * @param {*} r 矩形圆角
		 * @param {*} bgcolor 矩形填充颜色
		 * @param {*} lineColor 矩形边框颜色
		 */
		rectangle(ctx, x, y, width, height, r, bgcolor, lineColor) {
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + width - r, y);
			ctx.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
			ctx.lineTo(x + width, y + height - r);
			ctx.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
			ctx.lineTo(x + r, y + height);
			ctx.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
			ctx.lineTo(x, y + r);
			ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
			ctx.fillStyle = bgcolor;
			ctx.strokeStyle = lineColor;
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		},
		// 使用画布绘制页面
		drawPageImg() {
			let _this = this;
			// 生成画布
			const ctx = uni.createCanvasContext('myCanvas');
			// 获取微信头像的临时地址
			let headImg = this.userInfo.avatar;
			// 绘制矩形
			this.rectangle(ctx, 55 / _this.ratio, 50 / _this.ratio, 640 / _this.ratio, 860 / _this.ratio, 8 / _this.ratio, '#fff', '#e4e4e4');

			// 绘制直线
			ctx.beginPath(); //开始绘制
			ctx.moveTo(55 / _this.ratio, 264 / _this.ratio); //起点
			ctx.lineTo(695 / _this.ratio, 264 / _this.ratio); //终点
			ctx.lineWidth = 1; // 设置线的宽度，单位是像素
			ctx.strokeStyle = '#e4e4e4'; //设置线的颜色
			// ctx.stroke(); //进行绘制
			
			ctx.drawImage(_this.imgUrl, 55 / _this.ratio, 0 / _this.ratio, 640 / _this.ratio, 180 / _this.ratio, 85 / _this.ratio, 112 / _this.ratio); //描绘图片
			// 绘制头像
			ctx.save(); // 先保存状态 已便于画完圆再用
			ctx.beginPath(); //开始绘制
			//先画个圆
			ctx.arc(130 / _this.ratio, 157 / _this.ratio, 45 / _this.ratio, 0, Math.PI * 2, false);
			ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
			ctx.drawImage(headImg, 85 / _this.ratio, 220 / _this.ratio, 90 / _this.ratio, 90 / _this.ratio, 85 / _this.ratio, 112 / _this.ratio); //描绘图片
			ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制

			// 绘制微信名称
			ctx.font = 32 / _this.ratio + 'px';
			ctx.fillStyle = '#212121';
			ctx.fillText(_this.userInfo.realName, 205 / _this.ratio, 110 / _this.ratio); //描绘文本

			// 绘制个性签名以及个性签名自动换行
			var temp = '';
			var row = [];

			let gxqm = '';
			if (this.userInfo.name) {
				gxqm = this.userInfo.name;
			} else {
				gxqm = '未设置职称';
			}

			let gexingqianming = gxqm.split('');
			let x = 205 / _this.ratio;
			let y = 110 / _this.ratio;
			let w = 320 / _this.ratio;
			for (var a = 0; a < gexingqianming.length; a++) {
				if (ctx.measureText(temp).width < w) {
				} else {
					row.push(temp);
					temp = '';
				}
				temp += gexingqianming[a];
			}
			row.push(temp);
			ctx.font = 24 / _this.ratio + 'px';
			ctx.fillStyle = '#9E9E9E';
			for (var b = 0; b < row.length; b++) {
				ctx.fillText(row[b], x, y + (b + 1) * 20);
			}
			// 绘制文字
			ctx.font = 24 / _this.ratio + 'px PingFangSC-Light';
			ctx.fillStyle = '#212121';
			ctx.textAlign = 'center';
			ctx.fillText('带着问题来 拿着方案走,您身边的创业难题解决专家', 375 / _this.ratio, 420 / _this.ratio); //描绘文本

			// 把二维码图片绘制到画布中
			ctx.drawImage(_this.imgUrl, 205 / _this.ratio, 375 / _this.ratio, 340 / _this.ratio, 180 / _this.ratio, 190 / _this.ratio, 375 / _this.ratio); //描绘图片

			

			// // 绘制文字
			// ctx.font = 28 / _this.ratio + 'px PingFangSC-Regular';
			// ctx.fillStyle = '#212121';
			// ctx.textAlign = 'center';
			// ctx.fillText('加入保客多多，加入我的团队', 375 / _this.ratio, 788 / _this.ratio); //描绘文本

			// 渲染画布
			ctx.draw(
				false,
				(() => {
					setTimeout(() => {
						uni.canvasToTempFilePath(
							{
								canvasId: 'myCanvas',
								destWidth: _this.cropW * 2, //展示图片尺寸=画布尺寸1*像素比2
								destHeight: _this.cropH * 2,
								quality: 1,
								fileType: 'jpg',
								success: res1 => {
									uni.hideLoading();
									console.log('通过画布绘制出的图片--保存的就是这个图', res1.tempFilePath);

									// 真正的保存图片画布绘制的图片到相册
									uni.saveImageToPhotosAlbum({
										filePath: res1.tempFilePath,
										success: function() {
											uni.showToast({
												icon: 'none',
												position: 'bottom',
												title: '已保存到系统相册'
											});
										},
										fail: function(error) {
											uni.showModal({
												title: '提示',
												content: '若点击不授权，将无法使用保存图片功能',
												cancelText: '不授权',
												cancelColor: '#999',
												confirmText: '授权',
												confirmColor: '#f94218',
												success(res4) {
													console.log(res4);
													if (res4.confirm) {
														// 选择弹框内授权
														uni.openSetting({
															success(res4) {
																console.log(res4.authSetting);
															}
														});
													} else if (res4.cancel) {
														// 选择弹框内 不授权
														console.log('用户点击不授权');
													}
												}
											});
										}
									});
								},
								fail: function(error) {
									uni.hideLoading();
									console.log(error);
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: '绘制图片失败' // res.tempFilePath
									});
								}
							},
							_this
						);
					}, 500);
				})()
			);
		}
	}
};
</script>

<style lang="scss">
	.myCanvas{
		position: absolute;
		z-index: -99;
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
