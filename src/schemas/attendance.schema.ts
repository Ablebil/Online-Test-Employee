import z from "zod";

export const AttendanceStatusEnum = z.enum([
  "HADIR",
  "SAKIT",
  "IZIN",
  "CUTI",
  "ALPHA",
]);

export const CheckInSchema = z.object({
  date: z.iso.datetime().optional(),
});

export const CheckOutSchema = z.object({
  date: z.iso.datetime().optional(),
});

export type CheckInDTO = z.infer<typeof CheckInSchema>;
export type CheckOutDTO = z.infer<typeof CheckOutSchema>;
