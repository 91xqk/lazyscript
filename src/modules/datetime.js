$4.define('datetime',function (require, module, exports) {

    var date = new Date();
    var sort_year = date.getYear(); //获取当前年份(2位)

    var full_year = date.getFullYear(); //获取完整的年份(4位)

    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

    var day = date.getDate(); //获取当前日(1-31)

    var week = date.getDay() + 1; //获取当前星期X(0-6,0代表星期天)

    //date .getTime(); //获取当前时间(从1970.1.1开始的毫秒数)

    var hour = date.getHours(); //获取当前小时数(0-23)

    var minute = date.getMinutes(); //获取当前分钟数(0-59)

    var second = date.getSeconds(); //获取当前秒数(0-59)

    var millisecond = date.getMilliseconds(); //获取当前毫秒数(0-999)

    var quarter = Math.floor((date.getMonth() + 3) / 3); //季度

    var timestamp = Date.parse(date);
    var now = function (fmt) {
        var util = require("common");
        fmt = util.ifNullOrEmpty(fmt, "yyyy-MM-dd hh:mm:ss");
        var o = {
            "M+": month + 1,
            "d+": day,
            "h+": hour,
            "m+": minute,
            "s+": second,
            "q+": quarter,
            S: millisecond
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (full_year + "").substr(4 - RegExp.$1.length)
            );
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1 ?
                    o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
        return fmt;
    };
    module.exports = {
        now: now,
        /**
         * 年
         */
        year: full_year,
        /**
         * 月
         */
        month: month, //1-12
        /**
         * 日
         */
        day: day,
        /**
         * 时
         */
        hour: hour,
        /**
         * 分
         */
        minute: minute,
        /**
         * 秒
         */
        second: second,
        /**
         * 毫秒
         */
        millisecond: millisecond,
        /**
         * 数字星期
         */
        week: week,
        /**
         * 时间戳 精确到毫秒
         */
        timestamp: timestamp,
        /**
         * 中文星期
         * @param {*} intweek 1-7
         */
        weekZh: function (intweek) {
            switch (intweek) {
                case 1:
                    return "星期一";
                    break;
                case 2:
                    return "星期二";
                    break;
                case 3:
                    return "星期三";
                    break;
                case 4:
                    return "星期四";
                    break;
                case 5:
                    return "星期五";
                    break;
                case 6:
                    return "星期六";
                    break;
                case 7:
                    return "星期日";
                    break;
                default:
                    return undefined;
                    break;
            }
        }
    };
});