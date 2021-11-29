import bcrypt from 'bcrypt';
import { BcryptInterface, DeCryptInterface} from '../interfaces/bcrypt';
    

export class BcryptAdapter implements BcryptInterface{
    constructor(private readonly salt: number){
        this.salt = salt
    }
    async crypto(password: string) : Promise<string> {
        console.log("password:", password)
        const hash = await bcrypt.hash(password, this.salt);
        console.log("bcrypt", hash);
        return hash
    }
}

export class DecryptAdapter implements DeCryptInterface{
    async deCrypt(password: string, hash: string) : Promise<Boolean>{
        const decrypted : boolean = await bcrypt.compare(password,hash );
        return decrypted
    }
}