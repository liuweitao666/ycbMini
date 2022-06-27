import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import navbar from './modules/navbar.js'
import customer from './modules/customer.js'
import dict from './modules/dict.js'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
		navbar,
		customer,
		dict
  },
  getters,
})

export default store

