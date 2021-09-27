import urlConfig from './config.js'
import store from '../../store/index.js'
import website from '@/config/website';
let Base64= require('@/utils/base64.js').Base64;

const request = {}
const headers = {}

request.globalRequest = ({url, method, params, power}) => {
	/*  权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	    1 == 不通过access_token校验的接口
	    2 == 文件下载接口列表
	    3 == 验证码登录 */
	const data = params || {}
	let token = ''
	// uni.getStorage({
	// 	key:'token',
	// 	success:(res)=>{
	// 		token = res.data
	// 	}
	// })
	headers['Tenant-Id'] = uni.getStorageSync('tenantId') || ''
	headers['Content-Type'] = 'application/json'
	// headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
	// headers['token'] = store.state.token
	switch (power) {
		case 1:
			headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
			break;
		case 2:
			headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
			break;
		case 3:
			responseType = 'blob'
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
		data,
		dataType: 'json',
		header: headers
	}).then(res => {
		console.log(res)
		if (res[1].statusCode == 200) {
			return res[1].data
		} else {
			throw res[1].data
		}
	}).catch(parmas => {
		console.log(parmas.message)
		switch (parmas.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: parmas.message,
					icon: 'none'
				})
				return Promise.reject()
				break
		}
	})
}
export default request
