<template>
	<view class="tags_wrap">
		<u-tag :text="tag.name" class="el-tag" :key="tag.id" v-for="tag in tags" closeable @close="handleClose(tag)"></u-tag>
		<u-input
			:custom-style="customStyle"
			border
			v-if="inputVisible"
			v-model="inputValue"
			ref="saveTagInput"
			size="mini"
			height="50"
			focus
			maxlength="20"
			:clearable="false"
			@keyup.enter.native="handleInputConfirm"
			@blur="handleInputConfirm"
		></u-input>
		<u-button plain class="input-new-tag" v-else size="mini" type="primary" @click="showInput">+ 添加标签</u-button>
	</view>
</template>

<script>
export default {
	props: {
		labels: {
			type: String,
			defaults: ''
		}
	},
	data() {
		return {
			inputVisible: false,
			inputValue: '',
			customStyle:{
				width:'136rpx',
				marginBottom: '10rpx'
			}
		};
	},
	computed: {
		tags() {
			if (!this.labels) return [];
			return this.labels.split(',').map((item, index) => {
				return {
					id: Date.now() + index,
					name: item
				};
			});
		}
	},
	methods: {
		handleClose(tag) {
			const labels = this.tags
				.filter(item => item.id !== tag.id)
				.map(item => item.name)
				.join(',');
			this.$emit('update:labels', labels);
		},

		showInput() {
			this.inputVisible = true;
		},

		handleInputConfirm() {
			let inputValue = this.inputValue;
			if (inputValue) {
				const tags = [
					...this.tags,
					{
						id: Date.now(),
						name: inputValue
					}
				];
				const labels = tags.map(item => item.name).join(',');
				this.$emit('update:labels', labels);
			}
			this.inputVisible = false;
			this.inputValue = '';
		}
	}
};
</script>

<style lang="scss" scoped>
	.tags_wrap{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
.el-tag {
	margin-right: 10rpx;
	margin-bottom: 10rpx;
}
.button-new-tag {
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	width: 90rpx;
	height: 64rpx;
	line-height: 60rpx;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90rpx;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	vertical-align: bottom;
	margin-bottom: 10rpx;
}
</style>
