
(function(window,$){
    'use strict';

    function iEarn() {
        return {}
    }
    iEarn.require = function (name) {
        var mod = iEarn.require.modules[name];
        if (!mod) throw new Error('failed to require "' + name + '"');
        if (!mod.exports) {
            mod.exports = {};
    
            mod.call(mod.exports, iEarn.require, mod, mod.exports);
        }
        return mod.exports;
    }
    iEarn.require.modules = {}
    
    iEarn.define = function (name, fn) {
        iEarn.require.modules[name] = fn
    }
    
    iEarn.use = function (names, callback) {
        var objs = []
        for (var i = 0; i < names.split(' ').length; i++) {
            objs.push(iEarn.require(names.split(' ')[i]))
        }
        callback.apply(callback, objs)
    }
    iEarn.init = function () {
        var config = iEarn.require('config')
        var use_modules = config.USEMODULES
        iEarn.use(use_modules, function () {
            for (var i = 0; i < arguments.length; i++) {
                iEarn[use_modules.split(' ')[i]] = arguments[i]
            }
        })
    }
    
    window.iEarn = iEarn
    
})(window,window.jQuery)
