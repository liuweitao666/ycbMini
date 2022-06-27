import {
	getDictionaryTree,
	getNicheGoods
} from '@/api/dict/index.js';

const dict = {
	state: {
		sourceList: [], // 客户来源列表
		categoryList: [], //业务类型
		filterGoods: []
	},
	mutations: {
		SET_FILTER_GOODS(state, data) {
			state.filterGoods = data
		}
	},
	actions: {
		// 获取树形字典
		async getDictForTree({
			state
		}, code) {
			const {
				data: res
			} = await getDictionaryTree('source');
			state[`${code}List`] = res;
		},
		// 获取业务分类
		GoodsCategoryList({
			state
		}) {
			return new Promise((resolve, reject) => {
				getNicheGoods({
						status: 1
					})
					.then((res) => {
						state.categoryList = res.data
						resolve(res.data)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},
		// 获取字典
		getDict({
			dispatch
		}) {
			dispatch('getDictForTree', 'source')
			dispatch('GoodsCategoryList')
		},
	}
}
export default {
	namespaced: true,
	...dict
}
