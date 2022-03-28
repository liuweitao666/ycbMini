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
			<view class="phone item" >
				<u-icon name="weixin-fill" color="#8F9BB3" size="40"></u-icon>
				<text class="icon_text">{{ detailData.wechat || '-' }}</text>
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
	</view>
</template>

<script>
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
		return {};
	}
};
</script>

<style lang="scss" scoped>
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
		padding:0 16rpx;
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
</style>
