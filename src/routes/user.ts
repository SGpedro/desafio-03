import { FastifyInstance } from "fastify";
import { CreateUsers } from "../controllers/user/create";
import { Login } from "../controllers/user/login";

export async function UsersRoutes(app: FastifyInstance){
    app.post('/user/create', CreateUsers);
    app.post('/user/login', Login);
}