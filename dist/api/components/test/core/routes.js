"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = __importDefault(require("./controller"));
var TestCoreRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function TestCoreRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Agent routes
     * @returns {void}
     */
    TestCoreRoutes.prototype.initRoutes = function () {
        this.router.get('/', this.controller.testApi);
    };
    return TestCoreRoutes;
}());
exports.default = TestCoreRoutes;
