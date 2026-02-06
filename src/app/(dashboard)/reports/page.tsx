"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reportClient } from "@/lib/api/report";
import { Loader2, AlertCircle } from "lucide-react";
import { MonthYearSelector } from "@/components/reports/MonthYearSelector";
import { ReportSummaryCard } from "@/components/reports/ReportSummaryCard";
import type { MonthlyReport, ApiResponse } from "@/types";

export default function ReportsPage() {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const { data: reportResponse, isLoading } = useQuery<
    ApiResponse<MonthlyReport>
  >({
    queryKey: ["monthly-report", month, year],
    queryFn: () => reportClient.getMonthly(month, year),
  });

  const report = reportResponse?.data;

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Laporan Absensi Bulanan
            </h1>
            <p className="text-muted-foreground mt-1">
              Rekapitulasi kehadiran pegawai
            </p>
          </div>
        </div>

        <MonthYearSelector
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      {/* summary card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border">
          <ReportSummaryCard
            label="Total Hari"
            value={report?.totalDays || 0}
            color="text-blue-600"
          />
          <ReportSummaryCard
            label="Hari Kerja"
            value={report?.totalWorkingDays || 0}
            color="text-green-600"
          />
          <ReportSummaryCard
            label="Akhir Pekan"
            value={report?.totalWeekends || 0}
            color="text-purple-600"
          />
          <ReportSummaryCard
            label="Hari Libur"
            value={report?.totalHolidays || 0}
            color="text-red-600"
          />
        </div>
      </div>

      {/* attendance table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Rekapitulasi Kehadiran Pegawai
          </h2>
        </div>

        {!report?.employees || report.employees.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 text-muted-foreground mb-4">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tidak Ada Data
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Belum ada data kehadiran untuk periode yang dipilih.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    NIK
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Departemen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Posisi
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      Hadir
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      Sakit
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      Izin
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      Cuti
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-1">
                      Alpha
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {report.employees.map((employee) => (
                  <tr
                    key={employee.employeeId}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {employee.employeeNik}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {employee.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {employee.totalHadir}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {employee.totalSakit}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {employee.totalIzin}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {employee.totalCuti}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {employee.totalAlpha}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
