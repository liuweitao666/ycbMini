
const navbar = {
	state: {
		navbarHeight: uni.getStorageSync('navbarHeight') || '',
	},
	mutations: {
		SET_NAV_BAR_HEIGHT: (state, height) => {
			state.navbarHeight = height;
			uni.setStorageSync('navbarHeight', state.navbarHeight)
		},
	}
}
export default navbar
