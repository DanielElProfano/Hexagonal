import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { HttpResponse } from "../../interactors/HttpResponse";
import { DeCryptInterface } from "../../interfaces/bcrypt";
import { ControllerInterface } from "../../interfaces/controller";
import { jwtInterface } from "../../interfaces/jwt-token";
import { tokenInterface } from "../../interfaces/token";

export class LoginController implements ControllerInterface{
    //crear un email validator dentro del constructor
    private token : tokenInterface;

    constructor(
        private readonly id: idInterface,
        private readonly bcrypt : DeCryptInterface,
        private readonly mysql,
        private readonly jwt : jwtInterface
        )
    {
        this.id = id;
    }

    async handle (httpRequest){
        const expectedFields = ['email', 'password'];
        for( const field of expectedFields){
            if (!httpRequest.body[field]){
                return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        const user = await this.mysql.getBy('user', 'email', httpRequest.body.email)
        if(!user){
            return HttpResponse.error(403, 'Password o email incorrecto')
        }
        const { userId, email, password } = user[0];
        const equals = await this.bcrypt.deCrypt(httpRequest.body.password, password)
        if(!equals){
            return HttpResponse.error(403, 'Password o email incorrecto')
        }
        this.token = {
            token : await this.jwt.token({userId, email}),
            email,
            userId
        }
        return HttpResponse.success(202, this.token)
    }

    // usar el servicio del jwt para verificar la password
}

