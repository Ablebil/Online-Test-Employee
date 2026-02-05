import { LayoutDashboard, History, Users, FileBarChart } from "lucide-react";

export const MENUS = {
  ADMIN: [
    { name: "Kelola Pegawai", href: "/employees", icon: Users },
    { name: "Laporan Bulanan", href: "/reports", icon: FileBarChart },
  ],
  PEGAWAI: [
    { name: "Presensi", href: "/dashboard", icon: LayoutDashboard },
    { name: "Riwayat", href: "/attendance/history", icon: History },
  ],
};

// for redirect after login based on role
export const getDefaultRoute = (role: string) => {
  if (role === "ADMIN") return "/employees";
  return "/dashboard";
};
