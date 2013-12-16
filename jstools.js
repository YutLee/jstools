/**
 * get cookie
 * @param {string} name The name of cookie's key
 * @return {string|false} 
 * @memberOf _global_
 */
function getCookie(name) { 
	var strCookie = document.cookie,//获取cookie字符串  
		arrCookie=strCookie.split('; '), //将多cookie切割为多个名/值对 
		i = 0,
		len = arrCookie.length,
		value;

	//遍历cookie数组，处理每个cookie对 
	for(; i < len; i++){ 
		var arr = arrCookie[i].split('='); 
		if(name == arr[0]){ //找到名称为userId的cookie，并返回它的值 
			value = arr[1]; 
			break; 
		}
	}
	return value || false;
};

/**
 * set cookie
 * @param {string} name cookie's key
 * @param {string} value cookie's value
 * @param {string} time cookie's time
 * @memberOf _global_
 */
function setCookie(name, value, time) {
	var str = escape(name) + '=' + escape(value) + ';path=/',
		date = new Date(),
		ms = time * 3600 * 1000;

	if(time > 0){   //为0时不设定过期时间，浏览器关闭时cookie自动消失
		date.setTime(date.getTime() + ms);
		str += '; expires=' + date.toGMTString();
	}
	document.cookie = str;
};

/**
 * remove cookie
 * @param {string} name cookie's key
 * @memberOf _global_
 */
function removeCookie(name) {         
	var date = new Date();

	//将date设置为过去的时间 
	date.setTime(date.getTime() - 10000); 
	document.cookie = name + '=' + this.getCookie(name) + '; expires=' + date.toGMTString(); 
};

/**
 * 去除字符串前后空格
 * @param {string} variable 用于测试的字符串
 * @return {string}
 * @memberOf _global_
 */
function trim(variable) {
	return variable.replace(/^\s+|\s+$/g, '');
}
/**
 * 检测对象是否为对象
 * @param {Object} variable 用于测试是否为对象的对象
 * @return {boolean}
 * @memberOf _global_
 */
function isObject(variable) {
	return variable && !variable.nodeType && Object.prototype.toString.call(variable) === '[object Object]';
}
/**
 * 检测对象是否为函数
 * @param {Object} variable 用于测试是否为函数的对象
 * @return {boolean}
 * @memberOf _global_
 */
function isFunction(variable) {
	return typeof(variable) === 'function';
}
/**
 * 检测对象是否为数组
 * @param {Object} variable 用于测试是否为数组的对象
 * @return {boolean}
 * @memberOf _global_
 */
function isArray(variable) {
	return Object.prototype.toString.call(variable) === '[object Array]';
}
/**
 * 检测对象是否为字符串
 * @param {Object} variable 用于测试是否为字符串的对象
 * @return {boolean}
 * @memberOf _global_
 */
function isString(variable) {
	return Object.prototype.toString.call(variable) === '[object String]';
}
/**
 * 对比返回在 array1 中但是不在 array2 中的值。
 * @param {Array} array1 必须，要被对比的数组
 * @param {Array} array2 必须，和这个数组进行比较
 * @return {Array} 返回一个数组，该数组包括了所有在 array1 中但是不在 array2 中的值。
 * @memberOf _global_
 */
function arrayDiff(array1, array2) {
	var that = this;
	if(!isArray(array1)) {
		return false;
	}
	if(!isArray(array2)) {
		return false;
	}
	if(isArray(array1) && isArray(array2)) {
		var newArray = [],
			k1 = 0,
			len1 = array1.length,
			len2 = array2.length;
		for(; k1 < len1; k1++) {
			for(var k2 = 0; k2 < len2; k2++) {
				if(array1[k1] === array2[k2]) {
					break;
				}
				if(k2 === len2 - 1 && array1[k1] !== array2[k2]) {
					newArray.push(array1[k1]);
				}
			}
		}
		return newArray;
	}
}