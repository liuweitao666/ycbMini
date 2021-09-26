import {
	checkCode,
	getUsers,
	login,
	refreshToken
} from '@/api/login/index.js';

const getuserInfo = _ =>{
	 const info = uni.getStorageSync('userInfo')
	 return info?JSON.parse(info):[]
}

const user = {
	state: {
		tenantId: uni.getStorageInfoSync('tenantId') || '',
		userInfo: getuserInfo(),
		token: uni.getStorageInfoSync('token') || '',
		refreshToken: uni.getStorageInfoSync('refreshToken') || '',
	},
	actions: {
		//根据用户名登录
		Login({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(res => {
					console.log(res)
					const data = res;
					if (data.error_description) {
						Message({
							message: data.error_description,
							type: 'error'
						})
					} else {
						let token_time = {
							token:data.access_token,
							datetime:new Date().getTime(),
							datatype:'string'
						}
						uni.setStorageSync('token_time',JSON.stringify(token_time))
						commit('SET_TOKEN', data.access_token);
						commit('SET_REFRESH_TOKEN', data.refresh_token);
						commit('SET_TENANT_ID', data.tenant_id);
						commit('SET_USER_INFO', data);
					}
					resolve();
				}).catch(error => {
					reject(error);
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
					console.log(res.data)
					if(res.data.length===1){
						commit('SET_TENANT_ID', res.data[0].tenantId)
					}
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
				refreshToken(state.refreshToken, state.tenantId).then(res => {
					const data = res.data;
					// 记录保存的时间戳
					let token_time = {
						token:data.access_token,
						datetime:new Date().getTime(),
						datatype:'string'
					}
					uni.setStorageSync('token_time',JSON.stringify(token_time))
					commit('SET_TOKEN', data.access_token);
					commit('SET_REFRESH_TOKEN', data.refresh_token);
					resolve();
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
					commit('SET_MENU', []);
					commit('SET_MENU_ALL_NULL', []);
					commit('SET_ROLES', []);
					commit('SET_TAG_LIST', []);
					commit('DEL_ALL_TAG');
					commit('CLEAR_LOCK');
					removeToken();
					removeRefreshToken();
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
				uni.removeStorageSync('token');
				uni.removeStorageSync('refreshToken');
				uni.removeStorageSync('userInfo');
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
	}
}
export default user
