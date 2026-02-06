"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { FormInput } from "@/components/ui/FormInput";
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  type CreateEmployeeDTO,
  type UpdateEmployeeDTO,
} from "@/schemas/employee.schema";
import type { Employee, Department } from "@/types";

type EmployeeFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEmployeeDTO | UpdateEmployeeDTO) => void;
  employee?: Employee | null;
  departments: Department[];
  isLoading?: boolean;
};

export const EmployeeFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  employee,
  departments,
  isLoading = false,
}: EmployeeFormModalProps) => {
  const isEdit = !!employee;
  const schema = isEdit ? UpdateEmployeeSchema : CreateEmployeeSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEmployeeDTO | UpdateEmployeeDTO>({
    resolver: zodResolver(schema),
    defaultValues: employee
      ? {
          nik: employee.nik,
          name: employee.name,
          email: employee.email,
          phone: employee.phone || "",
          role: employee.role,
          position: employee.position,
          employmentStatus: employee.employmentStatus,
          departmentId: employee.departmentId,
          joinDate: employee.joinDate
            ? new Date(employee.joinDate).toISOString().split("T")[0]
            : "",
        }
      : {
          role: "PEGAWAI",
          employmentStatus: "TETAP",
        },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            {isEdit ? "Edit Pegawai" : "Tambah Pegawai"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="NIK"
              type="text"
              placeholder="Masukkan NIK"
              registration={register("nik")}
              error={errors.nik?.message}
              disabled={isLoading}
            />

            <FormInput
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              registration={register("name")}
              error={errors.name?.message}
              disabled={isLoading}
            />
          </div>

          <FormInput
            label="Email"
            type="email"
            placeholder="example@company.com"
            registration={register("email")}
            error={errors.email?.message}
            disabled={isLoading}
          />

          <FormInput
            label="Nomor Telepon (Opsional)"
            type="text"
            placeholder="08xxxxxxxxxx"
            registration={register("phone")}
            error={errors.phone?.message}
            disabled={isLoading}
          />

          <FormInput
            label={
              isEdit ? "Password (Kosongkan jika tidak diubah)" : "Password"
            }
            type="password"
            placeholder="Minimal 6 karakter"
            registration={register("password")}
            error={errors.password?.message}
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Posisi"
              type="text"
              placeholder="Contoh: Staff IT"
              registration={register("position")}
              error={errors.position?.message}
              disabled={isLoading}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Departemen
              </label>
              <select
                {...register("departmentId")}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option value="">Pilih Departemen</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.departmentId.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Role
              </label>
              <select
                {...register("role")}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option value="PEGAWAI">Pegawai</option>
                <option value="ADMIN">Admin</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Status Kepegawaian
              </label>
              <select
                {...register("employmentStatus")}
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option value="TETAP">Tetap</option>
                <option value="KONTRAK">Kontrak</option>
                <option value="MAGANG">Magang</option>
              </select>
              {errors.employmentStatus && (
                <p className="mt-1 text-xs text-destructive font-medium">
                  {errors.employmentStatus.message}
                </p>
              )}
            </div>
          </div>

          <FormInput
            label="Tanggal Masuk (Opsional)"
            type="date"
            registration={register("joinDate")}
            error={errors.joinDate?.message}
            disabled={isLoading}
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isEdit ? "Simpan Perubahan" : "Tambah Pegawai"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
