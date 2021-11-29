import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";


export class CreateLikeController implements ControllerInterface {
    
    constructor(
        private readonly id: idInterface,
        private readonly mysql,
        private readonly from: string)
        {
            this.id = id
            this.mysql = mysql;
        }
    async handle (httpRequest) {
        if(this.from === 'comment'){
            const expectedFields = ['commentId', 'postId', 'userId']
            for(const field of expectedFields){
                console.log(httpRequest.body)
                if(!httpRequest.body[field]){
                    console.log(httpRequest.body)
                    return HttpResponse.error(404, `Falta el campo ${field}`)
                }
            }
        }
        if(this.from === 'post'){
            const expectedFields = ['postId', 'commentId', 'userId', 'like']
            for(const field of expectedFields){
                if(!httpRequest.body[field]){
                    return HttpResponse.error(404, `Falta el campo ${field}`)
                }
            }
        }
        const {commentId, postId, userId, like} = httpRequest.body;
        if(like === true){  //create like
            const newLike = {
                commentId,
                userId,
                postId,
                likeId : await this.id.createId()
            }
            const like = await this.mysql.insert('likes', newLike)
            console.log("incLike")
            if(like === true){ 
                return HttpResponse.error(401,"Error in BBDD")
            }            
            const incLike = await this.mysql.like("comment", commentId, true) //set true if like, false if not like
            return HttpResponse.success(201, "Create Like Success")
        }else{  //erase like
            console.log("false")
            const user = {
                fieldName: 'userId',
                value: userId
            }
            const post = {
                fieldName :'commentId',
                value: commentId
            }
            const unlike = await this.mysql.delete('likes', user, post)
            const incLike = await this.mysql.like("comment", commentId, false) //set true if like, false if not like
            return HttpResponse.success(201, "Erase Like Success")
        }
    }       
}
