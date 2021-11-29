import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";

export class GetAllPostController implements ControllerInterface {
   
    constructor(private readonly mysql)
        {
            this.mysql = mysql;
        }

    async handle (httpRequest) {
        const expectedFields = ['userId']
        for( const field of expectedFields){
            if(!httpRequest.body[field]){
                return HttpResponse.error(404, `falta el campo ${field}`)
            }
        }
        try{
            const allPost = await this.mysql.getBy('post', 'userId', httpRequest.body.userId)
            if(!allPost){
                return HttpResponse.error(401,"Error in BBDD")
            }       
            //ejecución de las promesas en pararelo para optimizar datos.
            const arrayPost = await Promise.all(allPost.map(async element => {
                const allComments = await this.mysql.getBy('comment','postId', element.postId)
                element.commentsArray = allComments
                return element
            }));
            return HttpResponse.success(200, arrayPost)
            }
        catch(error){
        return HttpResponse.error(500, "error en acceso a BBDD")
        }
    }
}