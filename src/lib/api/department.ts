import { api } from "@/lib/axios";

export const departmentClient = {
  getAll: async () => {
    const response = await api.get("/departments");
    return response.data;
  },
};
