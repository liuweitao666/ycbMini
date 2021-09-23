import request from '@/common/network/request.js'
import {baseUrl1} from '@/common/network/config.js'

const api = {}
const PORT1 = '/api/crm'
// POST请求方式
// 增加销机
api.AddChance = params => request.globalRequest(`/customer/chance/toolCaseAddChance`, 'POST', params, 1,baseUrl1)
api.question = params => request.globalRequest(`/mijian/listAll`,'GET',params, 1,baseUrl1)

api.Login = params => request.globalRequest(`/user/v1/weChatLogin`, 'GET', params, 1,baseUrl1)

export default api