import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import store from './store'
import navBar from '@/components/navbar/index.vue'
import {dateFormat} from "@/utils/date.js"
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.component('navBar',navBar)

Vue.prototype.$dateFormat = dateFormat
// 导入网络请求
import request from "./common/network/request.js"

Vue.prototype.$request = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
   ...App,
	store
})
app.$mount()
