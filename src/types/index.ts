export type TodayAttendanceStatus = {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
  attendance: {
    id: string;
    date: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    status: string;
  } | null;
};

export type AuthUser = {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  position: string;
  employmentStatus: string;
  joinDate: Date | null;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  department: {
    id: string;
    name: string;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AttendanceHistory = {
  id: string;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  status: "HADIR" | "SAKIT" | "IZIN" | "CUTI" | "ALPHA";
  createdAt: Date;
  updatedAt: Date;
};

export type AttendanceStatusType = AttendanceHistory["status"];

export type Employee = {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string | null;
  role: "ADMIN" | "PEGAWAI";
  position: string;
  employmentStatus: "TETAP" | "KONTRAK" | "MAGANG";
  joinDate: Date | null;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  department: {
    id: string;
    name: string;
  };
};

export type Department = {
  id: string;
  name: string;
};

export type AttendanceSummary = {
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
};

export type Holiday = {
  date: string;
  localName: string;
  name: string;
};

export type MonthlyReport = {
  month: number;
  year: number;
  totalDays: number;
  totalWorkingDays: number;
  totalWeekends: number;
  totalHolidays: number;
  totalNonWorkingDays: number;
  holidays: Holiday[];
  employees: AttendanceSummary[];
};
