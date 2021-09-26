<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="uForm" label-width="155">
			<view class="form_wrap">
				<u-form-item label="跟进方式" label-align="right">
					<view class="form_item">
						<u-input v-model="form.sex" type="select" @click="show = true" />
					</view>
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
				<u-form-item label="跟进内容" label-align="right">
				</u-form-item>
				<u-form-item  class="form_item">
					<view class="form_item">
						<u-input v-model="form.content" type="textarea" />
					</view>
				</u-form-item>
			</view>
			<view class="item_single">
				<u-form-item :border-bottom="false">
					<u-upload ref="uUpload" :auto-upload="true" width="158" height="158"></u-upload>
				</u-form-item>
			</view>
			<view class="item_single">
				<u-form-item label="味道" :border-bottom="false">
					<u-input v-model="form.sex" type="select" @click="show = true" />
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
			</view>
			<!-- <u-button size="mini">十年灯</u-button> -->
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
				width:'100%',
				border:"none",
				marginTop: "120rpx",
				background: '#007AC3',
				borderRadius: '12rpx'
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
	.form_wrap{
		border-radius: 16rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(30, 36, 58, 0.05);
	}
	.form_item{
		padding: 0 30rpx;
	}
	.item_single{
		border:none;
		margin-top: 30rpx;
		padding: 0 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(30, 36, 58, 0.05);
	}
}
</style>
