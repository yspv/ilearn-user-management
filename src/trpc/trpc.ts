import { initTRPC, TRPCError } from "@trpc/server";
import { TRPCContext } from "./context";

const t = initTRPC.context<TRPCContext>().create();
export const router = t.router;
const isAuth = t.middleware((opts) => {
  const { ctx, next } = opts;
  if (!ctx.user || !ctx.user.isActive) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({ ctx });
});
export const privateProcedure = t.procedure.use(isAuth);
