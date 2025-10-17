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
var express_validator_1 = require("express-validator");
var index_1 = require("@customTypes/index");
var ClinicAnalyticRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function ClinicAnalyticRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Agent routes
     * @returns {void}
     */
    ClinicAnalyticRoutes.prototype.initRoutes = function () {
        this.router.get('/dashboard-stats/:clinicId?', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Admin]), [(0, express_validator_1.check)('clinicId', 'clinicId must be valid').optional().isMongoId()], (0, locals_1.validateReqBody)(), this.controller.getDashboardStats);
    };
    return ClinicAnalyticRoutes;
}());
exports.default = ClinicAnalyticRoutes;
