"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = __importDefault(require("./controller"));
var express_2 = __importDefault(require("express"));
var StripeWebhookRoutes = /** @class */ (function () {
    /**
     * Constructor
     */
    function StripeWebhookRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Stripe webhook routes
     * @returns {void}
     */
    StripeWebhookRoutes.prototype.initRoutes = function () {
        // IMPORTANT: Stripe webhooks need raw body for signature verification
        // This must be done BEFORE any JSON body parsers
        this.router.post('/webhook', express_2.default.raw({ type: 'application/json' }), this.controller.stripeWebhook);
    };
    return StripeWebhookRoutes;
}());
exports.default = StripeWebhookRoutes;
