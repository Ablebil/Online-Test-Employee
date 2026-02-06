// app/(dashboard)/dashboard/page.tsx
"use client";

import { Loader2 } from "lucide-react";
import { useClock } from "@/hooks/useClock";
import { useAuthUser } from "@/hooks/useAuth";
import {
  useAttendanceToday,
  useCheckIn,
  useCheckOut,
} from "@/hooks/useAttendance";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DigitalClock } from "@/components/dashboard/DigitalClock";
import { AttendanceActions } from "@/components/dashboard/AttendanceActions";
import { AttendanceTimeline } from "@/components/dashboard/AttendanceTimeline";
import { toast } from "@/utils/toast";

export default function DashboardPage() {
  const { currentTime, greeting } = useClock();
  const { user } = useAuthUser();
  const { attendanceData, isLoading } = useAttendanceToday();

  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const handleCheckIn = () => {
    checkInMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Check in berhasil!");
      },
      onError: (error: Error) => {
        const message = (error as Error & { message?: string })?.message;
        toast.error(message || "Gagal check in");
      },
    });
  };

  const handleCheckOut = () => {
    checkOutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Check out berhasil!");
      },
      onError: (error: Error) => {
        const message = (error as Error & { message?: string })?.message;
        toast.error(message || "Gagal check out");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const hasCheckedIn = attendanceData?.hasCheckedIn ?? false;
  const hasCheckedOut = attendanceData?.hasCheckedOut ?? false;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DashboardHeader greeting={greeting} userName={user?.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* left column */}
        <div className="lg:col-span-2 space-y-6">
          <DigitalClock currentTime={currentTime} />
          <AttendanceActions
            hasCheckedIn={hasCheckedIn}
            hasCheckedOut={hasCheckedOut}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            isCheckingIn={checkInMutation.isPending}
            isCheckingOut={checkOutMutation.isPending}
          />
        </div>

        {/* right column */}
        <div className="lg:col-span-1">
          <AttendanceTimeline
            hasCheckedIn={hasCheckedIn}
            hasCheckedOut={hasCheckedOut}
            checkIn={attendanceData?.attendance?.checkIn}
            checkOut={attendanceData?.attendance?.checkOut}
          />
        </div>
      </div>
    </div>
  );
}
