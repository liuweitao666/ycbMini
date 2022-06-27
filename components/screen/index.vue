<template>
	<view class="wraaper">
		<view class="wraaper_top">
			<scroll-view class="wraaper_top_left" :scroll-y="true">
				<view :class="['wraaper_top_left_item', { wraaper_top_left_active: active === index }]" v-for="(item, index) in dataTree" :key="item.id" @click="tabClick(index)">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="wraaper_top_right" :scroll-y="true">
				<view class="wraaper_top_right_area" v-for="(item, index) in dataList" :key="index">
					<view v-if="showTitle && item.children.length > 0">
						<text class="secondary_title">{{ item.name }}</text>
					</view>
					<view class="unit_content">
						<view :class="['unit', { active: filterGoods.find(item=>item.id===unit.id)}]" v-for="(unit, index2) in item.children" :key="index2" @click="selectUnit(unit)">
							{{ unit.name }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<button class="default_btn primary" @click="submit">确定</button>
			<button class="default_btn btn_info" @click="resetData">清空</button>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
		// 树形数据
		dataTree: {
			type: Array,
			default: []
		},
		// 是否展示二级标题
		showTitle: {
			type: Boolean,
			default: true
		}
	},
	name: 'screen',
	data() {
		return {
			active: 0,
			// 筛选数据
			fData: [],
			// 右侧数据
			dataList: []
		};
	},

	computed: {
		...mapGetters(['filterGoods'])
	},
	created() {
		this.fData = this.filterGoods;
		this.processingData(this.active);
	},
	methods: {
		// 选中标签
		selectUnit(unit) {
			const _findData = this.fData.find(item => item.id === unit.id);
			if (!_findData) {
				this.fData.push(unit);
			} else {
				this.fData = this.fData.filter(item => item.id !== unit.id);
			}
			this.$store.commit('SET_FILTER_GOODS', this.fData);
		},
		// 确认提交
		submit() {
			this.$emit('submit');
		},
		// 重置数据
		resetData() {
			if (this.fData.length === 0) {
				return uni.showToast({
					title: '暂未选择业务类型',
					icon: 'none'
				});
			}
			this.fData = [];
			this.$store.commit('SET_FILTER_GOODS', this.fData);
			this.resetDataList();
			this.$emit('resetData');
		},
		resetDataList() {
			this.dataList.forEach(item => {
				item.selected = false;
				for (let i = 0; i < item.children.length; i++) {
					item.children[i].selected = false;
				}
			});
		},
		// 选择分类
		tabClick(index) {
			this.active = index;
			this.processingData(index);
		},
		// 处理数据
		processingData(index) {
			this.dataList = [];
			// 区分是否有子级列表
			let Data = [];
			let name = this.dataTree[index].name;
			let id = this.dataTree[index].id;
			if (!this.dataTree[index].children) {
				return (this.dataList = [{ name, children: [{ name, id }] }]);
			}
			this.dataTree[index].children.forEach(item => {
				if (item.children) {
					this.dataList.push(item);
				} else {
					Data.push(item);
				}
			});
			// 组合数据
			this.dataList = [...this.dataList, { name, children: Data }];
			if (this.fData.length === 0) {
				this.resetDataList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wraaper {
	height: 100vh;
	&_top {
		height: calc(100vh - 174rpx);
		display: flex;
		&_left {
			height: 100%;
			flex: 0 0 200rpx;
			background-color: #f3f4fc;
			color: #333;
			&_item {
				text-align: center;
				padding: 26rpx 10rpx;
			}
			&_active {
				background-color: #ffffff;
				color: #2469f0;
				font-weight: 500;
			}
		}
		&_right {
			height: 100%;
			flex: 1;
			background-color: #fff;
			padding: 30rpx;
			padding-right: 0;
			box-sizing: border-box;
			&_area {
				.secondary_title {
					display: inline-block;
					color: #2469f0;
					font-size: 26rpx;
					padding: 6rpx 20rpx;
					border-radius: 10rpx;
					border: 2rpx solid #2469f0;
					margin-top: 6rpx;
					margin-bottom: 30rpx;
				}
				.unit_content {
					display: flex;
					flex-wrap: wrap;
					.unit {
						border: 2rpx solid #f1f1f5;
						color: #333;
						text-align: center;
						background: #f1f1f5;
						border-radius: 10rpx;
						padding: 8rpx 24rpx;
						margin-right: 24rpx;
						margin-bottom: 24rpx;
						font-size: 24rpx;
					}
					.active {
						color: #ffffff;
						background-color: #2979ff;
					}
				}
			}
		}
	}
	&_bottom {
		height: 130rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		border-top: 1px solid #c0c4cc;
		display: flex;
		align-items: center;
		justify-content: center;
		&_btn {
			width: 120rpx;
			height: 60rpx;
			font-size: 26rpx;
			line-height: 60rpx;
		}
	}
}
</style>
