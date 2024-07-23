import { z } from "zod";

//docs are at https://github.com/colinhacks/zod

//This "schema" object will be used to validate that incoming album objects meet certain criteria.
export const albumSchema = z
    .object({
        artist: z.string().min(1).max(30),
        title: z
            .string()
            .min(1)
            .max(255)
            .regex(/^[a-zA-Z \-.,"']+$/),
        year: z.number().int().min(1800),
    })
    .strict();
