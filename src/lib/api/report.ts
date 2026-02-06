import { api } from "@/lib/axios";

export const reportClient = {
  getMonthly: async (month: number, year: number) => {
    const response = await api.get("/reports/monthly", {
      params: { month, year },
    });
    return response.data;
  },
};
