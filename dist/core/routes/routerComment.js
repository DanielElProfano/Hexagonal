"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const general_controller_1 = require("../controllers/general.controller");
const comment_1 = require("../../factories/comment");
const like_1 = require("../../factories/like");
const router = (0, express_1.Router)();
router
    .post('/create', [authorization_1.authorizationMiddleware, (0, general_controller_1.generalController)((0, comment_1.makeCreateCommentController)())])
    .post('/like', [authorization_1.authorizationMiddleware, (0, general_controller_1.generalController)((0, like_1.makeLikeController)('comment'))]);
exports.default = router;
//# sourceMappingURL=routerComment.js.map