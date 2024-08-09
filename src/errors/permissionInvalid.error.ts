export class PermissionInvalidError extends Error{
    constructor(){
        super('Permission Invalid to access this service.');
    }
}