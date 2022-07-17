// import { request } from "express";
import { HttpResponse } from "../../interactors/HttpResponse";
import { ControllerInterface } from "../../interfaces/controller";


export class PetitionOfFrienshipController implements ControllerInterface{
    constructor (private readonly mysql)
    {
        this.mysql = mysql  
    }
    async handle(httpRequest){
        console.log("httpRequestdd", httpRequest)
        const expectedFields = ['userId', 'friendId']
        for( const field of expectedFields){
            if (!httpRequest.body[field]){
                return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        if(httpRequest.body.userId === httpRequest.body.friendId){
            return HttpResponse.error(404, 'No puede ser amigo de sí mismo.')
        }
        try{
            const addFriend = await this.mysql.insert("requests", httpRequest.body)
            return HttpResponse.success(202, "Add friend Success")
        }catch(error){
            return HttpResponse.error(404, error);

    }
    }
}
