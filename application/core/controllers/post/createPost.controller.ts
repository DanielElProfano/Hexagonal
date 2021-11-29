import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";


export class CreatePostController implements ControllerInterface {
   
    constructor(
        private readonly id: idInterface,
        private readonly mysql)
        {
            this.id = id
            this.mysql = mysql;
        }
    async handle (httpRequest) {

        const expectedFields = ['userId', 'title', 'comment', 'photo']
        for(const field of expectedFields){
            if(!httpRequest.body[field]){
                return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        const newPost = {
            ...httpRequest.body,
            postId : await this.id.createId()
        }
        console.log(newPost)
        const post = await this.mysql.insert('post', newPost)
        if(!post){
            return HttpResponse.error(401,"Error in BBDD")
        }       
        return HttpResponse.success(201, "Create Post Success")
    }
}