import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";

export class AddFriendController implements ControllerInterface{
    //crear un email validator dentro del constructor

    constructor(private readonly mysql )
    
    {
        this.mysql = mysql
    }

    async handle (httpRequest){
        const expectedFields = ['userId', 'friendId'];
        for( const field of expectedFields){
            if (!httpRequest.body[field]){
                return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        if(httpRequest.body.userId === httpRequest.body.friendId){
            return HttpResponse.error(404, 'No puede ser amigo de sí mismo.')
        }
        try{
            const addFriend = await this.mysql.insert("friends", httpRequest.body)
            if(addFriend === false){
                return HttpResponse.error(401, "Error in BBDD");
            }
            return HttpResponse.success(202, "Add friend Success")
        }catch(error){
            return HttpResponse.error(401, error);
        }
    }
}
