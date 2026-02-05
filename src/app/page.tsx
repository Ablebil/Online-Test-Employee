"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/api/auth";
import { Loader2 } from "lucide-react";
import { getRedirectPath } from "@/utils/redirect";
import type { AuthUser, ApiResponse } from "@/types";

export default function RootPage() {
  const router = useRouter();

  const { data: userResponse, isLoading } = useQuery<ApiResponse<AuthUser>>({
    queryKey: ["auth-me"],
    queryFn: authClient.getMe,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      const redirectPath = getRedirectPath(userResponse?.data);
      router.replace(redirectPath);
    }
  }, [isLoading, userResponse, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="text-center">
        <Loader2 className="animate-spin text-primary mx-auto mb-4" size={40} />
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    </div>
  );
}
