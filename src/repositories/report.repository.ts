import prisma from "@/lib/prisma";

export interface AttendanceSummary {
  employeeId: string;
  employeeName: string;
  employeeNik: string;
  department: string;
  position: string;
  totalHadir: number;
  totalSakit: number;
  totalIzin: number;
  totalCuti: number;
  totalAlpha: number;
  attendances: {
    date: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    status: string;
  }[];
}

export const getMonthlyAttendanceReport = async (
  month: number,
  year: number,
): Promise<AttendanceSummary[]> => {
  const startDate = new Date(year, month - 1, 1); // month - 1 bcs js month is start from 0
  const endDate = new Date(year, month, 0); // day 0 = last day of previous month

  const employees = await prisma.employee.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      nik: true,
      position: true,
      department: {
        select: {
          name: true,
        },
      },
      attendances: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          date: true,
          checkIn: true,
          checkOut: true,
          status: true,
        },
        orderBy: {
          date: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // transform to AttendanceSummary format
  return employees.map((employee) => {
    const statusCount = {
      HADIR: 0,
      SAKIT: 0,
      IZIN: 0,
      CUTI: 0,
      ALPHA: 0,
    };

    employee.attendances.forEach((att) => {
      if (att.status in statusCount) {
        statusCount[att.status as keyof typeof statusCount]++;
      }
    });

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      employeeNik: employee.nik,
      department: employee.department.name,
      position: employee.position,
      totalHadir: statusCount.HADIR,
      totalSakit: statusCount.SAKIT,
      totalIzin: statusCount.IZIN,
      totalCuti: statusCount.CUTI,
      totalAlpha: statusCount.ALPHA,
      attendances: employee.attendances,
    };
  });
};
