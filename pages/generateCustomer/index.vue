<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="uForm" label-width="135">
			<view class="form_wrap">
				<view class="form_item">
					<u-form-item label="客户姓名">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="联系方式">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="业务类型">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="地区">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="客户状态">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="标签.">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item"><u-form-item label="备注"></u-form-item></view>
				<view class="form_item">
					<u-form-item><u-input v-model="form.content" type="textarea" :custom-style="textareaStyle" /></u-form-item>
				</view>
			</view>
		</u-form>
		<u-button :custom-style="customSubmit">确认提交</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 自定义提交按钮
			customSubmit: {
				color: '#fff',
				width: '100%',
				border: 'none',
				marginTop: '120rpx',
				background: '#007AC3',
				borderRadius: '12rpx'
			},
			// 自定义textarea框样式
			textareaStyle: {
				background: '#F7F7F7',
				border: '1px solid #FC961E',
				padding: '20rpx',
				borderRadius:"8rpx",
				minHeight:"200rpx"
			},
			form: {
				name: '',
				intro: '',
				sex: ''
			},
			checkboxList: [
				{
					name: '苹果',
					checked: false,
					disabled: false
				},
				{
					name: '雪梨',
					checked: false,
					disabled: false
				},
				{
					name: '柠檬',
					checked: false,
					disabled: false
				}
			],
			radioList: [
				{
					name: '鲜甜',
					disabled: false
				},
				{
					name: '麻辣',
					disabled: false
				}
			],
			show: false,
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			],
			radio: '',
			switchVal: false
		};
	},
	method: {
		actionSheetCallback(value) {
			console.log(value);
		}
	}
};
</script>

<style lang="scss">
.add_follow_up {
	margin: 30rpx;
	overflow: hidden;
	.form_wrap {
		border-radius: 16rpx;
		background-color: #ffffff;
		box-shadow: 0px 0px 10px 0px rgba(30, 36, 58, 0.05);
	}
	.form_item {
		padding: 0 30rpx;
	}
	.item_single {
		border: none;
		margin-top: 30rpx;
		padding: 0 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #ffffff;
		box-shadow: 0px 0px 10px 0px rgba(30, 36, 58, 0.05);
	}
}
</style>
