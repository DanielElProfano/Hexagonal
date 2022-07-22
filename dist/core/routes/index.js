"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routesPost_1 = __importDefault(require("./routesPost"));
const routerComment_1 = __importDefault(require("./routerComment"));
const routerUser_1 = __importDefault(require("./routerUser"));
const authorization_1 = require("../middleware/authorization");
const checkSession_controller_1 = require("../middleware/checkSession.controller");
const router = (0, express_1.Router)();
router.use('/user', routerUser_1.default);
router.use('/post', [authorization_1.authorizationMiddleware, checkSession_controller_1.checkSessionController, routesPost_1.default]);
router.use('/comment', [authorization_1.authorizationMiddleware, checkSession_controller_1.checkSessionController, routerComment_1.default]);
router.use('/session', (req, res, next) => {
    {
        if (req.session.user) {
            req.user = req.session.user;
            console.log("existe la sessión");
            return res.status(200).json("sessión abierta");
        }
        return res.status(404).json("no existe session");
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map