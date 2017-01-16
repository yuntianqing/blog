/**
 * @description 用户
 */
'use strict';

exports.init = function (app) {
    const router = app.router;
    const User = app.models.User;
    const Users = app.db.Collection.extend({
        model: User
    });
    const Util = require('../../../utils/util');
    const crypto = require("crypto");

    router.post('/users', function *() {
        let data = this.request.body;

        let md5 = crypto.createHash('md5')
        md5.update(data.password, 'utf8')
        data.password = md5.digest('hex');

        let user = User.forge(data);
        yield user.save();

        this.body = user;
    });

    router.put('/users/:id', function *() {
        let user = yield User.where({
            id: this.params.id
        }).fetch();

        if(!user) {
            this.throw(404);
        }

        let data = this.request.body;
        if (data.password) {
            let md5 = crypto.createHash('md5')
            md5.update(data.password, 'utf8')
            let password = md5.digest('hex');
            if (password != user.get('password')) {
                data.password = password;
            }
        }
        let userUpdateData = Util.filterObjDelByHoldArr(data, User.FILLABLE);
        yield user.save(userUpdateData, {patch: true});

        this.body = user;
    });

    router.get('/users/:id', function *() {
        let user = yield User.where({
            id: this.params.id
        }).fetch();

        if(!user) {
            this.throw(404);
        }
        this.body = user;
    });

    router.get('/users', function *() {
        let query = this.query;
        let users = Users.forge();

        users = yield users.fetchItems(null, {
            page_size: query.page_size,
            page: query.page
        });

        this.body = users;
    });

    router.get('/users/login', function *() {
        let data = this.request.body;

        let md5 = crypto.createHash('md5')
        md5.update(data.password, 'utf8')
        let password = md5.digest('hex');

        let user = yield User.where({
            username: data.username,
            password: password
        }).fetch();

        if(!user) {
            this.throw(404);
        }
        this.cookies.set('username', user.get('username'));
        this.cookies.set('password', user.get('password'));
        this.cookies.set('user_id', user.get('id'));
        this.redirect('/');
        //this.body = user;
    });
};