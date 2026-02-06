// hooks/useDepartments.ts
import { useQuery } from "@tanstack/react-query";
import { departmentClient } from "@/lib/api/department";
import type { Department, ApiResponse } from "@/types";

export const useDepartments = () => {
  const { data, isLoading, error } = useQuery<ApiResponse<Department[]>>({
    queryKey: ["departments"],
    queryFn: departmentClient.getAll,
  });

  return {
    departmentsResponse: data,
    departments: data?.data || [],
    isLoading,
    error,
  };
};
