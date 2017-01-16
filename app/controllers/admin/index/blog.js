/**
 * @description 博客
 */
'use strict';

exports.init = function (app) {
    const router = app.router;
    const Blog = app.models.Blog;
    const Blogs = app.db.Collection.extend({
        model: Blog
    });
    const Util = require('../../../utils/util');

    router.post('/blogs', function *() {
        let data = this.request.body;
        let blog = Blog.forge(data);
        yield blog.save();

        this.body = blog;
    });

    router.put('/blogs/:id', function *() {
        let blog = yield Blog.where({
            id: this.params.id
        }).fetch();

        if(!blog) {
            this.throw(404);
        }

        let data = this.request.body;
        let blogUpdateData = Util.filterObjDelByHoldArr(data, Blog.FILLABLE);
        yield blog.save(blogUpdateData, {patch: true});

        this.body = user;
    });

    router.get('/blogs/:id', function *() {
        let blog = yield Blog.where({
            id: this.params.id
        }).fetch({
            withRelated: [
                {
                    'user':function (qb) {
                        qb.select('id', 'username');
                    }
                }
            ]
        });

        if(!blog) {
            this.throw(404);
        }
        this.body = blog;
    });

    router.get('/blogs', function *() {
        let query = this.query;
        let blogs = Blogs.forge();

        blogs = yield blogs.fetchItems(null, {
            page_size: query.page_size,
            page: query.page
        }, {
            withRelated: [
                {
                    'user':function (qb) {
                        qb.select('id', 'username');
                    }
                }
            ]
        });

        this.body = blogs;
    });

};