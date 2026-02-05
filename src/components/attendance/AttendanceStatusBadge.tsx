import { CheckCircle2, XCircle, AlertCircle, Coffee } from "lucide-react";
import { clsx } from "clsx";
import type { AttendanceStatusType } from "@/types";

type AttendanceStatusBadgeProps = {
  status: AttendanceStatusType;
  size?: "sm" | "md" | "lg";
};

export const AttendanceStatusBadge = ({
  status,
  size = "md",
}: AttendanceStatusBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const configs = {
    HADIR: {
      label: "Hadir",
      icon: CheckCircle2,
      className: "bg-green-50 text-green-700 border-green-200",
    },
    SAKIT: {
      label: "Sakit",
      icon: AlertCircle,
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    IZIN: {
      label: "Izin",
      icon: Coffee,
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
    CUTI: {
      label: "Cuti",
      icon: Coffee,
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    ALPHA: {
      label: "Alpha",
      icon: XCircle,
      className: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        config.className,
        sizeClasses[size],
      )}
    >
      <Icon size={iconSize[size]} />
      {config.label}
    </span>
  );
};
