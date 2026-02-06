import { api } from "@/lib/axios";
import type {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@/schemas/employee.schema";

export const employeeClient = {
  getAll: async () => {
    const response = await api.get("/employees");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  create: async (data: CreateEmployeeDTO) => {
    const response = await api.post("/employees", data);
    return response.data;
  },

  update: async (id: string, data: UpdateEmployeeDTO) => {
    const response = await api.put(`/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};
