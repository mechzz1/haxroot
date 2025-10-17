"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plans_1 = __importDefault(require("@models/components/plans/plans"));
var dataAccessObject_1 = __importDefault(require("@models/dataAccessObject"));
var PlanService = /** @class */ (function (_super) {
    __extends(PlanService, _super);
    /**
     * Constructor
     */
    function PlanService() {
        return _super.call(this, plans_1.default) || this;
    }
    return PlanService;
}(dataAccessObject_1.default));
exports.default = PlanService;
