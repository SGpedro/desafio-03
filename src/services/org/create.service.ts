import { OrgRepository } from "../../repositories/org/org.repository";
import { hash } from 'bcryptjs'
import { UserRepository } from "../../repositories/user/user.repository";
import { Unauthorized } from "@/errors/unauthorized.error";
import { PhoneAlreadyExistsError } from "@/errors/phoneAlreayExists.error";

interface CreateOrgParams {
    name: string,
    postal_code: string,
    city: string,
    address: string,
    phone: string,
    latitude: number,
    longitude: number,
}


export class CreateOrgService{
    constructor(
        private readonly orgRepository: OrgRepository,
        private readonly userRepository: UserRepository
    ){}

    async execute(params: CreateOrgParams, user_id: string){

        const foundUser = await this.userRepository.findById(user_id);
        if(!foundUser){
            throw new Unauthorized;
        }

        const duplicatedOrgPhone = await this.orgRepository.findByPhone(params.phone);
        if(duplicatedOrgPhone){
            throw new PhoneAlreadyExistsError
        }

        const email = foundUser.email;

        const org = await this.orgRepository.create({...params, user_email: email});

        await this.userRepository.updateRoleByEmail(email)

        return {org}
    }
}