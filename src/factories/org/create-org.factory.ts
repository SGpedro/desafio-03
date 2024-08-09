import { PrismaOrgRepository } from "../../repositories/org/prisma.org.repository";
import { PrismaUsersRepository } from "../../repositories/user/prisma.user.repository";
import { CreateOrgService } from "../../services/org/create.service";

export function CreateOrgFactory(){
    const OrgRepository = new PrismaOrgRepository();
    const UserRepository = new PrismaUsersRepository();
    const orgService = new CreateOrgService(OrgRepository, UserRepository);
    return orgService;
}