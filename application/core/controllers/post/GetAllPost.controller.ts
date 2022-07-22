import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";

export class GetAllPostController implements ControllerInterface {
   
    constructor(private readonly mysql)
        {
            this.mysql = mysql;
        }

    async handle (httpRequest, req) {
        const { userId } = req.session.user
        const expectedFields = ['userId']
        for( const field of expectedFields){
            if(!httpRequest.body[field]){
                return HttpResponse.error(404, `falta el campo ${field}`)
            }
        }
        try{
            const allPost = await this.mysql.getBy('post', 'userId', userId)
            if(!allPost){
                return HttpResponse.error(401,"Error in BBDD")
            }       
            return HttpResponse.success(200, allPost)
            }
        catch(error){
        return HttpResponse.error(500, "error en acceso a BBDD")
        }
    }
}