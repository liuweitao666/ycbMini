<template>
	<view class="logs_card">
		<view class="opration_log" v-if="data.length > 0">
			<view class="follow_item" v-for="item in data" :key="item.id">
				<view class="custom_title">{{ item.createUserName }}</view>
				<view class="desc">{{ item.createTime }}</view>
				<view class="desc" v-for="(item2, index2) in item.updateContent" :key="index2">
					<text style="color: #FC961E">#{{ switchField(item.operationType) }}</text>
					<text style="color: #FC961E;padding-right: 10rpx">{{ item2.fieldName }}#</text>
					<text >{{ `${item2.fieldName ? item2.fieldName + '更新' : ''} ${item2.oldValue ? item2.oldValue + '变更为' : ''}${item2.newValue}` }}</text>
				</view>
			</view>
		</view>
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
	created() {
		console.log(this.data);
	},
	methods: {
		switchField(field) {
			switch (field) {
				case 'create':
					return '新增';
				case 'update':
					return '修改';
				case 'delete':
					return '删除';
				case 'clue':
					return '线索';
				case 'customer':
					return '客户';
				case 'niche':
					return '商机';
				case 'order':
					return '订单';
				case 'OrderGoods':
					return '订单商品';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.logs_card {
	padding: 10rpx 0;
	.opration_log {
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
