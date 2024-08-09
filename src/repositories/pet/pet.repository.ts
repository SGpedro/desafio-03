import { Pet, Prisma } from "@prisma/client";

export interface PetRepository{
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findByIds(ids : string[]): Promise<Pet[]>
    findByIdsAndCity(ids: string[], attr: string, value: any): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
}