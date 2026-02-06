// hooks/useAuth.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/api/auth";
import type { AuthUser, ApiResponse } from "@/types";

export const useAuthUser = () => {
  const { data, isLoading, error } = useQuery<ApiResponse<AuthUser>>({
    queryKey: ["auth-me"],
    queryFn: authClient.getMe,
    retry: false,
  });

  return {
    userResponse: data,
    user: data?.data,
    isLoading,
    error,
  };
};

export const useLogin = () => {
  return useMutation({
    mutationFn: authClient.login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authClient.logout,
  });
};
