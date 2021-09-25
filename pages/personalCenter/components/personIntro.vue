<template>
	<view class="person_intro introduce">
		<view class="content">
			<view class="top">
				<view class="item">
					<text class="label">服务订单：</text>
					<text>637单</text>
				</view>
				<view class="item">
					<text class="label">服务订单：</text>
					<u-rate :current="3.7" active-color="#FFA501" inactive-color="#FFA501" :disabled="true"></u-rate>
					<text style="color:#FFA501;padding-left:8rpx">3.7</text>
				</view>
				<view class="item">
					<text class="label">服务订单：</text>
					<view class="item_right">
						<u-icon name="checkmark-circle"></u-icon>
						<text>
							执业认证
						</text>
						<u-icon name="checkmark-circle"></u-icon>
						<text class="">实名认证</text>
					</view>
				</view>
				<view class="intro_for_audio item">
					<view style="height: 90rpx;">
						<u-avatar size="90"></u-avatar>
					</view>
					<view class="audio_wrap">
						<u-icon name="wifi" class="audio_icon"></u-icon>
					</view>
					<text class="audio_time">20s</text>
				</view>
			</view>
			<view class="bottom">
				<view class="card_title">
					个人职称
				</view>
				<view class="card_desc title">
					<view class="flex_li">
						·中国注册会计师(CPA)
					</view>
					<view class="flex_li">
						·中国注册会计师(CPA)
					</view>
					<view class="flex_li">
						·中国注册会计师(CPA)
					</view>
					<view class="flex_li">
						·中国注册会计师(CPA)
					</view>
				</view>
			</view>
		</view>
	
		<view class="card">
			<view class="card_title">个人经历</view>
			<view class="card_desc">
				2020年5月创建深圳金米税务师事务所有限公司
				<br />
				2020年4月创建金米创客空间
				<br />
				2019年就读厦门大学工商管理硕士(MBA)
				<br />
				2019年3月任金米科技有限公司财务总监
				<br />
				2018年3月任谷川联行有限公司高级税务顾问
				<br />
				2016年12月任金米(深圳)投资管理有限公司(金米科技有限公司前身)产品经理
				<br />
				2015年7月任顺丰速运有限公司企划储备干部
				<br />
				2015年6月毕业于华南师范大学经济学专业
				<br />
			</view>
		</view>
		<view class="card">
			<view class="card_title">服务范围</view>
			<view class="card_desc">
				企业战略规划、战略执行与落地体系、流程再造和优化、企业内训体系规划、财务咨询、税务筹划、财务战略规划、全面风险管理体系搭建、投融资规划、财务数字化与信息化规划、财务共享服务搭建、创业指导与培训。
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['data'],
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
	.person_intro{
		.content{
			.top{
				padding:20rpx 30rpx;
				.item{
					padding-top: 20rpx;
					.label{
						padding-right: 6rpx;
						color: #999;
					}
					.item_right{
						color: #FFA501;
						display: inline-block;
						text{
							padding:0rpx 15rpx;
						}
					}
				}
				.intro_for_audio{
					display: flex;
					align-items: center;
					.audio_wrap{
						width: 290rpx;
						height: 70rpx;
						background: #A0E75A;
						border: 1px solid #84D55A;
						position: relative;
						padding-left: 30rpx;
						margin-left: 40rpx;
						border-radius: 6rpx;
						display: flex;
						align-items: center;
						&::before{
							content: '';
							position: absolute;
							width: 30rpx;
							height: 30rpx;
							border-radius: 4rpx;
							background-color: #A0E75A;
							left: -15rpx;
							top: 50%;
							transform: translateY(-50%) rotate(45deg);
						}
						.audio_icon{
							color: #70A13F;
							font-size: 30rpx;
							transform: rotate(90deg);
						}
					}
					.audio_time{
						padding-left: 20rpx;
						color: #999999;
						font-size: 24rpx;
					}
				}
			}
			// 底部
			.bottom{
				border-top: 1px solid #EDEDED;
				padding: 30rpx;
				.title{
					display: flex;
					flex-wrap: wrap;
					.flex_li{
						width: 50%;
					}
				}
			}
		}
				
	}
</style>
