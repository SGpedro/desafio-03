import { Org, Prisma } from "@prisma/client";
import { OrgRepository } from "./org.repository";
import { prisma } from "../../prisma/prisma";

export class PrismaOrgRepository implements OrgRepository{
    async create(data: Prisma.OrgUncheckedCreateInput){
        const org = await prisma.org.create({data})
        return org;
    }

    async findById(id: string){
        const orgFound = await prisma.org.findUnique({
            where: {
                id,
            }
        });
        return orgFound
    }

    async findByPhone(phone: string){
        const orgFound = await prisma.org.findUnique({
            where: {
                phone,
            }
        });
        return orgFound
    }

    async findByName(name: string){
        const orgFound = await prisma.org.findFirst({
            where: {
                name,
            }
        });
        return orgFound
    }

    async findByCity(city: string) {
        const orgsFound = await prisma.org.findMany({
            where:{
                city
            }
        });

        return orgsFound;
    }
}