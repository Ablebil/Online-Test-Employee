import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Format email salah"),
  password: z.string().min(6, "Password minimal sebanyak 6 karakter"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
