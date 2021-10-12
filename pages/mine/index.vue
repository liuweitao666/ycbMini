<template>
	<view class="mine">
		<!-- 名片 -->
		<view class="business_card">
			<view class="mine_card">
				<u-avatar src="" size="120"></u-avatar>
				<view class="name">
					徐小凯
				</view>
				<view class="intro">
					技术总监CTO<br/>
					深圳市金信恒企业管理有限公司
				</view>
				<u-icon name="zhuanfa" class="zhuanfa" size="50"></u-icon>
			</view>
		</view>
		<view class="Kanban">
			<performance />
		</view>
	</view>
</template>

<script>
	import performance from './components/performance.vue';
	export default {
		components:{
			performance
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.mine{
		background-color: #FFFFFF;
		min-height: 100vh;
		.business_card{
			padding:48rpx 30rpx 128rpx;
			background-color: #292B4D;
			border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
			.mine_card{
				padding: 44rpx 48rpx;
				background-color: #ccc;
				border-radius: 26rpx;
				position: relative;
				.name{
					font-size: 54rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #9EE8FF;
					line-height: 74rpx;
				}
				.intro{
					color: #FFFFFF;
					line-height: 40rpx;
					font-size: 24rpx;
				}
				.zhuanfa{
					position: absolute;
					right: 48rpx;
					top: 44rpx;
					color: #FFFFFF;
				}
			}
		}
		.Kanban{
			margin-top: -80rpx;
		}
	}
</style>
