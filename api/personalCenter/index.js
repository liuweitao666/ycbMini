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

// 保存外部联系人
export const saveContact = (tenantId) => request.globalRequest({
	url: `${baseUrl}/blade-system/tenant/wx-mini/tenant-info`,
	method: 'get',
	params:{
		tenantId
	},
	power: 1
})
// 授权电话号码  /api/blade-workwx/wx-customer/authorized_phone
export const authorizedPhone = (params) => request.globalRequest({
	url: `${baseUrl}/blade-workwx/wx-customer/authorized-phone`,
	method: 'POST',
	params,
	power: 2
})

// 授权电话号码  /api/blade-workwx/wx-customer/authorized_phone
export const getAuthorized = (params) => request.globalRequest({
	url: `${baseUrl}/blade-workwx/wx-customer/get-authorized`,
	method: 'get',
	params,
	power: 2
})