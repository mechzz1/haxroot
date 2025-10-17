"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSubscriptionRoutes = registerSubscriptionRoutes;
var routes_1 = __importDefault(require("./core/routes"));
/**
 * Init Express api routes (Agent)
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
function registerSubscriptionRoutes(router, prefix) {
    if (prefix === void 0) { prefix = ''; }
    /**
     * endpoint is compulsory because this pattern is exempt
     * from anti csrf protection.
     */
    router.use("".concat(prefix, "/subscription"), new routes_1.default().router);
}
