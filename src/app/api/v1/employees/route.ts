import * as EmployeeService from "@/services/employee.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";
import { CreateEmployeeSchema } from "@/schemas/employee.schema";

export async function GET() {
  try {
    const employees = await EmployeeService.getEmployee();
    return sendSuccess(employees, "Berhasil mengambil data seluruh pegawai");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = CreateEmployeeSchema.safeParse(body);
    if (!validation.success) {
      return sendError("Validasi gagal", 400, validation.error.format());
    }

    const employee = await EmployeeService.createEmployee(validation.data);
    return sendSuccess(employee, "Berhasil menambahkan pegawai", 201);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
