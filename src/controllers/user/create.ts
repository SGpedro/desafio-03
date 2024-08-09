import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateUserFactory } from "../../factories/user/create-user.factory";
import { EmailAlreadyExistsError } from "../../errors/emailAlreayExists.error";
import { NameAlreadyExistsError } from "../../errors/nameAlreayExists.error";

export async function CreateUsers(request: FastifyRequest, reply: FastifyReply){
    const createUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3),
        name: z.string()
    });

    const {email, password, name} = createUserSchema.parse(request.body);

    try{
        const createUserService = CreateUserFactory();
        const createdUser = await createUserService.execute({email, password, name});
        return reply.send(201);
    }catch(error){
        if(error instanceof EmailAlreadyExistsError || error instanceof NameAlreadyExistsError){
            return reply.status(400).send({error: error.message})
        }

        return reply.status(500).send({error: error.message})
    }
}