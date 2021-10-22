<template>
	<view class="labels_wrap">
		<view class="content">
			<!-- 标题 -->
			<view class="header">
				<view class="title">
					选择你感兴趣的标签
				</view>
				<view class="desc">
					最多选择3个 也可自定义
				</view>
			</view>
			<!-- 标签部分 -->
			<view class="labels">
				<view :class="['label',item.selected?'active':'']" @click="selectLabel(item)" v-for="(item,index) in labelDatas" :key="index">
					{{item.dictValue}}
				</view>
			</view>
			<view class="">
				<view class="custom_label">
					<input type="text" value=""   placeholder="添加自定义标签" v-model="labelValue" @blur="addLabel" />
				</view>
			</view>
			
			<view class="desc_label">
				<view class="label">
					<text class="text">最多四个字标签</text>
					<!-- <u-icon name="close-circle" color="#8F9BB3"></u-icon> -->
				</view>
				<view class="label">
					<text class="text">说的没错</text>
					<!-- <u-icon name="close-circle" color="#8F9BB3"></u-icon> -->
				</view>
			</view>
			<!-- 确认按钮 -->
			<button class="submit" @click="submit">
				选好了，返回
			</button>
		</view>
	</view>
</template>

<script>
	import {getDictionary} from "@/api/dict/index.js"
	export default {
		data() {
			return {
				// 标签数据
				labelDatas:[],
				// 选中的标签
				selectedList:[],
				// 是否自定义标签
				labelValue:''
			};
		},
		created() {
			this.getLabels()
		},
		methods:{
			// 选择标签
			selectLabel(label){
				if(this.selectedList.length===3 && !label.selected) return uni.showToast({
					title:'最多选择三个',
					icon:"none"
				})
				label.selected = !label.selected
				if(this.selectedList.length===0) return this.selectedList.push(label)
				const index = this.selectedList.findIndex(item=>{
					return item.id === label.id
				})
				if(index===-1){
					this.selectedList.push(label)
				}else{
					this.selectedList = this.selectedList.filter(item=>item.id!==label.id)
				}
			},
			async getLabels(){
				const {data:res} = await getDictionary({
					code:'custom_labels'
				})
				this.labelDatas = res.map(item=>{
					item.selected = false
					return item
				})
			},
			showInput(){
				this.isCustom = true
				setTimeout(()=>{
					console.log(this.$refs)
				},1000)
			},
			addLabel(){
				if(this.labelValue.length>4){
				 return	uni.showToast({
				 	title:'最多四字标签',
					icon:'none'
				 })
				}
				const label = {
					dictValue:this.labelValue,
					selected:true
				}
				if(this.selectedList.length===3) return uni.showToast({
					title:'最多选择三个',
					icon:"none"
				})
				this.labelValue = ''
				this.selectedList.push(label)
				this.labelDatas.push(label)
			},
			// 选好了返回
			submit(){
				const labels = this.selectedList.map(item=>item.dictValue).join(',')
				let pages = getCurrentPages();
				// 获取上一页栈
				let prevPage = pages[pages.length - 2];
				// 设置添加页面公司数据
				prevPage.$vm.setLabels(labels)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.labels_wrap{
		height: 100vh;
		background-color: #f6f6f6;
		.content{
			box-sizing: border-box;
			padding: 60rpx 30rpx 0;
			margin: 0 auto;
			.header{
				text-align: center;
				padding-bottom: 65rpx;
				.title{
					margin-bottom: 20rpx;
					font-size: 48rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 66rpx;
					letter-spacing: 1px;
				}
				.desc{
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #777777;
					line-height: 44rpx;
				}
			}
			.label{
				margin-bottom: 20rpx;
				padding: 12rpx 16rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 1px solid #007AC3;
				color: #007AC3;
				font-size: 28rpx;
			}
			.labels{
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				padding-left: 20rpx;
				.label{
					margin-right: 20rpx;
				}
				.active{
					background-color: #007AC3;
					color: #FFFFFF;
				}
			}
			.desc_label{
				display: flex;
				justify-content: center;
				.label{
					border: 1px solid #FC961E;
					color: #FC961E;
					margin-right: 20rpx;
					.text{
						padding-right: 10rpx;
					}
				}
			}
			.custom_label{
				width: 340rpx;
				height: 64rpx;
				margin: 0 auto 20rpx;
				border: 1px dashed #007AC3;
				text-align: center;
				padding: 12rpx 16rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				color: #007AC3;
				input{
					position: relative;
					top: -4rpx;
				}
			}
			.submit{
				width: 100%;
				color: #fff;
				height: 92rpx;
				line-height: 92rpx;
				background-color: #007AC3;
				border-radius: 12rpx;
				margin-top: 90rpx;
			}
		}
	}
</style>
