import { NextRequest } from "next/server";
import * as AttendanceService from "@/services/attendance.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";

export async function POST(req: NextRequest) {
  try {
    const employeeId = req.headers.get("x-user-id");

    const attendance = await AttendanceService.checkIn(employeeId!);

    return sendSuccess(attendance, "Check-in berhasil", 201);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
