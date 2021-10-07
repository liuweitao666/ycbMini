<template>
	<view>
		<nav-bar :navList="navList" @change="changeTab" :isSearch="true" @search="handleSearch" :isLine="true" :isAvatar="true"></nav-bar>
		<!-- 看板 -->
		<performance ref="performance"/>
		<view class="main">
			<u-sticky :offset-top="navbarHeight" @fixed="isFixed(true)" @unfixed="isFixed(false)">
				<view :class="['screen', { isFix }]" >
					<u-dropdown title-size="24" border-radius="16">
						<u-dropdown-item v-model="value1" title="排序方式" menu-icon="arrow-down-fill" :options="createTimeOptions"></u-dropdown-item>
						<u-dropdown-item v-model="queryInfo.range" title="范围" :options="rangeOptions"></u-dropdown-item>
						<u-dropdown-item v-model="queryInfo.createDate" title="创建时间" :options="createTimeOptions"></u-dropdown-item>
						<u-dropdown-item v-model="queryInfo.status" title="状态" :options="statusOptions"></u-dropdown-item>
					</u-dropdown>
				</view>
			</u-sticky>
			<view class="section">
				<!-- 列表 -->
				<view class="section_content" v-for="item in dataList" :key="item.id" @click="jumpTo(item.id)">
					<view class="left">
						<view class="title">{{ item.name }}</view>
						<view class="text_desc">{{ $dateFormat(item.createTime) }}</view>
						<view class="text_desc">{{ item.provinceName + '/' + item.cityName }}</view>
					</view>
					<view class="right" v-show="item.phone"><image src="@/static/image/home/phone.png" mode=""></image></view>
				</view>
				<!-- 空列表 -->
				<u-empty type="list" v-if="isComplete && total===0"></u-empty>
				<view class="" v-else>
					<!-- 加载完成 -->
					<view :class="['loading_wrap', { hidden: !isComplete }]">我是有底线的~~</view>
					<!-- 加载动画 -->
					<view :class="['loading_wrap', { hidden: isComplete }]">
						<u-loading color="red" :show="isLoading"></u-loading>
					</view>
				</view>
			</view>
			<view class="footer"></view>
		</view>
	</view>
</template>

<script>
// 导入组件
import performance from './components/performance.vue';
// 客户相关接口导入
import { getCustomerPage } from '@/api/customer/customer.js';
// 线索相关接口导入
import { getCluePage, getCluePerformance } from '@/api/clue/clue.js';
import { mapGetters } from 'vuex';

import {deepClone} from "@/utils/util.js"
// 定义请求参数
const queryInfo = {
				name:'',
				createDate:0,
				status:'0',
				range:1,
			}
// 状态
const statusOptions = [
				{
					label: '去冰',
					value: 1
				},
				{
					label: '加冰',
					value: 2
				}
			]
// 范围
const rangeOptions = [
				{
					label: '去冰',
					value: 1
				},
				{
					label: '加冰',
					value: 2
				}
			]
// 创建时间
const createTimeOptions = [
				{
					label: '默认排序',
					value: 1
				},
				{
					label: '距离优先',
					value: 2
				},
				{
					label: '价格优先',
					value: 3
				}
			]
export default {
	components: {
		performance
	},
	data() {
		return {
			// 0线索 1 客户
			dataType: 0,
			navList: [
				{
					cate_name: '线索'
				},
				{
					cate_name: '客户'
				}
			],
			current: 1,
			size: 3,
			queryInfo:deepClone(queryInfo),
			total: null,
			// 数据列表
			dataList: [],
			recordData:[
				{
					data:[],
					total:null,
					current:1,
				},
				{
					data:[],
					total:null,
					current:1,
				},
			],
			// 是否展示加载动画
			isLoading: false,
			value1: '',
			createTimeOptions: createTimeOptions,
			rangeOptions: rangeOptions,
			statusOptions:statusOptions,
			topHeight: '',
			isFix: false
		};
	},
	computed: {
		// 数据是否加载完成
		isComplete() {
			return this.total === this.dataList.length;
		},
		...mapGetters(['navbarHeight'])
	},
	created() {
		this.$store.dispatch("refreshToken").then(res=>{
			this.initData();
		}).catch(err=>{
			// this.$store.
			console.log(err)
		})
	},
	mounted() {
	},
	onReachBottom() {
		// 触底函数
		if (this.isComplete) return;
		if(!this.isLoading){
			this.current++;
			this.initData();
		}
	},
	methods: {
		changeTab(value) {
			this.dataType = value;
			this.setData(value)
		},
		// 更新数据
		upData(){
			this.$refs.performance.getCluePerformance(1)
			this.initData()
		},
		// 设置数据
		setData(index){
			this.current = this.recordData[index].current
			this.dataList = this.recordData[index].data
			if(this.recordData[index].total===null) return this.initData();
			this.total = this.recordData[index].total
		},
		// 搜索
		handleSearch(value){
			if(value===this.queryInfo.name) return
			for(let key in this.queryInfo){
				this.queryInfo[key] = queryInfo[key]
			}
			// 显示加载动画
			this.total = null
			// 清空当前数据
			this.recordData[this.dataType].data = [];
			this.recordData[this.dataType].total = null
			this.recordData[this.dataType].current = 1
			this.queryInfo.name = value
			// 搜索数据
			this.setData(this.dataType)
		},
		// 初始化数据
		initData() {
			this.isLoading = true;
			const queryInfo = {
				size:this.size,
				current:this.current,
				...this.queryInfo
			}
			setTimeout(async _ => {
				try{
					this.dataType === 0 ? await this.getCluePage(queryInfo) : await this.getCustomerPage(queryInfo);
					this.isLoading = false;
				}catch(e){
					//TODO handle the exception
					uni.showToast({
						title: '网络错误，请稍后重试！',
						icon: 'none',
					})
					this.isLoading = false;
				}
			}, 500);
		},
		// 获取线索分页列表
		async getCluePage(queryInfo) {
			const { data: res } = await getCluePage(queryInfo);
			this.recordData[0].data = [...this.recordData[0].data, ...res.records];
			this.recordData[0].total = res.total
			this.recordData[0].current = this.current
			this.setData(0)
		},
		// 获取客户分页列表
		async getCustomerPage(queryInfo) {
			const { data: res } = await getCustomerPage(queryInfo);
			this.recordData[1].data = [...this.recordData[1].data, ...res.records];
			this.recordData[1].total = res.total
			this.recordData[1].current = this.current
			this.setData(1)
		},
		// 跳转对应的线索详情
		jumpTo(id) {
			console.log(id)
			uni.navigateTo({
				url: `/pages/clueDetail/index?id=${id}&type=${this.dataType}`
			});
		},
		// 导航栏吸顶
		isFixed(isFix) {
			console.log(isFix);
			this.isFix = isFix;
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	padding: 30rpx;
	.screen {
		padding: 0;
		height: 80rpx;
		background: #ffffff;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
	}
	.isFix {
		width: 100vw;
		margin-left: -30rpx;
		padding: 0 30rpx;
	}
	.section {
		margin-top: 30rpx;
		.section_content {
			width: 100%;
			background: #ffffff;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			margin-bottom: 30rpx;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				font-family: PingFangSC-Regular, PingFang SC;
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #333333;
					line-height: 32rpx;
				}
				.text_desc {
					font-size: 24rpx;
					font-weight: 400;
					color: #a4b0be;
					line-height: 26rpx;
					padding-top: 15rpx;
				}
			}
			.right {
				width: 48rpx;
				height: 48rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
