"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../../factories/login");
const register_1 = require("../../factories/register");
const general_controller_1 = require("../controllers/general.controller");
const router = (0, express_1.Router)();
router
    .post('/login', (0, general_controller_1.generalController)((0, login_1.makeLoginController)()))
    .post('/register', (0, general_controller_1.generalController)((0, register_1.makeRegisterController)()));
exports.default = router;
//# sourceMappingURL=routerUser.js.map