/**
 * lib/db.fetchItems
 *
 * @author xiaomi
 */
'use strict';

const ResponseData = require('./response-data');

module.exports = function(db) {

    db.Collection = db.Collection.extend({
        page: 1,
        pageSize: 20,
        fetchItems: function(queryOptions, pagerOptions, fetchOptions, countDistinct) {
            let self = this;

            // fix options
            if(!queryOptions) {
                queryOptions = {};
            }
            if(!pagerOptions) {
                pagerOptions = {};
            }

            // pagination
            let pageSize = +pagerOptions.page_size || this.pageSize;
            let page = +pagerOptions.page || +pagerOptions.current_page || this.page;

            // metadata
            let metadata = {
                total: 0,
                last_page: 0,
                page_size: pageSize,
                page: page
            };

            // result
            let ret = new ResponseData({
                code: 200,
                metadata: metadata
            });

            return this.query(queryOptions).query(qb => {
                countDistinct = countDistinct ? countDistinct : '*';
                if (countDistinct == '*') {
                    qb.count('* as total');
                } else {
                    qb.countDistinct(countDistinct + ' as total');
                }
            }).fetch()
            .then(result => {
                let total = result.models[0].get('total');
                let minPage = 1;
                let totalPages = Math.ceil(total / pageSize);

                metadata.total = total;
                metadata.page_size = pageSize;
                metadata.last_page = totalPages;
                metadata.page = Math.max(minPage, Math.min(totalPages, metadata.page));
                metadata.current_page = page;
            })
            .then(() => {
                return self.query(queryOptions)
                .query({
                    offset: (page - 1) * pageSize,
                    limit: pageSize
                })
                .fetch(fetchOptions);
            })
            .then(items => {
                ret.data = items;

                return ret;
            });
        }
    });

    return db;
};
