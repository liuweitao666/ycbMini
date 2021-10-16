// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

// 通过id 查看用户详情
export const getUserInfo = (id) => request.globalRequest({
	url: `${baseUrl}/blade-user/user-info`,
	method: 'get',
	params:{
		id
	},
	power: 1
})

// 查看当前租户详情
export const getTenantInfo = (params) => request.globalRequest({
	url: `${baseUrl}/blade-system/tenant/tenant-info`,
	method: 'get',
	params,
	power: 1
})