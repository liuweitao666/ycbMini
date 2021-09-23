<template>
	<view class="report">
		<view class="top">
			<!-- 黄色背景标题部分 -->
			<view class="top-back">
				<view class="title">
					<view class="icon">
						<!-- <image src="../../static/result_city.png" mode=""></image> -->
					</view>
					<view class="text_tit">
						<view class="top_title">
							金米科技
						</view>
						<view class="bottom">
							专属财税分析
						</view>
					</view>
				</view>
				<!-- top内容区域 -->
			</view>
			<view class="top_con">
				<view class="top_content">
					<view class="con_title">贵公司处于高速发展阶段：</view>
					<view class="con_main">
						企业规模正处于高速扩张阶段，面临的财务管理 和税务风险较大，财税专业化大多跟不上企业扩 张速度，容易造成税务稽查风险，并引发财务管 理混乱，财税管理水平可能跟不上企业竞争力急 速上升态势。
					</view>
				</view>
				<view class="con_desc">
					企业财税体检可以帮助您发现隐藏在业务流程的各个环节 财税风险！
				</view>
				<view class="analysis">
					贵公司{{reportList[3].optionContent}}，处理日常记账税 务工作，需要注意以下几点：
				</view>
			</view>
		</view>
		<!-- 答案解析部分 -->
		<view class="answer_ays bor-top">
			<view class="top">
				{{threeList[0]}}
			</view>
			<view class="question_answer" v-for="(item,index) in threeList" :key="index">
				<view class="" v-if="index!==0">
					<view class="question" >
						{{item.question}}
					</view>
					<view class="answer analysis">
						{{item.result}}
					</view>
				</view>
			</view>
		</view>
		<!-- 答案解析二 -->
		<view class="answer_ays bor-top">
			<view class="question_answer" v-for="(item,index) in reportList" :key="index">
				<view class="answer analysis grey">
					{{item.result}}
				</view>
			</view>
		</view>
		<!-- 优惠政策部分 -->
		<view class="policy bor-top">
			<view class="policy_tit">
				以下是为您推荐的中小微企业的优惠政策：
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">1</text>
					<text class="content">
						根据国家税务总局公告2019年第4号《国家税务总局关于小规模纳税人免征增值税政策有关征管问题的公告》进一步支持小微企业发展，自2019年1月1日至2021年12月31日，小规模纳税人发生增值税应税销售行为，合计月销售额未超过10万元（以1个季度为1个纳税期的，季度销售额未超过30万元，）的，免征增值税。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">2</text>
					<text class="content">
						根据财税[2019]13号
						《财政部税务总局关于实施小微企业普惠性税收减免政策的通知》进一步支持小微企业发展，自2019年1月1日至2021年12月31日，对小型微利企业年应纳税所得额不超过100万元的部分，减按25%计入应纳税所得额，按20%的税率缴纳企业所得税；对年应纳税所得额超过100万元但不超过300万元的部分，减按50%计入应纳税所得额，按20%的税率缴纳企业所得税。
						上述小型微利企业是指从事国家非限制和禁止行业，且同时符合年度应纳税所得额不超过300万元、从业人数不超过300人、资产总额不超过5000万元等三个条件的企业。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">3</text>
					<text class="content">
						根据财税〔2017〕34号《关于提高科技型中小企业研究开发费用税前加计扣除比例的通知》第一条规定：为进一步激励中小企业加大研发投入，科技型中小企业开展研发活动中实际发生的研发费用，未形成无形资产计入当期损益的，在按规定据实扣除的基础上，在2017年1月1日至2019年12月31日期间，再按照实际发生额的75%在税前加计扣除；形成无形资产的，在上述期间按照无形资产成本的175%在税前摊销。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">4</text>
					<text class="content">
						根据财税[2019]13号
						《财政部税务总局关于实施小微企业普惠性税收减免政策的通知》进一步支持小微企业发展，自2019年1月1日至2021年12月31日，由省、自治区、直辖市人民政府根据本地区实际情况，以及宏观调控需要确定，对增值税小规模纳税人可以在50%的税额幅度内减征资源税、城市维护建设税、房产税、城镇土地使用税、印花税（不含证券交易印花税）、耕地占用税和教育费附加、地方教育附加。
					</text>
				</view>
			</view>
		</view>
		<!-- 知识产权部分 -->
		<view class="policy bor-top">
			<view class="policy_tit">
				在知识产权问题上:
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">1</text>
					<text class="content">
						要有明确的知识产权战略,将知识产权纳入公司整体战略中，建立专利、商标、版权以及商业秘密等和产品相结合的战略。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">2</text>
					<text class="content">
						在申请专利时要仔细研读已公开的类似专利，知己知彼，才能百战百胜。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">3</text>
					<text class="content">
						寻找专业的专利申请撰写人撰写专利申请，预防后期可能遇到的专利侵权问题。。
					</text>
				</view>
			</view>
			<view class="policy_con">
				<view class="item">
					<text class="number">4</text>
					<text class="content">
						妥善处理技术秘密和申请专利保护之间的关系。对于-些较难保护和认定他人侵权的技术，如果企业完全可以控制其不被扩散，可以将其作为企业技术秘密予以保护，而不申请专利。
					</text>
				</view>
			</view>
		</view>
		<!-- 底部提交部分 -->
		<view class="asys_bottom">
			<view class="msg">
				依法为员工缴纳社保是企业的义务，也是企业的职责。根据《社会保险法》的规定，企业必须为每个员工缴纳社保。
			</view>
			<button type="default" open-type="share" class="share_submit">分享给朋友
				<u-icon style="margin-left: 10rpx;" name="share"></u-icon>
			</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportList: null,
				// 传递过来的参数
				navData: null,
				// 第三点
				threeList: null
			};
		},
		onShareAppMessage: function(e) {
			let title = '我的企业体检报告，快来看看吧'
			return {
				title: title,
				path: 'pages/index/report?id=1',
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'reportList',
				success: (res) => {
					this.reportList = res.data.filter((item, index) => {
						return index !== 2
					})
					let dataList = res.data[2].result.split('#')
					this.threeList = dataList.map((item, index) => {
						let arr = item.split('？')
						if (arr.length > 1) {
							return {
								question: arr[0],
								result: arr[1]
							}
						}
						return item
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.report {
		.bor-top {
			border-top: 30rpx solid #F3F3F4;
		}

		// 解析css
		.analysis {
			width: 682rpx;
			opacity: 1;
			background: #fff7ea;
			border-radius: 14rpx;
			padding: 21rpx;
			font-size: 32rpx;
			font-family: PingFang SC, PingFang SC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
			line-height: 50rpx;
		}
		.grey{
			color: #000;
			background-color: #FFFFFF;
			padding-top: 0;
		}
		.top {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 50rpx;

			// topback背景部分
			.top-back {
				background-color: #D4B381;
				width: 100%;
				height: 333rpx;
				padding: 34rpx;

				// 标题
				.title {
					display: flex;

					.icon {
						width: 50rpx;
						height: 50rpx;
						margin-right: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.text_tit {
						opacity: 1;
						font-family: PingFang SC, PingFang SC-Bold;
						color: #ffffff;
						color: #FFFFFF;

						.top_title {
							font-weight: 700;
							font-size: 36rpx;
							height: 50rpx;
							line-height: 50rpx;
						}

						.bottom {
							font-weight: 500;
							font-size: 32rpx;
							line-height: 50rpx;
							margin-top: 15rpx
						}
					}
				}


			}

			.top_con {
				width: 682rpx;
				margin-top: -140rpx;

				.top_content {
					height: 399rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 14rpx;
					box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.13);
					width: 100%;
					padding: 43rpx 47rpx;

					.con_title {
						font-size: 32rpx;
						font-family: PingFang SC, PingFang SC-Bold;
						font-weight: 700;
						color: #d9b884;
						line-height: 50rpx;
						margin-bottom: 25rpx;
					}

					.con_main {
						font-size: 28rpx;
						font-family: PingFang SC, PingFang SC-Medium;
						text-align: left;
						color: #333333;
						line-height: 50rpx;
					}
				}

				.con_desc {
					font-size: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					padding: 40rpx 20rpx;
					color: #999999;
					line-height: 40rpx;
				}

			}
		}



		// 答案解析部分
		.answer_ays {
			width: 100%;
			line-height: 50rpx;
			padding: 40rpx 34rpx;
			background-color: #FFFFFF;

			.top {
				font-size: 32rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				text-align: left;
				color: #333333;
				padding-bottom: 11rpx;
			}

			.question_answer {
				padding-top: 39rpx;

				.question {
					font-size: 30rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					text-align: left;
					color: #333333;
				}

				.answer {
					color: #999;
					margin-top: 20rpx;
					font-size: 30rpx;
					padding-left: 26rpx;
					padding-right: 26rpx;
					font-weight: normal;
				}
			}
		}

		// 优惠政策部分
		.policy {
			padding: 40rpx 34rpx;

			.policy_tit {
				font-weight: 700;
				font-size: 32rpx;
				line-height: 50rpx;
			}

			.policy_con {
				.item {
					margin: 30rpx 0;
					line-height: 40rpx;
					display: flex;

					.number {
						display: inline-block;
						background-color: #D4B381;
						width: 35rpx;
						height: 35rpx;
						min-width: 35rpx;
						line-height: 35rpx;
						color: #FFFFFF;
						margin-right: 15rpx;
						text-align: center;
						position: relative;
						top: 5rpx
					}

					.content {
						color: #999;
						letter-spacing: 2rpx;
						font-size: 26rpx;
						font-family: PingFang SC, PingFang SC-Medium;
					}
				}
			}
		}

		// 底部提交部分
		.asys_bottom {
			background-color: #F3F3F4;
			padding: 35rpx 34rpx;
			display: flex;
			flex-direction: column;

			.msg {
				line-height: 50rpx;
				color: #999;
			}

			.share_submit {
				width: 682rpx;
				height: 100rpx;
				opacity: 1;
				font-size: 28rpx;
				background: #d9b782;
				border-radius: 50px;
				line-height: 100rpx;
				color: #FFFFFF;
				margin-top: 50rpx;
			}
		}
	}
</style>
