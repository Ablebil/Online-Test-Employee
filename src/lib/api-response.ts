import { NextResponse } from "next/server";

export function sendSuccess<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function sendError<E = unknown>(
  message: string,
  status = 500,
  errors?: E,
) {
  return NextResponse.json({ success: false, message, errors }, { status });
}
