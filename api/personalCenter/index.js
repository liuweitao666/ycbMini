// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

// 通过id 查看用户详情
export const getUserInfo = (id) => request.globalRequest({
	url: `${baseUrl}/blade-user/wx-mini/user-info`,
	method: 'get',
	params:{
		id
	},
	power: 1
})

// 查看当前租户详情
export const getTenantInfo = (tenantId) => request.globalRequest({
	url: `${baseUrl}/blade-system/tenant/wx-mini/tenant-info`,
	method: 'get',
	params:{
		tenantId
	},
	power: 1
})
// 小程序名片二维码
export const createCardCode = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/code/wx-cart-code`,
	method: 'post',
	params,
	power: 3,
	noSerialize:true
})