import request from '@/common/network/request.js'
import configUrl from '@/common/network/config.js'
const {
	baseUrl
} = configUrl

// 获取系统字典
export const getDictionary =params=>request.globalRequest({
		url: `${baseUrl}/blade-system/dict/dictionary`,
		method: 'get',
		params,
		power: 1
})

// 获取系统字典树
export const getDictionaryTree = code=>request.globalRequest({
		url: `${baseUrl}/blade-system/dict/dictionary-tree`,
		method: 'get',
		params:{
			code
		},
		power: 1
})

