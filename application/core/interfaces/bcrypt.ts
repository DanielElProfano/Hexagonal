export interface BcryptInterface{
    crypto(password: string) : Promise<string>;
   
}
export interface DeCryptInterface{
    deCrypt(password: string, hash: string ) : Promise<Boolean>
}