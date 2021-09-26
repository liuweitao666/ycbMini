<script>
	import {mapGetters} from "vuex"
	import {calcDate} from "@/utils/date.js"
	import {validatenull} from '@/utils/validate.js'
	import website from "@/config/website.js"
export default {
	data(){
		return {
			timer:null
		}
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		this.refreshToken()
		this.timer = setInterval(() => {
			this.refreshToken()
		}, 10000);
		// 获取设备信息
		uni.getSystemInfo({
			success: function(res) {
				console.log(res);
				uni.setStorageSync('windowHeight', res.windowHeight);
			}
		});
	},
	onHide: function() {
		console.log('App Hide');
		clearInterval(this.timer)
	},
	computed:{
		...mapGetters(['userInfo'])
	},
	methods:{
		// 定时检测token
		refreshToken() {
			const tokenData = uni.getStorageSync('token_time')
			if(!tokenData) return
			const token = JSON.parse(tokenData)
			const date = calcDate(token.datetime, new Date().getTime());
			if (validatenull(date)) return;
			console.log(date.seconds,website.tokenTime)
			if (date.seconds >= website.tokenTime) {
				const data = this.$store.dispatch("refreshToken")
				console.log(data)
			}
		},
		
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/static/styles/common.scss';
/* 每个页面公共css */
page {
	background-color: #f0fcfd;
}
div,
button,
page {
	margin: 0;
	padding: 0;
}
</style>
