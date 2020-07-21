'use strict';

function lazy() {
    return {}
}

lazy.require = function (name) {
    var mod = lazy.require.modules[name];
    if (!mod) throw new Error('failed to require "' + name + '"');
    if (!mod.exports) {
        mod.exports = {};

        mod.call(mod.exports, lazy.require, mod, mod.exports);
    }
    return mod.exports;
}
lazy.require.modules = {}

lazy.define = function (name, fn) {
    lazy.require.modules[name] = fn
}

lazy.use = function (names, callback) {
    var objs = []
    for (var i = 0; i < names.split(' ').length; i++) {
        objs.push(lazy.require(names.split(' ')[i]))
    }
    callback.apply(callback, objs)
}
lazy.init = function () {
    var config = lazy.require('config')
    var use_modules = config.USEMODULES
    lazy.use(use_modules, function () {
        for (var i = 0; i < arguments.length; i++) {
            lazy[use_modules.split(' ')[i]] = arguments[i]
        }
    })
}

window.lazy = window.zy = lazy


