import { NextRequest, NextResponse } from "next/server";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    //mendapatan email dan password dari body
    const { email, password } = await req.json();

    // variabel untuk mencari user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // bila tidak ada user atau password yang di masukan salah dengan yang ada di db return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return responseError(401, resKey.denied);
    }

    // Generate JWT token
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // membuat response
    const response = responseOK(
      { firstName: user.firstName, lastName: user.lastName },
      200,
      resKey.success
    );

    // set cookie
    response.cookies.set("Authentication", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 2 * 60 * 60,
    });

    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
