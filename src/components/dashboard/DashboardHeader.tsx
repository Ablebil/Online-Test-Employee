import { Calendar } from "lucide-react";
import { formatFullDate } from "@/utils/date";

type DashboardHeaderProps = {
  greeting: string;
  userName?: string;
};

export const DashboardHeader = ({
  greeting,
  userName = "Pegawai",
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {greeting},{" "}
          <span className="text-primary">{userName.split(" ")[0]}</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Siap untuk produktif hari ini?
        </p>
      </div>
      <div className="text-right hidden md:block">
        <div className="flex items-center gap-2 text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border/50">
          <Calendar size={18} />
          <span className="font-medium">{formatFullDate()}</span>
        </div>
      </div>
    </div>
  );
};
