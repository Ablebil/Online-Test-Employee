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
