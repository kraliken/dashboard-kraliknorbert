import { z } from "zod/v4";

// Schema for signing users in
export const signInFormSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
});
