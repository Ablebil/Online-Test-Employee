"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/api/auth";
import { MENUS } from "@/lib/menus";
import { LogOut, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import type { AuthUser, ApiResponse } from "@/types";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userResponse, isLoading } = useQuery<ApiResponse<AuthUser>>({
    queryKey: ["auth-me"],
    queryFn: authClient.getMe,
    retry: false,
  });

  const user = userResponse?.data;

  const logoutMutation = useMutation({
    mutationFn: authClient.logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });

  if (isLoading) {
    return (
      <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0">
        <div className="p-6 border-b border-border flex justify-center">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      </aside>
    );
  }

  const role = user?.role === "ADMIN" ? "ADMIN" : "PEGAWAI";
  const menus = MENUS[role];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 z-50 shadow-sm transition-all">
      {/* header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          App Presensi
        </h1>
      </div>

      {/* menu list */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-card">
        {menus.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* footer */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="mb-4 px-1">
          <p className="text-sm font-semibold truncate text-foreground">
            {user?.name || "Pegawai"}
          </p>
          <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">
            {user?.role}
          </p>
        </div>

        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground py-2 px-4 rounded-lg text-sm font-medium cursor-pointer transition-all"
        >
          {logoutMutation.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <LogOut size={16} />
          )}
          Keluar
        </button>
      </div>
    </aside>
  );
}
