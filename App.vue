<script>
	import {mapGetters,mapActions} from "vuex"
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
		if(this.token){
			this.getDict()
		}
		this.timer = setInterval(() => {
			this.refreshToken()
		}, 30000);
		// 获取设备信息
		uni.getSystemInfo({
			success: function(res) {
				uni.setStorageSync('windowHeight', res.windowHeight);
			}
		});
		// 获取当前小程序的AppId
		const accountInfo = wx.getAccountInfoSync();
		uni.setStorageSync('appId', accountInfo.miniProgram.appId);
		uni.login({
			provider:'weixin',
			success:(loginRes)=>{
			// 获取用户信息
					uni.getUserInfo({
						provider:'weixin',
						success:function(infoRes){
								uni.setStorageSync('wxUserInfo',infoRes.userInfo)
					}
				});
			}
		});
	},
	onHide: function() {
		console.log('App Hide');
		// clearInterval(this.timer)
	},
	computed:{
		...mapGetters(['userInfo','token'])
	},
	methods:{
		...mapActions({
			getDict:'dict/getDict'
		}),
		// 定时检测token
		async refreshToken() {
			console.log('refreshToken')
			const tokenData = uni.getStorageSync('token_time')
			if(!tokenData) return
			const token = JSON.parse(tokenData)
			const date = calcDate(token.datetime, new Date().getTime());
			if (validatenull(date)) return;
			if (date.seconds >= website.tokenTime) {
				try{
					const data =await this.$store.dispatch("refreshToken")
					console.log(data)
				}catch(e){
					//TODO handle the exception
					let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					let curRoute = routes.length===0?'':routes[routes.length - 1].route //获取当前页面路由
					// 超出时间直接登出重新登录
					this.$store.dispatch("FedLogOut").then(_=>{
						if(!curRoute){
							uni.navigateTo({
								url:'/pages/login/index'
							})
						}
					})
				}
			}
		},
		
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/styles/common.scss';
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
