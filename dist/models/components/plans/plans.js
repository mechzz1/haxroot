"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var mongoose_1 = require("mongoose");
var PlanSchema = new mongoose_1.Schema({
    clinicId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'clinics',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: types_1.PlanCategory,
        required: true
    },
    monthlyPrice: {
        type: Number,
        required: true,
        min: 0
    },
    yearlyPrice: {
        type: Number,
        required: false,
        min: 0
    },
    features: [
        {
            type: String,
            trim: true
        }
    ],
    popular: {
        type: Boolean,
        default: false
    },
    stripePriceId: String
}, {
    timestamps: true
});
// Optional: Add index for better query performance
PlanSchema.index({ clinicId: 1 });
PlanSchema.index({ clinicId: 1, category: 1 });
exports.default = (0, mongoose_1.model)('plans', PlanSchema);
