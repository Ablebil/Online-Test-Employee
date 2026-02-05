import { AppError } from "@/lib/exception";
import * as ReportRepo from "@/repositories/report.repository";
import { getHolidays, Holiday } from "@/lib/dayoff-api";

interface MonthlyReportData {
  month: number;
  year: number;
  totalDays: number;
  totalWorkingDays: number;
  totalWeekends: number;
  totalHolidays: number;
  totalNonWorkingDays: number;
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

  // for easier holiday date lookup
  const holidayDates = new Set(
    holidays.map((h) => {
      const date = new Date(h.date);
      return date.toISOString().split("T")[0];
    }),
  );

  const nonWorkingDates = new Set<string>(); // avoid double counting
  let workingDays = 0;
  let weekendDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidayDates.has(dateString);

    if (isWeekend || isHoliday) {
      nonWorkingDates.add(dateString);
      if (isWeekend) {
        weekendDays++;
      }
    } else {
      workingDays++;
    }
  }

  return {
    month,
    year,
    totalDays: daysInMonth,
    totalWorkingDays: workingDays,
    totalWeekends: weekendDays,
    totalHolidays: holidays.length,
    totalNonWorkingDays: nonWorkingDates.size,
    holidays,
    employees: attendanceSummary,
  };
};
