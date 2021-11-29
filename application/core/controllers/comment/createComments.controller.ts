import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";


export class CreateCommentController implements ControllerInterface {
   
    constructor(
        private readonly id: idInterface,
        private readonly mysql)
        {
            this.id = id
            this.mysql = mysql;
        }
    async handle (httpRequest) {
        const expectedFields = ['userId', 'comment']
        for(const field of expectedFields){
            if(!httpRequest.body[field]){
                return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        const newComment = {
            ...httpRequest.body,
            commentId : await this.id.createId()
        }
        const comment = await this.mysql.insert('comment', newComment)
        if(!comment){
            return HttpResponse.error(401,"Error in BBDD")
        }       
        return HttpResponse.success(201, "Create comment Success")
    }
}