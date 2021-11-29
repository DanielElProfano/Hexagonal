import { Response, Request, Express} from "express";
import { ControllerInterface } from "../interfaces/controller";

export const generalController = (controller: ControllerInterface) => {
    return async (req: Request , res: Response) => {
        const httpRequest = {
            body : req.body,
            params : req.params
        }
        const httpResponse = await controller.handle(httpRequest);
        console.log("httpResponse", httpResponse)
        req.session.user = httpResponse.body
        res.status(httpResponse.statusCode).json(httpResponse)
    }
}