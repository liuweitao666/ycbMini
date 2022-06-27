import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import store from './store'
import navBar from '@/components/navbar/index.vue'
import ycbSelectUser from '@/components/ycb-select-user/index.vue'
import {dateFormat} from "@/utils/date.js"
import {handleCopy} from "@/utils/util.js" 
import {getAvatar,getrealUrl} from "@/utils/getFileUrls.js" 
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$handleCopy = handleCopy
Vue.prototype.$getAvatar = getAvatar
Vue.prototype.$getrealUrl = getrealUrl
Vue.component('navBar',navBar)
Vue.component('ycbSelectUser',ycbSelectUser)

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
