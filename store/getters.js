const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  navbarHeight: state => state.navbar.navbarHeight,
	// 客户数据
	customerList: state=>state.customer.customerList,
	indexList: state=>state.customer.indexList
}
export default getters
