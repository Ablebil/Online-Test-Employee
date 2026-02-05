import { LogIn, LogOut, MapPin } from "lucide-react";
import { clsx } from "clsx";
import { formatTime, calculateWorkDuration } from "@/utils/date";

type AttendanceTimelineProps = {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
  checkIn?: Date | string | null;
  checkOut?: Date | string | null;
};

export const AttendanceTimeline = ({
  hasCheckedIn,
  hasCheckedOut,
  checkIn,
  checkOut,
}: AttendanceTimelineProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-sm">
      <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
        <MapPin size={18} className="text-primary" />
        Timeline Aktivitas
      </h3>

      <div className="space-y-8 relative pl-2">
        <div className="absolute left-3.75 top-2 bottom-2 w-0.5 bg-border/60"></div>

        {/* check-in item */}
        <div className="relative pl-10">
          <div
            className={clsx(
              "absolute left-0 w-8 h-8 rounded-full border-4 flex items-center justify-center z-10 transition-colors",
              hasCheckedIn
                ? "border-white bg-green-500 text-white shadow-md"
                : "border-white bg-slate-200 text-slate-400",
            )}
          >
            <LogIn size={14} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Jam Masuk
            </p>
            <p
              className={clsx(
                "text-2xl font-mono font-bold",
                hasCheckedIn ? "text-foreground" : "text-muted-foreground/40",
              )}
            >
              {formatTime(checkIn)}
            </p>
            {hasCheckedIn && (
              <p className="text-xs text-green-600 mt-1 font-medium bg-green-50 inline-block px-2 py-0.5 rounded">
                Tepat Waktu
              </p>
            )}
          </div>
        </div>

        {/* check-out item */}
        <div className="relative pl-10">
          <div
            className={clsx(
              "absolute left-0 w-8 h-8 rounded-full border-4 flex items-center justify-center z-10 transition-colors",
              hasCheckedOut
                ? "border-white bg-red-500 text-white shadow-md"
                : "border-white bg-slate-200 text-slate-400",
            )}
          >
            <LogOut size={14} />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Jam Pulang
            </p>
            <p
              className={clsx(
                "text-2xl font-mono font-bold",
                hasCheckedOut ? "text-foreground" : "text-muted-foreground/40",
              )}
            >
              {formatTime(checkOut)}
            </p>
          </div>
        </div>

        {/* footer */}
        <div className="pt-4 mt-4 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total Jam Kerja</span>
            <span className="font-medium text-foreground">
              {calculateWorkDuration(checkIn, checkOut)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
