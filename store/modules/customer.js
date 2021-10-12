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
			const indexList = customerList.map(item => item.nameFirstLetter)
			commit('SET_CUSTOMER_List',customerList)
			commit('SET_INDEX_LIST',indexList)
		},
	}
}
export default navbar
