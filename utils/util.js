//表单序列化
export const serialize = data => {
	let list = [];
	Object.keys(data).forEach(ele => {
		list.push(`${ele}=${data[ele]}`)
	})
	return list.join('&');
};

import {
	getfetchUrl
} from '@/utils/getFileUrls.js';

const fileFormat = ["jpg", "gif", "bmp", "png", "jpeg"]
// 分享图片
export const share =async (key) => {
	const url = await getfetchUrl(key)
	uni.showLoading({
		title: '加载中'
	});
	wx.downloadFile({
		url,
		success: res => {
			wx.showShareImageMenu({
				path: res.tempFilePath
			});
			uni.hideLoading();
		},
		fail(res) {
			this.$toast(res.msg, 'none');
			uni.hideLoading();
		}
	});
}
export const saveFile = async (key) => {
	uni.getSetting({
		success(res) {
			if (!res.authSetting['scope.writePhotosAlbum']) {
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success(res) {
						save(key)
					},
					fail(err) {
						if (err.errMsg != 'authorize:fail auth deny') {
							uni.showModal({
								title: '授权提示',
								content: '是否允许获取保存相册权限',
								success: (res) => {
									if (res.confirm) {
										saveFile(key)
									} else {
										uni.showToast({
											title: '已取消授权！',
											icon: 'none'
										})
									}
								}
							})
						} else {
							save(key)
						}
					}
				})
			} else {
				save(key)
			}
		}
	})
}
// 下载图片到本地
export const save = async (key) => {

	const suffix = key.substr(key.lastIndexOf(".") + 1)
	const fileName = Date.now()
	const url = await getfetchUrl(key)
	console.log(url)
	if (fileFormat.indexOf(suffix) === -1) {
		return handlefileCopy(url, "链接复制成功，请用浏览器打开下载！")
	}
	uni.showLoading({
		title: "正在下载",
	})
	uni.downloadFile({
		url,
		success(res) {
			var savePath = `${wx.env.USER_DATA_PATH}/${fileName}.${suffix}`
			console.log(savePath)
			uni.getFileSystemManager().saveFile({
				//下载成功后保存到本地
				tempFilePath: res.tempFilePath,
				filePath: savePath,
				success(res2) {
					//获取了相册的访问权限，使用 uni.saveImageToPhotosAlbum 将图片保存到相册中
					uni.saveImageToPhotosAlbum({
						filePath: savePath,
						success: (res) => {
							uni.hideLoading()
							//保存成功弹出提示，告知一下用户
							uni.showModal({
								title: "文件已保存到手机相册",
								confirmColor: "#0bc183",
								confirmText: "知道了",
								showCancel: false,
							})
						},
						fail(res) {
							uni.showToast({
								title: "文件保存失败！",
								icon: "none",
							})
						},
					})
				},
				fail(res) {
					console.log(res)
				},
			})
		},
		fail(res) {
			uni.hideLoading()
			console.log(res)
		},
	})
}

// 链接复制
export const handlefileCopy = (value, prompt) => {
	uni.setClipboardData({
		data: value, //要被复制的内容
		success: () => {
			uni.hideToast()
			//复制成功的回调函数
			uni.showModal({
				title: "暂不支持此类文件下载",
				content: "文件链接复制成功，请使用浏览器打开下载！",
				confirmColor: "#0bc183",
				confirmText: "知道了",
				showCancel: false,
			})
		},
	})
}

// 获取元素的高度/距离顶部的高度
export const getDomInfo = (id, callback) => {
	// const topHeight = uni.getStorageSync('topHeight')
	// if(topHeight) return
	const query = uni.createSelectorQuery().in(this);
	query
		.select('#navbar')
		.boundingClientRect(data => {
			callback(data)
		})
		.exec();
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
	var type = getObjType(data);
	var obj;
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
};
export const getObjType = obj => {
	var toString = Object.prototype.toString;
	var map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	// if (obj instanceof Element) {
	//   return 'element';
	// }
	return map[toString.call(obj)];
};

/*
处理城市数据
*/
const handleCity = (data) => {
	data.forEach(item => {
		console.log(item)
		if (item.children) {
			handleCity(item.children)
		} else {
			item.children = []
		}
	})
}

// 复制文本
export const handleCopy = (value, prompt) => {
	if (!value) return uni.showToast({
		//提示
		title: prompt + '为空',
		icon: 'none'
	});
	uni.setClipboardData({
		data: value, //要被复制的内容
		success: () => {
			//复制成功的回调函数
			uni.showToast({
				//提示
				title: prompt + '复制成功',
				icon: 'none'
			});
		}
	});
}
