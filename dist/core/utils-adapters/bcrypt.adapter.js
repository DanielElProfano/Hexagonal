"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptAdapter = exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptAdapter {
    constructor(salt) {
        this.salt = salt;
        this.salt = salt;
    }
    crypto(password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("password:", password);
            const hash = yield bcrypt_1.default.hash(password, this.salt);
            console.log("bcrypt", hash);
            return hash;
        });
    }
}
exports.BcryptAdapter = BcryptAdapter;
class DecryptAdapter {
    deCrypt(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const decrypted = yield bcrypt_1.default.compare(password, hash);
            return decrypted;
        });
    }
}
exports.DecryptAdapter = DecryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map