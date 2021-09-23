let url_config = {
	baseUrl1:'',
	baseUrl2:'',
}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config.url1 = 'http://10.20.50.146:7777'
    url_config.url2 = 'http://19h517z135.iask.in'
}else{
    // 生产环境
    url_config.url1 = 'http://10.20.50.146:7777'
    url_config.url2 = 'https://operate-service-api.vcrig.com'
}

export default url_config