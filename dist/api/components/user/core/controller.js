"use strict";
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
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
var baseController_1 = require("@api/baseController");
var globals_1 = require("@config/globals");
var index_1 = require("@customTypes/index");
var user_1 = __importDefault(require("@models/components/user/user"));
var clinic_1 = __importDefault(require("@services/components/clinics/clinic"));
var stripe_1 = __importDefault(require("@services/components/stripe/stripe"));
var user_2 = __importDefault(require("@services/components/user/user"));
var utility_1 = require("@services/helper/utility");
var decko_1 = require("decko");
var UserController = /** @class */ (function () {
    function UserController() {
        this.UserService = new user_2.default(user_1.default);
        this.clinicService = new clinic_1.default();
    }
    /**
     * User register
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    UserController.prototype.signUp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword, firstName, lastName, address, organization, contact, url, businessNumber, country, user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, address = _a.address, organization = _a.organization, contact = _a.contact, url = _a.url, businessNumber = _a.businessNumber, country = _a.country;
                        if (password !== confirmPassword) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Password not match!'], globals_1.statusCodes.NOT_FOUND)];
                        }
                        return [4 /*yield*/, this.UserService.registerAccount('temp', email, password, firstName, lastName, index_1.UserRole.Customer)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'Account registered successfully, please verify email to use the apply cyber', user, 'create')];
                    case 2:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update User Password
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    UserController.prototype.changePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, confirmPassword, oldPassword, user, newPass, _b, _c, _d, err_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword, oldPassword = _a.oldPassword;
                        if (password !== confirmPassword) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Passwords donot match'])];
                        }
                        return [4 /*yield*/, this.UserService.model.findById(req.user.id)];
                    case 1:
                        user = _e.sent();
                        if (!user) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['User does not exist'])];
                        }
                        return [4 /*yield*/, utility_1.UtilityService.comparePlainTextWithHash(oldPassword, user.password)];
                    case 2:
                        if (!(_e.sent())) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Invalid Credentials!'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        _c = (_b = utility_1.UtilityService).generatHash;
                        _d = [password];
                        return [4 /*yield*/, utility_1.UtilityService.generateSalt(globals_1.globals.SALT_LENGTH)];
                    case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))];
                    case 4:
                        newPass = _e.sent();
                        return [4 /*yield*/, this.UserService.model.findOneAndUpdate({ _id: req.user.id }, { password: newPass })];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'Password updated successfully')];
                    case 6:
                        err_2 = _e.sent();
                        return [2 /*return*/, next(err_2)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get All agents
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    UserController.prototype.registerCustomer = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword, firstName, lastName, dob, clinicId, validClinic, userStripeId, user, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, dob = _a.dob, clinicId = _a.clinicId;
                        return [4 /*yield*/, this.clinicService.model.findById(clinicId)];
                    case 1:
                        validClinic = _b.sent();
                        if (!validClinic) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['invalid clinic'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, stripe_1.default.getInstance().createCustomer(email)];
                    case 2:
                        userStripeId = _b.sent();
                        return [4 /*yield*/, this.UserService.registerAccount(validClinic._id, email, password, firstName, lastName, index_1.UserRole.Customer, dob, userStripeId)];
                    case 3:
                        user = _b.sent();
                        // creating the user for the clinic
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'customer registered successfully')];
                    case 4:
                        err_3 = _b.sent();
                        return [2 /*return*/, next(err_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decko_1.bind
    ], UserController.prototype, "signUp", null);
    __decorate([
        decko_1.bind
    ], UserController.prototype, "changePassword", null);
    __decorate([
        decko_1.bind
    ], UserController.prototype, "registerCustomer", null);
    return UserController;
}());
exports.default = UserController;
