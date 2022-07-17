import { Router } from "express";
import { authorizationMiddleware } from "../middleware/authorization";
import { generalController } from "../controllers/general.controller";
import { makeAddFriendController, makeGetAllFriendsController, petitionOfFrienshipController } from "../../factories/friends";

const router = Router();

router
    .post('/add', [authorizationMiddleware, generalController(makeAddFriendController())]
    )
    .get('/getAll', [
        authorizationMiddleware, 
        generalController(makeGetAllFriendsController())
    ])
    .post('/request', [authorizationMiddleware, generalController(petitionOfFrienshipController())])

export default router;