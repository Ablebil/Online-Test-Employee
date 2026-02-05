import * as ReportService from "@/services/report.service";
import { sendError, sendSuccess } from "@/lib/api-response";
import { AppError } from "@/lib/exception";
import { MonthlyReportQuerySchema } from "@/schemas/report.schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const queryParams = {
      month: searchParams.get("month"),
      year: searchParams.get("year"),
    };

    if (!queryParams.month || !queryParams.year) {
      return sendError("Query params 'month' dan 'year' wajib diisi", 400);
    }

    const validation = MonthlyReportQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return sendError("Validasi gagal", 400, validation.error.format());
    }

    const report = await ReportService.getMonthlyReport(
      validation.data.month,
      validation.data.year,
    );

    return sendSuccess(report, "Berhasil mengambil laporan bulanan");
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Internal Server Error", 500);
  }
}
