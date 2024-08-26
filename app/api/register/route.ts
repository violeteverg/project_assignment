import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { firstName, lastName, email, password } = await req.json();

  // Cek apakah email sudah digunakan
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("Email already in use", { status: 400 });
  }

  // Hash password sebelum menyimpan ke database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat pengguna baru di database
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  // Buat JWT untuk pengguna yang baru terdaftar
  const token = await new SignJWT({ userId: newUser.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  // Set JWT di cookies
  const response = new NextResponse(JSON.stringify({ user: newUser }), {
    status: 201,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 2 * 60 * 60,
  });

  return response;
};
