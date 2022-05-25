<template>
	<view id="personCenter">
		<audio :src="audioSrc" class="audio"></audio>
		<nav-bar :isBackground="true" :Home="isHome" :title="personData.realName||''" :isBack="isBack" height="482rpx"></nav-bar>
		<!-- 二维码弹框 -->
		<u-popup v-model="qrCodeVisible" mode="center" length="80%" border-radius="14">
			<view class="Qrcode_wrap">
				<view class="header_title">企业微信二维码</view>
				<view class="img"><image :src="personData.wechatQrCode" mode=""></image></view>
			</view>
		</u-popup>

		<view class="main">
			<!-- 卡片 -->
			<view class="card">
				<view class="header">
					<u-avatar :src="avatar ||wxUserInfo.avatarUrl" :size="160"></u-avatar>
					<view class="info">
						<view class="name">
							<text>{{ personData.realName }}</text>
						</view>
						<view class="desc">{{ personData.postName || '普通员工' }}</view>
						<view class="desc company">{{ personData.tenantName }}</view>
					</view>
					<image @click="jumpTo" class="qr_code" src="../../static/image/personalCenter/qrcode.png"></image>
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
						<u-button size="mini" shape="circle" :custom-style="customStyle" @click="$handleCopy(personData.email, '邮箱')">点击复制</u-button>
					</view>
					<view class="item">
						<view class="left">
							<u-icon name="weixin-fill" color="#fff" size="44"></u-icon>
							<text class="left_text">{{ personData.wechat }}</text>
						</view>
						<u-button size="mini" shape="circle" :custom-style="customStyle" @click="$handleCopy(personData.wechat, '微信号')">点击复制</u-button>
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
				<view class="wechat" @click="showQrcode">
					<view class="wrap">
						<u-icon name="chat" size="60"></u-icon>
						<text style="padding-left: 10rpx;">企业微信</text>
					</view>
				</view>
				<!-- <view class="email" @click="$handleCopy(personData.email,'邮箱')">
					<view><u-icon name="email" size="60"></u-icon></view>
					<text>邮箱</text>
				</view> -->
			</view>
			<u-button type="primary" :custom-style="customContact" @click="phoneCall">拨打电话</u-button>
		</person-footer>
		<!-- 授权弹窗 -->
		<u-popup v-model="authShow" mode="center" length="80%" border-radius="14" :mask-close-able="false">
			<view class="auth_wrap">
				<view class="custom_title">
					申请获取查看权限
				</view>
				<view class="auth_img">
					<image src="../../static/image/personalCenter/auth.png" mode=""></image>
				</view>
				 <view class="desc">
				 	获取您的手机号
				 </view>
				<u-button :ripple="true" shape="circle" size="medium" @getphonenumber="authorizedPhone" type="primary" open-type="getPhoneNumber">点击授权</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
// 导入组件
import personIntro from './components/personIntro.vue';
import personFooter from '@/components/footer/footer.vue';
import enterpriseIntro from './components/enterpriseIntro.vue';
import businessIntro from './components/businessIntro.vue';
import { mapGetters } from 'vuex';
import { getUserInfo, getTenantInfo,authorizedPhone,getAuthorized } from '@/api/personalCenter/index.js';
import {
	getfetchUrl,
	getAvatar
} from "@/utils/getFileUrls.js"
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
			wxUserInfo:uni.getStorageSync('wxUserInfo'),
			// 音频文件
			audioSrc: '',
			// 页面高度
			scrollHeight: 0,
			isHome: false,
			isBack: true,
			qrCodeVisible: false,
			avatar:'',
			// 滚动高度
			scrollTop: 0,
			hiddenFooter: true,
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
			tenant_id: '',
			authShow:false,
			// 企业微信id
			externalUserId:'',
			code:''
		};
	},
	onShareAppMessage: function(res) {
		console.log(res);
		return {
			title: `易创宝-${this.personData.name}的名片`,
			path: `/pages/personalCenter/index?userId=${encodeURIComponent(this.personData.id)}&tenantId=${encodeURIComponent(this.personData.tenantId)}`,
			// imageUrl: 'https://img0.baidu.com/it/u=3491437104,2750624836&fm=26&fmt=auto'
		};
	},
	onLoad({ userId,tenantId,scene,externalUserId}) {
		console.log(userId, tenantId)
		this.user_id = this.userInfo.id;
		this.tenant_id = this.userInfo.tenantId;
		if (userId && tenantId) {
			this.user_id = decodeURIComponent(userId);
			this.tenant_id = decodeURIComponent(tenantId);
			this.isBack = false;
			this.isHome = true;
		}
		if(scene){
			const scenes = decodeURIComponent(scene).split(',')
			this.user_id = scenes[0];
			this.tenant_id = scenes[1];
			this.isBack = false;
			this.isHome = true;
		}
		// 是否企业微信名片分享
		if(externalUserId){
			// this.authShow = true
			this.externalUserId = externalUserId
			wx.login({
				success: res => {
					this.code = res.code;
					this.getAuthorized(externalUserId,tenantId)
				}
			});
		}else{
			this.getUserInfo();
		}
	},
	methods: {
		// 获取当前用户是否已授权
		async getAuthorized(externalUserId,tenantId){
			const {data:res} = await getAuthorized({externalUserId,tenantId})
			if(res){
				this.getUserInfo();
			}else{
				this.authShow = true
			}
		},
		// 用户授权
		async authorizedPhone(e){
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				const query = {
					code: this.code,
					encryptedData: e.detail.encryptedData,
					externalUserId:this.externalUserId,
					iv: e.detail.iv,
					tenantId:this.tenant_id
				};
				const res = await authorizedPhone(query)
				if(res.code===200){
					uni.showToast({
						title:'授权成功',
						icon:'none'
					})
					this.authShow = false
					this.getUserInfo()
				}
			} else {
				uni.showToast({
					title:'您已拒绝授权',
					icon:'none'
				})
				console.log(e, '获取手机号失败');
			}
		},
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
			const httpReg = /http/g
			const { data: res } = await getUserInfo(this.user_id);
			if(res.avatar && !this.avatar){
				this.avatar = httpReg.test(res.avatar)?res.avatar:getAvatar(this.user_id)
			}
			if(res.wechatQrCode){
				res.wechatQrCode = await getfetchUrl(res.wechatQrCode)
			}
			if(res.personalProfileInvoice){
				res.personalProfileInvoice =await getfetchUrl(res.personalProfileInvoice)
			}
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
			console.log(this.user_id,this.tenant_id)
			uni.navigateTo({
				url: `/pages/personalQRcode/personalQRcode?user_id=${this.user_id}&tenant_id=${this.tenant_id}`
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
		},
		// 个人二维码展示
		showQrcode() {
			if(!this.personData.wechatQrCode) return uni.showToast({
				title:'请先在后台上传',
				icon:'none'
			})
			this.qrCodeVisible = true;
		}
	}
};
</script>

<style lang="scss" scoped>
	.auth_wrap{
		padding: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.auth_img{
			margin-bottom: 30rpx;
			width: 100%;
			height: 400rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.desc{
			color: #999;
			font-size: 28rpx;
			padding-bottom: 30rpx;
		}
	}
.Qrcode_wrap {
	padding: 30rpx;
	.header_title {
		margin-bottom: 30rpx;
		text-align: center;
	}
	.img {
		width: 440rpx;
		height: 440rpx;
		margin: 0 auto;
		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}
.footer_left {
	color: #ffffff;
	display: flex;
	.wechat {
		padding-left: 20rpx;
		text-align: center;
		.wrap {
			display: flex;
			align-items: center;
		}
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
				width: 60rpx;
				height: 60rpx;
				font-size: 62rpx;
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
