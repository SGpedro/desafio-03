export class PasswordInvalidError extends Error{
    constructor(){
        // to improve security details, we say that email or password is invalid instead of just saying that password os invalid
        super('Invalid credentials');
    }
}