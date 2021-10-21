<template>
	<view class="customer_wrap">
		<nav-bar backColor="#F0FCFD" textColor="#000" :customLeft="true" title="客户">
			<view class="navbar_left">
				<u-icon name="search" size="36" @click="jumpTo('/pages/searchPage/index?type=2')"></u-icon>
				<u-icon name="plus" style="padding-left: 34rpx;" size="36" @click="jumpTo('/pages/generateCustomer/index?complex=yes')"></u-icon>
			</view>
		</nav-bar>
		<u-index-list :scroll-top="scrollTop" :sticky="false" :z-index="98" :index-list="indexList" :offset-top="navbarHeight" @select="selectFn">
			<view v-for="(item, index) in indexList" :key="index" :id="`item${item}`">
				<u-index-anchor :index="item" :custom-style="customStyle" />
				<view class="list-cell" v-for="customer in getAlphabeticList(item)" :key="customer.id" @click="goDetail(customer.id)">
					<view :class="['sex',switchClass(customer.sex)]">
						{{customer.sex===0?'铭':(customer.sex===1?'男':'女')}}
					</view>
					<view class="info">
						<view class="name">
							{{customer.name}}
						</view>
						<view class="desc">
							{{customer.companyName||'未加入公司'}}
						</view>
					</view>
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
import { mapGetters} from 'vuex';
import {getCustomerList} from "@/api/customer/customer.js"
export default {
	data() {
		return {
			scrollTop: 0,
			customStyle: {
				color: '#007AC3',
				background: 'white',
				padding: '14rpx 30rpx'
			}
		};
	},
	computed: {
		...mapGetters(['navbarHeight','customerList','indexList','tenantId'])
	},
	watch:{
		tenantId(){
			this.initData()
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop - uni.upx2px(this.navbarHeight);
	},
	created() {
		this.initData()
	},
	methods:{
		selectFn(e){
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
		getAlphabeticList(Alphabetic){
			return this.customerList.filter(item=>item.nameFirstLetter===Alphabetic)
		},
		initData(){
			this.$store.dispatch('getCustomerList')
		},
		jumpTo(url){
			uni.navigateTo({
				url
			})
		},
		goDetail(id){
			uni.navigateTo({
				url: `/pages/clueDetail/index?id=${id}&type=1`
			})
		},
		switchClass(val){
			switch(val){
				case 0:
				return 'unknown';
				case 1:
				return 'man';
				case 2:
				return 'woman';
			}
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
	padding: 10rpx 30rpx;
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
	.unknown{
		background-color: #6269b8;
	}
	.woman{
		background-color: #F6C0CE;
	}
	.man{
		background-color: #D2E4F8;
	}
	.info{
		margin-left:40rpx;
		font-size: 28rpx;
	}
}

.navbar_left{
	margin-top: 6rpx;
	color: #007AC3;
}
</style>
