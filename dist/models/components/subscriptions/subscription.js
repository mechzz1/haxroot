"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// subscription.model.ts
var mongoose_1 = require("mongoose");
var types_1 = require("./types");
var SubscriptionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    clinicId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'clinics',
        required: true
    },
    planId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'plans',
        required: true
    },
    stripeSubscriptionId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: types_1.SubscriptionStatus,
        required: true,
        default: types_1.SubscriptionStatus.Active
    },
    currentPeriodStart: {
        type: Date,
        required: true
    },
    currentPeriodEnd: {
        type: Date,
        required: true
    },
    cancelAtPeriodEnd: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Indexes for faster queries
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ clinicId: 1, status: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
exports.default = (0, mongoose_1.model)('subscriptions', SubscriptionSchema);
