import { InvalidAttributeError } from "@/errors/invalidAttribute.error";
import { OrgRepository } from "@/repositories/org/org.repository";
import { PetRepository } from "@/repositories/pet/pet.repository";

export class ListPetByAttrService{

    private validAttr = ["age", "size", "level_of_energy", "level_of_independence", "space_needed"];

    constructor(
        private readonly petRepository: PetRepository,
        private readonly orgRepository: OrgRepository
    ){}

    async execute(city: string, attr: string, value: string){
        let parsedValue;

        const orgFromCity = await this.orgRepository.findByCity(city);
        if(orgFromCity?.length == 0){
            return {listOfPets: []}
        }

        const listOfOrgsId = orgFromCity.map(org =>  org.id);

        if(!this.validAttr.includes(attr)){
            throw new InvalidAttributeError();
        }

        if(attr === 'level_of_energy') parsedValue = parseInt(value);
        else parsedValue = value;

        const pets = await this.petRepository.findByIdsAndCity(listOfOrgsId, attr, parsedValue);
        return {
            listOfPets: pets
        }
    }
}