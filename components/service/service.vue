<template>
	<!-- 更多服务 -->
	<view class="service">
		<view class="title">
			<view class="text">没有想要的服务？专家顾问一对一为您定制方案</view>
		</view>
		<view class="ser_content">
			<view class="ser_top">
				<view class="top_item" v-for="(item,index) in list" :key="index" @click="selected(item)">
					+{{item.label}}
				</view>
			</view>
			<view class="ser_main">
				<view class="input_ser">
					<view class="input_label">
						我需要：
					</view>
					<input class="input" v-model="label" type="text" placeholder="请点击按钮添加" disabled />
				</view>
				<view class="input_ser">
					<view class="input_label">
						手机号：
					</view>
					<input class="input" v-model="phone" type="text" disabled="" />
				</view>
			</view>
			<view class="ser_bottom">
				<view class="desc">
					<view class="text">信息保密</view>
					<view class="text">价格透明</view>
					<view class="text">官方服务</view>
				</view>
				<button class="ser_submit" @click="submitService">提交</button>
			</view>
		</view>
		<Dialog title="方案正在生成，稍后会有专家顾问联系您，为您做详细的分析。" ref="report" />
	</view>
</template>

<script>
	import dialog from '../dialog/dialog.vue'
	export default {
		components: {
			dialog
		},
		props: {
			phone: ''
		},
		data() {
			return {
				list: [{
					label: '公司注册',
					value: '1'
				}, {
					label: '代理记账',
					value: '4',
				}, {
					label: '软件研发',
					value: '9',
				}, {
					label: '更多业务',
					value: '10',
				}],
				queryInfo: {
					utilType: '',
					remark: ''
				},
				label: '',
				show: false
			};
		},
		computed: {

		},
		onLoad() {},
		methods: {
			submitService() {
				if(!this.label){
					return uni.showToast({
						title:"业务不能为空",
						icon:'none'
					})
				}
				this.queryInfo.remark = this.label + '#' + this.phone
				uni.showLoading({
					title: '请稍后',
				})
				this.$api.AddChance({
					utilType: 4,
					...this.queryInfo
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						uni.hideLoading()
						this.$refs.report.show = true
					}
				}).catch(err => {
					console.log(err)
				})
			},
			selected(item) {
				this.label = item.label
				this.queryInfo.utilType = item.value
			}
		}
	}
</script>

<style lang="scss">
	// 公共服务部分
	.service {
		margin-top: 50rpx;
		width: 682rpx;
		margin: 0 auto;
		opacity: 1;
		background: #ffffff;
		border: 1px solid #e5c084;
		border-radius: 20rpx;
		overflow: hidden;

		.title {
			width: 682rpx;
			height: 73rpx;
			opacity: 1;
			background: linear-gradient(180deg, #d6b076, #f5d294 52%, #d6b076);
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				width: 576rpx;
				height: 37rpx;
				opacity: 1;
				font-size: 26rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				text-align: left;
				color: #ffffff;
				line-height: 38rpx;
				letter-spacing: 1rpx;
			}
		}

		.ser_content {
			padding: 30rpx;

			.ser_top {
				display: flex;
				justify-content: space-between;

				.top_item {
					width: 103rpx;
					height: 29rpx;
					opacity: 1;
					background: rgba(216, 178, 120, 0.28);
					border: 1px solid #d8b278;
					border-radius: 5rpx;
					text-align: center;
					font-size: 16rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #d8b278;
					line-height: 29rpx;
					letter-spacing: 0px;
				}
			}

			.ser_main {
				.input_ser {
					display: flex;
					align-items: center;
					padding-top: 20rpx;

					.input_label {
						width: 96rpx;
						opacity: 1;
						font-size: 24rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: left;
						color: #333333;
						line-height: 34px;
					}

					.input {
						flex: 1;
						height: 33rpx;
						line-height: 33rpx;
						font-size: 24rpx;
						border-bottom: 1px solid #eeeeee;
					}
				}
			}

			.ser_bottom {
				.desc {
					display: flex;

					.text {
						width: 103rpx;
						height: 29rpx;
						opacity: 1;
						background: #f4f4f4;
						border-radius: 15rpx;
						font-size: 16rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						font-weight: 500;
						text-align: center;
						color: #999999;
						line-height: 31rpx;
						margin-right: 68rpx;
						margin-top: 30rpx;
					}
				}

				.ser_submit {
					width: 244rpx;
					height: 64rpx;
					margin-top: 30rpx;
					opacity: 1;
					background: linear-gradient(180deg, #1d1f24, #393f47);
					border-radius: 32rpx;
					box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Bold;
					font-weight: 700;
					text-align: center;
					color: #d8b278;
					line-height: 64rpx;
					letter-spacing: 1rpx;
				}
			}
		}
	}
</style>
