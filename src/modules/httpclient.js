(function (window, $) {
    'use strict';
    iKnow.define('httpclient', function (require, module, exports) {
        var ly_layer = require('layer')
        var exres = {
            code: httpCode.exception,
            info: '通信异常，请联系管理员！'
        }
        module.exports = {
            code: {
                success: 200,
                fail: 400,
                exception: 500
            },
            // http 通信异常的时候调用此方法
            httpErrorLog: function (msg) {
                iKnow.log(msg);
            },
            // get请求方法（异步）:url地址,callback回调函数
            httpAsyncGet: function (url, callback) {
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    async: true,
                    cache: false,
                    success: function (data) {
                        if (data.code == iKnow.httpCode.exception) {
                            iKnow.httpErrorLog(data.info);
                            this.httpErrorLog(data.info);
                            data.info = '系统异常，请联系管理员！';
                        }
                        callback(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        this.httpErrorLog(textStatus);
                        callback(exres);
                    },
                    beforeSend: function () {},
                    complete: function () {}
                });
            },
            // get请求方法（同步）:url地址,param参数
            httpGet: function (url, param) {
                var res = {};
                $.ajax({
                    url: url,
                    data: param,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        if (data.code == iKnow.httpCode.exception) {
                            iKnow.httpErrorLog(data.info);
                            data.info = '系统异常，请联系管理员！';
                        }
                        res = data;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        iKnow.httpErrorLog(textStatus);
                    },
                    beforeSend: function () {},
                    complete: function () {}
                });
                return res;
            },
            // post请求方法（异步）:url地址,param参数,callback回调函数
            httpAsyncPost: function (url, param, callback) {
                $.ajax({
                    url: url,
                    data: param,
                    type: "POST",
                    dataType: "json",
                    async: true,
                    cache: false,
                    success: function (data) {
                        if (data.code == iKnow.httpCode.exception) {
                            iKnow.httpErrorLog(data.info);
                            data.info = '系统异常，请联系管理员！';
                        }
                        callback(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        iKnow.httpErrorLog(textStatus);
                        callback(exres);
                    },
                    beforeSend: function () {},
                    complete: function () {}
                });
            },
            // post请求方法（同步步）:url地址,param参数,callback回调函数
            httpPost: function (url, param, callback) {
                $.ajax({
                    url: url,
                    data: param,
                    type: "POST",
                    dataType: "json",
                    async: false,
                    cache: false,
                    success: function (data) {
                        if (data.code == iKnow.httpCode.exception) {
                            iKnow.httpErrorLog(data.info);
                            data.info = '系统异常，请联系管理员！';
                        }
                        callback(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        iKnow.httpErrorLog(textStatus);
                        callback(exres);
                    },
                    beforeSend: function () {},
                    complete: function () {}
                });
            },
            // ajax 异步封装
            httpAsync: function (type, url, param, callback) {
                $.ajax({
                    url: url,
                    data: param,
                    type: type,
                    dataType: "json",
                    async: true,
                    cache: false,
                    success: function (res) {
                        if (res.code == iKnow.httpCode.success) {
                            callback(res.data);
                        } else {
                            iKnow.httpErrorLog(res.info);
                            callback(null);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        iKnow.httpErrorLog(textStatus);
                        callback(null);
                    },
                    beforeSend: function () {},
                    complete: function () {}
                });
            },
            updateForm: function (url, param, callback) {
                iKnow.loading(true, '正在更新数据');
                iKnow.httpAsyncPost(url, param, function (res) {
                    iKnow.loading(false);
                    if (res.code == iKnow.httpCode.success) {
                        if (!!callback) {
                            callback(res);
                        }
                        iKnow.alert.success(res.info);
                    } else {
                        iKnow.alert.error(res.info);
                        iKnow.httpErrorLog(res.info);
                    }
                    layer.close(layer.index);
                });
            },
            deleteForm: function (url, param, callback) {
                iKnow.loading(true, '正在删除数据');
                iKnow.httpAsyncPost(url, param, function (res) {
                    iKnow.loading(false);
                    if (res.code == iKnow.httpCode.success) {
                        if (!!callback) {
                            callback(res);
                        }
                        iKnow.alert.success(res.info);
                    } else {
                        iKnow.alert.error(res.info);
                        iKnow.httpErrorLog(res.info);
                    }
                    layer.close(layer.index);
                });
            },
            postForm: function (url, param, callback) {
                iKnow.loading(true, '正在提交数据');
                iKnow.httpAsyncPost(url, param, function (res) {
                    iKnow.loading(false);
                    if (res.code == iKnow.httpCode.success) {
                        if (!!callback) {
                            callback(res);
                        }
                        iKnow.alert.success(res.info);
                    } else {
                        iKnow.alert.error(res.info);
                        iKnow.httpErrorLog(res.info);
                    }
                    layer.close(layer.index);
                });
            }
        }
    })


})(window, window.jQuery)