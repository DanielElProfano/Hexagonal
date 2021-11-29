"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
exports.HttpResponse = {
    success: function (statusCode, body) {
        return {
            error: true,
            statusCode,
            body
        };
    },
    error: (statusCode, body) => {
        return {
            error: false,
            statusCode,
            body
        };
    }
};
//# sourceMappingURL=badHttpRequest.js.map