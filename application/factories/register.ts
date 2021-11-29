import { RegisterController } from "../core/controllers/user/register.controller";
import { BcryptAdapter } from "../core/utils-adapters/bcrypt.adapter";
import { EmailValidatorAdapter } from "../core/utils-adapters/emailValidator.adapter";
import { createIdAdapter } from '../core/utils-adapters/id.adapter' ;
import { JwtAdapter } from "../core/utils-adapters/jwt.adapter";
import Storage  from "../core/repostitories/mysql.repository";
export const makeRegisterController = () : RegisterController => {
    const salt = 10;
    const bcrypt = new BcryptAdapter(salt)
    const jwt = new JwtAdapter("secret");
    const id = new createIdAdapter();
    const emailValidator = new EmailValidatorAdapter();
    const mysqlUser = new Storage()
    const registerController = new RegisterController(
        id, 
        bcrypt, 
        emailValidator, 
        mysqlUser,
        jwt)
    return registerController
}