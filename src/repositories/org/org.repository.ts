import { Org, Prisma } from "@prisma/client";

export interface OrgRepository{
    create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>,
    findById(id: string): Promise<Org | null>,
    findByPhone(phone: string): Promise<Org | null>,
    findByName(name: string): Promise<Org | null>,
    findByCity(city: string): Promise<Org[]>,
}