import jwt from  'jsonwebtoken';
import { jwtInterface } from '../interfaces/jwt-token';

export class JwtAdapter implements jwtInterface{
  
    constructor(private readonly secret){
        this.secret = secret;
    }
    
    async token (value: object): Promise<string> {
      const token = await jwt.sign({
        value: value
      }, this.secret)
      return token
    }

    verifyToken (token: string): any{
      return jwt.verify(token, this.secret, (err, decoded) => {
        if(err){
          
          return false
        }
        return decoded;
      })
    }
}