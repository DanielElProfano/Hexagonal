"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const routes_1 = __importDefault(require("./core/routes"));
const mongo_1 = require("./config/bd/mongodb/mongo");
const session_1 = require("./config/session/session");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 4000;
        this.router = (0, express_1.Router)();
        this.MysqlStore = (0, express_mysql_session_1.default)(express_session_1.default);
    }
    applymiddlerwares() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:3000'],
            credentials: true,
        }));
        this.app.use(express_1.default.urlencoded({ extended: false })); //activa req.body
        this.app.use(express_1.default.json());
        this.app.use((0, express_session_1.default)(session_1.mysqlSession));
        this.app.use('/', routes_1.default);
    }
    start() {
        this.applymiddlerwares();
        (0, mongo_1.mongooseConnect)();
        this.app.listen(this.port, () => console.log("listening on port", this.port));
    }
}
exports.server = new Server();
//# sourceMappingURL=app.js.map