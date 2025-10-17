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
var decko_1 = require("decko");
var baseController_1 = require("@api/baseController");
var plan_1 = __importDefault(require("@services/components/plans/plan"));
var globals_1 = require("@config/globals");
var stripe_1 = __importDefault(require("@services/components/stripe/stripe"));
var subscriptions_1 = __importDefault(require("@services/components/subscriptions/subscriptions"));
var types_1 = require("@models/components/subscriptions/types");
var PlanCoreController = /** @class */ (function () {
    function PlanCoreController() {
        this.plansService = new plan_1.default();
        this.subscriptionService = new subscriptions_1.default();
    }
    /**
     * Get All agents
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    PlanCoreController.prototype.getPlans = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var clinicId, plans, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        clinicId = req.user.clinicId;
                        return [4 /*yield*/, this.plansService.model.find({ clinicId: clinicId }).populate('clinicId')];
                    case 1:
                        plans = _a.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'plans fetched', plans, 'read')];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(err_1)];
                    case 3: return [2 /*return*/];
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
    PlanCoreController.prototype.createPlan = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, category, monthlyPrice, yearlyPrice, features, _b, popular, existingPlan, priceId, plan, savedPlan, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _a = req.body, name = _a.name, category = _a.category, monthlyPrice = _a.monthlyPrice, yearlyPrice = _a.yearlyPrice, features = _a.features, _b = _a.popular, popular = _b === void 0 ? false : _b;
                        return [4 /*yield*/, this.plansService.model.findOne({
                                clinicId: req.user.clinicId,
                                name: name
                            })];
                    case 1:
                        existingPlan = _c.sent();
                        if (existingPlan) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['plan with this name already exists'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, stripe_1.default.getInstance().createRecurringProduct(name, monthlyPrice * 100, 'usd', 'month', features.join(','))];
                    case 2:
                        priceId = _c.sent();
                        plan = new this.plansService.model({
                            clinicId: req.user.clinicId,
                            name: name,
                            category: category,
                            monthlyPrice: monthlyPrice,
                            yearlyPrice: yearlyPrice,
                            features: features,
                            popular: popular,
                            stripePriceId: priceId
                        });
                        return [4 /*yield*/, plan.save()];
                    case 3:
                        savedPlan = _c.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'plan created', plan)];
                    case 4:
                        err_2 = _c.sent();
                        return [2 /*return*/, next(err_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PlanCoreController.prototype.createSubscription = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var planId, planExists, alreadySubscribed, url, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        planId = req.params.planId;
                        return [4 /*yield*/, this.plansService.model.findById(planId)];
                    case 1:
                        planExists = _a.sent();
                        if (!planExists || !planExists.stripePriceId) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Invalid plan'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, this.subscriptionService.model.findOne({
                                userId: req.user.id,
                                status: types_1.SubscriptionStatus.Active
                            })];
                    case 2:
                        alreadySubscribed = _a.sent();
                        if (alreadySubscribed) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['youre already subscribed to a subscription'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        return [4 /*yield*/, stripe_1.default.getInstance().createCheckoutSession(planExists.stripePriceId, req.user.stripeId, req.user.id, planId, req.user.clinicId)];
                    case 3:
                        url = _a.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'payment initiated', url)];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decko_1.bind
    ], PlanCoreController.prototype, "getPlans", null);
    __decorate([
        decko_1.bind
    ], PlanCoreController.prototype, "createPlan", null);
    __decorate([
        decko_1.bind
    ], PlanCoreController.prototype, "createSubscription", null);
    return PlanCoreController;
}());
exports.default = PlanCoreController;
