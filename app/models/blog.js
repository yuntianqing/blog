/**
 * @description blog
 *
 */

var db = require('../db');

module.exports = db.model('Blog', {
    tableName: 'blogs',
    hasTimestamps: true,
    user: function() {
        return this.belongsTo('User');
    },
}, {
    //只能批量修改这些字段
    FILLABLE: [
        'title',//标题
        'content',//内容
    ],
});
