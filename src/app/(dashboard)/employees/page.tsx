"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeClient } from "@/lib/api/employee";
import { departmentClient } from "@/lib/api/department";
import { Loader2, Users, Plus, AlertCircle } from "lucide-react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeeFormModal } from "@/components/employees/EmployeeFormModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { AppError } from "@/lib/exception";
import { toast } from "@/utils/toast";
import { useConfirm } from "@/hooks/useConfirm";
import type { Employee, Department, ApiResponse } from "@/types";
import type {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@/schemas/employee.schema";

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const { confirm, isOpen, options, handleConfirm, handleCancel } =
    useConfirm();

  const { data: employeesResponse, isLoading: isLoadingEmployees } = useQuery<
    ApiResponse<Employee[]>
  >({
    queryKey: ["employees"],
    queryFn: employeeClient.getAll,
  });

  const { data: departmentsResponse } = useQuery<ApiResponse<Department[]>>({
    queryKey: ["departments"],
    queryFn: departmentClient.getAll,
  });

  const employees = employeesResponse?.data || [];
  const departments = departmentsResponse?.data || [];

  const createMutation = useMutation({
    mutationFn: (data: CreateEmployeeDTO) => employeeClient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsModalOpen(false);
      toast.success("Pegawai berhasil ditambahkan");
    },
    onError: (error: AppError) => {
      toast.error(error.message || "Gagal menambahkan pegawai");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDTO }) =>
      employeeClient.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsModalOpen(false);
      setSelectedEmployee(null);
      toast.success("Pegawai berhasil diperbarui");
    },
    onError: (error: AppError) => {
      toast.error(error.message || "Gagal memperbarui pegawai");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => employeeClient.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Pegawai berhasil dihapus");
    },
    onError: (error: AppError) => {
      toast.error(error.message || "Gagal menghapus pegawai");
    },
  });

  const handleCreateOrUpdate = (
    data: CreateEmployeeDTO | UpdateEmployeeDTO,
  ) => {
    if (selectedEmployee) {
      updateMutation.mutate({ id: selectedEmployee.id, data });
    } else {
      createMutation.mutate(data as CreateEmployeeDTO);
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (employee: Employee) => {
    const confirmed = await confirm({
      title: "Hapus Pegawai",
      message: `Apakah Anda yakin ingin menghapus pegawai ${employee.name}?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "danger",
    });

    if (confirmed) {
      deleteMutation.mutate(employee.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  if (isLoadingEmployees) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Pegawai</h1>
            <p className="text-muted-foreground mt-1">
              Kelola data pegawai perusahaan
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus size={20} />
          Tambah Pegawai
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {employees.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 text-muted-foreground mb-4">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum Ada Pegawai
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Belum ada data pegawai. Klik tombol Tambah Pegawai untuk
              menambahkan pegawai baru.
            </p>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrUpdate}
        employee={selectedEmployee}
        departments={departments}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={options.title}
        message={options.message}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        variant={options.variant}
      />
    </div>
  );
}
