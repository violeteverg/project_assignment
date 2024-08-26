import { NextResponse } from "next/server";
import { userLogin, verifyAuthFromCookie } from "@/app/utils/auth";
import { createExpense, findAllExpense } from "@/app/db/expense";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";

export const POST = async (req: Request) => {
  try {
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }

    // Ambil data dari request body
    const { categoryId, amount, description, date } = await req.json();

    // Validasi data input
    if (!categoryId || !amount || !description || !date) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Buat data expense baru
    const expense = await createExpense({
      userId,
      categoryId,
      amount,
      description,
      date: new Date(date),
    });

    const response = responseOK(expense, 201, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};

export const GET = async () => {
  try {
    // conditional check apakah ada user atau tidak
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }

    // mencari semua data expense berdasarkan user yang login
    const expanse = await findAllExpense(userId);

    // return response
    const response = responseOK(expanse, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
