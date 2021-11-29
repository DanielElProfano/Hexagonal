"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const saveUser = (user) => {
    console.log("lsakjhsñalkjh", user);
    const middleware = (req, res) => {
        console.log(user);
        req.user = user;
    };
    return middleware;
};
exports.saveUser = saveUser;
//# sourceMappingURL=saveUser.js.map