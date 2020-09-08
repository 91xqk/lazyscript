(function ($, arsenal, tpl) {
    arsenal.define('template', function (require, module, exports) {
        'use strict';
        $.fn.template = function () {
            var $this = $(this)
            return $.fn.template.method[arguments[0]]($this, arguments[1]);
        }

        $.fn.template.method = {
            setData: function (jq, data) {
                tpl(jq, data);
                return jq
            },
            getHtml: function () {

            },
            getDate: function () {

            }
        }

        return null;
    })

})(window.jQuery, window.arsenal, window.template)