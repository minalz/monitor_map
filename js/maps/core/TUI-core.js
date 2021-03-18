var TUI = {};

/** 全局变量
 * @class TUI.Global
 */
TUI.Global = {};

/**
 * 当前页面对象window
 */
TUI.Global.win = this;

/**
 * 默认编码
 */
TUI.Global.charset = "UTF-8";

/** 注册全局变量
 * @param {String} key
 * @param {Object} value
 */
TUI.Global.put = function (key, value) {
    key = "_$_" + key;//标明其为全局变量
    this[key] = value;
}

/** 获取全局变量
 * @param {String} key
 * @return {Object} value
 * @throws (Error)
 */
TUI.Global.get = function (key) {
    key = "_$_" + key;//
    return this[key];
}

/**
 * 基础功能
 * @class TUI.Base
 */
TUI.Base = {};

/**
 * 判断是否为数组
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isArray = function (o) {
    return Object.prototype.toString.call(o) === "[object Array]";
};

/**
 * 判断是否为函数
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isFunction = function (o) {
    return Object.prototype.toString.call(o) === "[object Function]";
};

/**
 * 判断是否为数值。NaN，正负无穷大为false
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isNumber = function (o) {
    //为数字类型而且是有限数字
    return Object.prototype.toString.call(o) === "[object Number]" && isFinite(o);

};

/**
 * 判断是否为对象
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isObject = function (o) {
    return typeof o === "function" || !!(o && typeof o === "object");
};

/**
 * 判断是否为字符串
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isString = function (o) {
    return Object.prototype.toString.call(o) === "[object String]";
};

/**
 * 判断是否为Boolean
 * @param {Object} o
 * @return {Boolean}
 */
TUI.Base.isBoolean = function (o) {
    return typeof o === "boolean";
};

/** 调试类
 * @class TUI.debug
 */
TUI.debug = {};

/** 输出Object属性
 * @param {Object} object
 */
TUI.debug.writeObject = function (object) {
    var propertys = [];
    for (var p in object) {
        if (object.hasOwnProperty(p)) {
            propertys.push(p + ":" + object[p]);
        }
    }
    var str = propertys.join(",");
    if (typeof console !== "undefined" && typeof console.log === "function") {
        console.log(str);//控制台输出分割后的object属性
    }
    else {
        //alert(str);
    }
};

/** 核心功能
 * @class TUI.Core
 */
TUI.Core = {};

/** 对象属性拷贝
 * @param {Object} dest 目标对象
 * @param {Object} orig 源对象
 * @param {Object} dest 目标对象
 */
TUI.Core.copyPropertys = function (dest, orig) {

    for (var property in  orig) {
        dest[property] = orig[property];
    }
    return dest;
};

/**
 * 对象克隆
 * @param {Object} object
 * @return {Object}
 */
TUI.Core.clone = function (object) {
    return this.copyPropertys({}, object);
};

/**
 * 将"-"连接格式转换为驼峰
 * @param {String} name
 * @return {String}
 */
TUI.Core.toCamelCase = function (name) {
//go-like-sub
    return name.replace(/-([a-z])/ig, function (all, letter) {//匹配-小写字母，将其转换为大写字母,letter为（-字母）
        return letter.toUpperCase();
    });
}

/**
 * 将驼峰格式转换为"-"连接
 * @param {String} name
 * @return {String}
 */
TUI.Core.toHyphens = function (name) {

    return name.replace(/-([A-Z])/ig, function (all, letter) {//
        return "-" + letter.charAt(0).toLowerCase();
    });
}

/**
 * 字符串替换
 * @param {String} text
 * @param {Object} value
 */
TUI.Core.replaceText = function (text, value) {
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            text = text.replace(new RegExp("\\{" + key + "\\}", "g"), value[key]);
        }
    }
    return text;
}

// 通过URL提取参数
TUI.Core.getRequestParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //执行对大小写不敏感的匹配，匹配&或者不匹配，name的值是由0到多个不是&的字符组成
    var r = window.location.search.substr(1).match(reg);//url从？开始的部分，截取？后面的部分进行匹配
    //(无global属性)match方法返回一个数组，该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本
    if (r != null)
    //r[2]为第二个子表达式即name后面的表达式匹配的值
        return unescape(r[2]);//decodeURI() 和 decodeURIComponent()取而代之
    else
        return null;
}

// 计算日期间隔
TUI.Core.getDateDiff = function (startDate, endDate) {
    var dates = (startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil(dates);//ceil向上取整，floor向下取整，round四舍五入
}

// 计算秒间隔
TUI.Core.getSecDiff = function (startDate, endDate) {
    var dates = Math.abs((startDate.getTime() - endDate.getTime())) / (1000);//绝对值
    return Math.ceil(dates);
}

/**
 * 根据经纬度获取距离
 */
TUI.Core.getDistance = function (lng1, lat1, lng2, lat2) {
    var alpha = lat1 * Math.PI / 180.0;
    return Math.sqrt(Math.pow((lat1 - lat2) * 111.12, 2) + Math.pow((lng1 - lng2) * Math.cos(alpha) * 111.12, 2));
}

// 秒转时间
TUI.Core.parseSeconds = function (sec) {
    var days = Math.floor(sec / 86400);
    var hours = Math.floor((sec % 86400) / 3600);
    var minutes = Math.floor(((sec % 86400) % 3600) / 60);
    var seconds = Math.floor(((sec % 86400) % 3600) % 60);
    var msg = "";

    // 如果有天数
    if (days > 0)
        msg += days + lg.d;

    // 如果有小时数
    if (hours > 0)
        msg += hours + lg.h;

    // 如果有分钟数
    if (minutes > 0)
        msg += minutes + lg.m;

    return msg += seconds + lg.s;
}

/**
 * 注册命名空间
 * @param {String} fullNS
 * @return {Object}
 */
TUI.Core.registerNS = function (fullNS) {//减少全局变量，规避变量名污染，防止命名冲突fullNS为TUI
    if (!fullNS) throw new Error("TUI.Core.registerNS(): fullNS 不存在");//自定义错误
    if (fullNS.charAt(0) == '.' || /*定义命名规范*/
        fullNS.charAt(fullNS.length - 1) == '.' ||
        fullNS.indexOf("..") != -1)
        throw new Error("TUI.Core.registerNS(): 参数 fullNS非法: " + fullNS);

    var parts = fullNS.split('.');
    var container = TUI.Global.win;//全局变量container
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!container[part]) container[part] = {};//
        else if (typeof container[part] != "object") {
            var n = parts.slice(0, i).join('.');//第一个到第i（不包括）个元素
            throw new Error(n + "  already exists and is not an object");
        }
        container = container[part];
    }
    return container;//本例中返回TUI
};

/**
 * 类定义
 * @param {Object} data
 * @return {Class}
 */
TUI.Core.create = function (data) {

    /**
     * 从data对象中提取类相关属性
     */
    var classname = data.name;
    var init = data.init || function () {
        };
    var superclass = data.extend || Object;
    var methods = data.methods || {};
    var statics = data.statics || {};
    var interfaces = data.interfaces || [];
    if (!TUI.Base.isArray(interfaces)) {
        interfaces = [interfaces];
    }

    /**
     * 抽取命名空间，类名
     */
    var packagespace = TUI.Global.win;//全局变量
    if (typeof classname === "undefined") throw new Error("TUI.Core.create: name required");//自定义异常信息
    var lastIndex = classname.lastIndexOf(".");
    if (lastIndex != -1) {
        packagespace = classname.substring(0, lastIndex);//本例中packagespace为TUI
        packagespace = this.registerNS(packagespace);//仍然返回的是TUI
        classname = classname.substring(lastIndex + 1, classname.length);//相当于类名如main等
    }


    function F() {
        init.apply(this, arguments);
    }

    //继承
    F.prototype = new superclass();
    F.prototype.constructor = F;
    F.prototype.superclass = superclass.prototype;


    //覆盖父类的同名函数
    for (var m in methods) {
        if (methods.hasOwnProperty(m)) {
            F.prototype[m] = methods[m];
        }
    }

    /**
     * 注册静态方法
     */
    for (var s in statics) {
        F[s] = statics[s];
    }

    /**
     * 接口校验
     */
    for (var i = interfaces.length - 1; i >= 0; i--) {
        var c = interfaces[i];
        for (var p in c.prototype) {
            if (!TUI.Base.isFunction(c.prototype[p])) continue;
            if (p == "constructor" || p == "superclass") continue;
            if (p in F.prototype &&
                TUI.Base.isFunction(F.prototype[p]) &&
                c.prototype[p].length == F.prototype[p].length) continue;
        }
    }

    /**
     * 注册类名称，并返回寄生类
     */
    if (packagespace[classname] && !TUI.Base.isFunction(packagespace[classname])) {//不是继承至父类superclass
        throw new Error(data.name + " already exists and is not an object");
    }
    return ( packagespace[classname] = F );

};

/** Document 操作
 * @class TUI.Dom
 */
TUI.Dom = {};

/**
 * 根据ID获取Dom节点
 * @param {String} element
 * @return {Object}
 */
TUI.Dom.$ = function (element) {
    return TUI.Base.isString(element) ? document.getElementById(element) : element;
};

/**
 * 根据Class获取节点
 * @param {String} className
 * @param {Object} element
 * @param {String} tagName
 * @return {Object} entry
 */
TUI.Dom.getElementsByClassName = function (className, element, tagName) {
    if (!tagName) {
        tagName = "*";
    }
    if (!element) {
        element = window.document;
    }
    element = this.$(element);
    var entry = [], elements = element.getElementsByTagName(tagName);
    for (var i = 0, length = elements.length; i < length; i++) {
        var ele = elements[i];
        if (TUI.Css.hasClass(ele, className)) {
            entry.push(ele);
        }
    }
    return entry;
}

/**
 * 根据Class获取节点,返回单个节点(如果有多个，则返回第一个)
 * @param {String} className
 * @param {Object} element
 * @param {String} tagName
 * @return {Object} entry
 */
TUI.Dom.getElementByClassName = function (className, element, tagName) {
    var elements = this.getElementsByClassName(className, element, tagName);
    return (elements.length != 0) ? elements[0] : null;
}

/**
 * 获取当前节点的上一个节点
 * @param {Element} element
 * @return {Element}
 */
TUI.Dom.previousElement = function (element) {
    do {
        element = element.previousSibling;
    } while (element && element.nodeType != 1);
    return element;
}

/**
 * 获取当前节点的下一个节点
 * @param {Element} element
 * @return {Element}
 */

TUI.Dom.nextElement = function (element) {
    do {
        element = element.nextSibling;
    } while (element && element.nodeType != 1);
    return element;
}

/**
 * 获取最后一个子节点
 * @param {Element} element
 * @return {Element}
 */
TUI.Dom.lastChild = function (element) {

    var element = element.lastChild;
    /* lastChild 属性返回指定节点的最后一个子节点，以 Node 对象。*/
    return element.nodeType == 1 ? element : this.previousElement(element);
}

/**
 * DOM初始化完毕后执行回调
 * @param {Function} callback
 */
TUI.Dom.onDomReady = function (callback) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback, false);
    } else {
        if (document.body && document.body.lastChild) {
            callback();
        } else {
        }
    }
}

/**
 * 创建HTMLElement
 * @param {String} tagName
 * @param {Object} propertys
 * @return {Object}
 */
TUI.Dom.createElement = function (tagName, propertys) {

    this._tagCache = this._tagCache || {};

    if (!(tagName in this._tagCache)) {

        this._tagCache[tagName] = document.createElement(tagName);

    }

    var newElement = this._tagCache[tagName].cloneNode(true);

    if (TUI.Base.isObject(propertys)) {
        for (var p in propertys) {
            newElement[p] = propertys[p];
        }
    }

    return newElement;
};

/**
 * 删除HTMLElement
 * @param {String || Object} element
 */
TUI.Dom.removeElement = function (element) {
    var element = this.$(element);
    element.parentNode.removeChild(element);

};

/**
 * 设置HTMLElement HTML
 * @param {String} element
 * @param {String} html
 * @return {Object}
 */
TUI.Dom.html = function (element, html) {
    var element = this.$(element);
    if (element) {
        if (TUI.Base.isString(html)) {
            element.innerHTML = html;
        }
        else {
            return element.innerHTML;

        }
    }
};

/**
 * 获取滚动条相关属性
 * @return {Object}
 */
TUI.Dom.windowFeatures = function () {
    var feature = {};
    if (window.innerWidth) {

        feature.scrollLeft = function () {
            return window.pageXOffset;

        }
        feature.scrollTop = function () {
            return window.pageYOffset;
        }
    }
    else if (document.documentElement && document.documentElement.clientWidth) {
        feature.scrollLeft = function () {
            return document.documentElement.scrollLeft;
        }
        feature.scrollTop = function () {
            return document.documentElement.scrollTop;
        }
    }
    else if (document.body.clientWidth) {
        feature.scrollLeft = function () {
            return document.body.scrollLeft;
        }
        feature.scrollTop = function () {
            return document.body.scrollTop;
        }
    }
    return feature;
};

/** Css相关处理类
 * @class TUI.Css
 */
TUI.Css = {};

/** 给指定DOM节点设置样式
 * @param {HTMLElement} element
 * @param {String || Object} style
 * @param {String} value
 */
TUI.Css.addStyle = function (element, style, value) {
    if (element) {
        if (TUI.Base.isString(style)) {
            var name = TUI.Core.toCamelCase(style);
            element.style[name] = value;
        }
        else if (TUI.Base.isObject(style)) {
            for (var property in style) {
                var name = TUI.Core.toCamelCase(property);
                element.style[name] = style[name];
            }
        }
    }
};

/**
 * 判断是否包含className
 * @param {Object} element
 * @param {String} className
 * @return {Boolean}
 */
TUI.Css.hasClass = function (element, className) {

    var classNames = element.className.split(" ");

    for (var i = 0; i < classNames.length; i++) {
        if (classNames[i] == className) {
            return true;
        }
    }

    return false;
}

/** Event 操作
 * @class TUI.Event
 */
TUI.Event = {};

TUI.Event.eventProxy = function (e) {

    e = e || window.event;

    return {

        _e: e,

        /**
         * 获取事件触发节点
         * @return {Element}
         */
        getTarget: function () {

            return this.resolveTextNode(e.target || e.srcElement);
        },

        /**
         * 停止事件
         */
        stopEvent: function () {

            this.stopPropagation();

            this.preventDefault();
        },

        /**
         * 停止事件冒泡
         */
        stopPropagation: function () {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },

        /**
         * 取消事件原有动作
         */
        preventDefault: function () {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },

        /**
         * 屏蔽 Mac Safari 文本节点
         * @param {Element} node
         * @return {Element}
         */
        resolveTextNode: function (node) {
            if (node && 3 == node.nodeType) {//文本类型节点
                return node.parentNode;
            } else {
                return node;
            }
        }
    };
}

/**
 * 注册事件
 * @param {String} element
 * @param {String} eventName
 * @param {Function} eventHandle
 */                                                        //function
TUI.Event.addEventListener = function (element, eventName, eventHandle) {

    element = TUI.Dom.$(element);

    if (window.addEventListener) {

        /**
         * W3C标准浏览器
         */
        element.addEventListener(eventName, eventHandle, false);//true就在捕获过程中执行，反之就在冒泡过程中执行处理函数。
    }
    else if (window.attachEvent) {//同addEventListener

        /**
         * IE浏览器
         */

        var wrappedHandler = function (event) {    // 事件句柄包装
            if (Function.prototype.call) {
                eventHandle.call(element, event);
            } else {
                element._currentHandle = eventHandle;
                element._currentHandle(event);
                delete element._currentHandle;
            }
        }

        element.attachEvent("on" + eventName, wrappedHandler);

        var proxy = {
            ele: element,
            name: eventName,
            handle: eventHandle,
            wrappedHandler: wrappedHandler
        };

        var id = this._id();
        var win = TUI.Global.win;

        /**
         * 记录所有注册过的事件句柄
         */
        if (!win._allHandlers) {
            win._allHandlers = {};
        }

        win._allHandlers[id] = proxy;

        /**
         * 记录目标节点上注册过的事件句柄编号
         */
        if (!element._handlers) {
            element._handlers = [];
        }

        element._handlers.push(id);

        if (!this._$_mark) {
            this._$_mark = true;
            win.attachEvent("onunload", this._cleanAllEvent);
        }
    }
    else {
        /**
         * 其他非标准浏览器
         */
        event["on" + eventName] = eventHandle;
    }
};

/**
 * 注销事件
 * @param {String} element
 * @param {String} eventName
 * @param {Function} eventHandle
 */
TUI.Event.removeEventListener = function (element, eventName, eventHandle) {

    element = TUI.Dom.$(element);

    if (window.addEventListener) {

        element.removeEventListener(eventName, eventHandle, false);
    }
    else if (window.attachEvent) {

        var win = TUI.Global.win;
        var index = this._findIdIndex(element, eventName, eventHandle);

        if (index == -1) {
            return;
        }

        var id = element._handlers[index];								// 获取事件索引
        var proxy = win._allHandlers[id];								// 获取事件句柄代理

        element.detachEvent("on" + eventName, proxy.wrappedHandler);	// 注销事件句柄
        element._handlers.splice(index, 1);							// 清除索引
        delete win._allHandlers[id];									// 清除句柄代理
    }
    else {
        delete event["on" + eventName];
    }
}

/**
 * 触发事件
 * @param {Object || String} element
 * @param {String} eventName
 */
TUI.Event.dispatchEvent = function (element, eventName) {

    element = TUI.Dom.$(element);

    // IE
    if (document.createEventObject) {
        var evt = document.createEventObject();
        element.fireEvent("on" + eventName, evt);
    }
    // FF
    else if (document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent(eventName, true, true);
        element.dispatchEvent(evt);
    }
    // 其他浏览器 采用DOM1模式触发
    else {
        element[eventName]();
    }
};

/**
 * 注销所有事件
 */
TUI.Event._cleanAllEvent = function () {

    var handlers = TUI.Global.win._allHandlers;

    for (var id in handlers) {
        var proxy = handlers[id];
        proxy.ele.detachEvent("on" + proxy.name, proxy.wrappedHandler);
        //proxy.ele._handlers.length = 0;
        delete handlers[id];
    }
}

/**
 * 查找ID索引
 * @param {String} element
 * @param {String} eventName
 * @param {Function} eventHandle
 * @return {Integer} index
 */
TUI.Event._findIdIndex = function (element, eventName, eventHandle) {

    /**
     * 获取节点_handlers，如果不存在则返回-1
     */
    var handlers = element._handlers;
    if (!handlers) {
        return -1;
    }

    /**
     * 查找索引，并返回
     */
    for (var i = 0, length = handlers.length; i < length; i++) {
        var id = handlers[i];
        var proxy = TUI.Global.win._allHandlers[id];
        if (proxy.name == eventName && proxy.handle == eventHandle) {
            return i;
        }
    }

    /**
     * 找不到 则返回-1
     */
    return -1;
}

/** ID生成器
 * @return {String} id
 */
TUI.Event._id = function () {
    if (!this._counter) {
        this._counter = 0;
    }

    return "event" + (this._counter++);
}

/** Remote 远程访问
 * @class TUI.Remote
 */
TUI.Remote = {};

/**
 * 加载远程资源文件
 * @param {String} resources
 */
TUI.Remote.loadResources = function (resources) {
    resources = TUI.Base.isArray(resources) ? resources : [resources];//判断是否为数组
    for (var i = 0, length = resources.length; i < length; i++) {
        loadByDom(resources[i]);
    }
    function loadByDom(res, callback) {
        if (res.cache) {//判断是否有缓存
            var element = TUI.Dom.$(res.url);//取url
            if (element) {
                res.callback && res.callback.call(TUI.Global.win, element);//
                return;
            }
        }
        var node;
        switch (res.type.toLowerCase()) {
            case "css" :
                node = TUI.Dom.createElement("link");
                node.setAttribute("type", "stylesheet");
                node.setAttribute("type", "text/css");
                break;
            case "js" :
                node = TUI.Dom.createElement("script");
                node.setAttribute("type", "text/javascript");
                node.setAttribute("charset", res.charset || TUI.Global.charset);
                break;
            default :
                return;
        }
        node.setAttribute("id", res.url);
        var onready = function () {//判断js文件是否加载完毕
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                res.callback && res.callback.call(TUI.Global.win, node);
            }
        };
        TUI.Event.addEventListener(node, "load", onready);
        TUI.Event.addEventListener(node, "readystatechange", onready);
        node.href = node.src = res.url;
        document.getElementsByTagName("head")[0].appendChild(node);
    }
};

/**
 * 惰性加载
 * @param {String} name
 * @param {Function} execute
 */
TUI.Remote.load = function (name, execute) {
    var res = {url: name, callback: execute, type: "js", cache: true};
    this.loadResources(res);
};

/**
 * 异步获取数据
 */
TUI.Ajax = {};

/**
 * 创建XMLHttpRequest 对象
 * @return Object
 */
TUI.Ajax.newRequest = function () {
    var factories = [
        function () {
            return new XMLHttpRequest();
        }, //firefox、Opera、chrome等
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, //IE，兼容高版本的xmlhttp
        function () {
            return ActiveXObject("Microsoft.XMLHTTP");
        }
    ];
    for (var i = 0, length = factories.length; i < length; i++) {
        try {
            return factories[i]();
        } catch (e) {
            continue;
        }
    }
    throw new Error("该浏览器不支持XMLHttpRequest");
};

/**
 * 对象转换为URI
 * @param {Object} data
 */
TUI.Ajax.encodeFormData = function (data) {
    var params = [];
    for (var name in data) {
        var value = data[name].toString();
        params.push(name + "=" + value);//存入数组里
    }
    return params.join("&");
    /*组装成&name="value"的形式*/
}

/**
 * Ajax get请求
 * @param {String} url
 * @param {Function} callback
 */
TUI.Ajax.get = function (url, callback, errorHandler) {
    var request = this.newRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 && request.responseText.length > 0) {
                callback.call(request, {text: request.responseText});//请求成功时执行callback回调函数
            } else {
                errorHandler && errorHandler.call(//请求失败时执行异常处理回调
                    request,
                    request.status,
                    request.statusText,
                    request.responseText);
            }
        }
    }
    request.open("GET", url);//将请求发送到服务器
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(null);
}

TUI.Ajax.post = function (url, data, callback, errorHandler) {
    var request = this.newRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 && request.responseText.length > 0) {
                callback.call(request, {text: request.responseText});
            } else {
                errorHandler && errorHandler.call(request, request.status,
                    request.statusText,
                    request.responseText);
            }
        }
    }
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(this.encodeFormData(data));
}

TUI.Ajax.post_1 = function (url, data, callback, errorHandler) {
    var request = this.newRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            var json = eval("(" + request.responseText + ")");
            callback.call(request, {text:request.responseText});

        }
    }
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(this.encodeFormData(data));
}


/**
 * JSONP协议请求
 * @param {String} url,
 * @param {Function} callback
 * @param {String} paramName
 */
TUI.Ajax.jsonp = function (url, callback, paramName) {

    if (!TUI.Base.isNumber(this._counter)) {
        this._counter = 0;
    }
    if (!paramName) {
        paramName = "jsonp";
    }

    var jsonpName = "_jsonp" + this._counter++;

    TUI.Ajax.jsonp[jsonpName] = callback;

    var expression = (url.indexOf("?") == -1) ? "?" : "&";

    url += (expression + paramName + "=TUI.Ajax.jsonp." + jsonpName);//拼装成带参数的url

    var res = {
        url: url,
        type: "js",
        cache: false,
        callback: function (element) {
            var x = delete TUI.Ajax.jsonp[jsonpName];
            TUI.Dom.removeElement(element);
        }
    };

    TUI.Remote.loadResources(res);
}

/**
 * 哈希表
 * @class TUI.util.HashMap
 */
TUI.Core.create({
    name: "TUI.util.HashMap",
    init: function () {
        this._table = {};
        this._size = 0;
    },
    methods: {

        /** 获取长度
         * @return {Integer} size
         */
        size: function () {

            return this._size;
        },

        /** 判断是否为空
         * @return {Boolean}
         */
        isEmpty: function () {

            return this._size == 0;
        },

        /** 根据key获取value
         * @param {String} key
         * @return {Object} value
         */
        get: function (key) {

            return this.containsKey(key) ? this._table[key] : null;
        },

        /** 根据key,value添加数据
         * @param {String} key
         * @param {Object} value
         * @return {Object} oldValue
         */
        put: function (key, value) {

            var oldValue = this.get(key);
            this._table[key] = value;

            if (oldValue === null) {
                this._size++;
            }

            return oldValue;
        },

        /**
         * 添加多条数据
         * @param {Array} list
         * @param {Function} keyConvert
         */
        putAll: function (list, keyConvert) {
            if (!TUI.Base.isArray(list)) {
                throw new Error("参数list必须是数组");
            }
            if (!TUI.Base.isFunction(keyConvert)) {
                throw new Error("参数keyConvert必须是Function");
            }
            for (var i = 0, length = list.length; i < length; i++) {
                var element = list[i];
                var key = keyConvert(element);
                this.put(key, element);
            }
        },

        /** 根据key删除记录
         * @param {String} key
         * @return {Object} value
         */
        remove: function (key) {
            var value = this.get(key);
            if (value) {
                delete this._table[key];
                this._size--;
            }
            return value;
        },

        /**
         * 清空列表
         */
        clear: function () {
            this._table = {};
            this._size = 0;
        },

        /**
         * 获取key列表
         * @return {Array} keys
         */
        getKeys: function () {

            var keys = [];

            for (var key in this._table) {
                keys.push(key);
            }

            return keys;
        },

        /**
         * 获取value列表
         * @return {Array} values
         */
        getValues: function () {

            var values = [];

            for (var key in this._table) {
                values.push(this._table[key]);
            }

            return values;
        },

        /**
         * 获取列表
         * @return {Array} entrys
         */
        getEntry: function () {

            var entrys = [];

            for (var key in this._table) {
                var entry = {key: key, value: this._table(key)};
                entrys.push(entry);
            }

            return entrys;
        },

        /** 判断key是否在集合中
         * @param {String} key
         * @return {Boolean}
         */
        containsKey: function (key) {

            return ( key in this._table );
        },

        /** 判断value是否在集合中
         * @param {String} value
         * @return {Boolean}
         */
        containsValue: function (value) {
            var values = this.getValues();
            for (var i = 0, length = values.length; i < length; i++) {
                if (value === values[i]) {
                    return true;
                }
            }
            return false;
        }
    }
});
/****************自定义方法****************/
// String类型格式化参数
String.prototype.format = String.prototype.format || function () {
    if (arguments.length == 0) return this;
    var value = this;
    for (var i = 0, length = arguments.length; i < length; i++) {
        value = value.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        //newstring = str.replace(regexp|substr, newSubStr|function[,  flags]);
        //匹配字符串里的{i(number)}，用第i个arguments替换之
    }
    return value;
}

// 去掉左右空格
String.prototype.trim = String.prototype.trim || function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");//空字符串替换左右空格
}
// 删除数组指定下标或指定对象
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}
////////////////////////时间转换////////////////////////////
TUI.ChangeDate = {};
//由当地时间转换成北京时间
TUI.ChangeDate.LTBTime = function (offset) {//offset 时区=8
    var date = new Date();//定义一个date对象
    var localTime = date.getTime();//返回从 1970 年 1 月 1 日至今的毫秒数
    var localOffset = date.getTimezoneOffset() * 60000;//返回与国际标准的偏移时间
    var utc = localTime + localOffset;//将本地时间转换成标准时间
    var bJ = new Date(utc + (3600000 * offset));//最后转换成目标时间
    return bJ.Format("yyyy-MM-dd hh:mm:ss");

}
//由一个时区具体的时间转换成北京时间
TUI.ChangeDate.tTBTime = function (time, offset) {
    var reg = new RegExp("-", "g");
    var tDate = time.replace(reg, "\/");
    var tTime = new Date(tDate).getTime();//返回毫秒数
    var tOffset = new Date().getTimezoneOffset() * 60000;//返回与国际标准的偏移时间
    var tUtc = tTime + tOffset;
    var bJ = new Date(tUtc + (3600000 * offset));
    return bJ.Format("yyyy-MM-dd hh:mm:ss");
}
//由北京时间转换成当地时间
TUI.ChangeDate.cTLTime = function (time) {//time:北京时间，timeZone:当地时区
    var reg = new RegExp("-", "g");
    var bjDate = time.replace(reg, "\/");//转换为 1970/01/01格式
    var bjTime = new Date(bjDate).getTime();//返回毫秒数
    var bjOffset = 8 * 3600000 * (-1);//返回与国际事件标准的偏移时间(毫秒)
    var bjUtc = bjTime + bjOffset;//将北京时间转换为标准时间
    var timeZone = TUI.ChangeDate.rTimeZone(); //当地时区
    var localTime = new Date(bjUtc + (3600000 * timeZone));//转换成当地时间
    return localTime.Format("yyyy-MM-dd hh:mm:ss");
}
//获取当地时区
TUI.ChangeDate.rTimeZone = function () {
    var timeZone = (new Date().getTimezoneOffset() / 60) * (-1);
    return timeZone;
}
//判断是否是北京时区
TUI.ChangeDate.isBJZone = function () {
    var timeZone = TUI.ChangeDate.rTimeZone();
    if (timeZone == 8) {
        return true;
    } else
        return false;
}
//返回数组下标
Array.prototype.indexArray = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value)
            return i;
    }
}
//格式化时间
Date.prototype.Format = function (fmt) {
    var o = {

        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds()               //秒
    };
    if (/(y+)/.test(fmt))               //四位数字
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

