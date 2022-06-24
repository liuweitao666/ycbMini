<template>
	<view class="m-ycb-inputPhone">
		<view class="select">
			<u-input @click="show = true" type="select" v-model="countryCode" :border="false" placeholder="选择区号">
			</u-input>
			<u-action-sheet :list="codeList" v-model="show" @click="handleChangeSelect"></u-action-sheet>
		</view>
		<!-- <el-select :size="size" class="select" @change="handleChangeSelect" v-model="form.countryCode" :disabled="disabled">
			<el-option v-for="item in codeList" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey"></el-option>
		</el-select> -->
		<u-input
			class="input"
			@input="handleInput"
			v-model="form.input"
			:placeholder="placeholder"
		></u-input>
	</view>
</template>
<script>
import { getDictionary } from '@/api/dict/index.js';
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	data() {
		return {
			countryCode:'',
			form: {
				countryCode: '',
				input: ''
			},
			rules: {
				input: []
			},
			codeList:[],
			show:false
		};
	},
	props: {
		disabled: {
			type: Boolean
		},
		clearable: {
			type: Boolean
		},
		size: {
			type: String
		},
		value: {
			type: String
		},
		placeholder: {
			type: String,
			default: '请输 入手机号'
		}
	},
	created() {
		this.countryAreaCode()
	},
	methods: {
		getValue(val) {
			let _input = val ? val.toString() : '';
			let value = '中国大陆+86'
			if (_input.indexOf(' ') > 0) {
				let _arr = _input.split(' ');
				let code = _arr[0];
				let dictFilter = this.codeList.filter(item => item.dictKey == code)
				if (this.codeList.length > 0 && dictFilter.length <= 0) {
					code = '+86';
				}
				dictFilter[0] && (value = dictFilter[0].dictValue)
				this.form.countryCode = code;
				this.countryCode = value
				this.form.input = _arr[1].trim();
			} else {
				this.form.countryCode = '+86';
				this.countryCode = value
				this.form.input = _input.trim();
			}
		},
		handleChangeInput() {
			this.$emit('change', `${this.form.countryCode} ${this.form.input}`);
		},
		handleChangeSelect(index) {
			this.form.countryCode = this.codeList[index].dictKey
			this.countryCode = this.codeList[index].dictValue
			this.$emit('change', `${this.form.countryCode} ${this.form.input}`);
			this.$emit('input', `${this.form.countryCode} ${this.form.input}`);
		},
		handleInput() {
			console.log(this.form.input)
			this.$emit('input', `${this.form.countryCode} ${this.form.input}`);
		},
		countryAreaCode() {
			getDictionary({ code: 'country_area_code' })
				.then(res => {
					console.log(res)
					this.codeList = res.data.map(item=>{
						return {
							text:item.dictValue,
							...item
						}
					})
				})
				.catch(error => {
					reject(error);
				});
		}
	},
	watch: {
		value(val) {
			this.getValue(val);
		},
	},
	mounted() {
		this.getValue(this.value);
	}
};
</script>
<style lang="scss" scoped>
.m-ycb-inputPhone {
	width: 100%;
	display: flex;
	flex-direction: row;
	.select {
		width: 200rpx;
		flex-shrink: 0;
		flex-shrink: 0;
		margin-right: 10rpx;
	}
	.input {
		width: auto;
		flex: 1;
	}
}
</style>
