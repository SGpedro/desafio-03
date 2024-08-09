import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyJwt(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify();
    } catch(e){
        return reply.status(401).send({error: 'Unauthorized.'})
    }
}