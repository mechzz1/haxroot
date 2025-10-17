"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("@customTypes/index");
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    clinicId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'clinics'
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    role: {
        type: String,
        enum: index_1.UserRole,
        default: index_1.UserRole.Customer,
        required: true
    },
    dob: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailToken: {
        type: String
    },
    totpSecret: {
        type: String
    },
    permissionGroups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'permissionGroups' }],
    apiKey: String,
    stripeId: String
});
exports.default = (0, mongoose_1.model)('users', UserSchema);
