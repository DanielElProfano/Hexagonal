"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routesPost_1 = __importDefault(require("./routesPost"));
const routerComment_1 = __importDefault(require("./routerComment"));
const routerUser_1 = __importDefault(require("./routerUser"));
const router = (0, express_1.Router)();
router.use('/user', routerUser_1.default);
router.use('/post', routesPost_1.default);
router.use('/comment', routerComment_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map