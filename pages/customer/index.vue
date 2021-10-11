<template>
	<view class="customer_wrap">
		<nav-bar backColor="#F0FCFD" textColor="#000" :customLeft="true" title="客户">
			<view class="navbar_left">
				<u-icon name="search" size="36"></u-icon>
				<u-icon name="plus" style="padding-left: 34rpx;" size="36"></u-icon>
			</view>
		</nav-bar>
		<u-index-list :scroll-top="scrollTop" :sticky="false" :z-index="98" :offset-top="navbarHeight" @select="selectFn">
			<view v-for="(item, index) in indexList" :key="index" :id="`item${item}`">
				<u-index-anchor :index="item" :custom-style="customStyle" />
				<view class="list-cell">
					<view class="sex woman">
						女
					</view>
					<view class="info">
						<view class="name">
							圆圆
						</view>
						<view class="desc">
							哈哈大科技有限公司
						</view>
					</view>
				</view>
				<view class="list-cell">
					<view class="sex man">
						男
					</view>
					<view class="info">
						<view class="name">
							古月哥欠
						</view>
						<view class="desc">
							哈哈大科技有限公司
						</view>
					</view>
				</view>
				<view class="list-cell">
					<view class="sex woman">
						女
					</view>
					<view class="info">
						<view class="name">
							圆圆
						</view>
						<view class="desc">
							哈哈大科技有限公司
						</view>
					</view>
				</view>

			</view>
		</u-index-list>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import {getCustomerList} from "@/api/customer/customer.js"
export default {
	data() {
		return {
			scrollTop: 0,
			indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			customStyle: {
				color: '#007AC3',
				background: 'white',
				padding: '14rpx 30rpx'
			}
		};
	},
	computed: {
		...mapGetters(['navbarHeight'])
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop - uni.upx2px(this.navbarHeight);
	},
	created() {
		this.getCustomerList()
	},
	methods:{
		selectFn(e){
			console.log(e)
			let id = "#item"+e
			console.log(id)
			const query = uni.createSelectorQuery().in(this);
			query.select(id).boundingClientRect(e=>{
				console.log(e)
				uni.pageScrollTo({
					scrollTop:this.scrollTop + e.top,
					duration:200
				})
			}).exec()
		},
		async getCustomerList(){
			const data = await getCustomerList()
			console.log(data)
		}
	}
};
</script>

<style lang="scss" scoped>
.customer_wrap {
	background-color: #ffffff;
}
.list-cell {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 30rpx;
	overflow: hidden;
	color: #323233;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
	border-bottom: 2rpx solid #f8f8f8;
	.sex{
		width: 96rpx;
		height: 96rpx;
		text-align: center;
		line-height: 96rpx;
		font-size: 42rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.woman{
		background-color: #F6C0CE;
	}
	.man{
		background-color: #D2E4F8;
	}
	.info{
		margin-left:40rpx;
		.desc{
			font-size: 28rpx;
		}
	}
}
.navbar_left{
	margin-top: 6rpx;
	color: #007AC3;
}
</style>
