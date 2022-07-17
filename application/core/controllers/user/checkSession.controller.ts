import { Request, Response } from "express";


export const checkSessionController = (req: Request, res: Response) => {
    {
        console.log("checksession", req.user);
        if(req.user){
            return res.status(201).json("existe session")
        }
        return res.status(404).json("no existe session")

    }
}