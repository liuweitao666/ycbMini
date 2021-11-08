<template>
	<view class="customer_wrap">
		<nav-bar backColor="#F0FCFD" textColor="#000" :customLeft="true" title="客户">
			<view class="navbar_left">
				<u-icon name="search" size="36" @click="jumpTo('/pages/searchPage/index?type=2')"></u-icon>
				<u-icon name="plus" style="padding-left: 34rpx;" size="36" @click="jumpTo('/pages/generateCustomer/index?complex=yes')"></u-icon>
			</view>
		</nav-bar>
		
			<u-index-list  :scroll-top="listScrollTop" :sticky="false" :z-index="98" :index-list="indexList" :offset-top="navbarHeight" @select="selectFn">
				<scroll-view
					:scroll-top="scrollTop"
					scroll-y="true"
					class="main_wrap"
					:style="{ height: contentHeight + 'px' }"
					:show-scrollbar="true"
					@scroll="scroll"
					:refresher-threshold="45"
					:refresher-enabled="true"
					:refresher-triggered="refresherTriggered"
					@refresherrefresh="refresherrefresh"
					@refresherrestore="refresherrestore"
					@refresherabort="refresherabort"
				>
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
									{{customer.companyName||'未录入公司'}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</u-index-list>
		<!-- 数据为空时 -->
		<view class="empty_view" v-if="indexList.length===0">
			<u-empty text="还没有用户" mode="list" ></u-empty>
			<u-button type="primary" style="margin-top: 20rpx;" shape="square" size="medium" @click="jumpTo('/pages/generateCustomer/index?complex=yes')">立即添加</u-button>
		</view>
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
			},
			contentHeight:'',
			// 下拉刷新
			refresherTriggered: false,
			_refresherTriggered: false,
			listScrollTop:0
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
	// 下拉刷新
	onPullDownRefresh() {
		this.$store.dispatch('getCustomerList').then(res=>{
			setTimeout(()=>{
				uni.showToast({
					title: '页面已刷新',
					icon: 'none'
				});
				uni.stopPullDownRefresh();
			},500)
		})
	},
	created() {
		this.initData()
	},
	mounted() {
		this.handleHeight();
	},
	methods:{
		scroll(data) {
			// let {scrollTop} = detail
			this.scrollTop = data.detail.scrollTop;
			this.listScrollTop = (data.detail.scrollTop+86);
		},
		refresherrefresh() {
			console.log('自定义下拉刷新被触发');
			let _this = this;
			if (_this._refresherTriggered) {
				return;
			}
			_this._refresherTriggered = true;
			//界面下拉触发，triggered可能不是true，要设为true
			if (!_this.refresherTriggered) {
				_this.refresherTriggered = true;
			}
			this.loadStoreData();
		},
		refresherrestore() {
			console.log('自定义下拉刷新被复位');
			let _this = this;
			_this.refresherTriggered = false;
			_this._refresherTriggered = false;
		},
		refresherabort() {
			console.log('自定义下拉刷新被中止	');
			let _this = this;
			_this.refresherTriggered = false;
			_this._refresherTriggered = false;
		},
		loadStoreData() {
			let _this = this;
			this.$store.dispatch('getCustomerList').then(()=>{
				setTimeout(()=>{
					_this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
					_this._refresherTriggered = false;
					uni.showToast({
						title:'页面已刷新',
						icon:'none'
					})
				},500)
			});
		},
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
		},
		handleHeight() {
			const windowHeight = uni.getStorageSync('windowHeight');
			this.contentHeight = windowHeight - uni.upx2px(this.navbarHeight);
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

.empty_view{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.navbar_left{
	margin-top: 6rpx;
	color: #007AC3;
}
</style>
