"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var types_1 = require("../subscriptions/types");
var PaymentHistorySchema = new mongoose_1.Schema({
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
        required: true
    },
    stripeInvoiceId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'usd'
    },
    status: {
        type: String,
        enum: types_1.PaymentStatus,
        required: true,
        default: types_1.PaymentStatus.Succeeded
    }
}, {
    timestamps: true
});
// Indexes for analytics queries
PaymentHistorySchema.index({ userId: 1, paidAt: -1 });
PaymentHistorySchema.index({ clinicId: 1, paidAt: -1 });
PaymentHistorySchema.index({ status: 1, paidAt: -1 });
PaymentHistorySchema.index({ stripeInvoiceId: 1 });
exports.default = (0, mongoose_1.model)('payment_history', PaymentHistorySchema);
