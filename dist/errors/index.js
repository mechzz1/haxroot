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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = void 0;
var ServiceError = /** @class */ (function (_super) {
    __extends(ServiceError, _super);
    /**
   * Constructor
   * @param {string} message Error message
   * @param {string} statusCode statusCode
   */
    function ServiceError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        /**
         * assign the error class name in your custom error (as a shortcut)
         */
        _this.name = _this.constructor.name;
        /**
         * capturing the stack trace keeps the reference to your error class
         */
        Error.captureStackTrace(_this, _this.constructor);
        /**
         * you may also assign additional properties to your error
         */
        _this.statusCode = statusCode;
        return _this;
    }
    return ServiceError;
}(Error));
exports.ServiceError = ServiceError;
