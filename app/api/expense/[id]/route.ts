import { NextResponse } from "next/server";
import {
  deleteExpense,
  findByIdExpense,
  updateExpense,
} from "@/app/db/expense";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { userLogin } from "@/app/utils/auth";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // memdapatkan id dari param
    const id = parseInt(params.id, 10);

    // conditional check apakah ada user atau tidak
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }
    // mencari expense berdasarkan id pada db
    const expense = await findByIdExpense(id);

    //return hasil response
    const response = responseOK(expense, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // memdapatkan id dari param
    const id = parseInt(params.id, 10);

    // conditional check apakah ada user atau tidak
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }

    // mencari expense berdasarkan id pada db return error juga bila tidak ada data dari id yang di masukan
    const existingExpense = await findByIdExpense(id);

    if (!existingExpense) {
      return NextResponse.json(
        { error: `Expense with ID ${id} not found` },
        { status: 404 }
      );
    }

    // data yang mau di ubah dari body
    const data = await req.json();
    // update data expense
    const updateExpenses = await updateExpense(id, data);
    // return response
    const response = responseOK(updateExpenses, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // memdapatkan id dari param
    const id = parseInt(params.id, 10);

    // conditional check apakah ada user atau tidak
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }

    // mencari expense berdasarkan id pada db return error juga bila tidak ada data dari id yang di masukan
    const existingExpense = await findByIdExpense(id);

    if (!existingExpense) {
      return NextResponse.json(
        { error: `Expense with ID ${id} not found` },
        { status: 404 }
      );
    }

    // menghapus data expense
    const removeExpense = await deleteExpense(id);

    //return response
    const response = responseOK(removeExpense, 200, resKey.success);
    return response;
  } catch (error) {
    console.error("Error in DELETE:", error);
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
