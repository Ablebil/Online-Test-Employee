import z from "zod";

export const RoleEnum = z.enum(["ADMIN", "PEGAWAI"]);
export const EmploymentStatusEnum = z.enum(["TETAP", "KONTRAK", "MAGANG"]);

const BaseEmployeeSchema = z.object({
  nik: z
    .string()
    .min(1, "NIK wajib diisi")
    .max(20, "NIK maksimal sebanyak 20 karakter"),
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal sebanyak 100 karakter"),
  email: z.email("Format email salah"),
  phone: z
    .string()
    .max(20, "Nomor telepon maksimal sebanyak 20 karakter")
    .optional()
    .nullable(),
  role: RoleEnum.default("PEGAWAI"),
  position: z
    .string()
    .min(1, "Posisi wajib diisi")
    .max(100, "Posisi maksimal 100 karakter"),
  employmentStatus: EmploymentStatusEnum.default("TETAP"),
  departmentId: z.uuid("Format ID departemen salah"),
  joinDate: z.iso.date("Format tanggal masuk harus YYYY-MM-DD").optional(),
});

export const CreateEmployeeSchema = BaseEmployeeSchema.extend({
  password: z.string().min(6, "Password minimal sebanyak 6 karakter"),
});

export const UpdateEmployeeSchema = BaseEmployeeSchema.extend({
  password: z
    .string()
    .min(6, "Password minimal sebanyak 6 karakter")
    .optional(),
}).partial();

export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployeeDTO = z.infer<typeof UpdateEmployeeSchema>;
