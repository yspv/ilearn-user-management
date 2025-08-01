"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  FormState,
  SignupFormSchema,
  SigninFormSchema,
} from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function isValidPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}

export async function signin(state: FormState, formData: FormData) {
  const fields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = fields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  if (!(await isValidPassword(password, user.password))) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await createSession(user.id);
  redirect("/");
}

export async function signup(state: FormState, formData: FormData) {
  const fields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = fields.data;

  const isUserExists = !!(await prisma.user.findUnique({ where: { email } }));

  if (isUserExists) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      lastLoginAt: new Date(),
      isActive: true,
    },
  });

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
