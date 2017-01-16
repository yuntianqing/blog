'use strict';

//require('dotenv-safe').load();
require('../env');

const kue = require('kue');
const queue = kue.createQueue({
    redis: {
        'host': process.env.REDIS_HOST,
        'port': process.env.REDIS_PORT,
        'db': process.env.REDIS_DB
    }
});

module.exports = queue;