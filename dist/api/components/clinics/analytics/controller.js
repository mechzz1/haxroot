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
var ClinicsAnalyticsController = /** @class */ (function () {
    function ClinicsAnalyticsController() {
        this.clinicService = new clinic_1.default();
        this.UserService = new user_1.default(user_2.default);
    }
    ClinicsAnalyticsController.prototype.getDashboardStats = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var clinicId, clinicFilter, _a, clinicAdminCount, customerCount, branchAdminCount, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        clinicId = req.params.clinicId;
                        clinicFilter = clinicId ? { clinicId: clinicId } : {};
                        return [4 /*yield*/, Promise.all([
                                this.UserService.model.countDocuments(__assign({ role: index_1.UserRole.ClinicAdmin }, clinicFilter)),
                                this.UserService.model.countDocuments(__assign({ role: index_1.UserRole.Customer }, clinicFilter)),
                                this.UserService.model.countDocuments(__assign({ role: index_1.UserRole.BranchAdmin }, clinicFilter))
                            ])];
                    case 1:
                        _a = _b.sent(), clinicAdminCount = _a[0], customerCount = _a[1], branchAdminCount = _a[2];
                        result = {
                            clinicAdmin: clinicAdminCount,
                            customer: customerCount,
                            branchAdmin: branchAdminCount
                        };
                        return [2 /*return*/, (0, baseController_1.prepareSuccessResponse)(res, 'clinic fetched successfully', result)];
                    case 2:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decko_1.bind
    ], ClinicsAnalyticsController.prototype, "getDashboardStats", null);
    return ClinicsAnalyticsController;
}());
exports.default = ClinicsAnalyticsController;
