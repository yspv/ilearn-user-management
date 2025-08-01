import { getSession } from "./session";

export async function isAuthenticated() {
  const session = await getSession();
  if (!session || !session.userId) return false;
  return true;
}
