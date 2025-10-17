"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestErrorLogger = exports.requestLogger = exports.logger = exports.requestLoggerInstance = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var winston_1 = require("winston");
var express_winston_1 = require("express-winston");
var index_1 = require("@customTypes/index");
var globals_1 = require("./globals");
var logDir = 'logs';
// Create the log directory if it does not exist
if (!(0, fs_1.existsSync)(logDir)) {
    (0, fs_1.mkdirSync)(logDir);
}
var httpRequest;
var meta;
var errorLog = (0, path_1.join)(logDir, 'error.json.log');
var requestLog = (0, path_1.join)(logDir, 'request.json.log');
var combinedLog = (0, path_1.join)(logDir, 'combined.json.log');
var combinedNonJsonLog = (0, path_1.join)(logDir, 'combined.log');
var exceptionsLog = (0, path_1.join)(logDir, 'exceptions.json.log');
// const isRequest = format((info, opts) => {
// 	if (info.isRequest) {
// 		return info;
// 	}
// 	return false;
// });
var loggingOptions = {
    level: 'info',
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.colorize(), winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); }))
};
var transportOptions = [
    new winston_1.transports.File({
        filename: combinedLog,
        /*
         * Uncolorize or otherwide file will have
         * noisy color codes
         */
        format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
    }),
    new winston_1.transports.File({
        filename: combinedNonJsonLog,
        format: winston_1.format.combine(winston_1.format.uncolorize())
    })
];
/*
For Express requests logs only
This defaults logs to console as colored and
to comibied file as unclored and not all the json
e,g (HTTP GET /)
*/
exports.requestLoggerInstance = (0, winston_1.createLogger)(__assign(__assign({}, loggingOptions), { transports: __spreadArray([
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: requestLog,
            format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
        })
    ], transportOptions, true) }));
/*
For no -requests logs
This can log each and every thing
by using debug, info, warn and error
*/
exports.logger = (0, winston_1.createLogger)(__assign(__assign({}, loggingOptions), { transports: __spreadArray([
        new winston_1.transports.File({
            filename: errorLog,
            level: 'error',
            format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
        })
    ], transportOptions, true), exceptionHandlers: [
        new winston_1.transports.File({
            filename: exceptionsLog,
            format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
        })
    ] }));
/*
This will log each and every request
according the fomrat we have defined
and in json.
*/
exports.requestLogger = (0, express_winston_1.logger)({
    winstonInstance: exports.requestLoggerInstance,
    statusLevels: true,
    dynamicMeta: function (req, res, err) {
        httpRequest = {};
        meta = {};
        if (req) {
            meta.httpRequest = httpRequest;
            httpRequest.requestMethod = req.method;
            httpRequest.requestUrl = "".concat(req.protocol, "://").concat(req.get('host')).concat(req.originalUrl);
            httpRequest.protocol = "HTTP/".concat(req.httpVersion);
            // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
            if (req.ip) {
                httpRequest.remoteIp =
                    (req.ip || '').indexOf(':') >= 0
                        ? req.ip.substring(req.ip.lastIndexOf(':') + 1)
                        : req.ip; // just ipv4
            }
            // httpRequest.requestSize = req.socket.bytesRead
            httpRequest.referrer = req.get('Referrer');
        }
        return meta;
    }
});
/*
This will log each and every request
according the fomrat we have defined
and in json.
*/
exports.requestErrorLogger = (0, express_winston_1.errorLogger)({
    winstonInstance: exports.requestLoggerInstance
});
exports.logger.add(new winston_1.transports.Console({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); })),
    level: globals_1.globals.ENV !== index_1.Environment.Production ? 'debug' : 'info'
}));
