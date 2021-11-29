"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const login_controller_1 = require("../core/controllers/user/login.controller");
const mysql_repository_1 = __importDefault(require("../core/repostitories/mysql.repository"));
const bcrypt_adapter_1 = require("../core/utils-adapters/bcrypt.adapter");
const id_adapter_1 = require("../core/utils-adapters/id.adapter");
const jwt_adapter_1 = require("../core/utils-adapters/jwt.adapter");
const makeLoginController = () => {
    const id = new id_adapter_1.createIdAdapter();
    const deCrypt = new bcrypt_adapter_1.DecryptAdapter();
    const mysql = new mysql_repository_1.default();
    const jwt = new jwt_adapter_1.JwtAdapter('secret');
    const loginController = new login_controller_1.LoginController(id, deCrypt, mysql, jwt);
    return loginController;
};
exports.makeLoginController = makeLoginController;
//# sourceMappingURL=login.js.map