/**
 * db
 *
 * @author xiaomi
 */
'use strict';

var knex = require('./knex');
var bookshelf = require('bookshelf');

const db = bookshelf(knex);

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
db.plugin('registry');

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Virtuals
// db.plugin('virtuals');


// db extend & shim
require('./lib/db.fetchItems')(db);
require('./lib/db.timestamp')(db);

module.exports = db;
