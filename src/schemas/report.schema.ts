import z from "zod";

export const MonthlyReportQuerySchema = z.object({
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, "Month harus antara 1-12")
    .transform((val) => parseInt(val, 10)),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year harus 4 digit")
    .transform((val) => parseInt(val, 10)),
});

export type MonthlyReportQuery = z.infer<typeof MonthlyReportQuerySchema>;
