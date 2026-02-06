"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceClient } from "@/lib/api/attendance";
import { authClient } from "@/lib/api/auth";
import { Loader2 } from "lucide-react";
import { AppError } from "@/lib/exception";
import { useClock } from "@/hooks/useClock";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DigitalClock } from "@/components/dashboard/DigitalClock";
import { AttendanceActions } from "@/components/dashboard/AttendanceActions";
import { AttendanceTimeline } from "@/components/dashboard/AttendanceTimeline";
import type { AuthUser, TodayAttendanceStatus, ApiResponse } from "@/types";
import { toast } from "@/utils/toast";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { currentTime, greeting } = useClock();

  const { data: userResponse } = useQuery<ApiResponse<AuthUser>>({
    queryKey: ["auth-me"],
    queryFn: authClient.getMe,
  });
  const user = userResponse?.data;

  const { data: attendanceResponse, isLoading } = useQuery<
    ApiResponse<TodayAttendanceStatus>
  >({
    queryKey: ["attendance-today"],
    queryFn: attendanceClient.getTodayStatus,
  });
  const attendanceData = attendanceResponse?.data;

  const checkInMutation = useMutation({
    mutationFn: () => attendanceClient.checkIn({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-today"] });
      toast.success("Check in berhasil!");
    },
    onError: (err: AppError) => {
      toast.error(err.message || "Gagal check in");
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: () => attendanceClient.checkOut({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-today"] });
      toast.success("Check out berhasil!");
    },
    onError: (err: AppError) => {
      toast.error(err.message || "Gagal check out");
    },
  });

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
            onCheckIn={() => checkInMutation.mutate()}
            onCheckOut={() => checkOutMutation.mutate()}
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
