"use client";
import { logout } from "@/app/(auth)/actions";
import { trpc } from "@/trpc/client";
import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/unstable-core-do-not-import";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  user: any;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const { data: user, isLoading, error } = trpc.user.me.useQuery();
  React.useEffect(() => {
    if (error?.shape?.code === TRPC_ERROR_CODES_BY_KEY.UNAUTHORIZED) {
      logout();
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvide");
  return context;
}
