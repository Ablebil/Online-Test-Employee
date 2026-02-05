import * as EmployeeService from "@/services/employee.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";
import { UpdateEmployeeSchema } from "@/schemas/employee.schema";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const employee = await EmployeeService.getEmployeeDetail(id);

    return sendSuccess(employee, "Berhasil mengambil data pegawai");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const mappedBody = {
      ...body,
      ...(body.employment_status && {
        employmentStatus: body.employment_status,
      }),
      ...(body.department_id && { departmentId: body.department_id }),
      ...(body.join_date && { joinDate: body.join_date }),
    };

    const validation = UpdateEmployeeSchema.safeParse(mappedBody);
    if (!validation.success) {
      return sendError("Validasi gagal", 400, validation.error.format());
    }

    const updatedEmployee = await EmployeeService.updateEmployee(
      id,
      validation.data,
    );

    return sendSuccess(updatedEmployee, "Data pegawai berhasil diperbarui");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    await EmployeeService.deleteEmployee(id);

    return sendSuccess(null, "Pegawai berhasil dihapus");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
