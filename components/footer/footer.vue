<template>
	<view :class="['footer',{'hidden':hidden}]" :style="{'height':height,'bottom':bottom}">
		<view class="content">
			<view class="main">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			bottom:{
				type:String,
				default:'0'
			},
			height:{
				type:String,
				default:'188rpx'
			},
			hidden:{
				type:Boolean,
				default:_=>false
			}
		},
		data(){
			return {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 999;
		transition: all .28s ease;
		.content{
			height: 218rpx;
			background: #075BB8;
			border-radius: 60rpx 60rpx 0px 0px;
			.main{
				display: flex;
				padding: 44rpx 60rpx 0;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	.hidden{
		transform: translateY(100%);
	}
</style>
