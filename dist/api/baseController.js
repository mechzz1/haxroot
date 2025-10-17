"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFailedResponse = prepareFailedResponse;
exports.prepareSuccessResponse = prepareSuccessResponse;
var globals_1 = require("@config/globals");
/**
 * Prepare Responses
 * @param {Response} res res object that will process the response
 * @param {string} msg Message to be sent
 * @param {unknown} data data to be send in response can be of any type. (optional)
 * @param {Action} action status code (default 200) can be "create", "update", "read" or "delete"
 * @param {number} status status code (default 200)
 * @returns {void}
 */
function prepareSuccessResponse(res, msg, data, action, status) {
    var responseData = { msg: msg };
    if (data) {
        responseData.data = data;
    }
    if (action) {
        responseData.action = action;
    }
    if (status) {
        res.status(status).json(responseData);
    }
    else {
        res.json(responseData);
    }
}
/**
 * Prepare Responses
 * @param {Response} res res object that will process the response
 * @param {Array<string>} errors data to be send in response
 * @param {number} status status code (default 200)
 * @returns {void}
 */
function prepareFailedResponse(res, errors, status) {
    res.status(status || globals_1.statusCodes.SERVER_ERROR).json({
        errors: errors.map(function (err) {
            return { msg: err };
        })
    });
}
