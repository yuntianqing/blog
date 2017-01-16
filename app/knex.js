var knexfile = require('../knexfile');
module.exports = require('knex')(
    knexfile[process.env.NODE_ENV]
);