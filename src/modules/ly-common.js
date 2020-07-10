ly.define('common', function (require, module, exports) {
    var config = require('config')
    var datetime = require('datetime')
    module.exports = {
        log: function (arg) {
            if (config.debugger) {
                if (arguments.length > 1) {
                    console.log.apply(console, arguments);
                } else {
                    console.log('%c' + datetime.now() + '↙', 'color:red;font-size:14px', '\n ', arg, '\n ');
                }

            }
        },
        error: function (message) {
            if (config.debugger) {
                throw new Error(message);
            }
        },
        /**
         * @name 弹出信息框
         * @param {*} value alert
         */
        alert: function (value) {
            if (config.debugger) {
                alert(value)
            }

        },
        /**
         * @name 验证是否为空或Null
         * @param {*} value 待验证参数
         */
        isNullOrEmpty: function (value) {
            if (
                value == null ||
                value === "" ||
                value == "" ||
                value === undefined ||
                value === "undefined"
            ) {
                return true;
            }
            return false;
        },
        ifNullOrEmpty: function (value, ref) {
            if (this.isNullOrEmpty(value)) {
                return ref;
            }
            return value;
        },
        isNull: function (value) {
            return this.isNullOrEmpty(value);
        },
        ifNull: function (value, ref) {
            return this.ifNullOrEmpty(value, ref);
        },
        md5: function (str) {
            return md5.md5(str)
        },
        // 创建一个GUID
        guid: function (fmt) {
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
            }
            if (verify.isString(fmt)) {
                if (fmt.toLocaleUpperCase() == 'N') {
                    return guid.replace(/-/g, '')
                }
            }
            return guid;
        },
    }
})