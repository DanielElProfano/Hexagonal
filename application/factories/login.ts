import { LoginController } from "../core/controllers/user/login.controller";
import Storage from "../core/repostitories/mysql.repository";
import { DecryptAdapter } from "../core/utils-adapters/bcrypt.adapter";
import { createIdAdapter } from '../core/utils-adapters/id.adapter' ;
import { JwtAdapter } from "../core/utils-adapters/jwt.adapter";

export const makeLoginController = () : LoginController => {
    const id = new createIdAdapter();
    const deCrypt = new DecryptAdapter()
    const mysql = new Storage();
    const jwt = new JwtAdapter('secret')
    const loginController = new LoginController(id, deCrypt, mysql, jwt)
    return loginController
}