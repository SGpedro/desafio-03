import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../../errors/emailAlreayExists.error";
import { NameAlreadyExistsError } from "../../errors/nameAlreayExists.error";
import { UserRepository } from "../../repositories/user/user.repository";

interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute({name, email, password}: CreateUserDto){
        const emailAlreadyExists = await this.userRepository.findByEmail(email);
        if(emailAlreadyExists){
            throw new EmailAlreadyExistsError()
        }

        const nameAlreadyExists = await this.userRepository.findByName(name);
        if(nameAlreadyExists){
            throw new NameAlreadyExistsError()
        }

        const passwordHashed = await hash(password, 6);
        const createdUser = await this.userRepository.create({name, email, password: passwordHashed})
    
        return {user: createdUser}
    }
}