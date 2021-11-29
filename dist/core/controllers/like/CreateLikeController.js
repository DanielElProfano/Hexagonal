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
exports.CreateLikeController = void 0;
const HttpResponse_1 = require("../../interactors/HttpResponse");
class CreateLikeController {
    constructor(id, mysql, from) {
        this.id = id;
        this.mysql = mysql;
        this.from = from;
        this.id = id;
        this.mysql = mysql;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.from === 'comment') {
                const expectedFields = ['commentId', 'postId', 'userId'];
                for (const field of expectedFields) {
                    console.log(httpRequest.body);
                    if (!httpRequest.body[field]) {
                        console.log(httpRequest.body);
                        return HttpResponse_1.HttpResponse.error(404, `Falta el campo ${field}`);
                    }
                }
            }
            if (this.from === 'post') {
                const expectedFields = ['postId', 'commentId', 'userId', 'like'];
                for (const field of expectedFields) {
                    if (!httpRequest.body[field]) {
                        return HttpResponse_1.HttpResponse.error(404, `Falta el campo ${field}`);
                    }
                }
            }
            const { commentId, postId, userId, like } = httpRequest.body;
            if (like === true) { //create like
                const newLike = {
                    commentId,
                    userId,
                    postId,
                    likeId: yield this.id.createId()
                };
                const like = yield this.mysql.insert('likes', newLike);
                console.log("incLike");
                if (like === true) {
                    return HttpResponse_1.HttpResponse.error(401, "Error in BBDD");
                }
                const incLike = yield this.mysql.like("comment", commentId, true); //set true if like, false if not like
                return HttpResponse_1.HttpResponse.success(201, "Create Like Success");
            }
            else { //erase like
                console.log("false");
                const user = {
                    fieldName: 'userId',
                    value: userId
                };
                const post = {
                    fieldName: 'commentId',
                    value: commentId
                };
                const unlike = yield this.mysql.delete('likes', user, post);
                const incLike = yield this.mysql.like("comment", commentId, false); //set true if like, false if not like
                return HttpResponse_1.HttpResponse.success(201, "Erase Like Success");
            }
        });
    }
}
exports.CreateLikeController = CreateLikeController;
//# sourceMappingURL=CreateLikeController.js.map