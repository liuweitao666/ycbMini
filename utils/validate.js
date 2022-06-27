/**
/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  if (s && s.indexOf(' ') > -1) {
    let splitIndex = s.indexOf(' ')
    let code = s.substr(0, splitIndex)
    let _input = s.substring(splitIndex).trim()
		if(_input){
			if ( code.trim() == '+86') {
			  return /^1[0-9]{10}$/.test(_input)
			} else {
			  return /^([0-9\s]*)$/.test(_input)
			}  
		}else{
			return true
		}
  } else {
    return /^1[0-9]{10}$/.test(s)
  }
}