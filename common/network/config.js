let url_config = {
	baseUrl:'',
	apiBaseUrl:'',
}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config.baseUrl = 'http://192.168.1.111:30004'
    url_config.apiBaseUrl = 'http://19h517z135.iask.in'
}else{
    // 生产环境
    url_config.baseUrl = 'http://10.20.50.146:7777'
    url_config.apiBaseUrl = 'https://operate-service-api.vcrig.com'
}

export default url_config