import { UseFormRegisterReturn } from "react-hook-form";
import { clsx } from "clsx";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function FormInput({
  label,
  error,
  registration,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      <input
        {...registration}
        {...props}
        className={clsx(
          "w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-destructive focus:ring-destructive/30"
            : "border-input focus:ring-ring",
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
