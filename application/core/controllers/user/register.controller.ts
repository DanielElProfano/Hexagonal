import { idInterface } from "../../Infrastruture/adapters/id.interface";
import { BcryptInterface } from "../../interfaces/bcrypt";
import { ControllerInterface } from "../../interfaces/controller";
import { EmailValidatorInterface } from "../../interfaces/emailValidator";
import { HttpRequestInterface } from "../../interfaces/http";
import { HttpResponse } from "../../interactors/HttpResponse";
import { jwtInterface } from "../../interfaces/jwt-token";
import { tokenInterface } from "../../interfaces/token";

export class RegisterController implements ControllerInterface{
    //crear un email validator dentro del constructor
    token : tokenInterface
    constructor(
        private readonly id: idInterface, 
        private readonly bcrypt: BcryptInterface,
        private readonly emailValidator: EmailValidatorInterface,
        private readonly mysql,
        private readonly jwt: jwtInterface)
    {
        this.id = id;
        this.bcrypt = bcrypt;
    }

    async handle (httpRequest: HttpRequestInterface) {
        // verificación de que todo es correcto
        const expectedField  = ['email', 'password'];
        for (const field of expectedField) {
            if (!httpRequest.body[field]) {
              return HttpResponse.error(404, `Falta el campo ${field}`)
            }
        }
        const { email } = httpRequest.body;
        if(!this.emailValidator.validate(email)){
            return HttpResponse.error(404, "Email incorrecto")
        }
        const newUser = {
            userId : await this.id.createId(),
            email,
            password : await this.bcrypt.crypto(httpRequest.body.password)
        }
        // All validator are ok and insert the user
        const insert = await this.mysql.insert("user", newUser);
        if(insert === false){
            return HttpResponse.error(404, `El email ${email} ya existe`)
        }
        this.token = {
            token : await this.jwt.token({userId: newUser.userId, email: newUser.email}),
            email,
            userId: newUser.userId
        }
        return HttpResponse.success(201, this.token)
    }
}