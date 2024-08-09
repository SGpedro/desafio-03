import { z } from "zod";
import 'dotenv/config'

const envSchema = z.object({
    NODE_ENV: z.string().default('dev'),
    PORT: z.coerce.number().default(2424),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string()
});

const myEnv = envSchema.safeParse(process.env);

if(!myEnv.success){
    console.log('Error on parsing .env values', myEnv.error);
    throw new Error('Invalid environment variables format')
}

export const env = myEnv.data;
