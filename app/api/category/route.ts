import { createCategory, getAllCategory } from "@/app/db/category";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const category = await getAllCategory();
    const response = responseOK(category, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};

export const POST = async (req: Request) => {
  try {
    const { title } = await req.json();
    if (!title) {
      return responseError(400, resKey.titleRequired);
    }

    const category = await createCategory(title);
    const response = responseOK(category, 201, resKey.success);
    return response;
  } catch (error) {
    console.error("Failed to create category:", error);
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
