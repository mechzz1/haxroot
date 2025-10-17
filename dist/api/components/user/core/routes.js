"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var locals_1 = require("@api/middleware/locals");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var controller_1 = __importDefault(require("./controller"));
var UserCoreRoutes = /** @class */ (function () {
    /**
     * Constructor
     */
    function UserCoreRoutes() {
        this.controller = new controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    /**
     * Init User routes
     * @returns {void}
     */
    UserCoreRoutes.prototype.initRoutes = function () {
        this.router.post('/register', [
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
            (0, express_validator_1.check)('url', 'url is required').isURL(),
            (0, express_validator_1.check)('firstName', 'firstName is required').not().isEmpty(),
            (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty(),
            /**
             * business related information
             */
            (0, express_validator_1.check)('organization', 'organization is required').not().isEmpty(),
            (0, express_validator_1.check)('country', 'country is required').not().isEmpty().isString(),
            (0, express_validator_1.check)('businessNumber', 'businessNumber is required').not().isEmpty().isString(),
            (0, express_validator_1.check)('address', 'address is required').not().isEmpty(),
            (0, express_validator_1.check)('contact')
                .optional()
                .isString()
                .custom(function (value) {
                if (value && value !== '') {
                    if (!/^[0-9+ -]{8,20}$/.test(value)) {
                        throw new Error('Invalid contact number');
                    }
                }
                return true;
            })
        ], (0, locals_1.validateReqBody)(), this.controller.signUp);
        this.router.post('/customer', [
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
            (0, express_validator_1.check)('password', 'Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n                        lowercase character, one uppercase character, a number, and a special character."),
            //         check('confirmPassword', 'Confirm Password is required')
            //             .not()
            //             .isEmpty()
            //             .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
            //             .withMessage(
            //                 `Password must be of atleast 8 characters and should include one
            //    lowercase character, one uppercase character, a number, and a special character.`
            //             ),
            (0, express_validator_1.check)('firstName', 'firstName is required').not().isEmpty(),
            (0, express_validator_1.check)('lastName', 'lastName is required').not().isEmpty(),
            (0, express_validator_1.check)('dob', 'dob is required and should be valid').isDate(),
            (0, express_validator_1.check)('clinicId', 'clinicId should be valid').isMongoId()
        ], (0, locals_1.validateReqBody)(), this.controller.registerCustomer);
        this.router.post('/change-password', (0, locals_1.isAuthenticated)(), [
            (0, express_validator_1.check)('oldPassword', 'Password is required').notEmpty(),
            (0, express_validator_1.check)('password', 'Password is required')
                .not()
                .isEmpty()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
                .withMessage("Password must be of atleast 8 characters and should include one\n                        lowercase character, one uppercase character, a number, and a special character."),
            (0, express_validator_1.check)('confirmPassword', 'Confirm Password is required').not().isEmpty()
        ], (0, locals_1.validateReqBody)(), this.controller.changePassword);
    };
    return UserCoreRoutes;
}());
exports.default = UserCoreRoutes;
