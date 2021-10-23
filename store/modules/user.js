import {
	checkCode,
	getUsers,
	login,
	refreshToken,
	logout
} from '@/api/login/index.js';
import {getfetchUrl} from "@/utils/getFileUrls.js"

const getuserInfo = _ => {
	const info = uni.getStorageSync('userInfo')
	return info ? JSON.parse(info) : []
}

const getTenantList = _ => {
	const tenantList = uni.getStorageSync('tenantList')
	return tenantList ? JSON.parse(tenantList) : []
}


const user = {
	state: {
		tenantId: uni.getStorageSync('tenantId') || '',
		userInfo: getuserInfo(),
		token: uni.getStorageSync('token') || '',
		refreshToken: uni.getStorageSync('refreshToken') || '',
		// 租户列表
		tenantList:getTenantList()
	},
	actions: {
		//根据用户名登录
		Login({
			commit
		}, userInfo) {
			uni.setStorageSync('tenantId', userInfo.tenantId)
			return new Promise((resolve, reject) => {
				login({
					username: userInfo.account,
					grant_type: 'wxmini',
					...userInfo
				}).then(async res => {
					const data = res;
					if (data.error_description) {
						Message({
							message: data.error_description,
							type: 'error'
						})
					} else {
						let token_time = {
							token: data.access_token,
							datetime: new Date().getTime(),
							datatype: 'string'
						}
						uni.setStorageSync('token_time', JSON.stringify(token_time))
						if(data.avatar){
							data.avatar = await getfetchUrl(data.avatar)
							console.log(data.avatar)
						}
						commit('SET_TOKEN', data.access_token);
						commit('SET_REFRESH_TOKEN', data.refresh_token);
						commit('SET_TENANT_ID', data.tenant_id);
						commit('SET_USER_INFO', data);
					}
					resolve({
						code: 200,
						data: res
					});
				}).catch(error => {
					reject({
						err: error
					});
				})
			})
		},

		//获取用户信息
		GetUserInfo({
			commit,
			dispatch
		}, params) {
			return new Promise((resolve, reject) => {
				getUsers(params).then(res => {
					commit('SET_TENANT_LIST',res.data)
					resolve(res)
				}).catch(err => {
					console.log(err)
				})
			})
		},
		//刷新token
		refreshToken({
			state,
			commit
		}) {
			return new Promise((resolve, reject) => {
				refreshToken(state.tenantId, state.refreshToken).then(res => {
					const data = res;
					// 记录保存的时间戳
					let token_time = {
						token: data.access_token,
						datetime: new Date().getTime(),
						datatype: 'string'
					}
					console.log(data)
					uni.setStorageSync('token_time', JSON.stringify(token_time))
					commit('SET_TOKEN', data.access_token);
					commit('SET_REFRESH_TOKEN', data.refresh_token);
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登出
		LogOut({
			commit
		}) {
			return new Promise((resolve, reject) => {
				logout().then(() => {
					commit('SET_TOKEN', '');
					commit('SET_REFRESH_TOKEN', '');
					commit('SET_TENANT_ID', '');
					commit('SET_USER_INFO', '');
					resolve();
				}).catch(error => {
					reject(error)
				})
			})
		},
		//注销session
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '');
				commit('SET_REFRESH_TOKEN', '');
				commit('SET_TENANT_ID', '');
				commit('SET_USER_INFO', '');
				commit('SET_TENANT_LIST', '');
				uni.removeStorageSync('token_time')
				resolve();
			})
		},
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			uni.setStorageSync('token', state.token)
		},
		SET_REFRESH_TOKEN: (state, refreshToken) => {
			state.refreshToken = refreshToken;
			uni.setStorageSync('refreshToken', state.refreshToken)
		},
		SET_TENANT_ID: (state, tenantId) => {
			state.tenantId = tenantId;
			uni.setStorageSync('tenantId', state.tenantId)
		},
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo;
			const userinfostr = JSON.stringify(userInfo)
			uni.setStorageSync('userInfo', userinfostr)
		},
		// 保存租户列表
		SET_TENANT_LIST:(state, tenantList)=>{
			state.tenantList = tenantList;
			const tenantListstr = JSON.stringify(tenantList)
			console.log(state.tenantList)
			uni.setStorageSync('tenantList', tenantListstr)
		}
	}
}
export default user
