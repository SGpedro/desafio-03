import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EmailInvalidError } from "../../errors/emailInvalid.error";
import { PasswordInvalidError } from "../../errors/passwordInvalid.error";
import { LoginFactory } from "../../factories/user/login-org.factory";

export async function Login(request: FastifyRequest, reply: FastifyReply){
    const LoginSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const {email, password} = LoginSchema.parse(request.body);
    try{
        const userService = LoginFactory();
        const { user } = await userService.execute({email, password})

        const token = await reply.jwtSign(
            {
                role: user.role
            }, 
            {
                sign:
                {
                    sub: user.id
                }
            }
        )
        
        return reply.status(201).send({token})

    } catch(error){
        if(error instanceof EmailInvalidError || error instanceof PasswordInvalidError){
            return reply.status(400).send({error: error.message})
        }
    }

    
}