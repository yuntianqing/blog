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
        },{
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