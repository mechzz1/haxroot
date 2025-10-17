"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = validateReqBody;
exports.userFileUpload = userFileUpload;
exports.userMultipleFileUpload = userMultipleFileUpload;
exports.isAuthenticated = isAuthenticated;
exports.isAuthorized = isAuthorized;
var globals_1 = require("@config/globals");
var auth_1 = require("@services/auth");
var express_validator_1 = require("express-validator");
var multer_1 = __importDefault(require("multer"));
var baseController_1 = require("../baseController");
var user_1 = __importDefault(require("@services/components/user/user"));
var user_2 = __importDefault(require("@models/components/user/user"));
/**
 * Initialize instances to use
 */
var authService = new auth_1.AuthService('user');
var userService = new user_1.default(user_2.default);
/**
 * Middleware for validating post requests
 * @returns {Handler}
 */
function validateReqBody() {
    return function (req, res, next) {
        try {
            var errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return (0, baseController_1.prepareFailedResponse)(res, errors.array().map(function (arr) { return arr.msg; }), globals_1.statusCodes.UNPROCESSABLE_ENTITY);
            }
            return next();
        }
        catch (err) {
            return next(err);
        }
    };
}
/**
 * Middleware for file upload
 * @returns {Handler}
 */
function userFileUpload() {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var upload;
        return __generator(this, function (_a) {
            try {
                upload = (0, multer_1.default)({ dest: globals_1.globals.UPLOAD_FOLDER });
                upload.single('file')(req, res, function (err) {
                    console.log('err single', err);
                    if (err) {
                        next(err.message);
                    }
                    return next();
                });
            }
            catch (err) {
                return [2 /*return*/, next(err)];
            }
            return [2 /*return*/];
        });
    }); };
}
/**
 * Middleware for file upload
 * @returns {Handler}
 */
function userMultipleFileUpload() {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var upload;
        return __generator(this, function (_a) {
            try {
                upload = (0, multer_1.default)({ dest: globals_1.globals.UPLOAD_FOLDER });
                upload.array('files', 10)(req, res, function (err) {
                    console.log('err multiple', err);
                    if (err) {
                        next(err.message);
                    }
                    return next();
                });
            }
            catch (err) {
                return [2 /*return*/, next(err)];
            }
            return [2 /*return*/];
        });
    }); };
}
/**
 * Middleware for verifying if user is authenticated.
 * @returns {Handler} Returns if resource is allowed or not
 */
function isAuthenticated() {
    return function (req, res, next) {
        try {
            var token = undefined;
            if (req.cookies.token) {
                token = authService.decryptToken(req.cookies.token);
            }
            var decoded = authService.isAuthenticated(token);
            if (!decoded) {
                return (0, baseController_1.prepareFailedResponse)(res, ['Unauthenticated access!'], globals_1.statusCodes.UNAUTHORIZED);
            }
            req.user = decoded.user;
            return next();
        }
        catch (err) {
            return next(err);
        }
    };
}
/**
 * Middleware for verifying user permissions from acl
 *
 * @param {Array<string>} allowedRoles Permitted roles to access the resource
 * @returns {Handler}
 */
function isAuthorized(allowedRoles) {
    return function (req, res, next) {
        try {
            var authorized = authService.hasPermission(allowedRoles, req.user.role);
            if (!authorized) {
                /**
                 * Always usese forbidden status code for unauthorized.
                 * Check commenst in start of this file.
                 */
                return (0, baseController_1.prepareFailedResponse)(res, ['Unauthorized access!'], globals_1.statusCodes.FORBIDDEN);
            }
            return next();
        }
        catch (err) {
            return next(err);
        }
    };
}
