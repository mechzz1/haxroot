"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// clinic.model.ts
var types_1 = require("./types");
var mongoose_1 = require("mongoose");
var ClinicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    locationType: {
        type: String,
        enum: types_1.LocationType,
        required: true,
        default: types_1.LocationType.Single
    },
    membershipStatus: {
        type: String,
        enum: types_1.MembershipStatus,
        required: true,
        default: types_1.MembershipStatus.Pending
    },
    pmsSystem: {
        type: String,
        enum: types_1.PMSSystem,
        required: true
    },
    parentClinic: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'clinics',
        default: null // null means this is the main clinic
    },
    address: {
        type: String
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});
exports.default = (0, mongoose_1.model)('clinics', ClinicSchema);
