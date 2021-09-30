// 基本请求方法
import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

//区域tree接口  parentCode=00
export const getRegionTree = (params) => request.globalRequest({
	url: `${baseUrl}/blade-system/region/province-tree`,
	method: 'get',
	params,
	power: 1
})