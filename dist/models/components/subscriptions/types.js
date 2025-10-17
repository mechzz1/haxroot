"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.SubscriptionStatus = void 0;
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["Active"] = "active";
    SubscriptionStatus["Canceled"] = "canceled";
    SubscriptionStatus["Expired"] = "expired";
    SubscriptionStatus["PastDue"] = "past_due";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Succeeded"] = "succeeded";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Refunded"] = "refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
