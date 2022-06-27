const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  navbarHeight: state => state.navbar.navbarHeight,
	// 字典数据
	sourceList:state => state.dict.sourceList,
	categoryList:state => state.dict.categoryList,
	filterGoods:state=> state.dict.filterGoods,
	filterGoods: state=> state.dict.filterGoods,
	// 客户数据
	customerList: state=>state.customer.customerList,
	indexList: state=>state.customer.indexList,
	// 租户列表
	tenantList: state=>state.user.tenantList,
	// 租户id
	tenantId: state=>state.user.tenantId
}
export default getters
