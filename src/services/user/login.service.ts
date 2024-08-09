import { EmailInvalidError } from "../../errors/emailInvalid.error";
import { PasswordInvalidError } from "../../errors/passwordInvalid.error";
import { compare } from 'bcryptjs'
import { UserRepository } from "../../repositories/user/user.repository";

interface LoginOrgParams {
    email: string,
    password: string,
}


export class LoginUserService{
    constructor(private readonly userRepository: UserRepository){}

    async execute(params: LoginOrgParams){
        const {email, password} = params;
        const userFound = await this.userRepository.findByEmail(email);
        if(!userFound){
            throw new EmailInvalidError();
        }

        const doesPasswordMatch = await compare(password, userFound.password)   
        if(!doesPasswordMatch){
            throw new PasswordInvalidError();
        }

        return {user: userFound}
    }
}