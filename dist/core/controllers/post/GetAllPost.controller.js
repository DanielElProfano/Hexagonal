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
exports.GetAllPostController = void 0;
const HttpResponse_1 = require("../../interactors/HttpResponse");
class GetAllPostController {
    constructor(mysql) {
        this.mysql = mysql;
        this.mysql = mysql;
    }
    handle(httpRequest, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session.user;
            const expectedFields = ['userId'];
            for (const field of expectedFields) {
                if (!httpRequest.body[field]) {
                    return HttpResponse_1.HttpResponse.error(404, `falta el campo ${field}`);
                }
            }
            try {
                const allPost = yield this.mysql.getBy('post', 'userId', userId);
                if (!allPost) {
                    return HttpResponse_1.HttpResponse.error(401, "Error in BBDD");
                }
                return HttpResponse_1.HttpResponse.success(200, allPost);
            }
            catch (error) {
                return HttpResponse_1.HttpResponse.error(500, "error en acceso a BBDD");
            }
        });
    }
}
exports.GetAllPostController = GetAllPostController;
//# sourceMappingURL=GetAllPost.controller.js.map