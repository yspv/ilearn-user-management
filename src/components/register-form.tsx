"use client";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useActionState } from "react";
import { signup } from "@/app/(auth)/actions";

export function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action} className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sigup to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="name" required />
        </div>
        {state?.errors.name && <p>{state.errors.name}</p>}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        {state?.errors.email && <p>{state.errors.email}</p>}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        {state?.errors.password && <p>{state.errors.password}</p>}
        <Button type="submit" disabled={pending} className="w-full">
          Sigup
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
