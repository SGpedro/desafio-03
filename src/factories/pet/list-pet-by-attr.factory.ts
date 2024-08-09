import { PrismaOrgRepository } from "@/repositories/org/prisma.org.repository";
import { PrismaPetRepository } from "@/repositories/pet/prisma.pet.repository";
import { ListPetByAttrService } from "@/services/pet/list-pet-by-attr.service";

export function ListPetByAttrFactory(){
    const PetRepository = new PrismaPetRepository();
    const OrgRepository = new PrismaOrgRepository();
    const ListPetByAttrFactory = new ListPetByAttrService(PetRepository, OrgRepository);
    return ListPetByAttrFactory;
}