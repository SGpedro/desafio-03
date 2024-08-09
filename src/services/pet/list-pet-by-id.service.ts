import { OrgDoesntExistError } from "@/errors/orgDoesntExist.error";
import { PetNotFoundError } from "@/errors/petNotFound.error";
import { OrgRepository } from "@/repositories/org/org.repository";
import { PetRepository } from "@/repositories/pet/pet.repository";
import { Org, Pet } from "@prisma/client";

export class ListPetByIdService{

    constructor(
        private readonly petRepository: PetRepository,
        private readonly orgRepository: OrgRepository,
    ){}

    async execute(id: string){
        
        const pet = await this.petRepository.findById(id);

        if(!pet){
            throw new PetNotFoundError()
        }

        const org = await this.orgRepository.findById(pet.org_id)

        if(!org){
            throw new OrgDoesntExistError()
        }

        return {
            pet: this.cleanPetResponse(pet),
            org: this.cleanOrgResponse(org)
        }
    }

    private cleanPetResponse(pet: Pet){
        const cleanedResponse = {
            name: pet.name,
            description: pet.description,
            age: pet.age,
            size: pet.size,
            level_of_energy: pet.level_of_energy,
            level_of_independence: pet.level_of_independence,
            space_needed: pet.space_needed
        }

        return cleanedResponse;
    }

    private cleanOrgResponse(org: Org){
        const cleanedResponse = {
            name: org.name,
            addres: {
                postal_code: org.postal_code,
                city: org.city,
                address: org.address,
                latitude: org.latitude,
                longitude: org.longitude
            },
            contact: {
                phone: org.phone,
            }
        }

        return cleanedResponse;
    }
}