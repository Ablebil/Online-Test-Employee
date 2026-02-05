import { Calendar, Clock, Timer } from "lucide-react";
import { AttendanceStatusBadge } from "./AttendanceStatusBadge";
import {
  formatShortDate,
  formatDayName,
  formatTime,
  calculateWorkDuration,
} from "@/utils/date";
import type { AttendanceHistory } from "@/types";

type AttendanceHistoryCardProps = {
  attendance: AttendanceHistory;
};

export const AttendanceHistoryCard = ({
  attendance,
}: AttendanceHistoryCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Calendar size={14} />
            <span>{formatShortDate(attendance.date)}</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            {formatDayName(attendance.date)}
          </h3>
        </div>
        <AttendanceStatusBadge status={attendance.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* check-in */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Masuk</p>
            <p className="font-semibold text-foreground">
              {formatTime(attendance.checkIn)}
            </p>
          </div>
        </div>

        {/* check-out */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pulang</p>
            <p className="font-semibold text-foreground">
              {formatTime(attendance.checkOut)}
            </p>
          </div>
        </div>

        {/* duration */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Timer size={18} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Durasi</p>
            <p className="font-semibold text-foreground text-sm">
              {calculateWorkDuration(attendance.checkIn, attendance.checkOut)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
