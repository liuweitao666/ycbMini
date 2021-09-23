<template>
	<view>
		<nav-bar @change="changeTab" :isBackground="true" title="徐小凯" height="482rpx"></nav-bar>
		<view class="">
			123456
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				navList:[{
					cate_name: '待收货'
				}, {
					cate_name: '待付款'
				},]
			}
		},
		methods: {
			changeTab(value){
				console.log(value)
			}
		}
	}
</script>

<style>

</style>
