// /api/blade-crm/wechat/clue/detail

// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

//线索分页接口
export const getCluePage = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/page`,
	method: 'get',
	params:{
		...params,
		timeType:1,
		sort:2
	},
	power: 1
})
// 小程序查询线索详情
export const getClueDetail= (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/detail?id=${params.id}`,
	method: 'post',
	params,
	power: 1
})
// 小程序查询个人业绩看板
export const getCluePerformance = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/performance`,
	method: 'get',
	params,
	power: 1
})

// /api/blade-crm/wechat/clue/clueToCustomer
// 小程序线索转客户
export const clueToCustomer = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/clueToCustomer`,
	method: 'POST',
	params,
	power: 1
})

// 线索跟进记录
export const getClueFollowList = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/follow/list`,
	method: 'get',
	params,
	power: 1
})

// /blade-crm/wechat/clue/transfer_record?clueId=1441213614806589441
// 线索流转记录
export const getCluetransferRecord = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/transfer_record`,
	method: 'get',
	params,
	power: 1
})
// 跟进记录新增
export const addClueFollow = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/follow/create`,
	method: 'POST',
	params,
	power: 1
})

// 小程序线索转让
export const transferClue = (params) => request.globalRequest({
	url: `${baseUrl}/blade-crm/wx-mini/clue/transfer`,
	method: 'POST',
	params,
	power: 1
})
