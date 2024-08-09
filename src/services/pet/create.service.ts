import { OrgDoesntExistError } from "@/errors/orgDoesntExist.error";
import { Unauthorized } from "@/errors/unauthorized.error";
import { OrgRepository } from "@/repositories/org/org.repository";
import { PetRepository } from "@/repositories/pet/pet.repository";
import { UserRepository } from "@/repositories/user/user.repository";

interface CreatePetDto {
    name: string, 
    description: string, 
    age: string,
    size: string,
    level_of_energy: number,
    level_of_independence: string,
    space_needed: string
}

export class PetService{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly orgRepository: OrgRepository,
        private readonly petRepository: PetRepository,
    ){}

    async execute(params: CreatePetDto, user_id: string, org_name: string){
        const foundUser = await this.userRepository.findById(user_id);
        if(!foundUser){
            throw new Unauthorized;
        }

        const foundOrg = await this.orgRepository.findByName(org_name);
        if(!foundOrg){
            throw new OrgDoesntExistError;
        }

        const createdPet = await this.petRepository.create({...params, org_id: foundOrg.id})
        console.log(createdPet);

        return {pet: createdPet};
    }
}