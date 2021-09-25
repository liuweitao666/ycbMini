<template>
	<view class="clue_wrap">
		<view class="clue_header">
			<!-- 商标部分 -->
			<view class="trademark">
				<view class="trade_left">商标</view>
				<view class="trade_right">
					<view class="trade_right_title">
						<view class="title">商标注册</view>
						<text class="date">2021-10-01 10:12</text>
					</view>
					<view class="card_desc">商标局已不强制要求提交转让公证书。但最好是去公证处做商标转让公证…</view>
				</view>
			</view>
			<!-- 联系方式 -->
			<view class="contact_info">
				<view class="phone">
					<u-icon name="phone" color="#8F9BB3" size="40"></u-icon>
					<text class="icon_text">13142174304</text>
				</view>
				<view class="weixin">
					<u-icon name="weixin-fill" color="#8F9BB3" size="40"></u-icon>
					<text class="icon_text">1332@qq.com</text>
				</view>
			</view>
			<!-- 沟通记录 -->
			<view class="work_record">
				<view class="item_record">
					<image src="/static/image/clueDetail/Filled.png" mode=""></image>
					<text>回收：4分12秒</text>
				</view>
				<view class="item_record">
					<image src="/static/image/clueDetail/data.png" mode=""></image>
					<text>跟进：5次</text>
				</view>
				<view class="item_record">
					<image src="/static/image/clueDetail/loop.png" mode=""></image>
					<text>流转：10次</text>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view class="custom_tabs clue_tabs">
			<view class="line"></view>
			<u-tabs
				name="cate_name"
				count="cate_count"
				:list="list"
				:height="100"
				inactive-color="#999"
				active-color="#333"
				:bar-style="tabStyle"
				bar-width="78"
				:is-scroll="false"
				:current="current"
				@change="change"
			></u-tabs>
		</view>
		<!-- 展示对应记录页面 -->
		<followup-log v-show="current===0"/>
		<circulation-log v-show="current===1"/>
		<operation-log v-show="current===2"/>
	</view>
</template>
<script>
	import followupLog from "./components/followupLog.vue"
	import circulationLog from "./components/circulationLog.vue"
	import operationLog from "./components/operationLog.vue"
export default {
	components:{
		followupLog,
		circulationLog,
		operationLog
	},
	data() {
		return {
			list: [{
				cate_name: '跟进记录'
			}, {
				cate_name: '跟进记录'
			}, {
				cate_name: '操作记录',
			}],
			// tabs底部滑块样式
			tabStyle:{
				background:"#007AC3",
			},
			// 当前tab栏
			current: 0,
		};
	},
	onLoad(option) {
		console.log(option);
	},
	methods: {
		// tabs 改变
		change(value){
			this.current = value
		}
	}
};
</script>
<style lang="scss">
.clue_wrap {
	.clue_header {
		background-color: #292b4d;
		padding: 30rpx;
		.trademark {
			display: flex;
			.trade_left {
				min-width: 162rpx;
				height: 162rpx;
				background: #d2e4f8;
				color: #ffffff;
				border-radius: 16rpx;
				margin-right: 20rpx;
				font-size: 42rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.trade_right {
				.trade_right_title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title {
						color: #ffffff;
						font-size: 48rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						letter-spacing: 2rpx;
					}
					.date {
						font-size: 12px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 17px;
					}
				}
				.card_desc {
					margin-top: 14rpx;
					line-height: 43rpx;
					color: #ffffff;
				}
			}
		}
		.contact_info {
			color: #ffffff;
			margin: 44rpx 0;
			font-size: 26rpx;
			display: flex;
			.icon_text {
				padding-left: 16rpx;
				line-height: 40rpx;
			}
			.phone {
				margin-right: 42rpx;
				display: flex;
				align-items: center;
			}
			.weixin {
				display: flex;
				align-items: center;
			}
		}
		.work_record {
			display: flex;
			justify-content: space-between;
			.item_record {
				width: 200rpx;
				height: 120rpx;
				background: rgba(255, 255, 255, 0.1);
				box-shadow: 0px 0px 14rpx 0px rgba(0, 0, 0, 0.13);
				border-radius: 10rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				color: #ffffff;
				font-size: 24rpx;
				text-align: center;
				image {
					width: 40rpx;
					height: 40rpx;
					display: block;
					margin: 16rpx auto;
				}
			}
		}
	}
	.clue_tabs{
		margin-top: 0;
		padding-right: 30rpx;
	}
}
</style>
