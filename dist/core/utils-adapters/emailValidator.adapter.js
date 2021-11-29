"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidatorAdapter = void 0;
const email_validator_1 = __importDefault(require("email-validator"));
class EmailValidatorAdapter {
    validate(email) {
        const valid = email_validator_1.default.validate(email);
        return valid;
    }
}
exports.EmailValidatorAdapter = EmailValidatorAdapter;
//# sourceMappingURL=emailValidator.adapter.js.map