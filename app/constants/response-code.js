/**
 * ResponseCode
 */

module.exports = {
    NORMAL: 0, // 正常

    // 参数相关的错误 1xx
    ERROR_INVALID_PARAMS: 100,

    // 权限相关的错误 2xx
    ERROR_INVALID_PERMISSION: 201,
    ERROR_ADMIN_NOT_LOGIN:202,//未登录后台
    ERROR_UPDATE_ORDER_STATUS:203,//订单变更状态异常(不可变更)

    // 资源（数据或者说Model）相关错误 4xx
    ERROR_RESOURCE_NOT_FOUND: 400,
    ERROR_RESOURCE_PERMISSION: 403,//资源权限
    ERROR_DB_TRANSACTION: 410,//事务异常
    ERROR_PARSE_LINK_URL: 401,//链接异常,不可解析
    ERROR_POSTAGE_ACTIVITY_TIME:411,//满包邮活动时间异常

    // 程序运行时相关错误 5xx
    ERROR_SERVICE_INTERNAL_ERROR: 500,
};