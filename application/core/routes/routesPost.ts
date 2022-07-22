import { Router } from "express";
import { generalController } from "../controllers/general.controller";
import { makeCreatePostController, makeGetAllPostController } from "../../factories/post";

const router = Router();

router
    .post('/create',  generalController(makeCreatePostController())    )
    .post('/get', generalController(makeGetAllPostController()))

export default router;