import z from "zod";
import { privateProcedure, router } from "../../trpc";
import prisma from "@/lib/prisma";
import { UserDTO, userToDTO } from "@/lib/dto";

export const userRouter = router({
  me: privateProcedure.query<UserDTO | null | undefined>(({ ctx }) =>
    userToDTO(ctx.user)
  ),
  findAll: privateProcedure.query(async () => {
    const users = await prisma.user.findMany({
      orderBy: { lastLoginAt: "desc" },
    });
    return users.map(userToDTO);
  }),
  block: privateProcedure.input(z.number().array()).mutation(async (opts) => {
    const { input } = opts;
    await prisma.user.updateMany({
      where: { id: { in: input } },
      data: { isActive: false },
    });
  }),
  unblock: privateProcedure.input(z.number().array()).mutation(async (opts) => {
    const { input } = opts;
    await prisma.user.updateMany({
      where: { id: { in: input } },
      data: {
        isActive: true,
      },
    });
  }),
  delete: privateProcedure.input(z.number().array()).mutation(async (opts) => {
    const { input } = opts;
    await prisma.user.deleteMany({ where: { id: { in: input } } });
  }),
});
