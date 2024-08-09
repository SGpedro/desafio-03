import { PrismaOrgRepository } from "@/repositories/org/prisma.org.repository";
import { PrismaPetRepository } from "@/repositories/pet/prisma.pet.repository";
import { ListPetByIdService } from "@/services/pet/list-pet-by-id.service";

export function ListPetByIdFactory(){
    const PetRepository = new PrismaPetRepository();
    const OrgRepository = new PrismaOrgRepository()
    const ListPetByIdFactory = new ListPetByIdService(PetRepository, OrgRepository);
    return ListPetByIdFactory;
}