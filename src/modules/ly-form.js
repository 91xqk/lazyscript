ly.define('demo', function (require, module, exports) {
    'use strict';
    
    /*获取和设置表单数据*/
    $.fn.lrGetFormData = function (keyValue) {// 获取表单数据
        var resdata = {};
        $(this).find('input,select,textarea,.lr-select,.lr-formselect,.lrUploader-wrap,.lr-radio,.lr-checkbox').each(function (r) {
            var id = $(this).attr('id');
            if (!!id) {
                var type = $(this).attr('type');
                switch (type) {
                    case "radio":
                        if ($("#" + id).is(":checked")) {
                            var _name = $("#" + id).attr('name');
                            resdata[_name] = $("#" + id).val();
                        }
                        break;
                    case "checkbox":
                        if ($("#" + id).is(":checked")) {
                            resdata[id] = 1;
                        } else {
                            resdata[id] = 0;
                        }
                        break;
                    case "lrselect":
                        resdata[id] = $(this).lrselectGet();
                        break;
                    case "formselect":
                        resdata[id] = $(this).lrformselectGet();
                        break;
                    case "lrGirdSelect":
                        resdata[id] = $(this).lrGirdSelectGet();
                        break;
                    case "lr-Uploader":
                        resdata[id] = $(this).lrUploaderGet();
                    case "text/plain":
                        var ue = UE.getEditor(id);
                        resdata[id] = ue.getContent();
                        break;
                    case "lr-radio":
                        resdata[id] = $(this).find('input:checked').val();
                        break;
                    default:
                        var value = $("#" + id).val();
                        resdata[id] = $.trim(value);
                        break;
                }
                resdata[id] += '';
                if (resdata[id] == '') {
                    resdata[id] = '&nbsp;';
                }
                if (resdata[id] == '&nbsp;' && !keyValue) {
                    resdata[id] = '';
                }
            }
        });
        return resdata;
    };
    module.exports={}
})