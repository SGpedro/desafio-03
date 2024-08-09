export class EmailAlreadyExistsError extends Error{
    constructor(){
        super("The e-mail provided already exists.")
    }
}