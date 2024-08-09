export class EmailInvalidError extends Error{
    constructor(){
        super('Invalid credentials.')
    }
}