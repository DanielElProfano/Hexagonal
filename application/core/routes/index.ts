import { Router } from 'express';
import routerPost from './routesPost';
import routerComment from './routerComment';
import routerUser from './routerUser';
import { authorizationMiddleware } from '../middleware/authorization';
import { checkSessionController } from '../middleware/checkSession.controller';
import { NextFunction, Request, Response } from "express";

const router = Router();

router.use('/user', routerUser)
router.use('/post', [authorizationMiddleware, checkSessionController, routerPost] )
router.use('/comment', [authorizationMiddleware, checkSessionController, routerComment])
router.use('/session', (req: Request, res: Response, next: NextFunction) => {
    {
        if(req.session.user){
            req.user = req.session.user
            console.log("existe la sessión")
            return res.status(200).json("sessión abierta")
        }
            return res.status(404).json("no existe session")
    }
})

export default router;

