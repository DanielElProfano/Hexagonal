import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../utils-adapters/jwt.adapter";

export const authorizationMiddleware = (req : Request, res: Response, next: NextFunction) => {
     //decodificar el header
    const authorization = req.headers.authorization || '';//guardo el header.authorization
    const token = getToken(authorization)
    const Jwt = new JwtAdapter('secret')
    const decodeToken = Jwt.verifyToken(token)  
    if(decodeToken === false){
        return res.json('Token no válido')
    }
    // compare user token with user in the session
    if( req.session.user.userId === decodeToken.value.userId){
        next()
    }else{
        return res.json('Este token es de otra session')
    }
    
    function getToken(auth){
        // Bearer token;
        if(!auth){
            console.log("no viene token")
                // throw new Error ('No viene token');
            //nos aseguramos que viene un token
        }
        if(auth.indexOf('Bearer') === -1){
            console.log(' Formato inválido');
        }
        let token = auth.replace('Bearer ', '');
        console.log("Llega el token del cliente", token)
        return token;
    }
}
