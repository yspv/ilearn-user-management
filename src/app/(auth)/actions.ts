"use server";
import bcrypt from "bcrypt";
import {
  FormState,
  SignupFormSchema,
  SigninFormSchema,
} from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import z from "zod";
import {
  checkUserExists,
  createUser,
  findUserByEmail,
  updateLastLogin,
} from "@/lib/dal";

async function isValidPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

async function canUserLogin(user: User, password: string) {
  if (user.isActive && (await isValidPassword(password, user.password))) {
    return true;
  }
  return false;
}

function validateFormData<T extends z.ZodTypeAny>(schema: T, data: FormData) {
  const object = Object.fromEntries(data.entries());
  const fields = schema.safeParse(object);
  if (!fields.success) {
    return { success: false, errors: fields.error.flatten().fieldErrors };
  }
  return { success: true, data: fields.data };
}

async function verifyUserCredentials(user: any, password: string) {
  if (!user || !(await canUserLogin(user, password))) {
    return {
      success: false,
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
  return { success: true };
}

export async function signin(state: FormState, formData: FormData) {
  const fields = validateFormData(SigninFormSchema, formData);
  if (!fields.success) {
    return {
      errors: fields.errors,
    };
  }
  const { email, password } = fields.data!;
  const user = await findUserByEmail(email);
  const verifyResult = await verifyUserCredentials(user, password);
  if (!verifyResult.success) {
    return {
      errors: verifyResult.errors,
    };
  }
  await updateLastLogin(user!.id);
  await createSession(user!.id);
  redirect("/dashboard");
}

export async function signup(state: FormState, formData: FormData) {
  const fields = validateFormData(SignupFormSchema, formData);
  if (!fields.success) {
    return {
      errors: fields.errors,
    };
  }
  const { email } = fields.data!;
  const isUserExists = await checkUserExists(email);
  if (isUserExists) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
    };
  }
  const user = await createUser(fields.data!);
  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
