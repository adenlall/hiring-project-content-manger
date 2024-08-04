import { z } from "zod";
import PasswordCheck from "../password.js";


const loginUser = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
            }).email("Not a valid email"),
        password: z.string({
            required_error: "Password is required",
        }),
    }).superRefine(PasswordCheck),
});



const createUser = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "Name is required",
            }).min(5).max(20),
        bio: z
            .string().min(10).max(100).nullable(),
        email: z
            .string({
                required_error: "Email is required",
            }).email("Not a valid email"),
        password: z.string({
            required_error: "Password is required",
        }),
        confirm: z.string({
            required_error: "Password is required",
        }),
    }).superRefine(PasswordCheck).refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
    }),
});

export {
    createUser,
    loginUser
}
