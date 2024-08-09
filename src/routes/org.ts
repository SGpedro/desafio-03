import { FastifyInstance } from "fastify";
import { CreateOrg } from "../controllers/org/create";
import { VerifyJwt } from "../middlewares/verify-jwt";

export async function OrgRoutes(app: FastifyInstance){
        app.post('/org/create', {onRequest: [VerifyJwt]}, CreateOrg)
}