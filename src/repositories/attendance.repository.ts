import prisma from "@/lib/prisma";

export const findTodayAttendance = async (employeeId: string, date: Date) => {
  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);

  return await prisma.attendance.findUnique({
    where: {
      date_employeeId: {
        date: dateOnly,
        employeeId,
      },
    },
  });
};

export const createCheckIn = async (employeeId: string, checkInTime: Date) => {
  const dateOnly = new Date(checkInTime);
  dateOnly.setHours(0, 0, 0, 0);

  return await prisma.attendance.create({
    data: {
      employeeId,
      date: dateOnly,
      checkIn: checkInTime,
      status: "HADIR",
    },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          nik: true,
        },
      },
    },
  });
};

export const updateCheckOut = async (
  attendanceId: string,
  checkOutTime: Date,
) => {
  return await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      checkOut: checkOutTime,
    },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          nik: true,
        },
      },
    },
  });
};

export const findAttendanceHistory = async (employeeId: string, limit = 30) => {
  return await prisma.attendance.findMany({
    where: { employeeId },
    orderBy: { date: "desc" },
    take: limit,
    select: {
      id: true,
      date: true,
      checkIn: true,
      checkOut: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
