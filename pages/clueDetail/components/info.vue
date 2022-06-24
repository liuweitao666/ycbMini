<template>
	<view class="">
		<view class="contact_title">基本信息</view>
		<view class="base_info">
			<view class="item" v-if="dataType === '1'">
				<text>意向度：</text>
				<u-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="10" size="26" v-model="detailData.intentionDegree"></u-rate>
			</view>
			<view class="item" v-else>
				<text>客户类型：</text>
				<text>{{ detailData.enterpriseTypeName }}</text>
			</view>
			<view class="item">
				<text>办理地址：</text>
				<text>{{ detailData.cityName ? detailData.provinceName + '-' + detailData.cityName : '暂无' }}</text>
			</view>
			<view class="item" v-if="dataType === '1'">
				<text>客户标签：</text>
				<text>{{ detailData.labels || '-' }}</text>
			</view>
			<view class="item" v-else>
				<text>业务类型：</text>
				<text>{{ detailData.goodsCategory || '-' }}</text>
			</view>
		</view>
		<view class="contact_title">联系方式</view>
		<!-- 联系方式 -->
		<view class="contact_info">
			<view class="phone item">
				<u-icon name="phone" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.phone || '-' }}</text>
				<u-icon name="file-text" v-if="detailData.phone" color="#8F9BB3" size="38" @click="$handleCopy(detailData.phone, '手机号')"></u-icon>
			</view>
			<view class="weixin item">
				<u-icon name="taobao" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.wangwang || '-' }}</text>
				<u-icon name="file-text" v-if="detailData.wangwang" color="#8F9BB3" size="38" @click="$handleCopy(detailData.wangwang, '旺旺号')"></u-icon>
			</view>
			<view class="weixin item">
				<u-icon name="server-fill" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.tel || '-' }}</text>
				<u-icon name="file-text" v-if="detailData.tel" color="#8F9BB3" size="38" @click="$handleCopy(detailData.tel, '电话')"></u-icon>
			</view>
			<view class="phone item">
				<u-icon name="weixin-fill" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.wechat || '-' }}</text>
				<u-icon name="photo" color="#8F9BB3" size="40" @click="codeVisible = true"></u-icon>
				<u-icon name="file-text" v-if="detailData.wechat" color="#8F9BB3" size="38" @click="$handleCopy(detailData.wechat, '微信号')"></u-icon>
			</view>
			<view class="weixin item">
				<u-icon name="qq-fill" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.qq || '-' }}</text>
				<u-icon name="file-text" v-if="detailData.qq" color="#8F9BB3" size="38" @click="$handleCopy(detailData.qq, 'qq')"></u-icon>
			</view>
			<view class="weixin item" v-if="detailData.email">
				<u-icon name="email-fill" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.email || '-' }}</text>
				<u-icon name="file-text" color="#8F9BB3" size="38" @click="$handleCopy(detailData.email, '邮箱')"></u-icon>
			</view>
		</view>
		<!-- 二维码弹框 -->
		<u-popup v-model="codeVisible" :custom-style="{ background: 'transparent' }" mode="center" length="80%" border-radius="14">
			<view class="m-qyWechatCode">
				<view class="qrcode_show">
					<image src="/static/image/clueDetail/qywechat.png" />
					<view class="code_wrap">
						<view class="title">
							请加我的
							<text class="qywechat">企业微信</text>
						</view>
						<image
							src="https://img2.baidu.com/it/u=2860188096,638334621&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656176400&t=c87b79529c96e0522cc4558df0ac6870"
							class="m-qrcode"
							show-menu-by-longpress="true"
						/>
						<!-- @click="saveToPhone" -->
						<view class="btn-footer">
							<button class="btn share" @click="share">分享</button>
							<button class="btn" @click="saveFile">保存</button>
						</view>
					</view>
				</view>
				<view class="close-code" @click="codeVisible = false"><u-icon name="close" size="20"></u-icon></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { saveFile, share } from '@/utils/util.js';
export default {
	props: {
		// 数据
		detailData: {
			type: Object,
			default: () => {}
		},
		dataType: {
			type: String,
			default: '0'
		}
	},
	data() {
		return {
			codeVisible: false
		};
	},
	methods: {
		// 分享图片
		share() {
			share('https://img2.baidu.com/it/u=2860188096,638334621&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656176400&t=c87b79529c96e0522cc4558df0ac6870');
		},
		saveFile(key) {
			saveFile('ycb/000000/clue-followup/2022/06/24/1656062158201.jpg');
		}
	}
};
</script>

<style lang="scss">
.contact_title {
	font-size: 28rpx;
	font-weight: 600;
	color: #ffffff;
	padding-top: 20rpx;
}
.contact_info {
	color: #ffffff;
	margin: 20rpx 0;
	font-size: 26rpx;
	display: flex;
	flex-wrap: wrap;
	.item {
		width: 50%;
		padding-right: 16rpx;
		display: flex;
		align-items: center;
		padding-bottom: 10rpx;
	}
	.icon_text {
		padding: 0 16rpx;
		line-height: 40rpx;
	}
}
.base_info {
	font-size: 26rpx;
	.item {
		padding-top: 10rpx;
		color: #ffffff;
	}
}

.m-qyWechatCode {
	width: 544rpx;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.qrcode_show {
		width: 100%;
		height: 716rpx;
		position: relative;
		image {
			width: 100%;
			height: 100%;
		}
		.code_wrap {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			.title {
				font-size: 32rpx;
				font-weight: 400;
				color: #ffffff;
				line-height: 44rpx;
				margin: 44rpx 0 74rpx;
				.qywechat {
					font-size: 44rpx;
				}
			}
			.m-qrcode {
				width: 256rpx;
				height: 256rpx;
			}
		}
	}
	.btn-footer {
		display: flex;
		justify-content: center;
		width: 100%;
		.btn {
			width: 40%;
			height: 82rpx;
			line-height: 82rpx;
			border-radius: 60rpx;
			color: #493a78;
			font-size: 26rpx;
			background: linear-gradient(174deg, #e0d6ff 0%, #f9f7ff 0%, #c9b8ff 100%);
			box-shadow: 0px 8rpx 12rpx 0px #302554;
			margin-top: 140rpx;
		}
		.share {
			margin-right: 20rpx;
			background-image: linear-gradient(to right, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
			color: #333333;
		}
	}

	.close-code {
		margin-top: 78rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 76rpx;
		height: 76rpx;
		background: rgba($color: #d8d8d8, $alpha: 0.3);
		color: #fff;
		border-radius: 50%;
	}
}
</style>
