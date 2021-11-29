import { Request, Response } from "express"

function createSession (user){
    function middleware(req: Request, res: Response) {
        console.log("user" ,user)
        req.session.user = user
        console.log(req.session)
    }
    console.log("mii")
    return middleware
}

export default createSession