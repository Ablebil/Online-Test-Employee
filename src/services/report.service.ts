import { AppError } from "@/lib/exception";
import * as ReportRepo from "@/repositories/report.repository";
import { getHolidays, Holiday } from "@/lib/dayoff-api";

interface MonthlyReportData {
  month: number;
  year: number;
  totalWorkingDays: number;
  totalHolidays: number;
  holidays: Holiday[];
  employees: ReportRepo.AttendanceSummary[];
}

export const getMonthlyReport = async (
  month: number,
  year: number,
): Promise<MonthlyReportData> => {
  if (month < 1 || month > 12) {
    throw new AppError("Month harus antara 1-12", 400);
  }

  const currentYear = new Date().getFullYear();
  if (year < 2000 || year > currentYear + 1) {
    throw new AppError(`Year harus antara 2000-${currentYear + 1}`, 400);
  }

  // fetch data paralelly
  const [attendanceSummary, holidays] = await Promise.all([
    ReportRepo.getMonthlyAttendanceReport(month, year),
    getHolidays(month, year),
  ]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const totalHolidays = holidays.length;

  let saturdays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getDay() === 6) {
      saturdays++;
    }
  }

  let sundays = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getDay() === 0) {
      sundays++;
    }
  }

  const totalWorkingDays = daysInMonth - totalHolidays - saturdays - sundays;

  return {
    month,
    year,
    totalWorkingDays,
    totalHolidays,
    holidays,
    employees: attendanceSummary,
  };
};
