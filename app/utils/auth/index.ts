import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    if (!verified) {
      return undefined;
    } else {
      return verified;
    }
  } catch {
    return undefined;
  }
};

export const verifyAuthFromCookie = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("Authentication")?.value; // Sesuaikan dengan nama cookie Anda

    if (!token) {
      throw new Error("Token is missing");
    }

    const verifiedToken = await verifyAuth(token);

    if (!verifiedToken) {
      throw new Error("Invalid token");
    }

    return verifiedToken;
  } catch (error) {
    console.error("Failed to verify token from cookie:", error);
    throw new Error("Unauthorized");
  }
};

export const userLogin = async () => {
  try {
    const verifiedToken = await verifyAuthFromCookie();
    const userId = parseInt(verifiedToken?.payload.userId as string, 10);

    if (!userId) {
      return { error: "Invalid token", status: 401 };
    }

    return { userId };
  } catch (error) {
    return { error: "Authentication error", status: 500 };
  }
};
