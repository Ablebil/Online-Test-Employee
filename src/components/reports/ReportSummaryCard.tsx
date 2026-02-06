type ReportSummaryCardProps = {
  label: string;
  value: number | string;
  color?: string;
};

export const ReportSummaryCard = ({
  label,
  value,
  color = "text-primary",
}: ReportSummaryCardProps) => {
  return (
    <div className="text-center">
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};
