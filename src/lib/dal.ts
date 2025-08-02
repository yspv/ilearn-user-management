import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session: any = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  return user;
});

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function checkUserExists(email: string) {
  return !!(await findUserByEmail(email));
}

export async function updateLastLogin(id: number) {
  await prisma.user.update({
    where: { id },
    data: { lastLoginAt: new Date() },
  });
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const password = await bcrypt.hash(input.password, 10);
  const lastLoginAt = new Date();
  return prisma.user.create({
    data: { ...input, isActive: true, password, lastLoginAt },
  });
}
