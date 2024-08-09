import { PrismaUsersRepository } from "../../repositories/user/prisma.user.repository";
import { UserRepository } from "../../repositories/user/user.repository";
import { CreateUserService } from "../../services/user/create.service";

export function CreateUserFactory(){
    const UserRepository = new PrismaUsersRepository()
    const createUserService = new CreateUserService(UserRepository);
    return createUserService;
}