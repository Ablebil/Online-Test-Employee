"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { LoginSchema, LoginDTO } from "@/schemas/auth.schema";
import { authClient } from "@/lib/api/auth";
import { FormInput } from "@/components/ui/FormInput";

export default function LoginPage() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");

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
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: () => {
      const msg = "Terjadi kesalahan saat login";
      setGlobalError(msg);
    },
  });

  const onSubmit = (data: LoginDTO) => {
    setGlobalError("");
    loginMutation.mutate(data);
  };

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
