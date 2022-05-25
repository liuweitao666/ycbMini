<template>
	<view class="clue_transfer">
		<ycb-select-user :receiverId.sync="receiverId" :targetTenantId.sync="targetTenantId" style="flex: 1;" />
		<view class="footer">
			<u-button
				type="primary"
				:custom-style="{
					width: '420rpx',
					height: '84rpx',
					background: '#00A4FF',
					'border-radius': '8px'
				}"
				@click="showModel"
			>
				转让
			</u-button>
		</view>
		<!-- 弹窗 -->
		<u-modal v-model="visible" :content="content" show-cancel-button @confirm="submit"></u-modal>
	</view>
</template>

<script>
import { transferClue } from '@/api/clue/clue.js';
export default {
	data() {
		return {
			culeId: '',
			visible: false,
			content: '确认转让该条线索吗？',
			receiverId: '',
			targetTenantId: ''
		};
	},
	onLoad({ id }) {
		this.culeId = id;
	},
	methods: {
		// 打开确认弹窗
		showModel() {
			if (!this.receiverId) {
				return uni.showToast({
					title: '请先选择员工！',
					icon: 'none'
				});
			}
			this.visible = true;
		},
		change() {},
		async submit() {
			try {
				console.log('提交转让请求！');
				const data = await transferClue({
					receiverId: this.receiverId,
					ids: [this.culeId],
					targetTenantId: this.targetTenantId
				});
				console.log(data);
				if (data.success) {
					uni.showToast({
						title: '线索转让成功！',
						icon: 'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/home/index'
						});
					},500)
				} else {
					uni.showToast({
						title: '线索转让失败！',
						icon: 'none'
					});
				}
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.clue_transfer {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #ffffff;
	position: relative;
	.search {
		flex: 1;
	}
	.footer {
		height: 150rpx;
		width: 100vw;
		border-top: 2rpx solid #f6f6f6;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
