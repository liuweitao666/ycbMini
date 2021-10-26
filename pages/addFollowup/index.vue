<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="followForm" label-width="185">
			<view class="form_wrap">
				<view class="form_item">
					<u-form-item label="跟进方式" prop="typeText" :required="true">
						<u-input v-model="form.typeText" type="select" @click="typeShow = true" input-align="right" :custom-style="{ paddingRight: '20rpx' }" />
						<u-action-sheet :list="typeSheetList" v-model="typeShow" @click="typeSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item"><u-form-item label="跟进内容" :required="true"></u-form-item></view>
				<view class="form_item">
					<u-form-item prop="followContent" label-width="0"><u-input v-model="form.followContent" type="textarea" :custom-style="textareaStyle" /></u-form-item>
				</view>
			</view>
			<view class="item_single">
				<u-form-item :border-bottom="false">
					<upload-file v-if="dataType" :ossPathType="dataType==='0'?'clue-import':'customer-import'" @on-success="handleSuccess"/>
				</u-form-item>
			</view>
			<view class="item_single">
				<u-form-item label="下次跟进时间" :border-bottom="false">
					<u-input v-model="form.nextFollowTime" type="select" input-align="right" :custom-style="{ paddingRight: '20rpx' }" @click="showCalendar = true" />
					<u-picker mode="time" v-model="showCalendar" :params="timeParams" :start-year="currentYear" @confirm="calendarChange"></u-picker>
					<!-- <u-calendar v-model="showCalendar" mode="date" @change="calendarChange"></u-calendar> -->
				</u-form-item>
			</view>
		</u-form>
		<u-button :custom-style="customSubmit" :disabled="isLoading" @click="handleSubmit">确认提交</u-button>
		<!-- 提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
// import {addFollowRecord} from "@/api/customer/customer.js"
import { addClueFollow } from '@/api/clue/clue.js';
// import
import uploadFile from '@/components/uploadFile/index.vue';
// 1.电话，2.微信，3.旺旺，4.线下，5.其他
const SheetList = [
	{
		text: '电话'
	},
	{
		text: '微信'
	},
	{
		text: '旺旺'
	},
	{
		text: '线下'
	},
	{
		text: '其他'
	}
];
export default {
	components: {
		uploadFile
	},
	props: ['customerId'],
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
				borderRadius: '8rpx',
				minHeight: '200rpx'
			},
			form: {
				type: '',
				typeText: '',
				followContent: '',
				nextFollowTime: '',
				files:[]
			},
			isLoading: false,
			rules: {
				typeText: [
					{
						required: true,
						message: '请选择跟进方式',
						trigger: ['blur', 'change']
					}
				],
				followContent: [
					{
						required: true,
						message: '请输入跟进内容',
						// blur和change事件触发检验
						trigger: ['blur', 'change']
					}
				]
			},
			typeShow: false,
			showCalendar: false,
			actionSheetList: SheetList,
			typeSheetList: SheetList,
			radio: '',
			switchVal: false,
			// 当前添加类型 0 线索 1 客户
			dataType: '',
			// 当前id
			id: '',
			// 时间选择器配置
			timeParams: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true
			},
			currentYear:new Date().getFullYear()
		};
	},
	onLoad({ id, dataType }) {
		this.dataType = dataType;
		console.log(this.dataType)
		this.id = id;
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		console.log(this.$refs.uForms);
		this.$refs.followForm.setRules(this.rules);
	},
	methods: {
		typeSheetCallback(value) {
			this.form.typeText = this.typeSheetList[value].text;
			this.form.type = value + 1;
		},
		actionSheetCallback() {},
		calendarChange(date) {
			console.log(date)
			// const hms = this.$dateFormat(new Date(), 'hh:mm:ss');
			this.form.nextFollowTime = date.year+'-'+date.month +'-'+ date.day+' '+ date.hour +':'+date.minute+':'+date.second;
		},
		// 文件上传成功钩子
		handleSuccess(file){
			this.form.files.push(file) 
			this.$refs.uToast.show({
				title: '上传成功',
				type: 'success'
			});
		},
		// 提交添加跟进记录请求
		handleSubmit() {
			this.$refs.followForm.validate(async value => {
				if (value) {
					try {
						this.isLoading = true;
						uni.showLoading({
							title: '正在添加,请稍后'
						});
						if (this.dataType === '0') {
							this.form.clueId = this.id;
							this.form.category = 2;
						} else {
							this.form.customerId = this.id;
							this.form.category = 1;
						}
						const data = await addClueFollow(this.form);
						uni.hideLoading();
						if (data.code === 200) {
							this.$refs.uToast.show({
								title: '添加成功',
								type: 'success'
							});
							let pages = getCurrentPages()
							// 获取上一页栈
							let prevPage = pages[ pages.length - 2 ]
							// 触发上一页 initData 函数更新页面
							prevPage.$vm.refreshData && prevPage.$vm.refreshData()
							setTimeout(_ => {
								uni.navigateBack({
									delta: 1,
								});
							}, 500);
							this.isLoading = false;
						} else {
							this.$refs.uToast.show({
								title: '添加失败,请稍后再试!',
								type: 'error'
							});
							this.isLoading = false;
						}
					} catch (e) {
						console.log(e,'=======');
						setTimeout(()=>{
							this.isLoading = false;
						},1000)
					}
				}
			});
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
