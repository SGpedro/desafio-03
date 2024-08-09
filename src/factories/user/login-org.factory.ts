import { PrismaOrgRepository } from "../../repositories/org/prisma.org.repository";
import { PrismaUsersRepository } from "../../repositories/user/prisma.user.repository";
import { LoginUserService } from "../../services/user/login.service";

export function LoginFactory(){
    const UserRepository = new PrismaUsersRepository();
    const UserService = new LoginUserService(UserRepository);
    return UserService;
}