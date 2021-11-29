import { Router } from "express";
import { authorizationMiddleware } from "../middleware/authorization";
import { generalController } from "../controllers/general.controller";
import { makeCreatePostController, makeGetAllPostController } from "../../factories/post";

const router = Router();

router
    .post('/create', [authorizationMiddleware, generalController(makeCreatePostController())]
    )
    .get('/get', [
        authorizationMiddleware, 
        generalController(makeGetAllPostController())
    ])
    


export default router;