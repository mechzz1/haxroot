"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = initRestRoutes;
var components_1 = require("./components");
/**
 * Init Express REST routes
 *
 * @param {Router} router Router the routes are attached to
 * @returns {void}
 */
function initRestRoutes(router) {
    var prefix = '/api';
    (0, components_1.registerApiRoutes)(router, prefix);
}
