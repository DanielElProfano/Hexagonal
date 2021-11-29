export interface userInterface {
    email : string,
    password : string,
    name? : string,
    apellidos?: string,
    id? : string
}

export class User implements userInterface{
    email;
    password;
    name?
    apellidos?
    id?
    constructor (email, password, name?, apellidos?, id?)
    {
        this.email = email;
        this.password = password;
        this.name = name;
        this.apellidos = apellidos;
        this.id = id
    }
    createUser(email, password){
        console.log("create User email")
    }
    loginUser(email, password){
        console.log("login user");
    }

}