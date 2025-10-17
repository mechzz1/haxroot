"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decko_1 = require("decko");
var baseController_1 = require("@api/baseController");
var clinic_1 = __importDefault(require("@services/components/clinics/clinic"));
var user_1 = __importDefault(require("@services/components/user/user"));
var user_2 = __importDefault(require("@models/components/user/user"));
var index_1 = require("@customTypes/index");
var globals_1 = require("@config/globals");
var ClinicCoreController = /** @class */ (function () {
    function ClinicCoreController() {
        this.clinicService = new clinic_1.default();
        this.UserService = new user_1.default(user_2.default);
    }
    /**
     * Get All agents
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    ClinicCoreController.prototype.registerClinic = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword, firstName, lastName, locationType, membershipStatus, pmsSystem, clinicName, website, phone, clinic, user, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, locationType = _a.locationType, membershipStatus = _a.membershipStatus, pmsSystem = _a.pmsSystem, clinicName = _a.clinicName, website = _a.website, phone = _a.phone;
                        if (password !== confirmPassword) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Password not match!'], globals_1.statusCodes.NOT_FOUND)];
                        }
                        clinic = new this.clinicService.model({
                            name: clinicName,
                            website: website,
                            locationType: locationType,
                            membershipStatus: membershipStatus,
                            pmsSystem: pmsSystem
                        });
                        return [4 /*yield*/, clinic.save()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.registerAccount(clinic._id, email, password, firstName, lastName, index_1.UserRole.ClinicAdmin)];
                    case 2:
                        user = _b.sent();
                        // creating the user for the clinic
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'clinic registered successfully')];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClinicCoreController.prototype.registerBranch = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, confirmPassword, firstName, lastName, address, parent, name, website, locationType, membershipStatus, pmsSystem, clinic, user, combinedResponse, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, address = _a.address;
                        if (password !== confirmPassword) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['Password not match!'], globals_1.statusCodes.NOT_FOUND)];
                        }
                        return [4 /*yield*/, this.clinicService.model.findById(req.user.clinicId)];
                    case 1:
                        parent = _b.sent();
                        if (!parent) {
                            return [2 /*return*/, (0, baseController_1.prepareFailedResponse)(res, ['invalid clinic'], globals_1.statusCodes.BAD_REQUEST)];
                        }
                        name = parent.name, website = parent.website, locationType = parent.locationType, membershipStatus = parent.membershipStatus, pmsSystem = parent.pmsSystem;
                        clinic = new this.clinicService.model({
                            name: name,
                            website: website,
                            locationType: locationType,
                            membershipStatus: membershipStatus,
                            pmsSystem: pmsSystem,
                            address: address,
                            parentClinic: parent._id
                        });
                        return [4 /*yield*/, clinic.save()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.UserService.registerAccount(clinic._id, email, password, firstName, lastName, index_1.UserRole.BranchAdmin)];
                    case 3:
                        user = _b.sent();
                        combinedResponse = __assign(__assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { clinicId: clinic });
                        // creating the user for the clinic
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'clinic registered successfully', combinedResponse)];
                    case 4:
                        err_2 = _b.sent();
                        return [2 /*return*/, next(err_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClinicCoreController.prototype.getClinicBranches = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var branches, branchIds, branchAdmins, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.clinicService.model.find({
                                $or: [
                                    { _id: req.user.clinicId }, // Include main clinic
                                    { parentClinic: req.user.clinicId } // All sub-branches
                                ]
                            })];
                    case 1:
                        branches = _a.sent();
                        branchIds = branches.map(function (branch) { return branch._id; });
                        return [4 /*yield*/, this.UserService.model
                                .find({
                                clinicId: { $in: branchIds },
                                role: index_1.UserRole.BranchAdmin
                            })
                                .populate('clinicId')];
                    case 2:
                        branchAdmins = _a.sent();
                        // creating the user for the clinic
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'clinic fetched successfully', branchAdmins)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClinicCoreController.prototype.getClinicsAndBranches = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, clinics, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = {};
                        if (req.user.role === index_1.UserRole.ClinicAdmin) {
                            // BranchAdmin: Only see their clinic and its branches
                            query = {
                                $or: [{ _id: req.user.clinicId }, { parentClinic: req.user.clinicId }]
                            };
                        }
                        return [4 /*yield*/, this.clinicService.model.find(query)];
                    case 1:
                        clinics = _a.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'Clinics fetched successfully', clinics)];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(err_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClinicCoreController.prototype.getAllCustomers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var clinicId, allChildClinicIds, childClinics, query, customers, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        clinicId = req.params.clinicId;
                        allChildClinicIds = [];
                        if (!(req.user.role === index_1.UserRole.ClinicAdmin)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.clinicService.model.find({
                                parentClinic: req.user.clinicId
                            })];
                    case 1:
                        childClinics = _a.sent();
                        allChildClinicIds = childClinics.map(function (c) { return c._id; });
                        allChildClinicIds.push(req.user.clinicId);
                        _a.label = 2;
                    case 2:
                        query = { role: index_1.UserRole.Customer };
                        switch (req.user.role) {
                            case index_1.UserRole.Admin:
                                // Admin can see all customers, but can filter by specific clinic
                                if (clinicId) {
                                    query.clinicId = clinicId;
                                }
                                break;
                            case index_1.UserRole.BranchAdmin:
                                // Branch Admin can only see customers in their clinic
                                query.clinicId = req.user.clinicId;
                                break;
                            case index_1.UserRole.ClinicAdmin:
                                // Clinic Admin can see customers in their clinic hierarchy
                                // Optional: filter by specific clinic within their hierarchy
                                if (clinicId) {
                                    // Filter to specific clinic (assuming authorization is handled)
                                    query.clinicId = clinicId;
                                }
                                else {
                                    // Show all customers in their clinic hierarchy
                                    query.clinicId = { $in: allChildClinicIds };
                                }
                                break;
                        }
                        return [4 /*yield*/, this.UserService.model.find(query).populate('clinicId')];
                    case 3:
                        customers = _a.sent();
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'customers fetched successfully', customers)];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, next(err_5)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decko_1.bind
    ], ClinicCoreController.prototype, "registerClinic", null);
    __decorate([
        decko_1.bind
    ], ClinicCoreController.prototype, "registerBranch", null);
    __decorate([
        decko_1.bind
    ], ClinicCoreController.prototype, "getClinicBranches", null);
    __decorate([
        decko_1.bind
    ], ClinicCoreController.prototype, "getClinicsAndBranches", null);
    __decorate([
        decko_1.bind
    ], ClinicCoreController.prototype, "getAllCustomers", null);
    return ClinicCoreController;
}());
exports.default = ClinicCoreController;
