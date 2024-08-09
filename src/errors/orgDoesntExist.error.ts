export class OrgDoesntExistError extends Error{
    constructor(){
        super("The org provided doesn't exists")
    }
}