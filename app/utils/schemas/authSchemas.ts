import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type TSignUpschema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
