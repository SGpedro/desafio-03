import fastify from "fastify";
import { ZodError } from "zod";
import { OrgRoutes } from "./routes/org";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { UsersRoutes } from "./routes/user";
import { PetRoutes } from "./routes/pet";

export const app = fastify();

app.register(fastifyJwt, 
    {
        secret: env.JWT_SECRET,
        cookie:{
            cookieName: 'refreshToken',
            signed: false
        },
        sign: {
            expiresIn: '10m'
        }
    }
)

app.register(OrgRoutes);
app.register(PetRoutes);
app.register(UsersRoutes);

app.setErrorHandler((error, _, reply ) => {
    console.log(error);
    if(error instanceof ZodError){
        console.log("Zod error thrown");
        return reply.status(500).send({error: 'Validation error', message: error})
    }

    console.log("Error: ", {error: error.message, stack: error.stack});
    return reply.status(500).send({error: "Internal server error", message: error})
})