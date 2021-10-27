<template>
	<view class="main">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad({url}) {
			console.log(url)
			this.url = decodeURIComponent(url) 
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height:100%
	}
</style>
