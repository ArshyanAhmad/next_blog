import z from "zod";

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 3 character")
    .max(20, "Username must be no more than 20 characters")

export const signupInput = z.object({
    username: usernameValidation,
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" })
})

export const signinInput = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" })
})


export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>