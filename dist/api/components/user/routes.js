"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRoutes = registerUserRoutes;
var routes_1 = __importDefault(require("./core/routes"));
var routes_2 = __importDefault(require("./authorization/routes"));
/**
 * Init Express api routes (Agent)
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
function registerUserRoutes(router, prefix) {
    if (prefix === void 0) { prefix = ''; }
    router.use("".concat(prefix, "/user"), new routes_1.default().router);
    router.use("".concat(prefix, "/user"), new routes_2.default().router);
}
