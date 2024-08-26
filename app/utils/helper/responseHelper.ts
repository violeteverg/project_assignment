import { NextResponse } from "next/server";
import { HttpStatusCodes, HttpMetaMessage } from "../types/server";

export const resKey = {
  signIn: "signIn",
  denied: "denied",
  expired: "expired",
  notFound: "notFound",
  userNotFound: "userNotFound",
  invalidPass: "invalidPass",
  notExist: "notExist",
  page: "page",
  email: "email",
  success: "success",
  found: "found",
  titleRequired: "Title Required",
  logout: "logout",
  operation: "operation",
};

export const api = {
  login: "/api/login",
  register: "/api/register",
  expense: "api/expense",
  logout: "api/logout",
  month: "api/monthly",
};

export const httpMetaMessages: Record<
  HttpStatusCodes,
  HttpMetaMessage | string
> = {
  401: {
    signIn: "Please sign in to access this page.",
    denied: "Access denied. Please log in with the appropriate account.",
    expired: "Your session has expired. Please log in again to continue.",
  },
  404: {
    notFound: "The requested data was not found.",
    userNotFound: "User not found.",
    invalidPass: "Your password is invalid.",
    notExist: "The requested data does not exist in our system.",
    page: "Sorry, the page you are looking for could not be found.",
  },
  409: {
    email: "Email is already registered!",
  },
  200: {
    success: "Request successfully processed.",
    found: "Data successfully found and sent.",
    operation: "Operation has been successfully completed.",
    update: "Successfully updated data.",
  },
  201: "Request successful. Data has been successfully created.",
  400: "Invalid request. Please check the data you provided.",
  500: "An internal server error occurred. Please try again later.",
  403: "You are not allowed to access this resource. Please contact the administrator to obtain the necessary access.",
};

// Helper untuk membuat struktur JSON standar untuk respon sukses
export const ResponseJSON = (data: any, code: number, msg: string) => {
  return {
    meta: {
      code,
      message: msg,
    },
    data: data ?? [],
  };
};

// Helper untuk membuat struktur JSON standar untuk respon error
export const ResponseErrorJSON = (errors: any, code: number, msg: string) => {
  return {
    meta: {
      code: code ?? 500,
      message: msg ?? httpMetaMessages[500],
    },
    errors: errors ?? [],
  };
};

// Helper untuk mendapatkan pesan meta HTTP berdasarkan kode status
export const getHttpMetaMessage = (
  code: HttpStatusCodes,
  key?: string
): string => {
  const message = httpMetaMessages[code];
  if (typeof message === "string") {
    return message;
  } else if (key && message[key]) {
    return message[key];
  } else {
    return "Unknown status code or message key";
  }
};

// Helper untuk mengirim respon sukses dengan kode status dan pesan yang sesuai
export const responseOK = (data: any, code: HttpStatusCodes, key?: string) => {
  const message = getHttpMetaMessage(code, key);
  return NextResponse.json(ResponseJSON(data, code, message), { status: code });
};

// Helper untuk mengirim respon error dengan kode status dan pesan yang sesuai
export const responseError = (
  code: HttpStatusCodes,
  key?: string,
  field?: string
) => {
  const message = getHttpMetaMessage(code, key);
  return NextResponse.json(
    ResponseErrorJSON(
      field ? { [field]: message } : { server: message },
      code,
      message
    ),
    { status: code }
  );
};

// Helper untuk menangkap error dari respon API atau server
export const catchErrors = (error: any) => {
  return error?.response?.data?.errors;
};
