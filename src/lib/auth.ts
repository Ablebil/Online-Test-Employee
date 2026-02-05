import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { Role } from "@/app/generated/prisma/enums";

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  role: Role;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJWT(payload: AccessTokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);
}

export async function verifyJWT(
  token: string,
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AccessTokenPayload;
  } catch {
    return null;
  }
}
