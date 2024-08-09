import { ListPetFromACityFactory } from "@/factories/pet/list-pet-from-a-city.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function ListPetFromACity(request: FastifyRequest, reply: FastifyReply){
    const ListPetFromACitySchema = z.object({
        city: z.string()
    });

    const { city } = ListPetFromACitySchema.parse(request.query);

    try{
        const ListPetFromACityService = ListPetFromACityFactory();
        const listOfPets = await ListPetFromACityService.execute(city);

        return reply.status(200).send(listOfPets);
    } catch(error){
        return reply.status(500).send({message: error.message})
    }
}