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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
var decko_1 = require("decko");
// import { v4 } from 'uuid';
var baseController_1 = require("@api/baseController");
var globals_1 = require("@config/globals");
var user_1 = __importDefault(require("@models/components/user/user"));
var auth_1 = require("@services/auth");
var user_2 = __importDefault(require("@services/components/user/user"));
var utility_1 = require("@services/helper/utility");
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.userService = new user_2.default(user_1.default);
        this.authService = new auth_1.AuthService('user');
    }
    /**
     * User login
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    AuthController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, lowerCaseEmail, user, token, encryptedToken, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        lowerCaseEmail = email.toLowerCase();
                        return [4 /*yield*/, this.userService.model.findOne({ email: lowerCaseEmail })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['User does not exist!'], globals_1.statusCodes.NOT_FOUND)];
                        }
                        return [4 /*yield*/, utility_1.UtilityService.comparePlainTextWithHash(password, user.password)];
                    case 2:
                        if (!(_b.sent())) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Invalid Credentials!'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        token = this.authService.createToken(this.userService.extractPayload(user));
                        encryptedToken = this.authService.encryptToken(token);
                        res.cookie('token', encryptedToken.encryptedData, __assign({}, globals_1.globals.cookieOptions));
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'user logged in successfully!', { role: user.role }, 'verify')];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load User
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    AuthController.prototype.loadUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, userWithPermissions, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.user.id;
                        return [4 /*yield*/, this.userService.model
                                .findById(id)
                                .select('-password')];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['User does not exist!'], globals_1.statusCodes.NOT_FOUND)];
                        }
                        userWithPermissions = __assign({}, user.toObject() // Spread all original user fields
                        );
                        data = __assign(__assign({}, userWithPermissions), { token: req.cookies.token });
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'user loaded successfully!', data, 'read')];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * remove OTP
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    AuthController.prototype.removeOTPRegisteration = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.model.findOneAndUpdate({
                                _id: req.user.id
                            }, {
                                totpSecret: ''
                            }, {
                                new: true
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['OTP could not be removed'])];
                        }
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'OTP removed successfully')];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logout User
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    AuthController.prototype.logout = function (req, res, next) {
        try {
            res.clearCookie('token', __assign({}, globals_1.globals.cookieOptions));
            return (0, baseController_1.prepareSuccessResponse)(res, 'user logged out successfully!', null, 'delete');
        }
        catch (err) {
            return next(err);
        }
    };
    __decorate([
        decko_1.bind
    ], AuthController.prototype, "login", null);
    __decorate([
        decko_1.bind
    ], AuthController.prototype, "loadUser", null);
    __decorate([
        decko_1.bind
    ], AuthController.prototype, "removeOTPRegisteration", null);
    __decorate([
        decko_1.bind
    ], AuthController.prototype, "logout", null);
    return AuthController;
}());
exports.default = AuthController;
