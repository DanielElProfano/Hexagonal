"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function saveUser(user) {
    console.log("pasdjfh");
    app.use((req, res, next) => {
        console.log("perra", user);
        req.user = user;
        next();
    });
}
exports.default = saveUser;
//# sourceMappingURL=saveUser.js.map