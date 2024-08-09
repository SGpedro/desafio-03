export class PhoneAlreadyExistsError extends Error{
    constructor(){
        super("The phone provided already exists.")
    }
}