"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = __importDefault(require("./controller"));
var locals_1 = require("@api/middleware/locals");
var index_1 = require("@customTypes/index");
var express_validator_1 = require("express-validator");
var types_1 = require("@models/components/plans/types");
var PlanCoreRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function PlanCoreRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Agent routes
     * @returns {void}
     */
    PlanCoreRoutes.prototype.initRoutes = function () {
        this.router.get('/', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.ClinicAdmin, index_1.UserRole.Customer, index_1.UserRole.BranchAdmin]), this.controller.getPlans);
        this.router.post('/', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.ClinicAdmin, index_1.UserRole.BranchAdmin]), [
            (0, express_validator_1.check)('name', 'Plan name is required')
                .not()
                .isEmpty()
                .trim()
                .isLength({ min: 2, max: 50 })
                .withMessage('Plan name must be between 2 and 50 characters'),
            (0, express_validator_1.check)('category', 'Plan category is required')
                .not()
                .isEmpty()
                .isIn(Object.values(types_1.PlanCategory))
                .withMessage("Plan category must be one of: ".concat(Object.values(types_1.PlanCategory).join(', '))),
            (0, express_validator_1.check)('monthlyPrice', 'Monthly price is required')
                .not()
                .isEmpty()
                .isFloat({ min: 0 })
                .withMessage('Monthly price must be a positive number'),
            // check('yearlyPrice', 'Yearly price is required')
            //     .not()
            //     .isEmpty()
            //     .isFloat({ min: 0 })
            //     .withMessage('Yearly price must be a positive number'),
            (0, express_validator_1.check)('features', 'Features are required')
                .isArray({ min: 1 })
                .withMessage('At least one feature is required'),
            (0, express_validator_1.check)('features.*', 'Each feature must be a string')
                .isString()
                .trim()
                .isLength({ min: 1 })
                .withMessage('Feature cannot be empty'),
            (0, express_validator_1.check)('popular', 'Popular flag must be a boolean')
                .optional()
                .isBoolean()
                .withMessage('Popular must be true or false')
        ], (0, locals_1.validateReqBody)(), this.controller.createPlan);
        this.router.post('/subscribe/:planId', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Customer]), [(0, express_validator_1.check)('planId', 'plan id should be valid').isMongoId()], (0, locals_1.validateReqBody)(), this.controller.createSubscription);
    };
    return PlanCoreRoutes;
}());
exports.default = PlanCoreRoutes;
