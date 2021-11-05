import request from '@/common/network/request.js'
import configUrl from '@/common/network/config.js'
const {
	baseUrl
} = configUrl
// 获取对应信息

// 效验wx.login 获取的code
export const checkCode = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/auth/verify-code`,
	method: 'POST',
	params,
	power: 1
})
// 根据用户手机号获取用户列表
export const getUsers = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/auth/get-phone-users`,
	method: 'POST',
	params,
	power: 1,
})

// 登录
export const login = (params) => request.globalRequest({
	// url: `${baseUrl}/blade-auth/oauth/token?tenantId=${params.tenantId}&username=${params.account}&grant_type=wxmini&code=${params.code}&phone=${params.phone}`,
	url: `${baseUrl}/blade-auth/oauth/token`,
	method: 'POST',
	params,
	power: 1
})
// 刷新token
export const refreshToken = (tenantId, refresh_token) => request.globalRequest({
	url: `${baseUrl}/blade-auth/oauth/token`,
	method: 'POST',
	params: {
		tenantId,
		refresh_token,
		grant_type: "refresh_token",
		scope: "all",
	},
	power: 1
})
// 登出
export const logout = () => request.globalRequest({
	url: `${baseUrl}blade-auth/oauth/logout`,
	method: 'get',
});
// refreshToken
