"use client";

import { useQuery } from "@tanstack/react-query";
import { attendanceClient } from "@/lib/api/attendance";
import { Loader2 } from "lucide-react";
import { AttendanceHistoryCard } from "@/components/attendance/AttendanceHistoryCard";
import { EmptyAttendanceState } from "@/components/attendance/EmptyAttendanceState";
import type { AttendanceHistory, ApiResponse } from "@/types";

export default function AttendanceHistoryPage() {
  const { data: historyResponse, isLoading } = useQuery<
    ApiResponse<AttendanceHistory[]>
  >({
    queryKey: ["attendance-history"],
    queryFn: attendanceClient.getHistory,
  });

  const historyData = historyResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Riwayat Absensi
          </h1>
          <p className="text-muted-foreground mt-1">
            Lihat riwayat kehadiran Anda selama 30 hari terakhir
          </p>
        </div>
      </div>

      {historyData.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8">
          <EmptyAttendanceState />
        </div>
      ) : (
        <div className="space-y-4">
          {historyData.map((attendance) => (
            <AttendanceHistoryCard
              key={attendance.id}
              attendance={attendance}
            />
          ))}
        </div>
      )}
    </div>
  );
}
