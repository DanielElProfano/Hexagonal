"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSession(user) {
    function middleware(req, res) {
        console.log("user", user);
        req.session.user = user;
        console.log(req.session);
    }
    console.log("mii");
    return middleware;
}
exports.default = createSession;
//# sourceMappingURL=createSession.js.map