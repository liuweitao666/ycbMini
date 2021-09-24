<template>
	<view>
		<nav-bar :navList="navList" @change="changeTab" :isSearch="true" :isLine="true" :isAvatar="true"></nav-bar>
		<!-- 首页业绩看板 -->
		<view class="swiper_wrap">
			<swiper class="swiper" @change="change">
					<swiper-item>
							<view class="swiper-item">
								<!-- 标题 -->
								<view class="header">
									<view class="title">
										个人业绩看板
									</view>
									<view class="date">
										今天
									</view>
								</view>
								<!-- 内容 -->
								<view class="content">
									<view class="con_item">
											<view class="title add_bg">
												新增
											</view>
											<view class="item_block" v-for="(item,index) in content" :key="index">
												<view class="item_block_label">
													{{item.label}}
												</view>
												<view class="item_block_desc">
													{{item.desc}}
												</view>
											</view>
									</view>
									<view class="con_item">
											<view class="title genjin_bg">
												跟进
											</view>
											<view class="item_block" v-for="(item,index) in content" :key="index">
												<view class="item_block_label">
													{{item.label}}
												</view>
												<view class="item_block_desc">
													{{item.desc}}
												</view>
											</view>
									</view>
									<view class="con_item">
											<view class="title deal">
												成交
											</view>
											<view class="item_block" v-for="(item,index) in content" :key="index">
												<view class="item_block_label">
													{{item.label}}
												</view>
												<view class="item_block_desc">
													{{item.desc}}
												</view>
											</view>
									</view>
								</view>
							</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item">B</view>
					</swiper-item>
					<swiper-item>
							<view class="swiper-item">C</view>
					</swiper-item>
			</swiper>
			<view class="dot">
				<view v-for="(item,index) in dots" :key="index" :class="['item',{'dot_active':index===swiperActive}]">
				</view>
			</view>
		</view>
		<view class="main">
			<view class="section">
				<view class="screen section_content">
					<u-dropdown>
						<u-dropdown-item v-model="value1" title="距离" menu-icon="arrow-down-fill" :options="options1"></u-dropdown-item>
						<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
						<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
						<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
					</u-dropdown>
				</view>
				<view class="section_content">
					<view class="left">
						<view class="title">
							分享是学习他姥姥
						</view>
						<view class="text_desc">2019-02-15 20:05:30</view>
						<view class="text_desc">长沙/商标</view>
					</view>
					<view class="right">
						<image src="@/static/image/home/phone.png" mode=""></image>
					</view>
				</view>
				<view class="section_content">
					<view class="left">
						<view class="title">
							分享是学习他姥姥
						</view>
						<view class="text_desc">2019-02-15 20:05:30</view>
						<view class="text_desc">长沙/商标</view>
					</view>
					<view class="right">
						<image src="@/static/image/home/phone.png" mode=""></image>
					</view>
				</view>
				<view class="section_content">
					<view class="left">
						<view class="title">
							分享是学习他姥姥
						</view>
						<view class="text_desc">2019-02-15 20:05:30</view>
						<view class="text_desc">长沙/商标</view>
					</view>
					<view class="right">
						<image src="@/static/image/home/phone.png" mode=""></image>
					</view>
				</view>
				<view class="section_content">
					<view class="left">
						<view class="title">
							分享是学习他姥姥
						</view>
						<view class="text_desc">2019-02-15 20:05:30</view>
						<view class="text_desc">长沙/商标</view>
					</view>
					<view class="right">
						<image src="@/static/image/home/phone.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="footer">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return {
			navList:[{
				cate_name: '待收货'
			}, {
				cate_name: '待付款'
			},],
			// 轮播数据
			swiperActive:0,
			dots:['','',''],
			content:[
				{
					label:'98',
					desc:'线索',
				},
				{
					label:'98',
					desc:'线索',
				},
				{
					label:'98',
					desc:'线索',
				}
			],
			value1:'',
			value2:'',
			options1: [
				{
					label: '默认排序',
					value: 1,
				},
				{
					label: '距离优先',
					value: 2,
				},
				{
					label: '价格优先',
					value: 3,
				}
			],
			options2: [{
					label: '去冰',
					value: 1,
				},
				{
					label: '加冰',
					value: 2,
				}
			]
		}
	},
	methods:{
		changeTab(){
			
		},
		// 轮播图变化
		change(data){
			const {current} = data.detail
			this.swiperActive = current
		}
	}
};
</script>

<style lang="scss" scoped>
	.main{
		padding: 30rpx;
		.section{
			.section_content{
				width: 100%;
				background: #FFFFFF;
				box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				margin-bottom: 30rpx;
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left{
					font-family: PingFangSC-Regular, PingFang SC;
					.title{
						font-size: 28rpx;
						font-weight: 600;
						color: #333333;
						line-height: 32rpx;
					}
					.text_desc{
						font-size: 24rpx;
						font-weight: 400;
						color: #A4B0BE;
						line-height: 26rpx;
						padding-top: 12rpx;
					}
				}
				.right{
					width: 48rpx;
					height: 48rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.screen{
				padding:0
			}
		}
		
	}
	.swiper{
		height: 498rpx;
		padding-right: 30rpx;
		margin-top: 30rpx;
		.swiper-item{
			height: 100%;
			margin-left:30rpx;
			background: #015ABC;
			box-shadow: 0px 0px 10px 0px rgba(104, 103, 139, 0.08);
			border-radius: 16rpx;
			.header{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				border-bottom: 2px solid rgba($color: #EDEDED, $alpha: 0.2);
				.title{
					width: 196rpx;
					height: 44rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 44rpx;
				}
				.date{
					width: 106rpx;
					height: 40rpx;
					line-height: 40rpx;
					background: #FC961E;
					border-radius: 30rpx;
					color: #fff;
					font-size: 24rpx;
					text-align: center;
				}
			}
			.content{
				display: flex;
				.con_item{
					width: 33.33%;
					color: #FFFFFF;
					border-right: 1px dashed #2B77CB;
					text-align: center;
					&:last-child{
						border-right: none;
					}
					.title{
						width: 132rpx;
						height: 44rpx;
						margin: 20rpx auto 0;
						border-radius: 8rpx;
					}
					.add_bg{
						background: #54C3F1;
					}
					.genjin_bg{
						background: #4CE1A7;
					}
					.deal{
						background: #66CD4C;
					}
					padding: 0 30rpx;
					.item_block{
						width: 166rpx;
						height: 80rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						background: rgba(255, 255, 255, 0.1);
						border-radius: 8rpx;
						border: 2rpx solid rgba(255, 255, 255, 0.2);
						text-align: center;
						margin-top: 20rpx;
						.item_block_label{
							font-size: 28rpx;
							font-family: Impact;
							line-height: 26rpx;
						}
						.item_block_desc{
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							line-height: 32rpx;
							padding-top: 5rpx;
						}
					}
				}
			}
		}
	}
	.dot{
		margin: 20rpx auto 0rpx;
		display: flex;
		justify-content: center;
		
		.item{
			width: 14rpx;
			height: 14rpx;
			background: #2D4EF5;
			opacity: .2;
			border-radius: 50%;
			margin: 0 8rpx;
		}
		.dot_active{
			opacity: 1;
		}
	}
</style>
