<template>
	<view class="wraaper">
		<view class="wraaper_operation">
			<text class="cancel" @click="resetCity">清空</text>
			<text class="submit" @click="submit">确定</text>
		</view>
		<view class="wraaper_top">
			<scroll-view class="wraaper_top_left" :scroll-y="true">
				<view :class="['wraaper_top_left_item', { wraaper_top_left_active: active === index }]" v-for="(item, index) in dataTree" :key="item.id" @click="tabClick(index)">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="wraaper_top_right" :scroll-y="true">
				<view class="wraaper_top_right_area" v-for="(item, index) in dataList" :key="index" @click="secondActive = index,fData={}">
					<view>
						<text :class="['secondary_title', { secondary_title_active: secondActive === index }]">{{ item.name }}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 空状态 -->
			<view class="empty" v-if="dataList.length === 0">
				<image src="../../static/image/empty/empty_data.png" mode=""></image>
				<text class="tip_text">竟然是空的</text>
				<button class="small_btn primary" @click="submit">选中当前国家</button>
			</view>
			<scroll-view class="wraaper_top_right" :scroll-y="true" v-if="dataList[secondActive].children">
				<view class="wraaper_top_right_area" v-for="(item, index) in dataList[secondActive].children" @click="selectUnit(item)" :key="index">
					<view>
						<text :class="['secondary_title', { secondary_title_active: fData.code === item.code }]">{{ item.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 树形数据
		dataTree: {
			type: Array,
			default: []
		}
	},
	name: 'screen',
	data() {
		return {
			//
			active: 0,
			// 二级选中目标
			secondActive: -1,
			// 筛选数据
			fData: {},
			// 右侧数据
			dataList: []
		};
	},
	created() {
		this.dataList = this.dataTree[0].children;
	},
	methods: {
		// 选中标签
		selectUnit(unit) {
			this.fData = unit;
		},
		// 确认提交
		submit() {
			const { secondActive, active } = this;
			const children = this.dataTree[active].children
			if(!this.fData.code && active===0) return this.$emit('submit',{name:'',code:''});
			if (this.fData.code && secondActive !== -1) {
				this.$emit('submit', this.fData);
			} else if(children) {
				this.$emit('submit', children[secondActive]);
			}else{
				this.$emit('submit', this.dataTree[active]);
			}
		},
		// 重置数据
		resetData() {
			this.fData = {
				code: '',
				name: ''
			};
			this.active = 0;
			this.secondActive = -1;
			this.resetDataList();
		},
		resetCity() {
			this.resetData();
			this.$emit('submit', this.fData);
		},
		resetDataList() {
			this.dataList.forEach(item => {
				item.selected = false;
				if (item.children) {
					for (let i = 0; i < item.children.length; i++) {
						item.children[i].selected = false;
					}
				}
			});
		},
		// 选择分类
		tabClick(index) {
			this.resetData();
			this.active = index;
			// this.secondActive = 0;
			// this.processingData(index);
			this.dataList = this.dataTree[index].children || [];
		},
		// 处理数据
		processingData(index) {
			this.dataList = [];
			// 区分是否有子级列表
			let Data = [];
			let name = this.dataTree[index].name;
			let id = this.dataTree[index].id;
			if (!this.dataTree[index].children) {
				return;
				// return (this.dataList = [{ name, children: [{ name, id }] }]);
			}
			this.dataTree[index].children.forEach(item => {
				if (item.children) {
					this.dataList.push(item);
				} else {
					Data.push(item);
				}
			});
			// 组合数据
			this.dataList = [{ name }, ...this.dataList];
			if (this.fData.length === 0) {
				this.resetDataList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.small_btn {
	width: 120rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 26rpx;
	border-radius: 8rpx;
}
.primary{
	background-color: $u-type-primary;
	color: #FFFFFF;
}
.empty {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	image {
		width: 300rpx;
		height: 300rpx;
	}
	.small_btn {
		width: 272rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin-top: 30rpx;
		border-radius: 36rpx;
	}
	.tip_text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #777777;
	}
}
.wraaper {
	height: 100%;
	&_top {
		height: calc(100% - 80rpx);
		display: flex;
		&_left {
			height: 100%;
			flex: 0 0 200rpx;
			background-color: #f3f4fc;
			color: #333;
			&_item {
				text-align: center;
				padding: 10rpx;
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
			// padding:0 30rpx;
			padding-right: 0;
			box-sizing: border-box;
			&_area {
				text-align: center;
				.secondary_title {
					display: inline-block;
					color: #333;
					font-size: 26rpx;
					text-align: center;
					padding: 6rpx 20rpx;
					// border-radius: 10rpx;
					// border: 2rpx solid #2469f0;
					margin-top: 6rpx;
				}
				.secondary_title_active {
					color: #2469f0;
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
	&_operation {
		height: 80rpx;
		padding: 30rpx 50rpx;
		box-sizing: border-box;
		border-top: 1px solid #c0c4cc;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.submit {
			color: #2979ff;
		}
		.cancel {
			color: #c0c4cc;
		}
	}
}
</style>
