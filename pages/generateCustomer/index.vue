<template>
	<view class="add_follow_up">
		<u-form :model="form" ref="uForm" label-width="140">
			<view class="form_wrap">
				<view class="form_item">
					<u-form-item label="来源渠道" prop="source" :required="true">
						<u-input v-model="form.sourceText" type="select" @click="sourceShow = true" />
						<u-select :list="sourceList" mode="mutil-column-auto" value-name="dictKey" label-name="dictValue" v-model="sourceShow" @confirm="sourceCallback"></u-select>
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="客户姓名" prop="name" :required="true"><u-input v-model="form.name" placeholder="姓名" /></u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="办理地址">
						<u-input v-model="region" type="select" @click="showRegion" placeholder="省-市" />
						<u-popup v-model="regionShow" height="70%" mode="bottom" :border-radius="24">
							<citySheet :dataTree="regionList" v-if="regionList.length > 0" @submit="regionCallback" />
						</u-popup>
						<!-- <u-action-sheet :list="regionList" v-model="show" @click="regionCallback"></u-action-sheet> -->
					</u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="业务类型">
						<u-input v-model="form.sex" type="select" @click="businessShow = true" />
						<u-action-sheet :list="businessSheetList" v-model="show" @click="businessSheetCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<view class="form_item" v-if="complex">
					<u-form-item label="性别">
						<u-input v-model="form.sexText" type="select" @click="sexShow = true" />
						<u-action-sheet :list="sexList" v-model="sexShow" @click="sexCallback"></u-action-sheet>
					</u-form-item>
				</view>
				<!-- 联系方式 -->
				<view class="form_item">
					<u-form-item label="联系方式"><contacts v-model="form.phone" placeholder="联系方式" /></u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="微信号"><u-input v-model="form.position" placeholder="微信号" /></u-form-item>
				</view>
				<view class="form_item"><u-form-item label="微信二维码"></u-form-item></view>
				<view class="form_item">
					<u-form-item>
						<upload-file ossPathType="customer-import" @on-success="handleSuccess" />
					</u-form-item>
				</view>
				<!-- 公司名称 -->
				<view class="form_item" v-if="complex">
					<u-form-item label="公司名称"><u-input v-model="form.companyName" type="select" @click="jumpTo('/pages/searchPage/index?type=1')" placeholder="公司名称" /></u-form-item>
				</view>
				<view class="form_item" v-if="complex">
					<u-form-item label="微信号"><u-input v-model="form.position" placeholder="公司职位" /></u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="意向度"><u-rate :count="5" active-color="#FA3534" v-model="form.rate"></u-rate></u-form-item>
				</view>
				<view class="form_item">
					<u-form-item label="标签"><u-input v-model="form.labels" type="select" placeholder="请输入标签" @click="jumpTo('/pages/generateCustomer/labels/labels')" /></u-form-item>
				</view>
				<view class="form_item"><u-form-item label="备注"></u-form-item></view>
				<view class="form_item">
					<u-form-item><u-input v-model="form.remark" placeholder="备注" type="textarea" :custom-style="textareaStyle" /></u-form-item>
				</view>
			</view>
		</u-form>
		<u-button :custom-style="customSubmit" :disabled="isLoading" @click="handleSubmit">确认提交</u-button>
		<u-toast ref="uToast"></u-toast>
		<!-- 重复添加提示 -->
		<u-modal v-model="modelShow" confirm-text="知道了">
			<view class="modelShow-content">
				<div style="line-height: 24px">
					<div style="color: #f56c6c">{{ transferCont.msg }}</div>
					<div>当前客户所属人：{{ transferCont.principalName }}</div>
					<div>跟进次数：{{ transferCont.followNum }}次</div>
					<div>下次回收时间：{{ transferCont.recoveryTime }}</div>
				</div>
			</view>
		</u-modal>
		<!-- 搜索公司组件 -->
	</view>
</template>

<script>
import { clueToCustomer, getClueDetail } from '@/api/clue/clue.js';
import { createCustomer } from '@/api/customer/customer.js';
import { getRegionTree } from '@/api/region/region.js';
import { getDictionaryTree } from '@/api/dict/index.js';

// 导入组件
import citySheet from '@/components/citySheet/index.vue';
import contacts from '@/components/contacts/index.vue';
import uploadFile from '@/components/uploadFile/index.vue';
import { isMobile } from '@/utils/validate.js';
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
	components: {
		citySheet,
		contacts,
		uploadFile
	},
	data() {
		return {
			modelShow: false,
			businessShow:false,
			businessSheetList:[],
			transferCont: {},
			culeData: {},
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
			// 标签名称
			labels: '',
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
				wechat: '',
				source: '',
				sourceText: '',
				sexText: '',
				sex: 0
			},
			rules: {
				source: [
					{
						required: true,
						message: '请选择来源',
						trigger: ['change']
					}
				],
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
					},
					{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							console.log(value);
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return isMobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						// 'change',
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
			sexList: [
				{
					text: '保密'
				},
				{
					text: '男'
				},
				{
					text: '女'
				}
			],
			sexShow: false,
			// 提交禁止状态
			isLoading: false,
			// 表格状态
			statusShow: false,
			sourceShow: false,
			// 客户状态列表
			statusList: statusList,
			// 客户来源列表
			sourceList: [],
			// 显示地区列选择去
			regionShow: false,
			// 地区列表
			regionList: [],
			// 是否新增客户
			complex: null,
			replayData: {}
		};
	},
	onLoad({ id, complex }) {
		if (!complex) {
			getClueDetail({ id }).then(res => {
				this.culeData = res.data;
				this.form.phone = res.data.phone;
			});
		}
		this.form.clueId = id;
		this.complex = complex;
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.getRegionTree();
		this.getsourceList();
	},
	methods: {
		// 上传图片
		handleSuccess(file) {
			this.form.files.push(file);
			this.$refs.uToast.show({
				title: '上传成功',
				type: 'success'
			});
		},
		// 设置公司信息
		setCompany(companyInfo) {
			this.form.companyName = companyInfo.companyName;
			this.form.qichachaCompanyId = companyInfo.qichachaCompanyId;
		},
		// 设置标签值
		setLabels(labels) {
			this.form.labels = labels;
		},
		async showRegion() {
			this.regionShow = true;
		},
		
		// 获取来源渠道
		async getsourceList() {
			const { data: res } = await getDictionaryTree('source');
			console.log(res);
			this.sourceList = res;
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
		// 业务类型
		businessSheetCallback(business){
			// this.region = region.provinceName + '-' + region.cityName;
			// this.business = business.name;
			this.form.cityName = business.name;
			this.form.cityCode = business.code;
			this.businessShow = false;
		},
		// 选择地区的回调
		regionCallback(region) {
			console.log(region);
			// this.region = region.provinceName + '-' + region.cityName;
			this.region = region.name;
			this.form.cityName = region.name;
			this.form.cityCode = region.code;
			this.regionShow = false;
		},
		// 选择客户状态的回调
		sourceCallback(data) {
			this.form.source = data[1].value;
			this.form.sourceText = data[0].label + '-' + data[1].label;
		},
		// 选择性别回调
		sexCallback(index) {
			console.log(index);
			this.form.sexText = this.sexList[index].text;
			this.form.sex = index;
		},
		// 跳转对应页面
		jumpTo(url) {
			uni.navigateTo({
				url
			});
		},

		// 提交生成客户请求
		handleSubmit() {
			this.$refs.uForm.validate(async value => {
				console.log(this.form, this.complex);
				if (value) {
					try {
						this.isLoading = true;
						uni.showLoading({
							title: '正在生成'
						});
						const { wangwang, wechat, qq, tel, email } = this.culeData;
						const data = this.complex ? await createCustomer(this.form) : await clueToCustomer({ ...this.form, wangwang, wechat, qq, tel, email });
						uni.hideLoading();
						if (data.code === 200) {
							this.$refs.uToast.show({
								title: '生成成功',
								type: 'success'
							});
							this.isLoading = false;
							this.$store.dispatch('getCustomerList');
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 500);
						} else {
							console.log(data);
							this.transferCont = {
								...data.data,
								msg: data.msg
							};
							this.modelShow = true;
							this.isLoading = false;
						}
					} catch (e) {
						console.log(e);
						//TODO handle the exception
						this.isLoading = false;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.modelShow-content {
	padding: 20rpx 30rpx;
	font-size: 28rpx;
	line-height: 40rpx;
}
.add_follow_up {
	margin: 30rpx;
	overflow: hidden;
	padding-bottom: 50rpx;
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
