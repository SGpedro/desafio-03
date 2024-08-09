import { OrgDoesntExistError } from "@/errors/orgDoesntExist.error";
import { Unauthorized } from "@/errors/unauthorized.error";
import { CreatePetFactory } from "@/factories/pet/create-pet.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreatePet(request: FastifyRequest, reply: FastifyReply){
    const CreatePetSchema = z.object({
        name: z.string(),
        description: z.string(),
        age: z.string(),
        size: z.enum(['small', 'medium', 'large']),
        level_of_energy: z.number(),
        level_of_independence: z.enum(['low', 'medium', 'high']),
        space_needed: z.enum(['small', 'medium', 'large']),
        org_name: z.string()
    });

    const {name, description, age, size, level_of_energy, level_of_independence, space_needed, org_name} = CreatePetSchema.parse(request.body);
    
    try{
    
        const petService = CreatePetFactory();
        const petCreated = await petService.execute({name, description, age, size, level_of_energy, level_of_independence, space_needed}, request.user.sub, org_name);

        return reply.status(200).send({pet: petCreated});
    } catch(error){

        if(error instanceof Unauthorized){
            return reply.status(401).send({message: error.message})
        }

        if(error instanceof OrgDoesntExistError){
            return reply.status(404).send({message: error.message})
        }

        return reply.status(500).send({message: error.message})
    }
}