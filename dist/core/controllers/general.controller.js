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
exports.generalController = void 0;
const generalController = (controller) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            body: req.body,
            params: req.params
        };
        console.log(req.body);
        const httpResponse = yield controller.handle(httpRequest);
        // if token, 
        if (httpResponse === null || httpResponse === void 0 ? void 0 : httpResponse.body.token) {
            const { email, userId } = httpResponse.body;
            req.user = {
                userId,
                email
            };
            req.session.data = {
                userId,
                email
            };
            console.log("REQ.SESSION", req.session);
            httpResponse.body = httpResponse.body.token;
        }
        res.status(httpResponse.statusCode).json(httpResponse);
    });
};
exports.generalController = generalController;
//# sourceMappingURL=general.controller.js.map