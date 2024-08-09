export class JWtInvalidError extends Error{
    constructor(){
        super('JWT invalid.')
    }
}