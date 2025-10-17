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
var SubscriptionRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function SubscriptionRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Agent routes
     * @returns {void}
     */
    SubscriptionRoutes.prototype.initRoutes = function () {
        this.router.get('/', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Customer]), this.controller.getSubscription);
        this.router.get('/all', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Admin, index_1.UserRole.BranchAdmin, index_1.UserRole.ClinicAdmin]), this.controller.getAllSubscriptions);
    };
    return SubscriptionRoutes;
}());
exports.default = SubscriptionRoutes;
