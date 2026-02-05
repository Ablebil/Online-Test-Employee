import { Clock, Briefcase, CheckCircle2 } from "lucide-react";

type StatusBadgeProps = {
  hasCheckedIn: boolean;
  hasCheckedOut: boolean;
};

export const StatusBadge = ({
  hasCheckedIn,
  hasCheckedOut,
}: StatusBadgeProps) => {
  if (!hasCheckedIn) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600 border border-slate-200">
        <Clock size={14} /> Belum Masuk
      </span>
    );
  }

  if (hasCheckedIn && !hasCheckedOut) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
        <Briefcase size={14} /> Sedang Bekerja
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
      <CheckCircle2 size={14} /> Selesai
    </span>
  );
};
