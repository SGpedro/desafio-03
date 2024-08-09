import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import { UserRepository } from "./user.repository";

export class PrismaUsersRepository implements UserRepository{
    async findById(id: string) {
        const user = await prisma.user.findFirst({where:{id}})
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({where:{email}})
        return user;
    }

    async findByName(name: string) {
        const user = await prisma.user.findFirst({where:{name}})
        return user;
    }

    async create(data: Prisma.UserCreateInput){
        const userCreated = await prisma.user.create({data});
        return userCreated;
    }

    async updateRoleByEmail(email: string){
        const userUpdated = await prisma.user.update({where: {email}, data: {role: 'ADMIN'}});
        return userUpdated;
    }
}