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
 * 检测对象是否存在
 * @param {String} str 用于测试是否为对象字符串，如 'a.b.c', 'a.b["c"]'
 * @param {Object} proto 用于测试是否为对象的父对象，如 str为 'b.c' 那么 proto需要传 b
 * @param {Object} def 若用于测试的对象不存在，则返回该参数，不传则返回undefined
 * @return
 * @memberOf _global_
 */
function exist(str, proto, def) {
      var dot = str.replace(/\["([^\[]|[^\]]+?)"\]/g, '.$1').replace(/\['([^\[]|[^\]]+?)'\]/, '.$1')
      var arr = (dot || '').split('.')
      var i = 1
      var size = arr.length
      var obj = proto

      if(!obj || size < 2) {
        return def
      }

      for(; i < size; i++) {
        if(typeof obj != 'object') {
          obj = def
          break
        }

        if(!(arr[i] in obj)) {
          obj = def
          break
        }

        obj = obj[arr[i]]
      }

      return obj
}

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

/**
 * 根据名称获取对应url参数
 * @param {string} name 必须，要获取的参数名称
 * @return {Array} 返回获取的参数值
 * @memberOf _global_
 */
function getParameterByName(name) {
	name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
	results = regex.exec(location.search);
	return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Ajax post 请求
 * @param {string} url 必须，需要请求的url
 * @param {string} params 可选，需要上传的参数
 * @param {Function} beforeSend 可选，请求前执行的函数
 * @param {Function} success 可选，请求成功时执行的函数
 * @param {Function} error 可选，请求失败时执行的函数
 * @memberOf _global_
 */
function post(url, params, beforeSend, success, error) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var protocol = /^([\w-]+:)\/\//.test(url) ? RegExp.$1 : window.location.protocol;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onreadystatechange = function() {
		var result, err;
		if(xhr.readyState == 1) {
			beforeSend.call(this);
		}
	    if(xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
				success.call(this, xhr.responseText);
	        }else {
	        	error.call(this);
	        }
    	}
    };
}

/**
 * 事件绑定
 * @param {Element} target 必须，需要绑定的元素
 * @param {string} type 必须，需要绑定的事件名称
 * @param {Function} handler 可选，事件触发时的回调函数
 * @memberOf _global_
 */
function bind(target, type, handler) {
    if(target.addEventListener) {
        target.addEventListener(type, handler);
    }else if(target.attachEvent){
        target.attachEvent('on' + type, handler);
    }
}

/**
 * 事件解绑
 * @param {Element} target 必须，需要解绑的元素
 * @param {string} type 必须，需要解绑的事件名称
 * @param {Function} handler 可选，事件触发时的回调函数
 * @memberOf _global_
 */
function unbind(target, type, handler) {
    if(target.removeEventListener) {
        target.removeEventListener(type, handler);
    }else if(target.detachEvent){
        target.detachEvent('on' + type, handler);
    }
}


/**
* 检测历史记录前进、后退
*/
(function() {
var list = [],
    idx = -1,
    isB = false,
    isF = false,
    hash = {
        isBack: function() {
            return isB;
        },
        isForward: function() {
            return isF;
        },
        push: function(hash) {
            list.splice(idx + 1, list.length - idx - 1);
            list.push(hash);
            this.end();
        },
        index: function() {
            return idx;
        },
        stack: function() {
            return list;
        },
        end: function() {
            idx = list.length - 1;
        },
        checkHash: function() {
            var hash = location.hash.substr(1);
            if (list[idx - 1] === hash) {
                isB = true;
                isF = false;
                idx--;
            } else if (list[idx + 1] === hash) {
                isB = false;
                isF = true;
                idx++;
            } else {
                isB = false;
                isF = false;
                this.push(hash);
            }
        }
    };
})();

/**
* [async 工具函数，同步调用arr里的方法]
* @param  {[Function]}   arr      [description]
* @param  {Function} callback [description]
* @example
* async([
*      function(cb) {
*          setTimeout(function() {
*              cb(1);
*          }, 1);
*       },
*       function(cb) {
*          cb(2);
*       }
*   ], function(results) {
*       console.log(results);
*   });
*/
function async(arr, callback) {
    var completed = 0,
        size = arr.length,
	results = [];
    for(var i = 0; i < size; i++) {
        arr[i].call(null, function(cb) {
	    results.push(cb);
	    if(++completed == size) {
	        callback(results);
	    }
        })
    }
}
