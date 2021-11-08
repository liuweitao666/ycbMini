import {
	getCustomerList
} from '@/api/customer/customer.js'

const navbar = {
	state: {
		customerList: [],
		indexList: []
	},
	mutations: {
		SET_CUSTOMER_List: (state, data) => {
			state.customerList = data
		},
		SET_INDEX_LIST(state,list){
			state.indexList = list
		}
	},
	actions: {
		async getCustomerList({
			state,
			commit
		}) {
			const {
				data: customerList
			} = await getCustomerList()
			let FirstLetter = new Set(customerList.map(item => item.nameFirstLetter))
			// '#'放在最后
			const indexList = [...FirstLetter]
			if(indexList[0]==='#'){
				indexList[indexList.length-1] = indexList.shift()
			}
			commit('SET_CUSTOMER_List',customerList)
			commit('SET_INDEX_LIST',indexList)
		},
	}
}
export default navbar
