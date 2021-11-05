import urlConfig from './config.js'
import store from '../../store/index.js'
import website from '@/config/website';
let Base64= require('@/utils/base64.js').Base64;
import { serialize} from "@/utils/util.js"

const request = {}
const headers = {}

request.globalRequest = ({url, method, params, data, power,noSerialize}) => {
	/*  权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	    1 == 不通过access_token校验的接口
	    2 == 文件下载接口列表
	    3 == 验证码登录 */
	const realData = params ||data|| {}
	let token = ''
	// uni.getStorage({
	// 	key:'token',
	// 	success:(res)=>{
	// 		token = res.data
	// 	}
	// })
	console.log(data)
	headers['Tenant-Id'] = uni.getStorageSync('tenantId') || ''
	headers['Content-Type'] = 'application/json'
	headers['Blade-Auth'] = `bearer ${uni.getStorageSync('token')||''}`  
	headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
	let responseType = ""
	//headers中配置serialize为true开启序列化
	if (method === "POST"&& !noSerialize) {
		url = `${url}?${serialize(params)}`;
	}
	switch (power) {
		case 1:
			headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
			break;
		case 2:
			headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
			break;
		case 3:
			responseType = 'arraybuffer'
			break;
		default:
			// headers['Authorization'] = `Bearer ${
			//     this.$store.getters.userInfo
			// }`
			// headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
			headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
			break;
	}
	return uni.request({
		url,
		method,
		data:realData,
		dataType: 'json',
		responseType,
		header: headers
	}).then(res => {
		// console.log(res)
		if (res[1].statusCode == 200) {
			return res[1].data
		} else {
			throw res[1].data
		}
	}).catch(parmas => {
		switch (parmas.code) {
			case 401:
				store.dispatch('FedLogOut').then(res=>{
					uni.showToast({
						title: '登录已失效，请重新登录',
						icon: 'none',
					})
					let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					let curRoute = routes[routes.length-1]
					console.log(curRoute)
					if(curRoute && curRoute.route ==='pages/login/index') return
					setTimeout(()=>{
						uni.navigateTo({
							url: `/pages/login/index`
						});
					},500)
					// return Promise.reject(parmas)
				})
				break
			default:
				uni.showToast({
					title: parmas.msg || '网络错误，请稍后再试！',
					icon: 'none',
					duration:1000
				})
				return Promise.reject(parmas)
				break
		}
	})
}
export default request
