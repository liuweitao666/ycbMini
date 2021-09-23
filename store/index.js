import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userInfo: null,
		// details
		details: [],
		token: ''
	},
	mutations: {
		// 
		setDetails(state, data) {
			state.details = []
			state.details = data
			console.log(state.details)
		},
		// 设置
		setToken(state, data) {
			// state.details = []
			state.token = data
			console.log(state.token)
		},
		// 用户信息
		setUserinfo(state, data) {
			console.log(data)
			state.userInfo = data
		}
	},
	actions: {},
	getters: {
		userInfo: (state, getters) => {
			return state.userInfo
		}
	}
})
export default store
