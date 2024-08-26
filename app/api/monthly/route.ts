import { getMonthData, getYearData } from "@/app/db/chart";
import { userLogin } from "@/app/utils/auth";
import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }
    const expense = await getMonthData(userId);
    const response = responseOK(expense, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { year } = body;
    const { userId, error, status } = await userLogin();

    if (error || typeof userId !== "number") {
      return NextResponse.json(
        { error: error || "Invalid user ID" },
        { status: status || 401 }
      );
    }
    const expense = await getYearData(userId, year);
    const response = responseOK(expense, 200, resKey.success);
    return response;
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "Internal Server Error", errors);
  }
};
