import request from '@/common/network/request.js'
// baseURL
import configUrl from '@/common/network/config.js'

const {
	baseUrl
} = configUrl

// 获取oss上文件访问路径
export const getfetchUrl = key => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await request.globalRequest({
				url: `${baseUrl}/blade-base/oss/fetch-url`,
				method: 'get',
				params:{
					key
				},
				power: 1
			})
      if (data) {
        resolve(data);
      } else {
        reject("获取真实路径失败");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getrealUrl = key => {
  return `${baseUrl}/blade-base/oss/redirect?Blade-Auth=${"bearer " +
    uni.getStorageSync('token')}&key=${key}`;
};
