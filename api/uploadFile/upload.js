import request from '@/common/network/request.js'
import configUrl from '@/common/network/config.js'
const {
	baseUrl
} = configUrl
// 获取对应信息

// 获取oss上传的必要参数
export const ossConfig = (params) => request.globalRequest({
	url: `${baseUrl}/blade-base/oss/policy`,
	method: 'get',
	params
})


// 获取oss上文件访问路径
export const imgConfig = (params) => request.globalRequest({
	url: `${baseUrl}/blade-base/oss/fetch-url`,
	method: 'get',
	params
})
