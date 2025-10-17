"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var locals_1 = require("../../../middleware/locals");
var controller_1 = __importDefault(require("./controller"));
var AuthRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function AuthRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Authorization routes
     * @returns {void}
     */
    AuthRoutes.prototype.initRoutes = function () {
        this.router.post('/login', [
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
            (0, express_validator_1.check)('password', 'Password is required').not().isEmpty()
        ], (0, locals_1.validateReqBody)(), this.controller.login);
        this.router.post('/authorization', (0, locals_1.isAuthenticated)(), this.controller.loadUser);
        this.router.post('/logout', (0, locals_1.isAuthenticated)(), this.controller.logout);
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
