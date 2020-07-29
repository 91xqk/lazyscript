iKnow.define('layer', function (require, module, exports) {
    module.exports = {
        //
        msg: function (msg) {
            layer.msg(msg);
        },
        ok: function (msg) {
            layer.msg(msg, {
                icon: 1
            });
        },
        error: function (msg) {
            layer.msg(msg, {
                icon: 2
            });
        },
        open: function () {
            var def = {
                type: 2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: '',//title支持三种类型的值，若你传入的是普通的字符串，如title :'我是标题'，那么只会改变标题文本；若你还需要自定义标题区域样式，那么你可以title: ['文本', 'font-size:18px;']，数组第二项可以写任意css样式；如果你不想显示标题栏，你可以title: false
                shadeClose: false,//是否点击遮罩关闭
                shade: 0.3,//即弹层外区域。默认是0.3透明度的黑色背景（'#000'）。如果你想定义别的颜色，可以shade: [0.8, '#393D49']；如果你不想显示遮罩，可以shade: 0
                area: ['880px', '80%'],//在默认状态下，layer是宽高都自适应的，但当你只想定义宽度时，你可以area: '500px'，高度仍然是自适应的。当你宽高都要定义时，你可以area: ['500px', '300px']
                content: '', //iframe的url,content可传入的值是灵活多变的，不仅可以传入普通的html内容，还可以指定DOM，更可以随着type的不同而不同
                maxmin: false,
                isMax: false,
                success: function (layero, index) {

                },
                yes: function (index, layero) {

                },
            }

            var opt = $.extend(def, options || {});

            opt.success = function (layero, index) {
                
                if ($.isFunction(options.success)) {
                    options.success(layero, index)
                }

            }
            if (opt.isMax) {
                opt.area = ['90%', '95%'];

            }
            var layer_index = layer.open(opt);
            return layer_index;
        },
        loading: function () {
            return layer.open({
                type: 3,
                content: ""
            });
        },
        close: function () {
            if ($.isNull(index)) {
                layer.close();
            } else {
                layer.close(index);
            }
        },
        lrGetLayerObject: function (layero) {
            var iframeWin = window[layero.find('iframe')[0]['name']];//得到iframe页的窗口对象，执行iframe页的方法：
            return iframeWin;
        }

    }
})