export class NameAlreadyExistsError extends Error{
    constructor(){
        super("The name provided already exists.")
    }
}