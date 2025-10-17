"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = registerApiRoutes;
var routes_1 = require("./test/routes");
var routes_2 = require("./user/routes");
var routes_3 = require("./clinics/routes");
var routes_4 = require("./plans/routes");
var routes_5 = require("./subscriptions/routes");
/**
 * Init Express api routes
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
function registerApiRoutes(router, prefix) {
    if (prefix === void 0) { prefix = ''; }
    (0, routes_1.registerTestRoutes)(router, prefix);
    (0, routes_2.registerUserRoutes)(router, prefix);
    (0, routes_3.registerClinicRoutes)(router, prefix);
    (0, routes_4.registerPlansRoutes)(router, prefix);
    (0, routes_5.registerSubscriptionRoutes)(router, prefix);
    // registerStripeWebhookRoutes(router, prefix);
}
