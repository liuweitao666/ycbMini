<template>
	<view id="personCenter">
		<audio :src="audioSrc" class="audio"></audio>
		<nav-bar :isBackground="true" :Home="isHome" :title="personData.realName" :isBack="isBack" height="482rpx"></nav-bar>
		<view class="main">
			<!-- 卡片 -->
			<view class="card">
				<view class="header">
					<u-avatar :src="src" :size="160"></u-avatar>
					<view class="info">
						<view class="name">
							<text>{{ personData.realName }}</text>
						</view>
						<view class="desc">{{ personData.name || '暂无' }}</view>
						<view class="desc company">{{ personData.tenantName }}</view>
					</view>
					<u-icon name="weixin-circle-fill" @click="jumpTo" class="qr_code"></u-icon>
				</view>
				<view class="contact">
					<view class="item">
						<view class="left">
							<u-icon name="phone" color="#fff" :hair-line="false" size="44"></u-icon>
							<text class="left_text">{{ personData.phone }}</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customContact" @click="phoneCall">立即联系</u-button>
					</view>
					<view class="item">
						<view class="left">
							<u-icon name="email" color="#fff" size="44"></u-icon>
							<text class="left_text">{{ personData.email }}</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customStyle" @click="handleCopy(personData.email)">点击复制</u-button>
					</view>
					<view class="item">
						<view class="left">
							<u-icon name="weixin-fill" color="#fff" size="44"></u-icon>
							<text class="left_text">{{ personData.wechat }}</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customStyle" @click="handleCopy(personData.wechat)">点击复制</u-button>
					</view>
				</view>
			</view>
			<!-- 一键分享 存入通讯录 -->
			<view class="share">
				<button class="share_btn" open-type="share">一键分享</button>
				<button class="save_btn" @click="savePhone">存入通讯录</button>
			</view>
			<!-- introduce 介绍tabs -->
			<view class="custom_tabs">
				<!-- tab 对应内容 -->
				<view class="line"></view>
				<u-tabs
					name="cate_name"
					count="cate_count"
					:list="list"
					:height="100"
					active-color="#333"
					:bold="false"
					:bar-style="tabStyle"
					:is-scroll="false"
					:current="current"
					@change="change"
				></u-tabs>
			</view>
			<!-- 个人介绍 -->
			<person-intro v-show="current === 0" :data="personData" />
			<!-- 我的业务 -->
			<enterprise-intro v-show="current === 1" :data="myEnterpriseData" />
			<!-- 业务介绍 -->
			<business-intro v-show="current === 2" />
		</view>
		<!-- footer -->
		<view class="logo"><image src="/static/image/personalCenter/logo.png" mode=""></image></view>

		<view class="spacing"></view>
		<person-footer :hidden="hiddenFooter">
			<view class="footer_left">
				<view class="wechat">
					<view><u-icon name="chat" size="60"></u-icon></view>
					<text>微信</text>
				</view>
				<view class="email">
					<view><u-icon name="email" size="60"></u-icon></view>
					<text>邮箱</text>
				</view>
			</view>
			<u-button type="primary" :custom-style="customContact" @click="phoneCall">拨打电话</u-button>
		</person-footer>
	</view>
</template>

<script>
// 导入组件
import personIntro from './components/personIntro.vue';
import personFooter from '@/components/footer/footer.vue';
import enterpriseIntro from './components/enterpriseIntro.vue';
import businessIntro from './components/businessIntro.vue';
import { mapGetters } from 'vuex';
import { getUserInfo, getTenantInfo } from '@/api/personalCenter/index.js';
export default {
	components: {
		personIntro,
		personFooter,
		businessIntro,
		enterpriseIntro
	},
	// 监听页面滚动
	onPageScroll(e) {
		// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		this.scrollTop = e.scrollTop;
		// console.log('滚动距离：'+this.scrollTop,'可滚动高度：'+this.scrollHeight)
		if (this.scrollTop >= this.scrollHeight / 2) {
			this.hiddenFooter = false;
		} else {
			this.hiddenFooter = true;
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	data() {
		return {
			// 音频文件
			audioSrc: '',
			// 页面高度
			scrollHeight: 0,
			isHome:false,
			isBack:true,
			// 滚动高度
			scrollTop: 0,
			hiddenFooter: true,
			navList: [
				{
					cate_name: '待收货'
				},
				{
					cate_name: '待付款'
				}
			],
			customStyle: {
				color: '#fff',
				background: '#2674CC',
				opacity: '0.9',
				border: 'none'
			},
			// 联系按钮样式
			customContact: {
				color: '#fff',
				background: '#FC961E'
			},
			// tabs底部滑块样式
			tabStyle: {
				background: '#00A4FF'
			},
			list: [
				{
					cate_name: '个人介绍'
				},
				{
					cate_name: '我的企业'
				},
				{
					cate_name: '业务介绍',
					cate_count: 5
				}
			],
			// 当前tab栏
			current: 0,
			// 个人中心数据
			personData: null,
			// 我的企业数据
			myEnterpriseData: null,
			// 业务数据
			businessData: null,
			user_id: '',
			tenant_id: ''
		};
	},
	onShareAppMessage: function(res) {
		console.log(res);
		// if (res.from === 'button') {
		// 	// 来自页面内转发按钮
		// 	console.log(res)
		// 	return
		// }
		return {
			title: `易创宝-${this.personData.name}的名片`,
			path: `/pages/personalCenter/index?id=${this.personData.id}&tenantId=${this.userInfo.tenantId}`,
			imageUrl: 'https://img0.baidu.com/it/u=3491437104,2750624836&fm=26&fmt=auto'
		};
	},
	onLoad({ id, tenantId }) {
		this.user_id = this.userInfo.user_id;
		this.tenant_id = this.userInfo.tenant_id;
		if (id && tenantId) {
			console.log(id, tenantId);
			this.user_id = id;
			this.tenant_id = tenantId;
			this.isBack = false
			this.isHome = true
		}
		this.getUserInfo();
	},
	methods: {
		// 获取租户信息
		async getTenantInfo() {
			const data = await getTenantInfo(this.tenant_id);
			this.myEnterpriseData = data;
			setTimeout(() => {
				this.getScrollHeight();
			}, 200);
		},
		// 获取用户信息
		async getUserInfo() {
			const { data: res } = await getUserInfo(this.user_id);
			this.personData = res;
			setTimeout(() => {
				this.getScrollHeight();
			}, 200);
		},
		// tabs 改变
		change(value) {
			switch (value) {
				case 0:
					this.getUserInfo();
					break;
				case 1:
					this.getTenantInfo();
					break;
			}
			this.current = value;
		},
		// 获取当前页面高度，并计算可以滚动区域高度
		getScrollHeight() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#personCenter')
				.boundingClientRect(data => {
					const windowHeight = uni.getStorageSync('windowHeight');
					this.scrollHeight = data.height - windowHeight;
				})
				.exec();
		},
		jumpTo() {
			uni.navigateTo({
				url: `/pages/personalQRcode/personalQRcode?id=${this.userInfo.user_id}`
			});
		},
		// 复制文本
		handleCopy(value) {
			uni.setClipboardData({
				data: value, //要被复制的内容
				success: () => {
					//复制成功的回调函数
					uni.showToast({
						//提示
						title: '复制成功'
					});
				}
			});
		},
		phoneCall() {
			uni.makePhoneCall({
				phoneNumber: this.personData.phone,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		},
		// 存入通讯录
		savePhone() {
			wx.addPhoneContact({
				firstName: this.personData.name, //联系人姓名
				mobilePhoneNumber: this.personData.phone, //联系人手机号
				weChatNumber: this.personData.wechat,
				organization: '金信恒', //公司
				title: 'Cto' //职位
			});
		}
		// 分享个人名片页面
	}
};
</script>

<style lang="scss" scoped>
.footer_left {
	color: #ffffff;
	display: flex;
	.wechat {
		padding-left: 20rpx;
		text-align: center;
	}
	.email {
		padding-left: 72rpx;
		text-align: center;
	}
}
.logo {
	width: 192rpx;
	height: 60rpx;
	margin: 40rpx auto 40rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.main {
	padding: 30rpx 30rpx 0;
	margin-top: -258rpx;
	position: relative;
	z-index: 999;
	.card {
		background-color: #015abc;
		background: url(https://ycbfiles.oss-cn-shenzhen.aliyuncs.com/public/wxmini/card_person.png) no-repeat;
		background-size: 100% 100%;
		padding: 30rpx;
		border-radius: 20rpx;
		.header {
			padding-bottom: 24rpx;
			border-bottom: 1px solid #96c7ff;
			display: flex;
			align-items: center;
			position: relative;
			.info {
				color: #fff;
				padding-left: 36rpx;
				.name {
					font-size: 44rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					line-height: 30px;
				}
				.desc {
					padding-top: 6rpx;
					font-size: 28rpx;
					color: #d3f5ff;
				}
				.company {
					font-size: 24rpx;
				}
			}
			.qr_code {
				position: absolute;
				top: 0;
				right: 0;
				font-size: 62rpx;
				margin-right: 40rpx;
			}
		}
		// 联系方式
		.contact {
			.item {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				display: flex;
				margin-top: 34rpx;
				justify-content: space-between;
				.left {
					display: flex;
					align-items: center;
					.left_text {
						padding-left: 16rpx;
					}
				}
				.button {
					width: 134rpx;
					height: 48rpx;
					line-height: 48rpx;
					text-align: center;
					background: #2674cc;
					opacity: 0.9;
					box-shadow: 0px 0px 4px 0px rgba(8, 77, 154, 0.12);
					border-radius: 30rpx;
					color: #ffffff;
					font-size: 24rpx;
				}
				.phone_btn {
					background: #fc961e;
				}
			}
		}
	}
	.share {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		button {
			width: 330rpx;
			height: 80rpx;
			box-shadow: 0px 0px 28rpx 0px rgba(132, 131, 169, 0.12);
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			border: 0;
		}
		.share_btn {
			background: #fff;
			color: #00a4ff;
		}
		.save_btn {
			background: #00a4ff;
			color: #fff;
		}
	}

	//
}
.audio {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
