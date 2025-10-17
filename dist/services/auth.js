"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var globals_1 = require("@config/globals");
var utility_1 = require("@services/helper/utility");
/**
 * AuthService
 */
var AuthService = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} entity "user", "agent" or "resetPassword"
     */
    function AuthService(entity) {
        this.secretKey = globals_1.globals.JWT_SECRET;
        this.cipherAlgo = 'aes-256-cbc';
        this.hashingAlgo = 'md5';
        if (entity === 'user') {
            this.signOptions = {
                expiresIn: globals_1.globals.JWT_USER_EXPIRY
            };
        }
        else if (entity === 'agent') {
            this.signOptions = {
                expiresIn: globals_1.globals.JWT_AGENT_EXPIRY
            };
        }
        else {
            throw new Error('Entity not available!');
        }
    }
    /**
     * Create JWT
     * @param {Record<string, unknown>} payload Used for JWT payload
     * @returns {string} Returns JWT
     * String cannot have expiry set so therefore we are using
     * no options for string payloads
     */
    AuthService.prototype.createToken = function (payload) {
        if (typeof payload === 'string') {
            return (0, jsonwebtoken_1.sign)(payload, this.secretKey);
        }
        return (0, jsonwebtoken_1.sign)(payload, this.secretKey, this.signOptions);
    };
    /**
     * Verify JWT
     * @param {string} token Used for JWT payload
     * @returns {object} Returns JWT
     */
    AuthService.prototype.verifyToken = function (token) {
        var verified = (0, jsonwebtoken_1.verify)(token, globals_1.globals.JWT_SECRET);
        return verified;
    };
    /**
     * Middleware for verifying user permissions from acl
     * @param {Array<string>} allowedRoles Permitted roles to access the resource
     * @param {string} userRole role of user
     * @returns {boolean} Returns if resource is allowed or not
     */
    AuthService.prototype.hasPermission = function (allowedRoles, userRole) {
        if (allowedRoles.indexOf(userRole) !== globals_1.globals.NOT_FOUND) {
            return true;
        }
        return false;
    };
    /**
     * Verify user token from cookies
     * @param {string | boolean} token main token
     * @returns {boolean} Returns false if not authenticated else returns decode payload
     */
    AuthService.prototype.isAuthenticated = function (token) {
        try {
            if (!token) {
                return false;
            }
            return this.verifyToken(token);
        }
        catch (err) {
            return false;
        }
    };
    /**
     * Verify agent Token from cookies
     * @param {string} decryptedToken decrypted token of agent
     * @param {string} mac mac of agent
     * @param {string} systemName systemName of agent
     * @returns {boolean} Returns false if not authenticated else returns decode payload
     */
    AuthService.prototype.agentIsAuthenticated = function (decryptedToken) {
        try {
            return this.verifyToken(decryptedToken);
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    /**
     * Encrypt token
     * @param {string} token auth token of an agent
     * @returns {{ iv: string, encryptedData: string }} Get ecrypted data
     */
    AuthService.prototype.encryptToken = function (token) {
        try {
            return utility_1.UtilityService.aesEncrypt(token, globals_1.globals.SERVER_SECRET, this.cipherAlgo, this.hashingAlgo);
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    /**
     * Decrypt token
     * @param {string} token auth token of an agent
     * @returns {string} Get decrypted data
     */
    AuthService.prototype.decryptToken = function (token) {
        try {
            return utility_1.UtilityService.aesDecrypt(token, globals_1.globals.SERVER_SECRET, this.cipherAlgo, this.hashingAlgo);
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    return AuthService;
}());
exports.AuthService = AuthService;
