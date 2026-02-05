import { CalendarX2 } from "lucide-react";

export const EmptyAttendanceState = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 text-muted-foreground mb-4">
        <CalendarX2 size={40} />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Belum Ada Riwayat
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Riwayat absensi Anda akan muncul di sini setelah Anda melakukan check-in
        untuk pertama kalinya.
      </p>
    </div>
  );
};
