"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["Production"] = "production";
    Environment["Development"] = "development";
    Environment["Testing"] = "testing";
})(Environment || (exports.Environment = Environment = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["ClinicAdmin"] = "clinic-admin";
    UserRole["Customer"] = "customer";
    UserRole["BranchAdmin"] = "branch-admin"; // Admin for specific branch only
})(UserRole || (exports.UserRole = UserRole = {}));
