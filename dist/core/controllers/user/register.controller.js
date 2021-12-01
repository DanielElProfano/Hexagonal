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
exports.RegisterController = void 0;
const HttpResponse_1 = require("../../interactors/HttpResponse");
class RegisterController {
    constructor(id, bcrypt, emailValidator, mysql, jwt) {
        this.id = id;
        this.bcrypt = bcrypt;
        this.emailValidator = emailValidator;
        this.mysql = mysql;
        this.jwt = jwt;
        this.id = id;
        this.bcrypt = bcrypt;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificación de que todo es correcto
            const expectedField = ['email', 'password'];
            for (const field of expectedField) {
                if (!httpRequest.body[field]) {
                    return HttpResponse_1.HttpResponse.error(404, `Falta el campo ${field}`);
                }
            }
            const { email } = httpRequest.body;
            if (!this.emailValidator.validate(email)) {
                return HttpResponse_1.HttpResponse.error(404, "Email incorrecto");
            }
            const newUser = {
                userId: yield this.id.createId(),
                email,
                password: yield this.bcrypt.crypto(httpRequest.body.password)
            };
            // All validator are ok and insert the user
            const insert = yield this.mysql.insert("user", newUser);
            if (insert === false) {
                return HttpResponse_1.HttpResponse.error(404, `El email ${email} ya existe`);
            }
            this.token = {
                token: yield this.jwt.token({ userId: newUser.userId, email: newUser.email }),
                email,
                userId: newUser.userId
            };
            return HttpResponse_1.HttpResponse.success(201, this.token);
        });
    }
}
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map