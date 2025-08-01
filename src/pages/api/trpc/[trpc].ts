import { appRouter } from "@/trpc";
import { createContext } from "@/trpc/context";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
});
