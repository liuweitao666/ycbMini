<template>
	<view
		:style="{paddingTop:(navbarHeight)+'rpx',height,paddingBottom:'1rpx',background: isBackground ? 'url(/static/image/personalCenter/back_navbar.png) no-repeat' : '#292B4D','background-size': '100% 100%'}"
	>
		<view
			class="navbar"
			id="navbar"
			:style="{
				background: '#292B4D',
				background: isBackground ? 'url(/static/image/personalCenter/back_navbar.png) no-repeat' : '#292B4D','background-size': '100%'
			}"
		>
			<view class="header" :style="{ height: navTop - 4 + 'px' }"></view>
			<view class="navbar-tabs">
				<!-- 头像 -->
				<view class="avatar" :style="{ height: '60rpx', width: '60rpx' }" @click="handleTo" v-if="isAvatar"></view>
				<view class="avatar back" :style="{ height: '60rpx', width: '60rpx' }" @click="back" v-else><u-icon name="arrow-left" color="#fff" size="35"></u-icon></view>
				<!-- 导航 -->
				<view class="navbar-u-tabs" :style="{ height: navList ? 'auto' : 80 + 'rpx' }">
					<u-tabs
						name="cate_name"
						bg-color="transparent"
						count="cate_count"
						:list="navList"
						:is-scroll="false"
						:current="current"
						active-color="#fff"
						inactive-color="#999"
						v-if="navList"
						@change="change"
					></u-tabs>
					<view class="nav-title" v-else>{{ title }}</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line" v-if="isLine"></view>
		<!-- 搜索区域 -->
		<view class="search" v-if="isSearch">
			<input v-model="searchVal" @blur="handleSearch" placeholder="搜索客户、线索" />
			<button ><u-icon name="search" size="40"></u-icon></button>
		</view>
	</view>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		// 导航数据
		navList: {
			type: Array,
			default: _ => null
		},
		// 自定义高度
		height: {
			type: String,
			default: ''
		},
		isSearch: {
			type: Boolean,
			default: _ => false
		},
		// 是否展示分割线
		isLine: {
			type: Boolean,
			default: _ => false
		},
		// 是否展示头像
		isAvatar: {
			type: Boolean,
			default: _ => false
		},
		isBackground: {
			type: Boolean,
			default: _ => false
		},
		// 标题
		title: ''
	},
	data() {
		return {
			navHeight: 0,
			windowHeight: 0,
			navTop: 0,
			current: 0,
			searchVal: '',
		};
	},
	computed:{
		...mapGetters(['navbarHeight'])
	},
	created() {
		var that = this;
		let menuButtonObject = uni.getMenuButtonBoundingClientRect();
		uni.getSystemInfo({
			success: function(res) {
				that.navTop = menuButtonObject.top;
				let statusBarHeight = res.statusBarHeight,
					navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
					navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
				that.navHeight = navHeight;
				that.navTop = navTop;
				that.windowHeight = res.windowHeight;
			}
		});
	},
	mounted() {
		this.getNavHeight();
	},
	methods: {
		// 回到上一页
		back: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		change(index) {
			this.current = index;
			this.$emit('change', index);
		},
		// 搜索事件
		handleSearch(){
			this.$emit('search',this.searchVal)
		},
		handleTo() {
			console.log('goto');
			const token = uni.getStorageSync('token');
			if (!token) {
				return uni.navigateTo({
					url: '/pages/login/index'
				});
			}
			uni.navigateTo({
				url: '/pages/personalCenter/index?id=1&name=uniapp'
			});
		},
		//获取navbar的高度
		getNavHeight() {
			// const topHeight = uni.getStorageSync('topHeight')
			// if(topHeight) return
			if(this.navbarHeight) return 
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#navbar')
				.boundingClientRect(data => {
					console.log(data)
					const navbarHeight = data.height/(uni.upx2px(data.height/2)/(data.height/2));
					this.$store.commit('SET_NAV_BAR_HEIGHT',navbarHeight)
				})
				.exec();
		}
	}
};
</script>

<style lang="scss">
/* components/navbar/index.wxss */
/* components/navbar/index.wxss */
.nav-wrap {
}
.navbar {
	width: 100%;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	flex-shrink: 0;
	background-size: 100% 100%;
	padding-bottom: 16rpx;
}
.line {
		height: 1px;
		background-color: rgba($color: #ffffff, $alpha: 0.2);
	}
.search {
	width: 690rpx;
	height: 94rpx;
	margin: 35rpx auto;
	display: flex;
	border-radius: 16rpx;
	overflow: hidden;
	input {
		flex: 1;
		height: 100%;
		background-color: #ffffff;
		padding-left: 30rpx;
	}
	button {
		width: 120rpx;
		height: 100%;
		border-radius: 0;
		background: #fc961e;
		color: #fff;
	}
}

.nav-title {
	height: 100%;
	display: flex;
	color: #fff;
	justify-content: center;
	align-items: center;
}

.navbar-tabs {
	width: 100%;
	position: relative;
	z-index: 10;
	color: #333;
	font-size: 32rpx;
	text-overflow: ellipsis;
	white-space: nowrap;
	.back {
		background-color: transparent;
		display: flex;
		align-items: center;
	}
}
.navbar-u-tabs {
	width: 280rpx;
	margin: 0 auto;
}
.navbar-tabs .item {
	width: 100rpx;
	color: #333;
	font-weight: 400;
	font-size: 28rpx;
	text-align: center;
}
.avatar {
	position: absolute;
	background-color: #f8f8f8;
	left: 40rpx;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 50%;
	margin-top: 6rpx;
	z-index: 99;
}

.navbar-action-wrap {
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	position: absolute;
	left: 20rpx;
	z-index: 11;
	line-height: 1;
	padding-top: 8rpx;
	padding-bottom: 8rpx;
}

.navbar-action-group {
	border: 1px solid #f0f0f0;
	border-radius: 40rpx;
	overflow: hidden;
}

.navbar-action_item {
	padding: 3px 0;
	color: #333;
}

.navbar-action-group .navbar-action_item {
	border-right: 1px solid #f0f0f0;
	padding: 3px 14px;
}

.navbar-action-group .last {
	border-right: none;
}
</style>
