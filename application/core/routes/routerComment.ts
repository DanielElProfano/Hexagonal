import { Router } from "express";
import { authorizationMiddleware } from "../middleware/authorization";
import { generalController } from "../controllers/general.controller";
import { makeCreateCommentController } from "../../factories/comment";
import { makeLikeController } from "../../factories/like";

const router = Router();

router
    .post('/create', [authorizationMiddleware, generalController(makeCreateCommentController())]
    )
    .post('/like', [authorizationMiddleware, generalController(makeLikeController('comment'))])

export default router;