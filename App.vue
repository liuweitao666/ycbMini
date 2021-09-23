<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/static/styles/common.css";
	/* 每个页面公共css */
	page{
		background-color: #F0FCFD;
	}
	div,button,page{
		margin:0;
		padding: 0;
	}
</style>
