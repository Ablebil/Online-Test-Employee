import { Loader2, LogIn, LogOut } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type AttendanceActionsProps = {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
  isCheckingIn: boolean;
  isCheckingOut: boolean;
};

export const AttendanceActions = ({
  hasCheckedIn,
  hasCheckedOut,
  onCheckIn,
  onCheckOut,
  isCheckingIn,
  isCheckingOut,
}: AttendanceActionsProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-62.5">
      <StatusBadge hasCheckedIn={hasCheckedIn} hasCheckedOut={hasCheckedOut} />

      <div className="mt-8 w-full max-w-sm">
        {!hasCheckedIn && (
          <button
            onClick={onCheckIn}
            disabled={isCheckingIn}
            className="w-full group relative flex items-center justify-center gap-4 bg-primary hover:bg-primary/90 text-primary-foreground h-16 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isCheckingIn ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="p-2 bg-white/20 rounded-lg">
                <LogIn size={24} />
              </div>
            )}
            <span>CHECK IN</span>
          </button>
        )}

        {hasCheckedIn && !hasCheckedOut && (
          <button
            onClick={onCheckOut}
            disabled={isCheckingOut}
            className="w-full group relative flex items-center justify-center gap-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground h-16 rounded-xl font-bold text-lg shadow-lg shadow-destructive/20 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isCheckingOut ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="p-2 bg-white/20 rounded-lg">
                <LogOut size={24} />
              </div>
            )}
            <span>CHECK OUT</span>
          </button>
        )}

        {hasCheckedIn && hasCheckedOut && (
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold">Aktivitas Selesai</h3>
            <p className="text-muted-foreground text-sm">
              Terima kasih atas kerja keras Anda hari ini. Sampai jumpa besok.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
