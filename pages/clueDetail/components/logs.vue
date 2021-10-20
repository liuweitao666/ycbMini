<template>
	<view class="logs_card">
		<view class="followUp_log" v-if="data.length > 0">
			<view class="follow_item" v-for="(item,index) in data" :key="index" @click="handle(item.followContent)">
				<view class="custom_title">{{ item.createUserName }}</view>
				<view class="desc">{{ item.createTime }}</view>
				<view class="desc">
					<text style="color: #FC961E;padding-right: 10rpx">#{{ followType[item.type] || item.operationType }}#</text>
					{{ item.followContent || item.operationType }}
				</view>
				<view class="image_cneg" v-if="item.files" >
					<image @click="previewImg(item.files,i)" :key="i" :src="item2.fileName" v-for="(item2,i) in item.files" ></image>
				</view>
			</view>
		</view>
		<view class="empty_view" v-if="total === 0"><u-empty text="暂无数据" mode="list"></u-empty></view>
	</view>
</template>

<script>
export default {
	props: ['data', 'total'],
	data() {
		return {
			followType: ['', '电话', '微信', '旺旺', '线下', '其他']
		};
	},
	methods: {
		handle(item){
			console.log(item)
		},
		// 预览图片多张
		previewImg(files,index,item) {
			console.log(item)
			const urls = files.map(item=>item.fileName)
			console.log(urls)
			uni.previewImage({
				current: files[index].fileName,
				urls,
				indicator: 'number',
				loop: true
			});
		}
	},
	created() {
		console.log(this.data);
	}
};
</script>

<style lang="scss" scoped>
.logs_card {
	padding: 10rpx 0;
	.followUp_log {
		.follow_item {
			padding: 0rpx 30rpx 20rpx;
			border-bottom: 2rpx solid #eaeaea;
			.custom_title {
				padding-top: 30rpx;
				padding-bottom: 10rpx;
			}
			.desc {
				line-height: 45rpx;
			}
			.image_cneg {
				padding-top: 20rpx;
				image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
