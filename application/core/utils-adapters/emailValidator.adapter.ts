import emailValidator from 'email-validator';
import { EmailValidatorInterface } from '../interfaces/emailValidator';

export class EmailValidatorAdapter implements EmailValidatorInterface{
    validate(email: string) : Boolean {
        const valid = emailValidator.validate(email);
        return valid;
    }
}
