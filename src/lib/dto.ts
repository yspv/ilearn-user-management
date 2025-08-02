import { User } from "@prisma/client";

export type UserDTO = Pick<
  User,
  "id" | "email" | "isActive" | "lastLoginAt" | "registrantionAt" | "name"
>;

export function userToDTO(user: User | undefined | null): UserDTO | null {
  if (!user) return null;
  const { id, name, email, lastLoginAt, registrantionAt, isActive } = user;
  return {
    id,
    name,
    email,
    lastLoginAt,
    registrantionAt,
    isActive,
  };
}
