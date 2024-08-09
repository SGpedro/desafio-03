import { OrgDoesntExistError } from "@/errors/orgDoesntExist.error";
import { PetNotFoundError } from "@/errors/petNotFound.error";
import { ListPetByIdFactory } from "@/factories/pet/list-pet-by-id.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function ListPetById(request: FastifyRequest, reply: FastifyReply){
    const ListPetByIdSchema = z.object({
        petId: z.string().uuid()
    })

    const {petId} = ListPetByIdSchema.parse(request.params);

    try{
        
        const ListPetByIdService = ListPetByIdFactory()
        const pet = await ListPetByIdService.execute(petId)

        return reply.status(200).send(pet)
    }catch(error){

        if(error instanceof OrgDoesntExistError || error instanceof PetNotFoundError){
            return reply.status(404).send({message: error.message})
        }

        return reply.status(500).send({message: error.message})
    }
}