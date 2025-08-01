import { User } from "@prisma/client";

export type UserDTO = Pick<
  User,
  "id" | "email" | "isActive" | "lastLoginAt" | "registrantionAt"
>;
