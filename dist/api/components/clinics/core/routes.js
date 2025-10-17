"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = __importDefault(require("./controller"));
var locals_1 = require("@api/middleware/locals");
var express_validator_1 = require("express-validator");
var types_1 = require("@models/components/clinics/types");
var index_1 = require("@customTypes/index");
var ClinicCoreRoutes = /** @class */ (function () {
    /**
     * Contructor
     */
    function ClinicCoreRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init Agent routes
     * @returns {void}
     */
    ClinicCoreRoutes.prototype.initRoutes = function () {
        this.router.post('/', [
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
            (0, express_validator_1.check)('password', 'Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n                        lowercase character, one uppercase character, a number, and a special character."),
            (0, express_validator_1.check)('confirmPassword', 'Confirm Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n           lowercase character, one uppercase character, a number, and a special character."),
            (0, express_validator_1.check)('firstName', 'firstName is required').not().isEmpty(),
            (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty(),
            /**
             * business related information
             */
            (0, express_validator_1.check)('clinicName', 'clinicName is required').not().isEmpty(),
            (0, express_validator_1.check)('website', 'website is required').optional().isURL(),
            (0, express_validator_1.check)('locationType', 'locationType is required').isIn(Object.values(types_1.LocationType)),
            (0, express_validator_1.check)('membershipStatus', 'membershipStatus is required and must be valid').isIn(Object.values(types_1.MembershipStatus)),
            (0, express_validator_1.check)('pmsSystem', 'pmsSystem is required and should be valid').isIn(Object.values(types_1.PMSSystem))
        ], (0, locals_1.validateReqBody)(), this.controller.registerClinic);
        this.router.post('/branch', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.ClinicAdmin]), [
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
            (0, express_validator_1.check)('password', 'Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n                        lowercase character, one uppercase character, a number, and a special character."),
            (0, express_validator_1.check)('confirmPassword', 'Confirm Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n           lowercase character, one uppercase character, a number, and a special character."),
            (0, express_validator_1.check)('firstName', 'firstName is required').not().isEmpty(),
            (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty(),
            (0, express_validator_1.check)('address', 'address is required').not().isEmpty()
        ], (0, locals_1.validateReqBody)(), this.controller.registerBranch);
        this.router.get('/branch', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.ClinicAdmin]), this.controller.getClinicBranches);
        this.router.get('/all-clinics', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Admin, index_1.UserRole.ClinicAdmin]), this.controller.getClinicsAndBranches);
        this.router.get('/customers/:clinicId?', (0, locals_1.isAuthenticated)(), (0, locals_1.isAuthorized)([index_1.UserRole.Admin, index_1.UserRole.BranchAdmin, index_1.UserRole.ClinicAdmin]), [(0, express_validator_1.check)('clinicId', 'clinicId must be valid').optional().isMongoId()], (0, locals_1.validateReqBody)(), this.controller.getAllCustomers);
    };
    return ClinicCoreRoutes;
}());
exports.default = ClinicCoreRoutes;
