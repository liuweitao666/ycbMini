<template>
	<view :class="['wrap',{'isFixtabs':isFix}]" id="dropTabs">
		<!-- 标签栏 -->
		<view class="tabs">
			<view class="tab-item" v-for="(tabName, index) in data" @click="changeTabs(index)" :key="index">
				<text>{{ tabName }}</text>
				<u-icon name="arrow-down" size="24"></u-icon>
			</view>
		</view>
		<!-- 遮罩和下拉数据 -->
		<view class="mask-wrap" v-show="show" @click="closeMask" :style="{ height }"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'dropDown',
	props: ['data','isFix','offsetTop'],
	data() {
		return {
			// 下拉列表
			height: '100px',
			show: false,
			active: null
		};
	},
	watch:{
		show(newVal){
			if(!newVal){
				this.active = null;
			}
		}
	},
	mounted() {
		const windowHeight = uni.getStorageSync('windowHeight')
		this.height = windowHeight - this.pxRpx(this.offsetTop+80)
	},
	methods: {
		changeTabs(index) {
			if (this.active === index) {
				return (this.show = false);
			}
			this.active = index;
			this.show = true;
			this.$emit('change', index);
			// this.getNavHeight(index)
		},
		selected() {
			this.show = false;
			this.$emit('selected', { searchType: 'dropSearch', name: '' });
		},
		// px => rpx
		pxRpx(data){
			return data/(uni.upx2px(data/2)/(data/2))
		},
		//获取tabs的高度
		getNavHeight(index) {
			// const topHeight = uni.getStorageSync('topHeight')
			// if(topHeight) return
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#dropTabs')
				.boundingClientRect(data => {
					console.log(data)
					// const dropTabsHeight = this.pxRpx(data.height);
					// const dropTabsTop = this.pxRpx(data.top);
					const windowHeight = uni.getStorageSync('windowHeight')
					const height = this.pxRpx(windowHeight-(data.height+data.top))
					this.height = `${height+10}rpx`
				})
				.exec();
		},
		closeMask(){
			this.show = false
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	position: relative;
	font-size: 26rpx;
	.tabs {
		display: flex;
		border-radius: 16rpx;
		justify-content: space-around;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #ffffff;
		text {
			padding-right: 10rpx;
		}
	}
	.mask-wrap {
		position: absolute;
		top: 70rpx;
		width: 100%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		border-radius: 0rpx 0rpx 16rpx 16rpx;
		z-index: 1000;
	}
}
.isFixtabs{
	width: 100vw;
	margin-left: -30rpx;
	z-index: 1003;
}
</style>
