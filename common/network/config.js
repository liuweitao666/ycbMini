let url_config = {
	baseUrl:'',
	apiBaseUrl:'',
}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config.baseUrl = 'https://ycb-test1.yichuangbao.com/api'
		url_config.baseUrl = 'https://ycb-test1.yichuangbao.com/api'
		// url_config.baseUrl = 'https://erp.yichuangbao.com/api'
    url_config.apiBaseUrl = 'http://19h517z135.iask.in'
}else{
    // 生产环境
    url_config.baseUrl = 'https://erp.yichuangbao.com/api'
		// url_config.baseUrl = 'https://ycb-test1.yichuangbao.com/api'
}

export default url_config