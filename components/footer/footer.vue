<template>
	<view :class="['footer',{'hidden_footer':hidden}]" :style="{ height: height, bottom: bottom }">
		<view class="content">
			<view class="main"><slot></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		bottom: {
			type: String,
			default: '0'
		},
		height: {
			type: String,
			default: '188rpx'
		},
		hidden: {
			type: Boolean,
			default: _ => false
		}
	},
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 999;
	transition: all 0.28s ease;
	.content {
		height: 218rpx;
		background: #075bb8;
		border-radius: 60rpx 60rpx 0px 0px;
		.main {
			display: flex;
			padding: 44rpx 60rpx 0;
			justify-content: space-between;
			align-items: center;
		}
	}
}
.hidden_footer {
	transform: translateY(100%);
}
// .show{
// 	transform: translateY(0);
// 	animation: show .28s ease;
// }
// @keyframes show
// {
// 	0% {transform: translateY(100%)}
// 	100% {transform: translateY(0);}
// }
// @keyframes hidden
// {
// 	0% {transform: translateY(0)}
// 	100% {transform: translateY(100%);}
// }
</style>
