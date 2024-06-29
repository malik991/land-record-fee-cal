import { z } from "zod";

export const signUpValidation = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  name: z
    .string()
    .min(2, { message: "Required minimum 2 characters" })
    .max(35, { message: "maximum 35 character are allowed" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(25, { message: "no more than 25 chracters" }),
});
