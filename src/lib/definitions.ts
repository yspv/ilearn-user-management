import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email().trim(),
  password: z.string().min(1).trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(1).trim(),
});

export type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
