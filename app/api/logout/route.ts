import {
  catchErrors,
  resKey,
  responseError,
  responseOK,
} from "@/app/utils/helper/responseHelper";
import { cookies } from "next/headers";

export const GET = () => {
  try {
    cookies().delete("Authentication");
    return responseOK([], 200, resKey.operation);
  } catch (error) {
    const errors = catchErrors(error);
    return responseError(500, "internal server error", errors);
  }
};
