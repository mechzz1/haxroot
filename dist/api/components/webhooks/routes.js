"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStripeWebhookRoutes = registerStripeWebhookRoutes;
var routes_1 = __importDefault(require("./core/routes"));
/**
 * Init Stripe webhook routes
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
function registerStripeWebhookRoutes(router, prefix) {
    if (prefix === void 0) { prefix = ''; }
    router.use("".concat(prefix, "/stripe"), new routes_1.default().router);
}
