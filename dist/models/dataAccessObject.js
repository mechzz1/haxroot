"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dao = /** @class */ (function () {
    /**
     * Constructor
     * @param {T} model Any database model
     */
    function Dao(model) {
        this.model = model;
    }
    return Dao;
}());
exports.default = Dao;
