<template>
	<view>
		<audio :src="audioSrc" class="audio"></audio>
		<nav-bar @change="changeNav" :isBackground="true" title="徐小凯" height="482rpx"></nav-bar>
		<view class="main">
			<!-- 卡片 -->
			<view class="card">
				<view class="header">
					<u-avatar :src="src" :size="160"></u-avatar>
					<view class="info">
						<view class="name">
							徐小凯
						</view>
						<view class="desc">
							技术总监CTO
						</view>
						<view class="desc company">
							深圳市金信恒企业管理有限公司
						</view>
					</view>
				</view>
			  <view class="contact">
			  	<view class="item">
			  		<view class="left">
			  			<u-icon name="phone" color="#fff" :hair-line="false" size="44"></u-icon>
							<text class="left_text">192-100-230</text>
			  		</view>
						<u-button size="mini" shape="circle" :custom-style="customContact">立即联系</u-button>
						<!-- <u-button type="warning" size="mini" shape="circle" class="button phone_btn">
							立即联系
						</u-button> -->
			  	</view>
					<view class="item">
						<view class="left">
							<u-icon name="email" color="#fff" size="44"></u-icon>
							<text class="left_text">jingxh@163.com</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customStyle">点击复制</u-button>
					</view>
					<view class="item">
						<view class="left">
							<u-icon name="weixin-fill" color="#fff" size="44"></u-icon>
							<text class="left_text">xukai666</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customStyle">点击复制</u-button>
					</view>
			  </view>
			</view>
			<!-- 一键分享 存入通讯录 -->
			<view class="share">
				<button class="share_btn">一键分享</button>
				<button class="save_btn">存入通讯录</button>
			</view>
			<!-- introduce 介绍tabs -->
			<view class="introduce_tabs">
				<u-tabs name="cate_name" 
				count="cate_count" 
				:list="list"
				:height="100"
				active-color="#333"
				:bold="false"
				:bar-style="tabStyle"
				:is-scroll="false" 
				:current="current" 
				@change="change"></u-tabs>
				<!--  -->
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
			</view>
			<!-- 个人介绍 -->
			<person-intro v-show="current===0" />
			<!-- 我的业务 -->
			<enterprise-intro v-show="current===1" />
			<!-- 业务介绍 -->
			<business-intro v-show="current===2" />
		</view>
		<!-- footer -->
		<person-footer />
	</view>
</template>

<script>
	import personIntro from "./components/personIntro.vue"
	import personFooter from "./components/footer.vue"
	import enterpriseIntro from "./components/enterpriseIntro.vue"
	import businessIntro from "./components/businessIntro.vue"
	export default {
		components:{
			personIntro,
			personFooter,
			businessIntro,
			enterpriseIntro
		},
		data(){
			return{
				// 音频文件
				audioSrc:'',
				navList:[{
					cate_name: '待收货'
				}, {
					cate_name: '待付款'
				},],
				customStyle:{
					color:"#fff",
					background: "#2674CC",
					opacity: "0.9",
					border:"none"
				},
				// 联系按钮样式
				customContact:{
					color:"#fff",
					background:"#FC961E",
				},
				// tabs底部滑块样式
				tabStyle:{
					background:"#00A4FF",
				},
				list: [{
					cate_name: '个人介绍'
				}, {
					cate_name: '我的企业'
				}, {
					cate_name: '业务介绍',
					cate_count: 5
				}],
				// 当前tab栏
				current: 0,
				// 个人中心数据
				personData:null,
				// 我的企业数据
				myEnterpriseData:null,
				// 业务数据
				businessData:null,
			}
		},
		methods: {
			changeNav(value){
				console.log(value)
			},
			// tabs 改变
			change(value){
				this.current = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		padding: 30rpx 30rpx 0;
		margin-top: -228rpx;
		position: relative;
		z-index: 999;
		.card{
			background-color: #015ABC;
			padding: 30rpx;
			border-radius: 20rpx;
			.header{
				padding-bottom: 24rpx;
				border-bottom: 1px solid #96C7FF;
				display: flex;
				align-items: center;
				.info{
					color: #fff;
					padding-left: 36rpx;
					.name{
						font-size: 44rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 30px;
					}
					.desc{
						padding-top: 6rpx;
						font-size: 28rpx;
					}
					.company{
						font-size: 24rpx;
					}
				}
			}
			// 联系方式
			.contact{
				.item{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					display: flex;
					margin-top: 34rpx;
					justify-content: space-between;
					.left{
						display: flex;
						align-items: center;
						.left_text{
							padding-left: 16rpx;
						}
					}
					.button{
						width: 134rpx;
						height: 48rpx;
						line-height: 48rpx;
						text-align: center;
						background: #2674CC;
						opacity: 0.9;
						box-shadow: 0px 0px 4px 0px rgba(8, 77, 154, 0.12);
						border-radius: 30rpx;
						color:#FFFFFF;
						font-size: 24rpx;
					}
					.phone_btn{
						background: #FC961E;
					}
				}
			}
		}
		.share{
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			button{
				width: 330rpx;
				height: 80rpx;
				box-shadow: 0px 0px 28rpx 0px rgba(132, 131, 169, 0.12);
				border-radius: 48rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				border: 0;
			}
			.share_btn{
				background: #FFF;
				color: #00A4FF;
			}
			.save_btn{
				background: #00A4FF;
				color: #fff;
			}
		}
		.introduce_tabs{
			background: #FFFFFF;
			box-shadow: 0px 0px 20rpx 0px rgba(104, 103, 139, 0.08);
			border-radius: 16rpx;
			margin-top: 30rpx;
			overflow: hidden;
			.content{
				margin-top: -10rpx;
				.top{
					border-top: 1px solid #EDEDED;
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
		//
	}
	.audio{
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
