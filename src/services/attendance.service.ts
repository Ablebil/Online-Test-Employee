import { AppError } from "@/lib/exception";
import * as AttendanceRepo from "@/repositories/attendance.repository";

export const getTodayStatus = async (employeeId: string) => {
  const today = new Date();
  const attendance = await AttendanceRepo.findTodayAttendance(
    employeeId,
    today,
  );

  if (!attendance) {
    return {
      hasCheckedIn: false,
      hasCheckedOut: false,
      attendance: null,
    };
  }

  return {
    hasCheckedIn: !!attendance.checkIn,
    hasCheckedOut: !!attendance.checkOut,
    attendance,
  };
};

export const checkIn = async (employeeId: string) => {
  const today = new Date();

  const existingAttendance = await AttendanceRepo.findTodayAttendance(
    employeeId,
    today,
  );
  if (existingAttendance) {
    throw new AppError("Anda sudah melakukan check-in hari ini", 400);
  }

  const attendance = await AttendanceRepo.createCheckIn(employeeId, today);
  return attendance;
};

export const checkOut = async (employeeId: string) => {
  const today = new Date();

  const existingAttendance = await AttendanceRepo.findTodayAttendance(
    employeeId,
    today,
  );
  if (!existingAttendance) {
    throw new AppError(
      "Anda belum melakukan check-in hari ini. Silakan check-in terlebih dahulu",
      400,
    );
  }

  if (existingAttendance.checkOut) {
    throw new AppError("Anda sudah melakukan check-out hari ini", 400);
  }

  const attendance = await AttendanceRepo.updateCheckOut(
    existingAttendance.id,
    today,
  );

  return attendance;
};

export const getAttendanceHistory = async (employeeId: string) => {
  const history = await AttendanceRepo.findAttendanceHistory(employeeId);
  return history;
};
