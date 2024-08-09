import { PrismaOrgRepository } from "@/repositories/org/prisma.org.repository";
import { PrismaPetRepository } from "@/repositories/pet/prisma.pet.repository";
import { PrismaUsersRepository } from "@/repositories/user/prisma.user.repository";
import { PetService } from "@/services/pet/create.service";

export function CreatePetFactory(){
    const userRepository = new PrismaUsersRepository();
    const orgRepository = new PrismaOrgRepository();
    const petRepository = new PrismaPetRepository();
    const petService = new PetService(userRepository, orgRepository, petRepository);
    return petService;
}