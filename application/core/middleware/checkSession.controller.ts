import { NextFunction, Request, Response } from "express";


export const checkSessionController = (req: Request, res: Response, next: NextFunction) => {
    {
        if(req.session.user){
            req.user = req.session.user
            console.log("existe la sessión")
            next()
        }else{

            return res.status(404).json("no existe session")
        }

    }
}