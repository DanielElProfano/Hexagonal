"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const general_controller_1 = require("../controllers/general.controller");
const post_1 = require("../../factories/post");
const router = (0, express_1.Router)();
router
    .post('/create', [authorization_1.authorizationMiddleware, (0, general_controller_1.generalController)((0, post_1.makeCreatePostController)())])
    .get('/get', [
    authorization_1.authorizationMiddleware,
    (0, general_controller_1.generalController)((0, post_1.makeGetAllPostController)())
]);
exports.default = router;
//# sourceMappingURL=routesPost.js.map