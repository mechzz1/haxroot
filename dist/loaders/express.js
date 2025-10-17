"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@config/globals");
var logger_1 = require("@config/logger");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("../api/routes");
var routes_2 = require("@api/components/webhooks/routes");
var App = /** @class */ (function () {
    /**
     * Constructor
     * @param {express.Application} app Express Application
     * @param {Server} httpServer Express Application
     */
    function App(app, httpServer) {
        /**
         * Remove following apis from cors UI
         * @param {Request} req incoming request
         * @param {originCallback} callback Port binding
         * @returns {void}
         */
        this.exceptionCORS = function (req, callback) {
            var origin = req.header('Origin');
            var corsOptions = { origin: true, credentials: true };
            if (origin && globals_1.globals.CORS.indexOf(origin) === globals_1.globals.NOT_FOUND) {
                /**
                 * If origin exists and is not in
                 * whitelisted array then block request.
                 * If there is no origin header then it
                 * means that REST apis are being called
                 * so allow it.
                 */
                corsOptions.origin = false;
            }
            return callback(null, corsOptions);
        };
        this.app = app;
        this.httpServer = httpServer;
        this.initializeControllers();
    }
    /**
     * Start server listener
     * @param {number} port Port binding
     * @returns {void}
     */
    App.prototype.listen = function (port) {
        this.httpServer.listen(port, function () {
            logger_1.logger.info("App listening on the port ".concat(port));
        });
    };
    /**
     * Start router api's
     * @returns {void}
     */
    App.prototype.startRouter = function () {
        (0, routes_1.initRestRoutes)(this.app);
    };
    /**
     * Serve UI
     * @returns {void}
     */
    App.prototype.serveFrontEnd = function () {
        this.app.use(express_1.default.static('cytomate-ui/build'));
        this.app.get('*', function (req, res) {
            return res.sendFile(path_1.default.resolve(process.cwd(), 'cytomate-ui', 'build', 'index.html'));
        });
    };
    /**
     * Initializes urls
     * @param {number} port Port binding
     * @returns {void}
     */
    App.prototype.initializeControllers = function () {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)(this.exceptionCORS));
        // Register Stripe webhook BEFORE express.json() middleware
        // This route needs raw body for signature verification
        (0, routes_2.registerStripeWebhookRoutes)(this.app, '/api');
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(logger_1.requestLogger);
    };
    return App;
}());
exports.default = App;
