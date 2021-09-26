import request from '@/common/network/request.js'
import configUrl from '@/common/network/config.js'
const {
	baseUrl
} = configUrl
// 获取对应信息

// 效验wx.login 获取的code
export const checkCode = params => request.globalRequest(
	`${baseUrl}/blade-crm/wx-mini/auth/verify-code?code=${params.code}`, 'POST', null, 1)
// 根据用户手机号获取用户列表
export const getUsers = params => request.globalRequest(
	`${baseUrl}/blade-crm/wx-mini/auth/get-phone-users`,
	'POST',
	params, 1)
// 登录
export const login = params => request.globalRequest(
	`${baseUrl}/blade-auth/oauth/token?tenantId=${params.tenantId}&username=${params.account}&grant_type=wxmini&code=${params.code}&phone=${params.phone}`,
	'POST', params, 1)
export const refreshToken = (tenantId,refresh_token) => request.globalRequest(`${baseUrl}/blade-auth/oauth/token`, 'POST', {
	tenantId,
	refresh_token,
	grant_type: "refresh_token",
	scope: "all",
}, 1)
// refreshToken
