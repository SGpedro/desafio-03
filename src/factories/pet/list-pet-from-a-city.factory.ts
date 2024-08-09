import { ListPetFromACity } from "@/controllers/pet/list_from_city";
import { PrismaOrgRepository } from "@/repositories/org/prisma.org.repository";
import { PrismaPetRepository } from "@/repositories/pet/prisma.pet.repository";
import { ListPetFromACityService } from "@/services/pet/list-pet-from-a-city.service";

export function ListPetFromACityFactory(){
    const PetRepository = new PrismaPetRepository();
    const OrgRepository = new PrismaOrgRepository();
    const ListPetFromACityFactory = new ListPetFromACityService(PetRepository, OrgRepository);
    return ListPetFromACityFactory;
}