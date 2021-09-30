<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="uForm" label-width="140">
			<view class="form_wrap">
				<view class="form_item">
					<u-form-item label="客户姓名" prop="name" :required="true"><u-input v-model="form.name" placeholder="姓名" /></u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="联系方式" prop="phone" :required="true"><u-input v-model="form.phone" placeholder="联系方式" /></u-form-item>
				</view>
				<!-- <view class="form_item">
					<u-form-item label="业务类型">
						<u-input v-model="form.sex" type="select" @click="show = true" />
						<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					</u-form-item>
				</view> -->
				<view class="form_item">
					<u-form-item label="地区">
						<u-input v-model="region" type="select" @click="showRegion" placeholder="省-市" />
						<u-select v-model="regionShow" mode="mutil-column-auto" value-name="code" label-name="name" :list="regionList" @confirm="regionCallback"></u-select>
						<!-- <u-action-sheet :list="regionList" v-model="show" @click="regionCallback"></u-action-sheet> -->
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="客户状态" prop="statusText" :required="true">
						<u-input v-model="form.statusText" type="select" @click="statusShow = true" />
						<u-action-sheet :list="statusList" v-model="statusShow" @click="statusCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="标签"><u-input v-model="form.labels" type="select" placeholder="请选择标签" @click="jumpTo" /></u-form-item>
				</view>
				<view class="form_item"><u-form-item label="备注"></u-form-item></view>
				<view class="form_item">
					<u-form-item><u-input v-model="form.content" placeholder="备注" type="textarea" :custom-style="textareaStyle" /></u-form-item>
				</view>
			</view>
		</u-form>
		<u-button :custom-style="customSubmit" :disabled="isLoading" @click="handleSubmit">确认提交</u-button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { clueToCustomer } from '@/api/clue/clue.js';
import { getRegionTree } from '@/api/region/region.js';
// 1.潜在客户、2.成交客户
const statusList = [
	{
		text: '潜在客户'
	},
	{
		text: '成交客户'
	}
];
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
				borderRadius: '8rpx',
				minHeight: '200rpx'
			},
			// 地区名称
			region: '',
			form: {
				name: '',
				cityCode: '',
				cityName: '',
				clueId: '',
				labels: '',
				phone: '',
				provinceCode: '',
				provinceName: '',
				qichachaCompanyId: '',
				status: '',
				statusText: '',
				wechat: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请选择客户姓名',
						trigger: ['blur']
					}
				],
				phone: [
					{
						required: true,
						message: '请输入联系方式',
						// blur和change事件触发检验
						trigger: ['blur']
					}
				],
				status: [
					{
						required: true,
						message: '请输入客户状态',
						// blur和change事件触发检验
						trigger: ['blur', 'change']
					}
				]
			},
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
			// 提交禁止状态
			isLoading: false,
			// 表格状态
			statusShow: false,
			// 客户状态列表
			statusList: statusList,
			// 显示地区列选择去
			regionShow: false,
			// 地区列表
			regionList: []
		};
	},
	onLoad({id}) {
		this.form.clueId = id
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		async showRegion() {
			await this.getRegionTree();
			this.regionShow = true;
		},
		// 获取城市数据
		async getRegionTree() {
			const { data: res } = await getRegionTree({
				parentCode: '00'
			});
			this.regionList = res;
			console.log(res);
		},
		// 选择状态的回调
		statusCallback(value) {
			this.form.status = value + 1;
			this.form.statusText = statusList[value].text;
			console.log(this.form);
		},
		// 选择地区的回调
		regionCallback(region) {
			this.region = region[0].label + '-' + region[1].label;
			this.form.provinceName = region[0].label;
			this.form.provinceCode = region[0].value;
			this.form.cityName = region[1].label;
			this.form.cityCode = region[1].value;
		},
		// 跳转标签页面
		jumpTo() {
			console.log(123);
		},
		// 提交添加跟进记录请求
		handleSubmit() {
			console.log(12456);
			console.log(this.$refs.uForm);
			this.$refs.uForm.validate(async value => {
				console.log(value);
				if (value) {
					try {
						this.isLoading = true;
						uni.showLoading({
							title: '正在生成,请稍后'
						});
						const data = await clueToCustomer(this.form);
						uni.hideLoading();
						if (data.code === 200) {
							this.$refs.uToast.show({
								title: '生成成功',
								type: 'success'
							});
							this.isLoading = false;
						} else {
							this.$refs.uToast.show({
								title: '网络错误',
								type: 'error'
							});
							this.isLoading = false;
						}
					} catch (e) {
						//TODO handle the exception
						uni.hideLoading();
						this.isLoading = false;
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
