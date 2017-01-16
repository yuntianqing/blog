/*
* 数据类型转换
* */
'use strict';

module.exports = {
    //转为整数
    parseInt: function *(value) {
        return +/\d+/.exec(value)[0];
    },

};