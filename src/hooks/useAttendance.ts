// hooks/useAttendance.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceClient } from "@/lib/api/attendance";
import type {
  TodayAttendanceStatus,
  AttendanceHistory,
  ApiResponse,
} from "@/types";

export const useAttendanceToday = () => {
  const { data, isLoading, error } = useQuery<
    ApiResponse<TodayAttendanceStatus>
  >({
    queryKey: ["attendance-today"],
    queryFn: attendanceClient.getTodayStatus,
  });

  return {
    attendanceResponse: data,
    attendanceData: data?.data,
    isLoading,
    error,
  };
};

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attendanceClient.checkIn({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-today"] });
    },
  });
};

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => attendanceClient.checkOut({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-today"] });
    },
  });
};

export const useAttendanceHistory = () => {
  const { data, isLoading, error } = useQuery<ApiResponse<AttendanceHistory[]>>(
    {
      queryKey: ["attendance-history"],
      queryFn: attendanceClient.getHistory,
    },
  );

  return {
    historyResponse: data,
    history: data?.data || [],
    isLoading,
    error,
  };
};
