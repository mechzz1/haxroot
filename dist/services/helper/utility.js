"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
var bcrypt_1 = require("bcrypt");
var crypto_1 = require("crypto");
var hi_base32_1 = require("hi-base32");
/**
 * UtilityService
 *
 * Service for utility functions
 */
var UtilityService = /** @class */ (function () {
    function UtilityService() {
    }
    /**
     * Compare Plain text with its hash
     * @param {string} plain Plain text to compare
     * @param {string} plainHash Hashed text of plain to be compared with
     * @returns {Promise<boolean>} Returns async boolean
     */
    UtilityService.comparePlainTextWithHash = function (plain, plainHash) {
        return (0, bcrypt_1.compare)(plain, plainHash);
    };
    /**
     * Generate salt
     * @param {string} length Plain text to compare
     * @returns {Promise<string>} Returns async salted string
     */
    UtilityService.generateSalt = function (length) {
        return (0, bcrypt_1.genSalt)(length);
    };
    /**
     * Generate Random string
     * @param {string} length Plain text to compare
     * @returns {string} Returns async salted string
     */
    UtilityService.generateRandomString = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };
    /**
     * Generate hash
     * @param {string} textToBeHashed Text to be hashed
     * @param {string} salt Salt to be hashed with
     * @returns {Promise<string>} Returns async hashed string
     */
    UtilityService.generatHash = function (textToBeHashed, salt) {
        return (0, bcrypt_1.hash)(textToBeHashed, salt);
    };
    /**
     * @param {number} length length of api key
     * @returns {string} secret of base64
     */
    UtilityService.generateBase32Secret = function (length) {
        var buf = (0, crypto_1.randomBytes)(15);
        return (0, hi_base32_1.encode)(buf)
            .replace(/=/g, '')
            .substring(0, length !== null && length !== void 0 ? length : 24);
    };
    /**
     * AES Encryption
     * @param {string} plainText Plain text to be encrypted
     * @param {string} key Key to be used in encryption
     * @param {string} cipherAlgo Algo used to create cipher iv
     * @param {string} hashingAlgo used for hashing the key
     * @returns {{ iv: string, encryptedData: string }} in hex form
     */
    UtilityService.aesEncrypt = function (plainText, key, cipherAlgo, hashingAlgo) {
        try {
            var zero = 0;
            var sixteen = 16;
            var encryptKey = (0, crypto_1.createHash)(hashingAlgo).update(key).digest('hex');
            var iv = encryptKey.substring(zero, sixteen);
            var cipher = (0, crypto_1.createCipheriv)(cipherAlgo, encryptKey, iv);
            var encrypted = cipher.update(plainText);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return { iv: iv.toString(), encryptedData: encrypted.toString('hex') };
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    /**
     * AES Decryption
     * @param {string} plainText Plain text to be decrypted
     * @param {string} key Key to be used in decryption
     * @param {string} cipherAlgo Algo used to create cipher iv
     * @param {string} hashingAlgo used for hashing the key
     * @returns {string} decrpted data
     */
    UtilityService.aesDecrypt = function (plainText, key, cipherAlgo, hashingAlgo) {
        try {
            var zero = 0;
            var sixteen = 16;
            var decryptKey = (0, crypto_1.createHash)(hashingAlgo).update(key).digest('hex');
            var iv = decryptKey.substring(zero, sixteen);
            var encryptedText = Buffer.from(plainText, 'hex');
            var decipher = (0, crypto_1.createDecipheriv)(cipherAlgo, decryptKey, iv);
            var decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
        catch (err) {
            throw new Error(err.message);
        }
    };
    return UtilityService;
}());
exports.UtilityService = UtilityService;
