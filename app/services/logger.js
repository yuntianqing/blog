/**
 * services/logger
 */
'use strict';

const winston = require('winston');
const moment = require('moment');

if (process.env.NODE_ENV === 'development') {
    winston.level = 'debug';
} else {
    winston.level = 'info';
}

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: function() {
                return moment().format();;
            },
            formatter: function(options) {
                return options.timestamp() +' '+ winston.config.colorize(options.level) +' '+ (undefined !== options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ]
});

module.exports = logger;