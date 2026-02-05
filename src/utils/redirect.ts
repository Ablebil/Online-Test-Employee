import type { AuthUser } from "@/types";

export const getRedirectPath = (user: AuthUser | null | undefined): string => {
  if (!user) {
    return "/login";
  }

  return user.role === "ADMIN" ? "/employees" : "/dashboard";
};
