import { Request, Response } from 'express'


export const saveUser = (user) => {
    console.log("lsakjhsñalkjh" , user)
    const middleware = (req: Request, res: Response) => {
        console.log(user)
        req.user = user;

    }
    return middleware
}