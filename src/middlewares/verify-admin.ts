import { PermissionInvalidError } from "@/errors/permissionInvalid.error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyAdmin(request: FastifyRequest, reply: FastifyReply){
    try{
        await request.jwtVerify();
        if(request.user?.role !== 'ADMIN'){
            throw new PermissionInvalidError;
        }
    } catch(e){
        return reply.status(401).send({error: 'Unauthorized.'})
    }
}