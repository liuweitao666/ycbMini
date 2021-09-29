<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="uForm" label-width="185" >
			<view class="form_wrap">
				<view class="form_item">
					<u-form-item label="跟进方式" prop="typeText" :required="true">
						<u-input v-model="form.typeText" type="select" @click="typeShow = true" input-align="right" :custom-style="{ paddingRight:'20rpx' }" />
						<u-action-sheet :list="typeSheetList" v-model="typeShow" @click="typeSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item"><u-form-item label="跟进内容" :required="true"></u-form-item></view>
				<view class="form_item">
					<u-form-item prop="followContent"><u-input v-model="form.followContent" type="textarea" :custom-style="textareaStyle" /></u-form-item>
				</view>
			</view>
			<view class="item_single">
				<u-form-item :border-bottom="false"><u-upload ref="uUpload" :auto-upload="true" width="158" height="158"></u-upload></u-form-item>
			</view>
			<view class="item_single">
				<u-form-item label="下次跟进时间" :border-bottom="false">
					<u-input v-model="form.nextFollowTime" type="select" input-align="right" :custom-style="{ paddingRight:'20rpx' }" @click="showCalendar = true" />
					<u-calendar v-model="showCalendar " mode="date" @change="calendarChange"></u-calendar>
				</u-form-item>
			</view>
		</u-form>
		<u-button :custom-style="customSubmit" :disabled="isLoading" @click="handleSubmit">确认提交</u-button>
		<!-- 提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {addFollowRecord} from "@/api/customer/customer.js"
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
					text:'线下'
				},
				{
					text:'其他'
				}
			]
export default {
	props:['customerId'],
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
				nextFollowTime:'',
			},
			isLoading:false,
			rules: {
				type: [
					{
						required: true,
						message: '请选择跟进方式',
						trigger: ['blur', 'change']
					}
				],
				content: [
					{
						required: true,
						message: '请输入跟进内容',
						// blur和change事件触发检验
						trigger: ['blur', 'change']
					}
				],
			},
			typeShow: false,
			showCalendar: false,
			actionSheetList: SheetList,
			typeSheetList:SheetList,
			radio: '',
			switchVal: false
		};
	},
	onLoad({id,dataType}) {
		console.log(id)
		dataType===0?this.form.clueId = id:this.form.customerId = id
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		console.log(this.$refs.uForm);
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		typeSheetCallback(value) {
			this.form.typeText = this.typeSheetList[value].text
			this.form.type = value + 1
		},
		actionSheetCallback(){
			
		},
		calendarChange(date){
			console.log(date)
			this.form.nextFollowTime = date.result
		},
		// 提交添加跟进记录请求
		handleSubmit(){
			this.$refs.uForm.validate(async (value)=>{
				if(value){
					try{
						this.isLoading = true
						uni.showLoading({
							title:'正在添加,请稍后'
						})
						const data = await addFollowRecord(this.form)
						uni.hideLoading()
						if(data.code===200){
							this.$refs.uToast.show({
								title: '添加成功',
								type: 'success',
							})
							this.isLoading = false
						}else{
							this.$refs.uToast.show({
								title: '添加失败,请稍后再试!',
								type: 'error',
							})
							this.isLoading = false
						}
					}catch(e){
						//TODO handle the exception
						this.isLoading = false
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
