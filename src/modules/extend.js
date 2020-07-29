iKnow.define('extend',function (require, module, exports) {
    var util = require("common");
    var stringExtend = {
      //字符串转小写
      toLower: function () {
        return this.toLocaleLowerCase();
      },
      //字符串转大写
      toUpper: function () {
        return this.toLocaleUpperCase();
      },
      //字符串转json
      toJson: function () {
        return JSON.parse(this);
      },
      //字符串转整型
      toInt: function () {
        return parseInt(this);
      },
      toLong: function () {
        return this.toInt();
      },
      toDouble: function () {},
      toFloat: function () {
        return parseFloat(this);
      },
      toDecimel: function () {},
      //去除两侧空格
      trim: function () {
        if (arguments.length > 0) {
          if (arguments[0].toUpper() === 'L') {
            return this.ltrim();
          } else if (arguments[0].toUpper() === 'R') {
            return this.rtrim();
          }
        }
        return this.replace(/(^\s*)|(\s*$)/g, "");
      },
      //去除左侧空格
      ltrim: function () {
        return this.replace(/(^\s*)/g, "");
      },
      //去除右侧空格
      rtrim: function () {
        return this.replace(/(^\s*)/g, "");
      }
    };
    for (const key in stringExtend) {
      if (stringExtend.hasOwnProperty(key)) {
        String.prototype[key] = stringExtend[key];
      }
    }
    var arrayExtend = {
      add: function (obj) {
        this.push(obj);
      },
      where: function () {
        var args = arguments[0].toString();
        var matches = args.match(/(\w)(\s+)?=>(.*)+/);
        if (!matches) {
          console.error('invalid expression.');
          return;
        }
        var name = matches[1];
        var expression = matches[3];
  
        if (!this) return [];
        var result = [];
        var func = new Function(name, 'return ' + expression + ';');
        this.forEach(function (value, index, array) {
          if (func(value)) {
            result.push(value);
          }
        });
        return result;
      },
      select: function () {
        var args = arguments[0].toString();
        var matches = args.match(/(\w)(\s+)?=>(.*)+/);
        if (!matches) {
          console.error('invalid expression .');
          return;
        }
        var name = matches[1];
        var expression = matches[3];
        matches = expression.match(/\.(\w+)/);
        if (!matches) {
          console.error('invalid expression .');
          return;
        }
        var property = matches[1];
        var result = [];
        this.forEach(function (value, index, array) {
          if (value[property]) {
            result.push(value[property]);
          }
        });
        return result;
      },
      distinct: function () {
        var args = arguments[0].toString();
        var matches = args.match(/(\w)(\s+)?=>(.*)+/);
        if (!matches) {
          console.error('invalid expression .');
          return;
        }
        var name = matches[1];
        var expression = matches[3];
        matches = expression.match(/\.(\w+)/);
        if (!matches) {
          console.error('invalid expression .');
          return;
        }
        var property = matches[1];
        var result = [];
        this.forEach(function (value, index, array) {
          if (value[property]) {
            var add = true;
            for (var i = 0; i < result.length; i++) {
              if (value[property] == result[i][property]) {
                add = false;
                break;
              }
            }
            if (add) result.push(value);
          }
        });
        return result;
      },
      count: function () {
        if (lunet.isNull(this)) {
          return 0;
        }
        return this.length;
      },
      first: function () {
        try {
          if (arguments.length > 0) {
            return this.where(arguments[0].toString())[0]
          }
          return this[0];
        } catch {
          throw new error("array is underfund");
        }
  
      },
      firstOrDefault: function () {
        try {
          if (arguments.length > 0) {
            return this.first(arguments[0].toString())[0]
          }
          return this[0];
        } catch {
          return null;
        }
      },
      any: function () {
        try {
          if (arguments.length > 0) {
            var entity = this.firstOrDefault(arguments[0].toString());
            if ($.isNull(entity)) {
              return false;
            }
            return true;
          }
          return this.count() > 0 ? true : false;
  
        } catch {
          return false;
        }
      },
      remove: function () {
  
        var _temp_arr = this;
        var args = arguments[0].toString();
        var matches = args.match(/(\w)(\s+)?=>(.*)+/);
        if (!matches) {
          console.error('invalid expression.');
          return;
        }
        var name = matches[1];
        var expression = matches[3];
  
        if (!this) return [];
        var result = [];
        var func = new Function(name, 'return ' + expression + ';');
        this.forEach(function (value, index, array) {
          if (func(value)) {
            delete _temp_arr[index]
          }
        });
        return _temp_arr.filter(function (item) {
          return item != undefined;
        });
      }
  
    }
    for (const key in arrayExtend) {
      if (arrayExtend.hasOwnProperty(key)) {
        Array.prototype[key] = arrayExtend[key];
      }
    }
    return null;
  });