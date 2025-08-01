import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "./definitions";

const JWS_ALG = "HS256";
const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWS_ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodeKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return;
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: [JWS_ALG],
    });
    return payload;
  } catch (error) {
    console.error(error);
    console.log("Failed to verify session");
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);
  return payload;
}

export async function createSession(userId: number) {
  const now = Date.now();
  const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);
  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
