/*
* 工具
* */
'use strict';

module.exports = {
    //跟据保留数组的值，删掉对象不需要保留的属性
    filterObjDelByHoldArr: function (obj, holdArr) {
        Object.keys(obj).map(key=> {
            if (holdArr.indexOf(key) == -1) {
                delete obj[key];
            }
        });
        return obj;
    },
    //数组去重
    arrayUnique: function (arr) {
        let newArr = [];
        for(let value of arr){
            if(newArr.indexOf(value) == -1){
                newArr.push(value);
            }
        }
        return newArr;
    },
};