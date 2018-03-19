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

// 身份证号合法性验证
// 支持15位和18位身份证号
// 支持地址编码、出生日期、校验位验证
// 出生日期1800-2099 (18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])
// 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
// 位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
const IdCodeValid = (code) => {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }

  let row = {
    pass: true,
    msg: '验证成功'
  }

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    row = {
      pass: false,
      msg: '身份证号格式错误'
    }
  } else if (!city[code.substr(0, 2)]) {
    row = {
      'pass':false,
      'msg': '身份证号地址编码错误'
    }
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      const parity = [ 1, 0, 'X',  9, 8, 7, 6, 5, 4, 3, 2 ];
      let sum = 0
      let ai = 0
      let wi = 0

      for (let i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }

      if (parity[sum % 11] != code[17].toUpperCase()) {
        row = {
          pass: false,
          msg: '身份证号校验位错误'
        }
      }
    }
  }

  return row
}
