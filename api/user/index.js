// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

// 搜索本企业员工
export const getUserEnterprise =params=>request.globalRequest({
		url: `${baseUrl}/blade-user/wx-mini/user-search/retail-enterprise`,
		method: 'get',
		params,
		power: 1
})
// 搜索全平台员工
export const getUserGlobal =params=>request.globalRequest({
		url: `${baseUrl}/blade-user/wx-mini/user-search/global`,
		method: 'get',
		params,
		power: 1
})