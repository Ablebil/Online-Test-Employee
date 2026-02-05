// src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { LoginSchema, LoginDTO } from "@/schemas/auth.schema";
import { authClient } from "@/lib/api/auth";
import { FormInput } from "@/components/ui/FormInput";
import { AppError } from "@/lib/exception";
import { getRedirectPath } from "@/utils/redirect";
import type { AuthUser, ApiResponse } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

  const { data: userResponse, isLoading: isCheckingAuth } = useQuery<
    ApiResponse<AuthUser>
  >({
    queryKey: ["auth-me"],
    queryFn: authClient.getMe,
    retry: false,
  });

  useEffect(() => {
    // if already logged in, redirect to appropriate page
    if (!isCheckingAuth && userResponse?.data) {
      const redirectPath = getRedirectPath(userResponse.data);
      router.replace(redirectPath);
    }
  }, [isCheckingAuth, userResponse, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authClient.login,
    onSuccess: (response) => {
      const user = response?.data?.employee;
      const redirectPath = getRedirectPath(user);
      router.push(redirectPath);
    },
    onError: (error: AppError) => {
      const msg = error.message || "Terjadi kesalahan saat login";
      setGlobalError(msg);
    },
  });

  const onSubmit = (data: LoginDTO) => {
    setGlobalError("");
    loginMutation.mutate(data);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="text-center">
          <Loader2
            className="animate-spin text-primary mx-auto mb-4"
            size={40}
          />
          <p className="text-muted-foreground">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  if (userResponse?.data) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8">
        {/* header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Selamat Datang</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Silakan login menggunakan akun pegawai Anda
          </p>
        </div>

        {/* error alert */}
        {globalError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{globalError}</span>
          </div>
        )}

        {/* login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            label="Email"
            type="email"
            placeholder="example@company.test"
            registration={register("email")}
            error={errors.email?.message}
            disabled={loginMutation.isPending}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            registration={register("password")}
            error={errors.password?.message}
            disabled={loginMutation.isPending}
          />

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
