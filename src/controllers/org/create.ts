import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateOrgFactory } from "../../factories/org/create-org.factory";
import { EmailAlreadyExistsError } from "../../errors/emailAlreayExists.error";
import { PhoneAlreadyExistsError } from "../../errors/phoneAlreayExists.error";
import { Unauthorized } from "@/errors/unauthorized.error";

export async function CreateOrg(request: FastifyRequest, reply: FastifyReply){
    const createOrgSchema = z.object({
        name: z.string(),
        postal_code: z.string(),
        city: z.string(),
        address: z.string(),
        phone: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    });

    const {name, postal_code, city, address, phone, latitude, longitude} = createOrgSchema.parse(request.body);

    try{
        const OrgService = CreateOrgFactory();
        const orgCreated = await OrgService.execute({name, postal_code, city, address, phone, latitude, longitude}, request.user.sub);
        return reply.status(200).send({org: orgCreated})
    } catch(error){

        if(error instanceof EmailAlreadyExistsError || error instanceof PhoneAlreadyExistsError){
            return reply.status(400).send({message: error.message})
        }

        if(error instanceof Unauthorized){
            return reply.status(401).send({message: error.message})
        }

        return reply.status(500).send({error: error.message})
    }
}