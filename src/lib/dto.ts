import { User } from "@/generated/prisma";

export type UserDTO = Pick<
  User,
  "id" | "email" | "isActive" | "lastLoginAt" | "registrantionAt"
>;
