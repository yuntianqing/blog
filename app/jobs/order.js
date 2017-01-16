'use strict';

const kue = require('kue');
const Promise = require('bluebird');

//因为这里要用到锁，所以这里直接用的knex，没用bookshelf
const knex = require('../knex');
const queue = require('../services/queue');
const logger = require('../services/logger');

//@notice 使用方法
// var job = queue.create('order-overdue', {
//     orderId: orderId
// })
// .delay(milliseconds)
// .save();


queue.on('error', function(error) {
    console.log('queue error~');
    logger.error('kue error', error);
});

process.once('SIGTERM', function(sig) {
    queue.shutdown( 5000, function(error) {
        logger.info('Kue shutdown: ', error);
        process.exit(0);
    });
});

// server listen
let port = process.env.JOBS_PORT;
kue.app.set('title', 'Kue - Trade');
kue.app.listen(port);

console.log('Jobs Server listening:', port);
