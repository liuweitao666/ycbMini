<template>
	<div>
		<!-- :before-upload="beforeUpload" -->
		<!-- @on-choose-complete="beforeUpload" -->
		<u-upload
			:action="ossData.host || ''"
			:width="width"
			:before-upload="beforeAvatarUpload"
			:file-list="fileList"
			:form-data="dataUpload"
			ref="Uupload"
			:height="height"
			:auto-upload="true"
			:on-success="handleSuccess"
			:on-error="handleError"
		></u-upload>
	</div>
</template>

<script>
import { ossConfig } from '@/api/uploadFile/upload.js';
export default {
	props: {
		// 文件列表的类型
		listType: {
			type: String,
			default: 'text',
			validator: function(value) {
				// 这个值必须匹配下列字符串中的一个
				return ['text', 'picture', 'picture-card'].indexOf(value) !== -1;
			}
		},
		// 接受上传的文件类型
		accept: {
			type: String,
			default: 'image/jpeg, image/gif, image/png, image/bmp'
		},
		width: {
			type: String,
			default: '158'
		},
		height: {
			type: String,
			default: '158'
		},
		// 是否多选
		multiple: {
			type: Boolean,
			default: false
		},
		// 最大允许上传个数
		limit: {
			type: Number,
			default: 1
		},
		// 是否显示上传列表
		showFileList: {
			type: Boolean,
			default: true
		},
		// oss文件上传路径 clue-import,customer-import;分区线索或者客户数据
		ossPathType: {
			type: String,
			required: true,
			validator: function(value) {
				// 这个值必须匹配下列字符串中的一个
				return ['clue-import', 'customer-import'].indexOf(value) !== -1;
			}
		},
		// 允许上传的文件大小 单位：m
		acceptSize: {
			type: Number,
			default: null
		}
		// 上传文件列表[{name:文件名,url:真实的文件存储路径,uploadurl:上传时使用的路径}]
	},
	data() {
		return {
			ossData: {},
			// 上传前携带的额外的参数
			dataUpload: {
				key: '',
				OSSAccessKeyId: '',
				policy: '',
				Signature: ''
			},
			fileList: []
		};
	},
	watch:{
		fileList(newVal){
			console.log(newVal)
		}
	},
	created() {
		this.configOssData();
	},
	methods: {
		// 获取oss上传的必要信息
		configOssData() {
			ossConfig({ type: this.ossPathType }).then(res => {
				const data = res;
				if (data && data.code == 200) {
					this.ossData = data.data;
					console.log(this.ossData);
				}
			});
		},
		// 上传前的狗子
		beforeUpload(lists) {
			uni.showLoading({
				title:"正在上传"
			})
			this.beforeAvatarUpload(lists)
		},
		beforeAvatarUpload(index,fileList) {
			this.dataUpload.OSSAccessKeyId = this.ossData.accessId;
			this.dataUpload.policy = this.ossData.policy;
			this.dataUpload.Signature = this.ossData.signature;
			// fileList.forEach((file,index)=>{
			// 	console.log(file)
			// })
			this.uploadFile(fileList[index])
			return false
		},
		// 上传文件
		uploadFile(file){
			console.log(file)
			if (this.acceptSize) {
				const flagSize = file.size / 1024 / 1024 > this.acceptSize;
				if (flagSize) {
					// this.$message.error(`文件大于${this.acceptSize}m`);
					return false;
				}
			}
			file.uid = new Date().getTime();
			this.dataUpload.key = `${this.ossData.dir}${file.uid}.${file.url.split('.')[1]}`;
			// 上传文件
			uni.uploadFile({
				url:this.ossData.host,
				filePath:file.url,
				name:'file',
				formData:this.dataUpload,
				success:(res)=>{
					console.log(res)
					this.$emit('onSuccess',{
						fileName:this.dataUpload.key,
						key:this.dataUpload.key
					})
					uni.hideLoading()
				},
				fail:(err)=>{
					uni.showToast({
						title:'上传失败～',
					})
					uni.hideLoading()
					console.log(err+'error')
				}
			})
		},
		handleError(err) {
			console.log(err);
			// this.$message.error("文件上传失败")
		},
		handleExceed() {
			// this.$message.error('当前最多允许上传' + this.limit + '张图片')
		},
		handleRemove(file, fileList) {
			// this.$emit('changeUpload', fileList)
		},
		// 预览
		handlePreview(file) {
			this.dialogVisible = true;
			this.dialogImageUrl = file.uploadurl;
		},
		// 预览弹窗关闭前的回调
		beforeDialogClose(done) {
			this.dialogImageUrl = '';
			done();
		},
		clearFiles() {
			this.$refs.photoupload.clearFiles();
		}
	}
};
</script>

<style lang="scss" scoped>
.dialogStyle {
	::v-deep {
		.el-dialog__header {
			border: none;
		}
	}
}
</style>
