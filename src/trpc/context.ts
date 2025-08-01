import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext(opts: CreateNextContextOptions) {
  let user;
  const cookie = opts.req.cookies["session"];
  const session = await decrypt(cookie);
  if (!!session?.userId) {
    user = await prisma.user.findUnique({
      where: { id: session.userId as number },
    });
  }
  return {
    user,
  };
}

export type TRPCContext = typeof createContext;
