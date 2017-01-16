/**
 * @description user
 *
 */

var db = require('../db');

module.exports = db.model('User', {
    tableName: 'users',
    hasTimestamps: true,
}, {
    //只能批量修改这些字段
    FILLABLE: [
        'username',//用户名
        'password',//密码
        'type',//类型
    ],

    //用户类型
    TYPE_ADMIN: 0,
    TYPE_NORMAL: 1,
});
