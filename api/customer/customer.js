// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

//客户分页接口
export const getCustomerPage = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/customer/page`,
	method: 'get',
	params,
	power: 1
})

//客户详情接口
export const getCustomerDetail = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/customer/detail`,
	method: 'get',
	params,
	power: 1
})

//客户跟进记录接口
export const getFollowRecord = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/customer/follow_record`,
	method: 'get',
	params,
	power: 1
})

//客户转让记录接口
export const getTransferRecord = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/customer/transfer_record`,
	method: 'get',
	params,
	power: 1
})

//添加客户跟进记录
export const addFollowRecord = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/customer/add_follow_record`,
	method: 'POST',
	params,
	power: 1
})
// 客户操作记录接口
export const getOperationRecord = (params) => request.globalRequest({
	url: `${baseUrl}/blade-base/operation-record/list`,
	method: 'get',
	params,
	power: 1
})
