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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const HttpResponse_1 = require("../../interactors/HttpResponse");
class LoginController {
    constructor(id, bcrypt, mysql, jwt) {
        this.id = id;
        this.bcrypt = bcrypt;
        this.mysql = mysql;
        this.jwt = jwt;
        this.id = id;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const expectedFields = ['email', 'password'];
            for (const field of expectedFields) {
                if (!httpRequest.body[field]) {
                    return HttpResponse_1.HttpResponse.error(404, `Falta el campo ${field}`);
                }
            }
            const user = yield this.mysql.getBy('user', 'email', httpRequest.body.email);
            if (!user) {
                return HttpResponse_1.HttpResponse.error(403, 'Password o email incorrecto');
            }
            const { userId, email, password } = user[0];
            const equals = yield this.bcrypt.deCrypt(httpRequest.body.password, password);
            if (!equals) {
                return HttpResponse_1.HttpResponse.error(403, 'Password o email incorrecto');
            }
            this.token = {
                token: yield this.jwt.token({ userId, email }),
                email,
                userId
            };
            return HttpResponse_1.HttpResponse.success(202, this.token);
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map