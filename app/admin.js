/**
 * @description 管理后台主入口
 *
 */
'use strict';

var koa = require('koa');
var path = require('path');
var views = require('koa-views');
var serve = require('koa-static');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const responseCode = require("./constants/response-code");
var request = require('request-promise');
const cors = require('koa-cors');

var ctrls = require('./controllers/admin');

var app = koa();

// init db
app.db = require('./db');

// init models
app.models = require('./models');

// bodyParser
app.use(bodyParser());

// 响应头允许夸域
app.use(cors());

// init views
var viewsPath = path.join(__dirname, '../views/admin');
app.use(views(viewsPath, {
    map: {
        html: 'ejs'
    }
}));

// init router
var router = app.router = new Router();
app.router.api = new Router({
    prefix: '/api'
});

//登录权限校验
app.use(function *(next) {

    yield next;
});

// init ctrls
ctrls.forEach(ctrl => {
    ctrl.init(app);
});

// use routers
app.use(router.routes());
app.use(router.api.routes());

// static files, low priority
// @!!danger, only use for admin
// @TODO: replace with koa-send
app.use(serve(path.join(__dirname, '..')));
app.use(serve(viewsPath));

const ueditor = require('koa-ueditor')('/views/admin');//配置ueditor
router.all('/ueditor/ue', ueditor);

// debug
global.app = app;

module.exports = app;
