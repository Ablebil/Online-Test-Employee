import * as AttendanceService from "@/services/attendance.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";

export async function GET(req: Request) {
  try {
    const employeeId = req.headers.get("x-user-id");

    const status = await AttendanceService.getTodayStatus(employeeId!);

    return sendSuccess(status, "Berhasil mengambil status absensi hari ini");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
