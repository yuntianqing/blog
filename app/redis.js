var rawRedis = require('redis').createClient(process.env.REDIS_PORT,process.env.REDIS_HOST);
var coRedis = require('co-redis');
var redis = coRedis(rawRedis);

module.exports = redis;
