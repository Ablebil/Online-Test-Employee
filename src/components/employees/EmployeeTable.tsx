import { Edit, Trash2, Mail, Phone, Briefcase } from "lucide-react";
import { formatShortDate } from "@/utils/date";
import type { Employee } from "@/types";

type EmployeeTableProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) => {
  const getRoleBadge = (role: string) => {
    if (role === "ADMIN") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Pegawai
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      TETAP: "bg-green-100 text-green-800",
      KONTRAK: "bg-yellow-100 text-yellow-800",
      MAGANG: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${configs[status as keyof typeof configs]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              NIK
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Nama & Kontak
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Posisi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Departemen
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tanggal Masuk
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-secondary/30 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-foreground">
                  {employee.nik}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-foreground">
                  {employee.name}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Mail size={12} />
                  {employee.email}
                </div>
                {employee.phone && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone size={12} />
                    {employee.phone}
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-foreground flex items-center gap-1">
                  <Briefcase size={14} />
                  {employee.position}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-foreground">
                  {employee.department.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(employee.employmentStatus)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(employee.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                {employee.joinDate ? formatShortDate(employee.joinDate) : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="text-primary hover:text-primary/80 p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(employee)}
                    className="text-destructive hover:text-destructive/80 p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
