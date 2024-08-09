import { OrgRepository } from "@/repositories/org/org.repository";
import { PetRepository } from "@/repositories/pet/pet.repository";

export class ListPetFromACityService{
    constructor(
        private readonly petRepository: PetRepository,
        private readonly orgRepository: OrgRepository
    ){}

    async execute(city: string){
        const orgFromCity = await this.orgRepository.findByCity(city);
        if(orgFromCity?.length == 0){
            return {listOfPets: []}
        }

        const listOfOrgsId = orgFromCity.map(org =>  org.id);
        const pets = await this.petRepository.findByIds(listOfOrgsId);
        return {
            listOfPets: pets
        }
    }
}