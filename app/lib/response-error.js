/**
 * @description 统一错误信息返回
 *
 * @author xiaomi
 */
'use strict';

const ResponseData = require('./response-data');

class ResponseError extends ResponseData {
    constructor(code, message, errors) {
        super();

        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = ResponseError;
