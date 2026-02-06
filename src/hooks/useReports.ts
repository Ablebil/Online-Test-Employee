// hooks/useReports.ts
import { useQuery } from "@tanstack/react-query";
import { reportClient } from "@/lib/api/report";
import type { MonthlyReport, ApiResponse } from "@/types";

export const useMonthlyReport = (month: number, year: number) => {
  const { data, isLoading, error } = useQuery<ApiResponse<MonthlyReport>>({
    queryKey: ["monthly-report", month, year],
    queryFn: () => reportClient.getMonthly(month, year),
  });

  return {
    reportResponse: data,
    report: data?.data,
    isLoading,
    error,
  };
};
