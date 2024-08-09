import { InvalidAttributeError } from "@/errors/invalidAttribute.error";
import { ListPetByAttrFactory } from "@/factories/pet/list-pet-by-attr.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function ListPetByAttribute(request: FastifyRequest, reply: FastifyReply){
    const SearchPetByAttrSchema = z.object({
        city: z.string(),
        attr: z.string(),
        value: z.string()
    })

    const {city, attr, value } = SearchPetByAttrSchema.parse(request.query)

    try{
        const ListPetByAttrService = ListPetByAttrFactory();
        const pets = await ListPetByAttrService.execute(city, attr, value);

        return reply.status(200).send(pets)
    }catch(error){

        if(error instanceof InvalidAttributeError){
            return reply.status(400).send({message: error.message})
        }

        return reply.status(500).send({message: "Internal server error", error: error.message})
    }
}