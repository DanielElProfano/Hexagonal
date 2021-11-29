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
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const expectedFields = ['userId'];
            for (const field of expectedFields) {
                if (!httpRequest.body[field]) {
                    return HttpResponse_1.HttpResponse.error(404, `falta el campo ${field}`);
                }
            }
            try {
                const allPost = yield this.mysql.getBy('post', 'userId', httpRequest.body.userId);
                if (!allPost) {
                    return HttpResponse_1.HttpResponse.error(401, "Error in BBDD");
                }
                //ejecución de las promesas en pararelo para optimizar datos.
                const arrayPost = yield Promise.all(allPost.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const allComments = yield this.mysql.getBy('comment', 'postId', element.postId);
                    element.commentsArray = allComments;
                    return element;
                })));
                return HttpResponse_1.HttpResponse.success(200, arrayPost);
            }
            catch (error) {
                return HttpResponse_1.HttpResponse.error(500, "error en acceso a BBDD");
            }
        });
    }
}
exports.GetAllPostController = GetAllPostController;
//# sourceMappingURL=GetAllPost.controller.js.map