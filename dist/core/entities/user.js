"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, password, name, apellidos, id) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.apellidos = apellidos;
        this.id = id;
    }
    createUser(email, password) {
        console.log("create User email");
    }
    loginUser(email, password) {
        console.log("login user");
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map