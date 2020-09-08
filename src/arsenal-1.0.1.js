(function (window, $) {
    'use strict';

    function iArsenal() {
        return {}
    }
    iArsenal.require = function (name) {
        var mod = iArsenal.require.modules[name];
        if (!mod) throw new Error('failed to require "' + name + '"');
        if (!mod.exports) {
            mod.exports = {};

            mod.call(mod.exports, iArsenal.require, mod, mod.exports);
        }
        return mod.exports;
    }
    iArsenal.require.modules = {}

    iArsenal.define = function (name, fn) {
        iArsenal.require.modules[name] = fn
    }

    iArsenal.use = function (names, callback) {
        var objs = []
        for (var i = 0; i < names.split(' ').length; i++) {
            objs.push(iArsenal.require(names.split(' ')[i]))
        }
        callback.apply(callback, objs)
    }
    iArsenal.init = function () {
        var config = iArsenal.require('config')
        var use_modules = config.USEMODULES
        iArsenal.use(use_modules, function () {
            for (var i = 0; i < arguments.length; i++) {
                iArsenal[use_modules.split(' ')[i]] = arguments[i]
            }
        })
    }

    window.iArsenal = window.$4 = window.iAams = iArsenal

})(window, window.jQuery)