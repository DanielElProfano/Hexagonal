"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterController = void 0;
const register_controller_1 = require("../core/controllers/user/register.controller");
const bcrypt_adapter_1 = require("../core/utils-adapters/bcrypt.adapter");
const emailValidator_adapter_1 = require("../core/utils-adapters/emailValidator.adapter");
const id_adapter_1 = require("../core/utils-adapters/id.adapter");
const jwt_adapter_1 = require("../core/utils-adapters/jwt.adapter");
const mysql_repository_1 = __importDefault(require("../core/repostitories/mysql.repository"));
const makeRegisterController = () => {
    const salt = 10;
    const bcrypt = new bcrypt_adapter_1.BcryptAdapter(salt);
    const jwt = new jwt_adapter_1.JwtAdapter("secret");
    const id = new id_adapter_1.createIdAdapter();
    const emailValidator = new emailValidator_adapter_1.EmailValidatorAdapter();
    const mysqlUser = new mysql_repository_1.default();
    const registerController = new register_controller_1.RegisterController(id, bcrypt, emailValidator, mysqlUser, jwt);
    return registerController;
};
exports.makeRegisterController = makeRegisterController;
//# sourceMappingURL=register.js.map