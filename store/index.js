import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import navbar from './modules/navbar.js'
import customer from './modules/customer.js'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
		navbar,
		customer
  },
  getters,
})

export default store

