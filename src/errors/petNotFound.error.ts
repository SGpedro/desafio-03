export class PetNotFoundError extends Error{
    constructor(){
        super("No pet was found.")
    }
}