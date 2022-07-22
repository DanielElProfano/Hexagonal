import { Response, Request, Express} from "express";
import { ControllerInterface } from "../interfaces/controller";

export const generalController = (controller: ControllerInterface) => {
    return async (req: Request , res: Response) => {
        const httpRequest = {
            body : req.body,
            params : req.params
        }
        const httpResponse = await controller.handle(httpRequest, req);
        // if token, 
        if(httpResponse.body.token){
            const {email, userId} = httpResponse.body
            req.session.user = {
                userId,
                email
            }
            console.log("REQ.SESSION", req.session)
            httpResponse.body = httpResponse.body.token
        }
        res.status(httpResponse.statusCode).json(httpResponse)
    }
}