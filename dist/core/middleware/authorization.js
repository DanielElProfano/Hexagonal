"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jwt_adapter_1 = require("../utils-adapters/jwt.adapter");
const authorizationMiddleware = (req, res, next) => {
    //decodificar el header
    const authorization = req.headers.authorization || ''; //guardo el header.authorization
    const token = getToken(authorization);
    const Jwt = new jwt_adapter_1.JwtAdapter('secret');
    const decodeToken = Jwt.verifyToken(token);
    if (decodeToken === false) {
        return res.json('Token no válido');
    }
    // compare user token with user in the session
    if (req.session.user.userId === decodeToken.value.userId) {
        next();
    }
    else {
        return res.json('Este token es de otra session');
    }
    function getToken(auth) {
        // Bearer token;
        if (!auth) {
            console.log("no viene token");
            // throw new Error ('No viene token');
            //nos aseguramos que viene un token
        }
        if (auth.indexOf('Bearer') === -1) {
            console.log(' Formato inválido');
        }
        let token = auth.replace('Bearer ', '');
        console.log("Llega el token del cliente", token);
        return token;
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization.js.map