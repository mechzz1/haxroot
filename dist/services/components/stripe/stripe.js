"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@config/globals");
var stripe_1 = require("stripe");
var StripeService = /** @class */ (function () {
    /**
     * Constructor
     */
    function StripeService() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.stripe = new stripe_1.Stripe(globals_1.globals.STRIPE_SECRET_KEY);
    }
    /**
     * Get singleton instance
     * @returns {StripeService} ret
     */
    StripeService.getInstance = function () {
        if (!StripeService._instance) {
            StripeService._instance = new StripeService();
        }
        return StripeService._instance;
    };
    /**
     * Get Stripe instance
     * @returns {Stripe} our stripe object
     */
    StripeService.prototype.getStripe = function () {
        return this.stripe;
    };
    /**
     * Create a new customer in Stripe
     * @param {string} email - Customer email
     * @param {string} [name] - Optional customer name
     * @param {object} [metadata] - Optional metadata
     * @returns {Promise<string>} Stripe customer ID
     */
    StripeService.prototype.createCustomer = function (email, name, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.customers.create({
                            email: email,
                            name: name,
                            metadata: metadata
                        })];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, customer.id];
                }
            });
        });
    };
    /**
     * Create a recurring product with price in Stripe
     * @param {string} name - Product name
     * @param {number} amount - Price amount in cents (e.g., 999 for $9.99)
     * @param {string} currency - Currency code (e.g., 'usd')
     * @param {string} interval - Billing interval ('day', 'week', 'month', 'year')
     * @param {string} [description] - Optional product description
     * @returns {Promise<string>} Stripe price ID
     */
    StripeService.prototype.createRecurringProduct = function (name, amount, currency, interval, description) {
        return __awaiter(this, void 0, void 0, function () {
            var product, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.products.create({
                            name: name,
                            description: description
                        })];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.stripe.prices.create({
                                product: product.id,
                                unit_amount: amount,
                                currency: currency,
                                recurring: {
                                    interval: interval
                                }
                            })];
                    case 2:
                        price = _a.sent();
                        return [2 /*return*/, price.id];
                }
            });
        });
    };
    /**
     * Create a checkout session for subscription
     * @param {string} priceId - Stripe price ID
     * @param {string} customerId - Stripe customer ID
     * @param {string} [successUrl] - Optional success URL (defaults to globals.PAYMENT_SUCCESS_URL)
     * @param {string} [cancelUrl] - Optional cancel URL (defaults to globals.PAYMENT_FAILED_URL)
     * @returns {Promise<string>} Checkout session URL
     */
    StripeService.prototype.createCheckoutSession = function (priceId, customerStripeId, userId, planId, clinicId) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('CHECKOUT PLAN ID', planId);
                        return [4 /*yield*/, this.stripe.checkout.sessions.create({
                                mode: 'subscription',
                                payment_method_types: ['card'],
                                line_items: [
                                    {
                                        price: priceId,
                                        quantity: 1
                                    }
                                ],
                                success_url: globals_1.globals.PAYMENT_SUCCESS_URL,
                                cancel_url: globals_1.globals.PAYMENT_FAILED_URL,
                                customer: customerStripeId,
                                metadata: {
                                    // will use these details in the webhook to construct the subscription object
                                    stripePriceId: priceId,
                                    customerStripeId: customerStripeId,
                                    userId: userId,
                                    planId: planId,
                                    clinicId: clinicId
                                }
                            })];
                    case 1:
                        session = _a.sent();
                        return [2 /*return*/, session.url];
                }
            });
        });
    };
    return StripeService;
}());
// Usage examples:
// 1. Create a customer
// const customerId = await StripeService.getInstance().createCustomer('user@example.com', 'John Doe');
// 2. Create a recurring product (e.g., $9.99/month)
// const priceId = await StripeService.getInstance().createRecurringProduct(
//   'Premium Plan',
//   999,
//   'usd',
//   'month',
//   'Access to all premium features'
// );
// 3. Create a checkout session
// const checkoutUrl = await StripeService.getInstance().createCheckoutSession(
//   priceId,
//   customerId
// );
exports.default = StripeService;
