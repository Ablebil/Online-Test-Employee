// app/(dashboard)/attendance/history/page.tsx
"use client";

import { Loader2 } from "lucide-react";
import { useAttendanceHistory } from "@/hooks/useAttendance";
import { AttendanceHistoryCard } from "@/components/attendance/AttendanceHistoryCard";
import { EmptyAttendanceState } from "@/components/attendance/EmptyAttendanceState";

export default function AttendanceHistoryPage() {
  const { history, isLoading } = useAttendanceHistory();

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

      {history.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8">
          <EmptyAttendanceState />
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((attendance) => (
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
