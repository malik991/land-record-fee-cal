import { z } from "zod";
export const signInValidation = z.object({
  identifier: z.string().email({ message: "Email is mendatory!" }), // either email or username
  password: z
    .string()
    .min(6, { message: "Minimum 6 chracters are required" })
    .max(25, { message: "no more than 25 chracters" }),
});
