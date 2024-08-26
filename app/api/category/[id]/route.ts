import { removeCategory } from "@/app/db/category";
import { findByIdExpense } from "@/app/db/expense";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = parseInt(params.id, 10);

    // Panggil fungsi removeCategory
    const removedCategory = await removeCategory(id);
    return responseOK(removedCategory, 200, resKey.success);
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
