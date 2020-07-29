
(function(window,$){
    'use strict';

    function iKnow() {
        return {}
    }
    iKnow.require = function (name) {
        var mod = iKnow.require.modules[name];
        if (!mod) throw new Error('failed to require "' + name + '"');
        if (!mod.exports) {
            mod.exports = {};
    
            mod.call(mod.exports, iKnow.require, mod, mod.exports);
        }
        return mod.exports;
    }
    iKnow.require.modules = {}
    
    iKnow.define = function (name, fn) {
        iKnow.require.modules[name] = fn
    }
    
    iKnow.use = function (names, callback) {
        var objs = []
        for (var i = 0; i < names.split(' ').length; i++) {
            objs.push(iKnow.require(names.split(' ')[i]))
        }
        callback.apply(callback, objs)
    }
    iKnow.init = function () {
        var config = iKnow.require('config')
        var use_modules = config.USEMODULES
        iKnow.use(use_modules, function () {
            for (var i = 0; i < arguments.length; i++) {
                iKnow[use_modules.split(' ')[i]] = arguments[i]
            }
        })
    }
    
    window.iKnow = window.$4 = iKnow
    
})(window,window.jQuery)
