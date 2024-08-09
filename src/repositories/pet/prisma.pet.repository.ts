import { Pet, Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import { PetRepository } from "./pet.repository";

export class PrismaPetRepository implements PetRepository{
    async create(data: Prisma.PetUncheckedCreateInput){
        const petCreated = await prisma.pet.create({data});
        return petCreated;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({where:{
            id
        }});

        return pet;
    }

    async findByIds(ids: string[]) {
        const pets = await prisma.pet.findMany({where:{
            org_id: {
                in: ids
            }
        }});

        return pets;
    }

    async findByIdsAndCity(ids: string[], attr: string, value: any) {
        const pets = await prisma.pet.findMany({where:{
            org_id: {
                in: ids
            },
            [attr]: value
        }});

        return pets;
    }
}