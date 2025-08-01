import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

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
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: session.userId },
    });
    return user;
  } catch (err) {
    console.error(err);
    console.log("fail when fetching user");
    return null;
  }
});
