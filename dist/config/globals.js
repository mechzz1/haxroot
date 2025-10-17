"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCodes = exports.serverUrls = exports.globals = exports.branding = exports.rootPath = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: ".env.".concat(process.env.NODE_ENV) });
exports.rootPath = path_1.default.join(path_1.default.resolve(__dirname), '../');
/**
 * Create Upload Folder if does not exist
 */
// if (!fs.existsSync(path.join(rootPath, process.env.UPLOAD_FOLDER as string))) {
//     fs.mkdirSync(path.join(rootPath, process.env.UPLOAD_FOLDER as string));
// }
var globals;
var serverUrls;
var statusCodes;
var branding;
exports.globals = globals = {
    /**
     * Server configurations
     */
    ENV: process.env.NODE_ENV,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
        // process.env.NODE_ENV === Environment.Production ||
        // process.env.NODE_ENV === Environment.Testing
    },
    CORS: process.env.CORS.split(','),
    NOT_FOUND: -1,
    /**
     * Database configuration
     */
    DATABASE_URL: process.env.DATABASE_URL,
    SERVER_SECRET: process.env.SERVER_SECRET,
    /**
     * JWT configutrations
     */
    JWT_SECRET: process.env.JWT_SERVER_SECRET,
    JWT_USER_EXPIRY: Number(process.env.JWT_USER_EXPIRY),
    JWT_AGENT_EXPIRY: Number(process.env.JWT_AGENT_EXPIRY),
    JWT_RESET_PASS_EXPIRY: Number(process.env.JWT_RESET_PASS_EXPIRY),
    /**
     * Others
     */
    SALT_LENGTH: 10,
    DEFAULT_RANDOM_BYTES: 32,
    UPLOAD_FOLDER: 'uploads',
    // stripe
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    PAYMENT_SUCCESS_URL: process.env.PAYMENT_SUCCESS_URL,
    PAYMENT_FAILED_URL: process.env.PAYMENT_FAILED_URL,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET
};
exports.serverUrls = serverUrls = {
    FRONTEND: process.env.FRONTEND_URL
};
exports.branding = branding = {
    BRAND_NAME: process.env.BRAND_NAME
};
exports.statusCodes = statusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422
};
