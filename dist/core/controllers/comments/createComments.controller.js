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
exports.CreatePostController = void 0;
const HttpResponse_1 = require("../../interactors/HttpResponse");
class CreatePostController {
    constructor(id, mysql) {
        this.id = id;
        this.mysql = mysql;
        this.id = id;
        this.mysql = mysql;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const expectedFields = ['userId', 'title', 'comment', 'photo'];
            for (const field of expectedFields) {
                if (!httpRequest.body[field]) {
                    return HttpResponse_1.HttpResponse.error(404, `Falta el campo ${field}`);
                }
            }
            const newPost = Object.assign(Object.assign({}, httpRequest.body), { postId: yield this.id.createId() });
            const post = yield this.mysql.insert('comment', newPost);
            if (!post) {
                return HttpResponse_1.HttpResponse.error(401, "Error in BBDD");
            }
            return HttpResponse_1.HttpResponse.success(201, "Create comment Success");
        });
    }
}
exports.CreatePostController = CreatePostController;
//# sourceMappingURL=createComments.controller.js.map