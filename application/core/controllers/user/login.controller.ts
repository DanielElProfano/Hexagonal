import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { HttpResponse } from "../../interactors/HttpResponse";
import { DeCryptInterface } from "../../interfaces/bcrypt";
import { ControllerInterface } from "../../interfaces/controller";
import { jwtInterface } from "../../interfaces/jwt-token";
import { saveUser } from "../../middleware/saveUser";

export class LoginController implements ControllerInterface{
    //crear un email validator dentro del constructor
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
        const { id, email, password } = user[0];
        const equals = await this.bcrypt.deCrypt(httpRequest.body.password, password)
        if(!equals){
            return HttpResponse.error(403, 'Password o email incorrecto')
        }
        const token = await this.jwt.token({id, email});
        const userLogin = saveUser({id, email})
        return HttpResponse.success(202, token)
    }

    // usar el servicio del jwt para verificar la password
}

function saveuser(arg0: { id: any; email: any; }) {
    throw new Error("Function not implemented.");
}
