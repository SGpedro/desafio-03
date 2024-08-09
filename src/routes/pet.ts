import { CreatePet } from "@/controllers/pet/create";
import { ListPetByAttribute } from "@/controllers/pet/list_by_attribute";
import { ListPetById } from "@/controllers/pet/list_by_id";
import { ListPetFromACity } from "@/controllers/pet/list_from_city";
import { VerifyAdmin } from "@/middlewares/verify-admin";
import { VerifyJwt } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function PetRoutes(app: FastifyInstance){
    app.post('/pet/create', {onRequest: [VerifyJwt, VerifyAdmin]}, CreatePet)
    app.get('/pet/list_from_city', ListPetFromACity)
    app.get('/pet/list_by_attr', ListPetByAttribute)
    app.get('/pet/:petId', ListPetById)
}