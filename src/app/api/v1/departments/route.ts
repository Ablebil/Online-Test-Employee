import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";
import * as DepartmentService from "@/services/department.service";

export async function GET() {
  try {
    const departments = await DepartmentService.getAllDepartments();
    return sendSuccess(departments, "Berhasil mengambil data departemen");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
